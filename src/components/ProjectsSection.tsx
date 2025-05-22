'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from "next/image";
import { BentoGrid, BentoGridItem } from './ui/bento-grid';
import { cn } from "@/lib/utils";
import { 
  IconScale, 
  IconDeviceTv, 
  IconBrandYoutube, 
  IconMapPinFilled,
  IconCat,
  IconHeartbeat,
  IconHistory 
} from '@tabler/icons-react';

// Define project type
interface Project {
  title: string;
  description: string;
  src: string;
  icon: React.ReactNode;
  span?: boolean;  // Whether it should span 2 columns
  rowSpan?: boolean; // Whether it should span 2 rows
}

// New project list
const projects: Project[] = [
  {
    title: "Balance my life",
    description: "Personal finance and life management application",
    src: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2011&q=80",
    icon: <IconScale className="h-5 w-5 text-neutral-500" />,
    span: true,
    rowSpan: true,
  },
  {
    title: "MIRARI",
    description: "Virtual reality experience platform",
    src: "https://images.unsplash.com/photo-1626379953824-12051c1b431f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    icon: <IconDeviceTv className="h-5 w-5 text-neutral-500" />,
  },
  {
    title: "YouTwitFace Algorithms",
    description: "Social media algorithm optimization toolkit",
    src: "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
    icon: <IconBrandYoutube className="h-5 w-5 text-neutral-500" />,
    span: true,
  },
  {
    title: "WANDR",
    description: "Location-based travel companion application",
    src: "https://images.unsplash.com/photo-1503220317375-aaad61436b1b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    icon: <IconMapPinFilled className="h-5 w-5 text-neutral-500" />,
    rowSpan: true,
  },
  {
    title: "Catbinet",
    description: "Cat furniture design and visualization app",
    src: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2043&q=80",
    icon: <IconCat className="h-5 w-5 text-neutral-500" />,
  },
  {
    title: "Healthack 2024",
    description: "Healthcare innovation hackathon project",
    src: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    icon: <IconHeartbeat className="h-5 w-5 text-neutral-500" />,
    span: true,
  },
  {
    title: "Games of Histories",
    description: "Interactive historical education web application",
    src: "https://images.unsplash.com/photo-1608729864927-d2224f5529a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    icon: <IconHistory className="h-5 w-5 text-neutral-500" />,
  },
];

interface ProjectsSectionProps {
  id?: string;
  onAnimationComplete?: () => void;
}

// Project Card component with hover effect
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
        hovered !== null && hovered !== index && "blur-sm scale-[0.98]",
        "transition-all duration-300 ease-out h-full"
      )}
    >
      <BentoGridItem
        title={project.title}
        description={project.description}
        icon={project.icon}
        className={cn(
          project.span ? "md:col-span-2" : "",
          project.rowSpan ? "md:row-span-2" : ""
        )}
        header={
          <div className={cn(
            "relative w-full overflow-hidden rounded-lg",
            project.rowSpan ? "h-52" : "h-32"
          )}>
            <Image
              src={project.src}
              alt={project.title}
              fill
              className={cn(
                "object-cover transition-all duration-300",
                hovered === index ? "scale-105" : "scale-100"
              )}
            />
            <div
              className={cn(
                "absolute inset-0 bg-black/30 transition-opacity duration-300",
                hovered === index ? "opacity-0" : "opacity-50"
              )}
            />
          </div>
        }
      />
    </div>
  );
};

const ProjectsSection = ({ id, onAnimationComplete }: ProjectsSectionProps) => {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id={id} className="relative w-full bg-white py-20 dark:bg-neutral-900">
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
        >
          <BentoGrid>
            {projects.map((project, index) => (
              <ProjectCard
                key={project.title}
                project={project}
                index={index}
                hovered={hovered}
                setHovered={setHovered}
              />
            ))}
          </BentoGrid>
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection; 