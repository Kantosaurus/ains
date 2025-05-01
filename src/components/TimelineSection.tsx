'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Timeline } from './ui/timeline';

interface TimelineSectionProps {
  id?: string;
}

const TimelineSection = ({ id }: TimelineSectionProps) => {
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
    <section id={id} className="relative w-full overflow-hidden bg-gradient-to-b from-neutral-50 to-white dark:from-neutral-900 dark:to-neutral-950">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="relative"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-pink-500/10 to-rose-500/10 blur-3xl" />
        <div className="relative">
          <Timeline data={timelineData} />
        </div>
      </motion.div>
    </section>
  );
};

export default TimelineSection; 