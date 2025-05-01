"use client";
import React, { useState, useEffect } from "react";
import MacbookScroll from "./macbook-scroll";
import { CodeBlock } from "./code-block";
import dynamic from 'next/dynamic';

const codeContent = `// Welcome to my portfolio!
import { Person } from '@/types';

const me: Person = {
  name: 'Your Name',
  role: 'Full Stack Developer',
  location: 'Singapore',
  interests: [
    'Web Development',
    'UI/UX Design',
    'Machine Learning',
    'Chess'
  ],
  skills: {
    languages: ['TypeScript', 'Python', 'Java'],
    frontend: ['React', 'Next.js', 'TailwindCSS'],
    backend: ['Node.js', 'Express', 'PostgreSQL'],
    tools: ['Git', 'Docker', 'AWS']
  }
};

// Let's connect and build something amazing together!
`;

// Disable SSR for this component
const MacbookScrollDemo = dynamic(() => Promise.resolve(({ onComplete }: { onComplete?: () => void }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    // Set animation complete after typing animation finishes
    const animationTimer = setTimeout(() => {
      // Wait 1 second after animation completes before scrolling
      const scrollTimer = setTimeout(() => {
        // Scroll to about section after animation completes
        const aboutSection = document.getElementById('about-section');
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        // Call onComplete callback
        if (onComplete) {
          onComplete();
        }
      }, 1000);

      return () => clearTimeout(scrollTimer);
    }, codeContent.length * 20); // Faster typing animation

    return () => clearTimeout(animationTimer);
  }, [onComplete]);

  if (!mounted) {
    return null;
  }

  return (
    <div className="overflow-hidden bg-transparent w-full">
      <div className="opacity-100">
        <MacbookScroll
          showGradient={false}
        >
          <CodeBlock
            code={codeContent}
            language="typescript"
            filename="portfolio.ts"
            highlightLines={[4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]}
          />
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