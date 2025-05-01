'use client';

import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
        className="text-center mb-20"
      >
        <h2 id="about-section" className="text-4xl md:text-5xl font-bold mb-6">About Me</h2>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto">
          I'm a passionate developer who loves creating beautiful and functional web applications.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="bg-gray-800 rounded-xl p-6"
        >
          <h3 className="text-2xl font-bold mb-4">Skills</h3>
          <ul className="space-y-2 text-gray-300">
            <li>Frontend Development</li>
            <li>Backend Development</li>
            <li>UI/UX Design</li>
            <li>Problem Solving</li>
          </ul>
        </motion.div>

        {/* Experience Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="bg-gray-800 rounded-xl p-6"
        >
          <h3 className="text-2xl font-bold mb-4">Experience</h3>
          <div className="space-y-4 text-gray-300">
            <div>
              <h4 className="font-semibold">Senior Developer</h4>
              <p className="text-sm text-gray-400">2020 - Present</p>
            </div>
            <div>
              <h4 className="font-semibold">Full Stack Developer</h4>
              <p className="text-sm text-gray-400">2018 - 2020</p>
            </div>
          </div>
        </motion.div>

        {/* Projects Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="bg-gray-800 rounded-xl p-6"
        >
          <h3 className="text-2xl font-bold mb-4">Projects</h3>
          <div className="space-y-4 text-gray-300">
            <div>
              <h4 className="font-semibold">Portfolio Website</h4>
              <p className="text-sm text-gray-400">Next.js, TypeScript, Tailwind CSS</p>
            </div>
            <div>
              <h4 className="font-semibold">E-commerce Platform</h4>
              <p className="text-sm text-gray-400">React, Node.js, MongoDB</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Contact Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.8 }}
        viewport={{ once: true }}
        className="text-center mt-20"
      >
        <h2 className="text-4xl font-bold mb-6">Get In Touch</h2>
        <p className="text-xl text-gray-300 mb-8">
          Interested in working together? Let's connect!
        </p>
        <a
          href="mailto:your.email@example.com"
          className="inline-block bg-gradient-to-r from-purple-400 to-pink-600 text-white px-8 py-3 rounded-full text-lg font-medium hover:opacity-90 transition-opacity"
        >
          Contact Me
        </a>
      </motion.div>
    </div>
  );
};

export default AboutSection; 