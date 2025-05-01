'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiLinkedin, FiMail, FiTwitter } from 'react-icons/fi';

const socialLinks = [
  {
    name: 'GitHub',
    url: 'https://github.com/yourusername',
    icon: <FiGithub size={24} />,
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/yourusername',
    icon: <FiLinkedin size={24} />,
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/yourusername',
    icon: <FiTwitter size={24} />,
  },
  {
    name: 'Email',
    url: 'mailto:your.email@example.com',
    icon: <FiMail size={24} />,
  },
];

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted:', formData);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className="relative w-full bg-white py-20 dark:bg-neutral-900">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-neutral-800 dark:text-neutral-200 sm:text-4xl">
            Get in Touch
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-neutral-600 dark:text-neutral-400">
            Have a question or want to work together? Feel free to reach out!
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="rounded-xl bg-neutral-50 p-8 dark:bg-neutral-800/50"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-neutral-800 dark:text-neutral-200"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-neutral-800 transition-colors focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-neutral-800 dark:text-neutral-200"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-neutral-800 transition-colors focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-neutral-800 dark:text-neutral-200"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full rounded-lg border border-neutral-200 bg-white px-4 py-2.5 text-neutral-800 transition-colors focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-200"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-lg bg-neutral-800 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-neutral-700 dark:bg-neutral-700 dark:hover:bg-neutral-600"
              >
                Send Message
              </button>
            </form>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="rounded-xl bg-neutral-50 p-8 dark:bg-neutral-800/50">
              <h3 className="mb-6 text-xl font-semibold text-neutral-800 dark:text-neutral-200">
                Connect with Me
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                {socialLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-lg p-4 transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-700/50"
                  >
                    <span className="text-neutral-700 dark:text-neutral-300">
                      {link.icon}
                    </span>
                    <span className="text-sm font-medium text-neutral-800 dark:text-neutral-200">
                      {link.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-neutral-50 p-8 dark:bg-neutral-800/50">
              <h3 className="mb-4 text-xl font-semibold text-neutral-800 dark:text-neutral-200">
                Location
              </h3>
              <p className="text-neutral-600 dark:text-neutral-400">
                Singapore
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection; 