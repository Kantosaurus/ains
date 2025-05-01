'use client';

import { useState, useEffect } from 'react';
import MacbookScrollDemo from '@/components/ui/macbook-scroll-demo';
import AboutSection from '@/components/AboutSection';
import { motion, AnimatePresence } from 'framer-motion';

export default function MainContent() {
  const [mounted, setMounted] = useState(false);
  const [isDemoComplete, setIsDemoComplete] = useState(false);

  // Handle hydration mismatch by only rendering after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <main className="relative w-full">
        <section className="min-h-screen w-full overflow-x-hidden relative">
          <div className="w-full bg-transparent">
            <h1 className="w-screen text-center text-7xl sm:text-8xl md:text-9xl lg:text-[150px] xl:text-[200px] font-bold pb-0 pt-20 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text z-10 relative">
              This is my
              <br />
              Website
            </h1>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="relative w-full">
      {/* Hero Section */}
      <section className="min-h-screen w-full overflow-x-hidden relative">
        <div className="w-full bg-transparent">
          <h1 className="w-screen text-center text-7xl sm:text-8xl md:text-9xl lg:text-[150px] xl:text-[200px] font-bold pb-0 pt-20 bg-gradient-to-r from-purple-400 to-pink-600 text-transparent bg-clip-text z-10 relative">
            This is my
            <br />
            Website
          </h1>
          <div className="relative -mt-20">
            <MacbookScrollDemo onComplete={() => setIsDemoComplete(true)} />
          </div>
        </div>
      </section>

      {/* Content Section */}
      <AnimatePresence mode="wait">
        {isDemoComplete && mounted && (
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="min-h-screen w-full bg-gradient-to-b from-black to-gray-900 text-white py-20"
          >
            <AboutSection />
          </motion.section>
        )}
      </AnimatePresence>
    </main>
  );
} 