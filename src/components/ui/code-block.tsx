"use client";
import React, { useEffect, useRef, useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { IconCheck, IconCopy } from "@tabler/icons-react";

type CodeBlockProps = {
  language: string;
  filename: string;
  highlightLines?: number[];
} & (
  | {
      code: string;
      tabs?: never;
    }
  | {
      code?: never;
      tabs: Array<{
        name: string;
        code: string;
        language?: string;
        highlightLines?: number[];
      }>;
    }
);

export const CodeBlock = ({
  language,
  filename,
  code,
  highlightLines = [],
  tabs = [],
}: CodeBlockProps) => {
  const [copied, setCopied] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(0);
  const [visibleCode, setVisibleCode] = useState("");
  const [isClient, setIsClient] = useState(false);
  const codeRef = useRef<HTMLDivElement>(null);
  const fullCodeRef = useRef<string>("");
  const animationRef = useRef<number>();

  const tabsExist = tabs.length > 0;
  const activeCode = tabsExist ? tabs[activeTab].code : (code || "");

  // Set isClient to true after mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Update fullCodeRef when activeCode changes
  useEffect(() => {
    fullCodeRef.current = activeCode;
    if (isClient) {
      setVisibleCode(""); // Reset visible code when active code changes
    }
  }, [activeCode, isClient]);

  // Handle typing animation
  useEffect(() => {
    if (!isClient) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        let currentIndex = 0;
        const typingSpeed = 30; // milliseconds per character

        const typeNextChar = () => {
          if (currentIndex < fullCodeRef.current.length) {
            setVisibleCode(fullCodeRef.current.slice(0, currentIndex + 1));
            currentIndex++;
            animationRef.current = window.setTimeout(typeNextChar, typingSpeed);
          }
        };

        // Start typing animation
        typeNextChar();
      }
    }, { threshold: 0.1 });

    if (codeRef.current) {
      observer.observe(codeRef.current);
    }

    return () => {
      if (animationRef.current) {
        window.clearTimeout(animationRef.current);
      }
      if (codeRef.current) {
        observer.unobserve(codeRef.current);
      }
    };
  }, [activeCode, isClient]);

  const copyToClipboard = async () => {
    const textToCopy = tabsExist ? tabs[activeTab].code : code;
    if (textToCopy) {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const activeLanguage = tabsExist
    ? tabs[activeTab].language || language
    : language;
  const activeHighlightLines = tabsExist
    ? tabs[activeTab].highlightLines || []
    : highlightLines;

  return (
    <div className="relative w-full rounded-lg bg-slate-900 p-4 font-mono text-sm">
      <div className="flex flex-col gap-2">
        {tabsExist && (
          <div className="flex overflow-x-auto">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTab(index)}
                className={`px-3 !py-2 text-xs transition-colors font-sans ${
                  activeTab === index
                    ? "text-white"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {tab.name}
              </button>
            ))}
          </div>
        )}
        {!tabsExist && filename && (
          <div className="flex justify-between items-center py-2">
            <div className="text-xs text-zinc-400">{filename}</div>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-200 transition-colors font-sans"
            >
              {copied ? <IconCheck size={14} /> : <IconCopy size={14} />}
            </button>
          </div>
        )}
      </div>
      <div ref={codeRef} className="bg-transparent">
        <SyntaxHighlighter
          language={activeLanguage}
          style={{
            ...atomDark,
            'pre[class*="language-"]': {
              ...atomDark['pre[class*="language-"]'],
              background: 'transparent',
            },
            'code[class*="language-"]': {
              ...atomDark['code[class*="language-"]'],
              background: 'transparent',
            },
          }}
          customStyle={{
            margin: 0,
            padding: 0,
            background: "transparent",
            fontSize: "0.875rem",
          }}
          wrapLines={true}
          showLineNumbers={true}
          lineProps={(lineNumber) => ({
            style: {
              backgroundColor: activeHighlightLines.includes(lineNumber)
                ? "transparent"
                : "transparent",
              display: "block",
              width: "100%",
            },
          })}
          PreTag="div"
        >
          {isClient ? visibleCode : activeCode}
        </SyntaxHighlighter>
      </div>
    </div>
  );
}; 