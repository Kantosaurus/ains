"use client";
import React, { useState, useEffect } from "react";
import MacbookScroll from "./macbook-scroll";
import { CodeBlock } from "./code-block";
import dynamic from 'next/dynamic';
import { motion } from "framer-motion";

const codeContent = `// Welcome to my digital space
const portfolio = {
  name: 'Ainsley Woo',
  role: 'Full Stack Developer',
  passion: 'Building beautiful digital experiences',
  skills: [
    'React', 'Next.js', 'TypeScript',
    'Node.js', 'Python',
    'TailwindCSS', 'Java', 'JavaScript',
  ]
};

// Let's create something amazing together!
`;

// Disable SSR for this component
const MacbookScrollDemo = dynamic(() => Promise.resolve(() => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <div className="overflow-hidden bg-transparent w-full">
      <div className="opacity-100">
        <MacbookScroll
          showGradient={false}
        >
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <CodeBlock
              code={codeContent}
              language="typescript"
              filename="portfolio.ts"
              highlightLines={[4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]}
            />
          </motion.div>
        </MacbookScroll>
      </div>
    </div>
  );
}), { 
  ssr: false,
  loading: () => (
    <div className="overflow-hidden bg-transparent w-full h-[500px] flex items-center justify-center">
      <div className="animate-pulse text-neutral-400">Loading...</div>
    </div>
  )
});

export default MacbookScrollDemo; 