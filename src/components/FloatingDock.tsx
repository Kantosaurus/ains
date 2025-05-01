'use client';

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring, MotionValue } from 'framer-motion';
import { cn } from '@/lib/utils';

interface DockItem {
  name: string;
  icon: React.ReactNode;
  href: string;
}

interface FloatingDockProps {
  items: DockItem[];
  className?: string;
}

const IconContainer = ({ 
  mouseX, 
  item 
}: { 
  mouseX: MotionValue<number>;
  item: DockItem;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const scale = useTransform(distance, [-150, 0, 150], [1, 2, 1]);
  const height = useSpring(scale, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <div
      ref={ref}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative w-12 h-12"
    >
      <motion.a
        href={item.href}
        style={{ scale: height }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-xl bg-gray-700/50 hover:bg-gray-600/50 transition-colors origin-center"
      >
        <div className="w-6 h-6 flex items-center justify-center">
          {item.icon}
        </div>
      </motion.a>
      
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 bg-gray-900 text-white text-sm rounded-md whitespace-nowrap shadow-lg"
          >
            {item.name}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FloatingDock: React.FC<FloatingDockProps> = ({ items, className }) => {
  const mouseX = useMotionValue(Infinity);

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      onMouseMove={(e) => mouseX.set(e.pageX)}
      onMouseLeave={() => mouseX.set(Infinity)}
      className={cn(
        'fixed bottom-8 left-1/2 -translate-x-1/2 z-50',
        'bg-gray-800/90 backdrop-blur-lg rounded-2xl shadow-lg',
        'border border-gray-700/50',
        'px-4 py-2',
        className
      )}
    >
      <div className="flex items-center gap-2">
        {items.map((item) => (
          <IconContainer
            key={item.name}
            mouseX={mouseX}
            item={item}
          />
        ))}
      </div>
    </motion.div>
  );
};

export default FloatingDock; 