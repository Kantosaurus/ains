'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiDownload, FiX } from 'react-icons/fi';

interface ResumeSectionProps {
  onAnimationComplete?: () => void;
}

const ResumeSection = ({ onAnimationComplete }: ResumeSectionProps) => {
  const [showPopup, setShowPopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    company: ''
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Call our API to process the document and create a zip file
      const response = await fetch('/api/generate-documents', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || 'Failed to generate documents');
      }
      
      // Get the blob from the response
      const blob = await response.blob();
      
      // Create a URL for the blob
      const url = window.URL.createObjectURL(blob);
      
      // Sanitize file name for download
      const sanitizedName = formData.name.replace(/[^a-zA-Z0-9]/g, '_');
      const sanitizedCompany = formData.company.replace(/[^a-zA-Z0-9]/g, '_');
      const fileName = `${sanitizedName}_${sanitizedCompany}_Documents.zip`;
      
      // Create a temporary anchor element to trigger the download
      const a = document.createElement('a');
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      
      // Clean up
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      // Close the popup
      setShowPopup(false);
    } catch (error) {
      console.error('Error downloading documents:', error);
      setError(error instanceof Error ? error.message : 'Failed to generate documents. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
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
            Download my resume and cover letter package customized for your application.
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
                Application Package
              </h3>
              <button
                onClick={() => setShowPopup(true)}
                className="flex items-center gap-2 rounded-lg bg-neutral-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700 dark:bg-neutral-700 dark:hover:bg-neutral-600"
              >
                <FiDownload size={16} />
                Download Package
              </button>
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
      
      {/* Download Resume Popup */}
      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="relative mx-4 max-w-md rounded-xl bg-white p-6 shadow-xl dark:bg-neutral-800"
          >
            <button 
              onClick={() => !isLoading && setShowPopup(false)}
              disabled={isLoading}
              className="absolute right-4 top-4 text-neutral-500 hover:text-neutral-700 dark:text-neutral-400 dark:hover:text-neutral-200 disabled:opacity-50"
            >
              <FiX size={20} />
            </button>
            
            <h3 className="mb-4 text-xl font-semibold text-neutral-800 dark:text-neutral-200">
              Download Application Package
            </h3>
            
            <p className="mb-6 text-neutral-600 dark:text-neutral-400">
              Please provide your information to personalize your cover letter and resume package.
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Your Name
                </label>
                <input 
                  type="text" 
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  required
                  className="mt-1 block w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-neutral-800 shadow-sm focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:placeholder-neutral-400 disabled:opacity-70"
                  placeholder="Enter your name"
                />
              </div>
              
              <div>
                <label htmlFor="company" className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
                  Company Name
                </label>
                <input 
                  type="text" 
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  disabled={isLoading}
                  required
                  className="mt-1 block w-full rounded-md border border-neutral-300 bg-white px-3 py-2 text-neutral-800 shadow-sm focus:border-neutral-500 focus:outline-none focus:ring-1 focus:ring-neutral-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200 dark:placeholder-neutral-400 disabled:opacity-70"
                  placeholder="Enter company name"
                />
              </div>
              
              {error && (
                <div className="rounded-md bg-red-50 p-3 dark:bg-red-900/20">
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
              )}
              
              <div className="pt-2">
                <button 
                  type="submit"
                  disabled={isLoading}
                  className="w-full rounded-lg bg-neutral-800 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700 dark:bg-neutral-700 dark:hover:bg-neutral-600 disabled:opacity-50"
                >
                  <div className="flex items-center justify-center gap-2">
                    {isLoading ? (
                      <>
                        <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        <FiDownload size={16} />
                        Download Package
                      </>
                    )}
                  </div>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </section>
  );
};

export default ResumeSection; 