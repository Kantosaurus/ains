import React from 'react';
import HeroSection from '../components/HeroSection';
import TimelineSection from '../components/TimelineSection';
import ProjectsSection from '../components/ProjectsSection';
import ResumeSection from '../components/ResumeSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection id="hero" />
      <TimelineSection id="timeline" />
      <ProjectsSection id="projects" />
      <ResumeSection />
      <ContactSection id="contact" />
      <Footer />
    </main>
  );
}
