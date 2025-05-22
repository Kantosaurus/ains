'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from "next/image";
import { cn } from "@/lib/utils";
import { 
  IconScale, 
  IconDeviceTv, 
  IconBrandYoutube, 
  IconMapPinFilled,
  IconCat,
  IconHeartbeat,
  IconHistory,
  IconExternalLink
} from '@tabler/icons-react';

// Define new project type with aspect ratio control
interface Project {
  title: string;
  description: string;
  src: string;
  icon: React.ReactNode;
  className?: string;
  priority?: boolean;
}

// Redesigned project list with explicit layout controls
const projects: Project[] = [
  {
    title: "Balance my life",
    description: "Personal finance and life management application",
    src: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2011&q=80",
    icon: <IconScale className="h-5 w-5 text-white/80" />,
    className: "md:col-span-2 md:row-span-2",
    priority: true
  },
  {
    title: "MIRARI",
    description: "Virtual reality experience platform",
    src: "https://images.unsplash.com/photo-1626379953824-12051c1b431f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    icon: <IconDeviceTv className="h-5 w-5 text-white/80" />,
    className: "md:col-span-1 md:row-span-1"
  },
  {
    title: "WANDR",
    description: "Location-based travel companion application",
    src: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    icon: <IconMapPinFilled className="h-5 w-5 text-white/80" />,
    className: "md:col-span-1 md:row-span-2"
  },
  {
    title: "YouTwitFace Algorithms",
    description: "Social media algorithm optimization toolkit",
    src: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
    icon: <IconBrandYoutube className="h-5 w-5 text-white/80" />,
    className: "md:col-span-2 md:row-span-1"
  },
  {
    title: "Catbinet",
    description: "Cat furniture design and visualization app",
    src: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2043&q=80",
    icon: <IconCat className="h-5 w-5 text-white/80" />,
    className: "md:col-span-1 md:row-span-1"
  },
  {
    title: "Healthack 2024",
    description: "Healthcare innovation hackathon project",
    src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    icon: <IconHeartbeat className="h-5 w-5 text-white/80" />,
    className: "md:col-span-1 md:row-span-1"
  },
  {
    title: "Games of Histories",
    description: "Interactive historical education web application",
    src: "https://images.unsplash.com/photo-1608729864927-d2224f5529a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    icon: <IconHistory className="h-5 w-5 text-white/80" />,
    className: "md:col-span-1 md:row-span-1"
  }
];

interface ProjectsSectionProps {
  id?: string;
  onAnimationComplete?: () => void;
}

// Completely redesigned Project Card
const ProjectCard = ({
  project,
  index,
  hovered,
  setHovered,
}: {
  project: Project;
  index: number;
  hovered: number | null;
  setHovered: React.Dispatch<React.SetStateAction<number | null>>;
}) => {
  return (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        "relative overflow-hidden rounded-xl group",
        project.className,
        "transition-all duration-500 ease-out"
      )}
    >
      {/* Full-sized image background with enhanced effects */}
      <div className="absolute inset-0 w-full h-full">
        <Image
          src={project.src}
          alt={project.title}
          fill
          priority={project.priority}
          className={cn(
            "object-cover transition-transform duration-700",
            hovered === index ? "scale-110" : "scale-100"
          )}
        />
        
        {/* Stylized gradient overlay */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-b from-black/0 via-black/20 to-black/90",
            "transition-opacity duration-500",
            hovered === index ? "opacity-90" : "opacity-75"
          )}
        />
      </div>
      
      {/* Content container */}
      <div className="relative h-full flex flex-col justify-end p-6 z-10">
        <div className="flex items-center space-x-2 mb-2">
          <div className={cn(
            "p-2 rounded-full bg-black/30 backdrop-blur-md",
            "transform transition-all duration-500",
            hovered === index ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          )}>
            {project.icon}
          </div>
          <h3 className={cn(
            "text-xl md:text-2xl font-bold text-white",
            "transform transition-all duration-300",
            hovered === index ? "translate-y-0" : "translate-y-2"
          )}>
            {project.title}
          </h3>
        </div>
        
        <p className={cn(
          "text-sm text-white/80 transition-all duration-500 max-w-md",
          hovered === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        )}>
          {project.description}
        </p>
        
        {/* View project button that appears on hover */}
        <div className={cn(
          "mt-4 flex items-center text-sm font-medium text-white/90 gap-1",
          "transition-all duration-700",
          hovered === index ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        )}>
          <span>View project</span>
          <IconExternalLink className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
};

const ProjectsSection = ({ id, onAnimationComplete }: ProjectsSectionProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id={id} className="relative w-full bg-white py-20 dark:bg-neutral-900">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="mb-4 text-3xl font-bold text-neutral-800 dark:text-neutral-200 sm:text-4xl">
            My Projects
          </h2>
          <p className="mx-auto mb-12 max-w-2xl text-neutral-600 dark:text-neutral-400">
            Here are some of the projects I&apos;ve worked on. Each one has taught me something new
            and helped me grow as a developer.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          onAnimationComplete={onAnimationComplete}
          className="mx-auto"
        >
          {/* New bento grid with specified layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:h-[800px]">
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                hovered={hovered}
                setHovered={setHovered}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection; 