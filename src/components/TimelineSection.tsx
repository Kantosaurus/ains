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
      title: "2021",
      content: (
        <div>
          <p className="text-sm font-light text-neutral-600 dark:text-neutral-300">
            🎓 Graduated from Dunman High School
          </p>
        </div>
      ),
    },
    {
      title: "2022",
      content: (
        <div className="space-y-2">
          <p className="text-sm font-light text-neutral-600 dark:text-neutral-300">
            💻 Started learning Python during National Service
          </p>
          <p className="text-sm font-light text-neutral-600 dark:text-neutral-300">
            🔒 Enlisted as a Military Policeman — trained in threat assessment, protocol adherence, and information security
          </p>
        </div>
      ),
    },
    {
      title: "2023",
      content: (
        <div className="space-y-2">
          <p className="text-sm font-light text-neutral-600 dark:text-neutral-300">
            🏫 Matriculated into Singapore University of Technology and Design (SUTD)
          </p>
          <p className="text-sm font-light text-neutral-600 dark:text-neutral-300">
            🧠 Self-studied advanced topics and participated in CTFs and cybersecurity-related challenges
          </p>
        </div>
      ),
    },
    {
      title: "2024",
      content: (
        <div className="space-y-2">
          <p className="text-sm font-light text-neutral-600 dark:text-neutral-300">
            👑 Became President of SUTD Chess Club and Ultimate Frisbee Club
          </p>
          <p className="text-sm font-light text-neutral-600 dark:text-neutral-300">
            💼 Started working on projects such as the Games of Histories Web App and Wandr Android App (with Singtel)
          </p>
          <p className="text-sm font-light text-neutral-600 dark:text-neutral-300">
            📚 Appointed as Class Cohort Advisor and Tutor Assistant
          </p>
        </div>
      ),
    },
    {
      title: "2025",
      content: (
        <div className="space-y-2">
          <p className="text-sm font-light text-neutral-600 dark:text-neutral-300">
            🏉 Appointed Sports Representative
          </p>
          <p className="text-sm font-light text-neutral-600 dark:text-neutral-300">
            🔐 Continued specialization in Cybersecurity
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