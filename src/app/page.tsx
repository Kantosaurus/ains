import React from 'react';
import HeroSection from '../components/HeroSection';
import TimelineSection from '../components/TimelineSection';
import ProjectsSection from '../components/ProjectsSection';
import ResumeSection from '../components/ResumeSection';
import ContactSection from '../components/ContactSection';
import Footer from '../components/Footer';
import FloatingDock from '@/components/FloatingDock';
import { IconHome, IconUser, IconBriefcase, IconMail } from '@tabler/icons-react';

export default function Home() {
  const dockItems = [
    {
      name: 'Home',
      icon: <IconHome className="w-6 h-6 text-white" strokeWidth={1.5} />,
      href: '#hero'
    },
    {
      name: 'Timeline',
      icon: <IconUser className="w-6 h-6 text-white" strokeWidth={1.5} />,
      href: '#timeline'
    },
    {
      name: 'Projects',
      icon: <IconBriefcase className="w-6 h-6 text-white" strokeWidth={1.5} />,
      href: '#projects'
    },
    {
      name: 'Contact',
      icon: <IconMail className="w-6 h-6 text-white" strokeWidth={1.5} />,
      href: '#contact'
    }
  ];

  return (
    <main className="flex min-h-screen flex-col">
      <HeroSection id="hero" />
      <TimelineSection id="timeline" />
      <ProjectsSection id="projects" />
      <ResumeSection />
      <ContactSection id="contact" />
      <Footer />
      <FloatingDock items={dockItems} />
    </main>
  );
}
