"use client";

import React from 'react';
import MacbookScroll from './ui/macbook-scroll';
import { CodeBlock } from './ui/code-block';
import { motion, useScroll, useTransform } from 'framer-motion';

interface HeroSectionProps {
  id?: string;
}

const heroCode = `// Welcome to my digital space
const portfolio = {
  name: 'Your Name',
  role: 'Full Stack Developer',
  passion: 'Building beautiful digital experiences',
  skills: [
    'React', 'Next.js', 'TypeScript',
    'Node.js', 'Python', 'AWS',
    'TailwindCSS', 'PostgreSQL', 'Docker'
  ]
};

// Let's create something amazing together!
`;

export default function HeroSection({ id }: HeroSectionProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Create a transform that only affects opacity for fade effect
  const opacity = useTransform(scrollYProgress, [0.8, 0.9], [1, 0]);

  return (
    <section id={id} ref={containerRef} className="relative min-h-[300vh] w-full bg-gradient-to-b from-white to-gray-50">
      {/* Sticky container for MacBook */}
      <div className="sticky top-0 h-screen w-full">
        {/* Center container */}
        <motion.div 
          className="relative h-full w-full flex flex-col items-center justify-center max-w-7xl mx-auto px-4"
          style={{ opacity }}
        >
          {/* MacBook container */}
          <div className="w-full max-w-5xl">
            <MacbookScroll showGradient={false}>
              <CodeBlock
                code={heroCode}
                language="typescript"
                filename="portfolio.ts"
                highlightLines={[2, 3, 4, 5, 6, 7, 8, 9, 10]}
              />
            </MacbookScroll>
          </div>
          
          {/* Subtle indicator for scroll */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-gray-400 animate-bounce">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M19 14l-7 7m0 0l-7-7m7 7V3" 
              />
            </svg>
            <span className="text-sm mt-2">Scroll to explore</span>
          </div>
        </motion.div>
      </div>

      {/* Spacer for extended scroll after animation */}
      <div className="h-screen" />
    </section>
  );
} 