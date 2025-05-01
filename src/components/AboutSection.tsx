'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FlipWords } from './ui/flip-words';
import { Timeline } from './ui/timeline';

const AboutSection = () => {
  const roles = ["SUTDent", "Athlete", "Coder", "Chess Player", "Designer"];

  const timelineData = [
    {
      title: "2024",
      content: (
        <div>
          <p className="text-sm font-light text-neutral-600 dark:text-neutral-300">
            Started my journey in web development and design
          </p>
        </div>
      ),
    },
    {
      title: "2023",
      content: (
        <div>
          <p className="text-sm font-light text-neutral-600 dark:text-neutral-300">
            Participated in various coding competitions and hackathons
          </p>
        </div>
      ),
    },
    {
      title: "2022",
      content: (
        <div>
          <p className="text-sm font-light text-neutral-600 dark:text-neutral-300">
            Began learning programming and web development
          </p>
        </div>
      ),
    },
  ];

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
      
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-32 text-center"
        >
          <div className="flex items-center justify-center gap-4">
            <h2 className="text-4xl font-light tracking-tight text-neutral-800 dark:text-neutral-200 sm:text-5xl md:text-6xl">
              I am a
            </h2>
            <div className="text-4xl font-bold sm:text-5xl md:text-6xl">
              <FlipWords 
                words={roles} 
                duration={2000} 
                className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-transparent bg-clip-text"
              />
            </div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-rose-500/10 blur-3xl" />
          <div className="relative">
            <Timeline data={timelineData} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection; 