'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FiDownload } from 'react-icons/fi';

interface ResumeSectionProps {
  onAnimationComplete?: () => void;
}

const ResumeSection = ({ onAnimationComplete }: ResumeSectionProps) => {
  return (
    <section className="relative w-full bg-neutral-50 py-20 dark:bg-neutral-900/50">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          onAnimationComplete={onAnimationComplete}
          className="text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-neutral-800 dark:text-neutral-200 sm:text-4xl">
            My Resume
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-neutral-600 dark:text-neutral-400">
            Download my resume to learn more about my experience and qualifications.
          </p>
        </motion.div>

        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-8 rounded-xl bg-white p-8 shadow-lg dark:bg-neutral-800"
          >
            <div className="mb-6 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">
                Full Resume
              </h3>
              <a
                href="/path-to-your-resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-neutral-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700 dark:bg-neutral-700 dark:hover:bg-neutral-600"
              >
                <FiDownload size={16} />
                Download PDF
              </a>
            </div>

            <div className="space-y-8">
              {/* Education Section */}
              <div>
                <h4 className="mb-4 text-lg font-semibold text-neutral-800 dark:text-neutral-200">
                  Education
                </h4>
                <div className="space-y-4">
                  <div>
                    <h5 className="font-medium text-neutral-800 dark:text-neutral-200">
                      Singapore University of Technology and Design
                    </h5>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Bachelor of Engineering • 2022 - Present
                    </p>
                  </div>
                </div>
              </div>

              {/* Skills Section */}
              <div>
                <h4 className="mb-4 text-lg font-semibold text-neutral-800 dark:text-neutral-200">
                  Technical Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {[
                    "JavaScript",
                    "TypeScript",
                    "React",
                    "Next.js",
                    "Node.js",
                    "Python",
                    "TailwindCSS",
                    "Git",
                    // Add more skills
                  ].map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full bg-neutral-100 px-3 py-1 text-sm text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Certifications Section */}
              <div>
                <h4 className="mb-4 text-lg font-semibold text-neutral-800 dark:text-neutral-200">
                  Certifications
                </h4>
                <div className="space-y-2">
                  <div>
                    <h5 className="font-medium text-neutral-800 dark:text-neutral-200">
                      Web Development Bootcamp
                    </h5>
                    <p className="text-sm text-neutral-600 dark:text-neutral-400">
                      Udemy • 2023
                    </p>
                  </div>
                  {/* Add more certifications */}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ResumeSection; 