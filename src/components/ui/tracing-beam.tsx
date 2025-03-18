"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  motion,
  useTransform,
  useScroll,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";

export const TracingBeam = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentRef = useRef<HTMLDivElement>(null);
  const [svgHeight, setSvgHeight] = useState(0);
  const [beamWidth, setBeamWidth] = useState(20); // Dynamic width for responsiveness

  useEffect(() => {
    const updateDimensions = () => {
      if (contentRef.current) {
        setSvgHeight(contentRef.current.offsetHeight);
        const screenWidth = window.innerWidth;
        setBeamWidth(screenWidth < 640 ? 15 : 20); // Smaller width on mobile
      }
    };
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const y1 = useSpring(useTransform(scrollYProgress, [0, 0.8], [50, svgHeight]), {
    stiffness: 500,
    damping: 90,
  });
  const y2 = useSpring(useTransform(scrollYProgress, [0, 1], [50, svgHeight - 200]), {
    stiffness: 500,
    damping: 90,
  });

  return (
    <motion.div
      ref={ref}
      className={cn(
        "relative mx-auto h-full w-full max-w-4xl px-4 sm:px-6",
        className
      )}
    >
      <div className="absolute top-3 left-0 sm:-left-2 md:-left-4 lg:-left-6 xl:-left-8">
        <motion.div
          transition={{ duration: 0.2, delay: 0.5 }}
          animate={{
            boxShadow:
              scrollYProgress.get() > 0
                ? "none"
                : "rgba(0, 0, 0, 0.24) 0px 3px 8px",
          }}
          className="border-neutral-200 flex h-4 w-4 items-center justify-center rounded-full border shadow-sm sm:ml-4 md:ml-6"
          style={{ zIndex: 20 }} // Ensure dot is above content
        >
          <motion.div
            transition={{ duration: 0.2, delay: 0.5 }}
            animate={{
              backgroundColor: scrollYProgress.get() > 0 ? "white" : "#10b981",
              borderColor: scrollYProgress.get() > 0 ? "white" : "#059669",
            }}
            className="h-2 w-2 rounded-full border border-neutral-300 bg-white"
          />
        </motion.div>
        <svg
          viewBox={`0 0 ${beamWidth} ${svgHeight}`}
          width={beamWidth}
          height={svgHeight}
          className="block sm:ml-4 md:ml-6"
          aria-hidden="true"
          style={{ zIndex: 10 }} // Ensure SVG is above background but below content
        >
          <motion.path
            d={`M 1 0V -36 l ${beamWidth - 2} 24 V ${svgHeight * 0.8} l -${beamWidth - 2} 24V ${svgHeight}`}
            fill="none"
            stroke="#9091A0"
            strokeOpacity="0.16"
            transition={{ duration: 10 }}
          />
          <motion.path
            d={`M 1 0V -36 l ${beamWidth - 2} 24 V ${svgHeight * 0.8} l -${beamWidth - 2} 24V ${svgHeight}`}
            fill="none"
            stroke="url(#gradient)"
            strokeWidth="1.25"
            className="motion-reduce:hidden"
            transition={{ duration: 10 }}
          />
          <defs>
            <motion.linearGradient
              id="gradient"
              gradientUnits="userSpaceOnUse"
              x1="0"
              x2="0"
              y1={y1}
              y2={y2}
            >
              <stop stopColor="#18CCFC" stopOpacity="0" />
              <stop stopColor="#18CCFC" />
              <stop offset="0.325" stopColor="#6344F5" />
              <stop offset="1" stopColor="#AE48FF" stopOpacity="0" />
            </motion.linearGradient>
          </defs>
        </svg>
      </div>
      <div
        ref={contentRef}
        className="relative z-30 ml-8 sm:ml-12 md:ml-16" // Added margin to make space for beam
      >
        {children}
      </div>
    </motion.div>
  );
};