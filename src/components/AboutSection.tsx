'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FlipWords } from './ui/flip-words';

interface AboutSectionProps {
  id?: string;
}

const AboutSection = ({ id }: AboutSectionProps) => {
  const roles = ["SUTDent", "Athlete", "Coder", "Chess Player", "Designer", "Leader"];

  return (
    <section id={id} className="relative min-h-fit w-full overflow-hidden bg-gradient-to-b from-white to-neutral-50 dark:from-neutral-950 dark:to-neutral-900">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
      
      <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <div className="flex flex-col items-center justify-center gap-4">
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
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="mt-8 max-w-2xl text-lg text-neutral-600 dark:text-neutral-400"
            >
              A passionate individual who thrives on challenges and continuous learning. 
              Whether it's coding, sports, or strategic games, I bring dedication and creativity 
              to everything I do. My journey is defined by growth, innovation, and the pursuit of excellence.
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection; 