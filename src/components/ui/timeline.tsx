"use client";
import {
  useScroll,
  useTransform,
  motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { FlipWords } from "./flip-words";
import { MaskContainer } from "./svg-mask-effect";
import { HeroHighlight } from "./hero-highlight";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  const headerWords = [
    "SUTDent",
    "Athlete",
    "Coder",
    "Chess Player",
    "Designer",
    "Leader"
  ];

  useEffect(() => {
    if (!ref.current) return;
    const node = ref.current;
    const updateHeight = () => {
      setHeight(node.getBoundingClientRect().height);
    };
    updateHeight(); // Initial set
    const resizeObserver = new window.ResizeObserver(() => {
      updateHeight();
    });
    resizeObserver.observe(node);
    return () => {
      resizeObserver.disconnect();
    };
  }, [data]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-white dark:bg-neutral-950 font-sans md:px-10"
      ref={containerRef}
    >
      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
        <div className="flex flex-col items-start justify-start gap-4">
          <h1 className="text-3xl font-bold text-neutral-900 dark:text-neutral-100 w-full">
            Hello World! My name is
            <div className="relative h-[150px] sm:h-[200px] md:h-[250px]">
              <MaskContainer
                revealText={
                  <span
                    className="font-extrabold text-neutral-900 dark:text-neutral-100"
                    style={{
                      fontSize: 'clamp(1rem, 40vw, 18rem)',
                      lineHeight: 1.1,
                      letterSpacing: '-0.05em',
                    }}
                  >
                    AINSLEY
                  </span>
                }
                className="h-full w-full rounded-md"
              >
                <span className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-transparent bg-clip-text font-extrabold"
                  style={{
                    fontSize: 'clamp(1rem, 40vw, 18rem)',
                    lineHeight: 1.1,
                    letterSpacing: '-0.05em',
                  }}
                >
                  AINSLEY
                </span>
              </MaskContainer>
            </div>
          </h1>
          <div className="flex items-center gap-2">
            <h2 className="text-4xl font-light tracking-tight text-neutral-800 dark:text-neutral-200 sm:text-5xl md:text-6xl">
              I am a
            </h2>
            <div className="text-4xl font-bold sm:text-5xl md:text-6xl">
              <FlipWords 
                words={headerWords} 
                duration={2000} 
                className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 text-transparent bg-clip-text"
              />
            </div>
          </div>
          <p className="text-neutral-700 dark:text-neutral-300 text-sm md:text-base max-w-2xl">
            A passionate individual who thrives on challenges and continuous learning. 
            Whether it&apos;s coding, sports, or strategic games, I bring dedication and creativity 
            to everything I do. My journey is defined by growth, innovation, and the pursuit of excellence.
          </p>
        </div>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-10 md:pt-40 md:gap-10"
          >
            <div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-5xl font-bold text-neutral-500 dark:text-neutral-500 ">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500">
                {item.title}
              </h3>
              {item.content}{" "}
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
          />
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
            Major:
          </h2>
          <div className="relative h-[100px] sm:h-[120px] md:h-[150px]">
            <HeroHighlight containerClassName="h-full">
              <span
                className="font-extrabold text-neutral-900 dark:text-neutral-100"
                style={{
                  fontSize: 'clamp(1rem, 20vw, 9rem)',
                  lineHeight: 1.1,
                  letterSpacing: '-0.05em',
                }}
              >
                CYBERSECURITY
              </span>
            </HeroHighlight>
          </div>

          <div className="flex justify-end items-center mt-4">
            <HeroHighlight containerClassName="py-2 px-4">
              <span className="text-2xl font-bold text-neutral-900 dark:text-neutral-100">
                Minor in AI
              </span>
            </HeroHighlight>
          </div>
        </div>
      </div>
    </div>
  );
}; 