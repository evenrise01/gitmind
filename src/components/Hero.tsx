"use client";

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { HeroHeader } from "@/components/hero-header";
import { InfiniteSlider } from "@/components/motion-primitives/infinite-slider";
import { ProgressiveBlur } from "@/components/motion-primitives/progressive-blur";

// Animation variants
const textVariants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const buttonVariants = {
  initial: { scale: 1, opacity: 0 },
  animate: {
    scale: 1,
    opacity: 1,
    transition: { duration: 0.5, delay: 0.3 },
  },
  hover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },
  tap: { scale: 0.95 },
};

// Git commit animation variants
const gitNodeVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: (custom) => ({
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.6,
      delay: custom * 0.15,
      ease: "easeOut",
    },
  }),
};

const gitLineVariants = {
  initial: { pathLength: 0, opacity: 0 },
  animate: (custom) => ({
    pathLength: 1,
    opacity: 0.6,
    transition: {
      duration: 0.8,
      delay: custom * 0.15,
      ease: "easeInOut",
    },
  }),
};

// Code knowledge animation variants
const codeLineVariants = {
  initial: { width: 0, opacity: 0 },
  animate: (custom) => ({
    width: "100%",
    opacity: 0.7,
    transition: {
      duration: 0.8,
      delay: 0.5 + custom * 0.1,
      ease: "easeInOut",
    },
  }),
};

// Meeting summary animation variants
const meetingNoteVariants = {
  initial: { scaleX: 0, opacity: 0, originX: 0 },
  animate: (custom) => ({
    scaleX: 1,
    opacity: 0.5,
    transition: {
      duration: 0.7,
      delay: 0.2 + custom * 0.15,
      ease: "easeOut",
    },
  }),
};

// AI pulse animation variants
const aiPulseVariants = {
  initial: { scale: 0.8, opacity: 0 },
  animate: {
    scale: [0.8, 1.2, 0.8],
    opacity: [0, 0.5, 0],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const aiConnectionVariants = {
  initial: { pathLength: 0, opacity: 0 },
  animate: (custom) => ({
    pathLength: 1,
    opacity: 0.4,
    transition: {
      duration: 1.5,
      delay: custom * 0.2,
      ease: "easeInOut",
    },
  }),
};

export default function HeroSection() {
  return (
    <>
      <HeroHeader />
      <main className="overflow-x-hidden">
        <section>
          <div className="relative py-16 md:pb-24 lg:pb-32 lg:pt-64">
            <div className="relative mx-auto mt-4 flex max-w-7xl flex-col px-6 lg:mt-8 lg:block lg:px-12">
              <motion.div
                className="mx-auto max-w-lg text-center lg:ml-0 lg:max-w-full lg:text-left"
                initial="initial"
                animate="animate"
                variants={{
                  animate: { transition: { staggerChildren: 0.2 } },
                }}
              >
                <motion.h1
                  variants={textVariants}
                  className="mt-6 max-w-2xl text-balance bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-4xl font-bold text-transparent dark:from-white dark:to-gray-300 md:text-5xl lg:mt-12 xl:text-7xl"
                >
                  Supercharge Your Team with GitMind
                </motion.h1>
                <motion.p
                  variants={textVariants}
                  className="mt-6 max-w-2xl text-balance text-lg text-gray-600 dark:text-gray-400"
                >
                  Transform meetings into actionable insights, streamline
                  collaboration, and accelerate development with AI-powered
                  intelligence.
                </motion.p>

                <motion.div
                  variants={{
                    initial: { opacity: 0 },
                    animate: {
                      opacity: 1,
                      transition: { staggerChildren: 0.1, delay: 0.5 },
                    },
                  }}
                  initial="initial"
                  animate="animate"
                  className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
                >
                  <motion.div
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Button
                      asChild
                      size="lg"
                      className="h-12 rounded-full bg-primary pl-5 pr-3 text-base text-white hover:bg-primary/90"
                    >
                      <Link href="/get-started">
                        <span className="text-nowrap">Get Started</span>
                        <ChevronRight className="ml-2 size-5" />
                      </Link>
                    </Button>
                  </motion.div>
                  <motion.div
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <Button
                      asChild
                      size="lg"
                      variant="outline"
                      className="h-12 rounded-full border-gray-300 px-5 text-base hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
                    >
                      <Link href="/demo">
                        <span className="text-nowrap">Request Demo</span>
                      </Link>
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>

            {/* Enhanced Background: Git Commits, Meeting Summaries, Codebase Knowledge, AI */}
            <motion.div
              className="absolute inset-0 -z-10 overflow-hidden rounded-3xl border border-black/10 dark:border-white/5 lg:rounded-[3rem]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <svg
                className="h-full w-full bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-950 dark:to-gray-900"
                viewBox="0 0 1200 600"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Grid pattern for background */}
                <pattern
                  id="grid"
                  width="40"
                  height="40"
                  patternUnits="userSpaceOnUse"
                >
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="0.2"
                    strokeOpacity="0.1"
                  />
                </pattern>
                <rect width="100%" height="100%" fill="url(#grid)" />

                {/* Central AI Hub */}
                <motion.circle
                  cx="600"
                  cy="300"
                  r="40"
                  fill="rgba(59, 130, 246, 0.1)"
                  stroke="#3b82f6"
                  strokeWidth="1.5"
                  variants={aiPulseVariants}
                  initial="initial"
                  animate="animate"
                />
                <motion.circle
                  cx="600"
                  cy="300"
                  r="20"
                  fill="rgba(59, 130, 246, 0.2)"
                  variants={aiPulseVariants}
                  initial="initial"
                  animate="animate"
                  transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                />

                {/* Git Commits Section (Left) */}
                <g className="git-section">
                  {/* Git graph */}
                  <motion.circle
                    cx="200"
                    cy="250"
                    r="8"
                    fill="#10b981"
                    variants={gitNodeVariants}
                    custom={0}
                    initial="initial"
                    animate="animate"
                  />
                  <motion.circle
                    cx="260"
                    cy="200"
                    r="8"
                    fill="#10b981"
                    variants={gitNodeVariants}
                    custom={1}
                    initial="initial"
                    animate="animate"
                  />
                  <motion.circle
                    cx="320"
                    cy="250"
                    r="8"
                    fill="#10b981"
                    variants={gitNodeVariants}
                    custom={2}
                    initial="initial"
                    animate="animate"
                  />
                  <motion.circle
                    cx="380"
                    cy="180"
                    r="8"
                    fill="#10b981"
                    variants={gitNodeVariants}
                    custom={3}
                    initial="initial"
                    animate="animate"
                  />
                  <motion.circle
                    cx="440"
                    cy="250"
                    r="8"
                    fill="#10b981"
                    variants={gitNodeVariants}
                    custom={4}
                    initial="initial"
                    animate="animate"
                  />

                  <motion.path
                    d="M200,250 L260,200"
                    stroke="#10b981"
                    strokeWidth="2"
                    strokeLinecap="round"
                    variants={gitLineVariants}
                    custom={0}
                    initial="initial"
                    animate="animate"
                  />
                  <motion.path
                    d="M260,200 L320,250"
                    stroke="#10b981"
                    strokeWidth="2"
                    strokeLinecap="round"
                    variants={gitLineVariants}
                    custom={1}
                    initial="initial"
                    animate="animate"
                  />
                  <motion.path
                    d="M320,250 L380,180"
                    stroke="#10b981"
                    strokeWidth="2"
                    strokeLinecap="round"
                    variants={gitLineVariants}
                    custom={2}
                    initial="initial"
                    animate="animate"
                  />
                  <motion.path
                    d="M380,180 L440,250"
                    stroke="#10b981"
                    strokeWidth="2"
                    strokeLinecap="round"
                    variants={gitLineVariants}
                    custom={3}
                    initial="initial"
                    animate="animate"
                  />

                  {/* Commit messages */}
                  <motion.rect
                    x="180"
                    y="280"
                    width="40"
                    height="6"
                    rx="3"
                    fill="#10b981"
                    opacity="0.6"
                    variants={gitLineVariants}
                    custom={0}
                    initial="initial"
                    animate="animate"
                  />
                  <motion.rect
                    x="180"
                    y="290"
                    width="60"
                    height="4"
                    rx="2"
                    fill="#10b981"
                    opacity="0.4"
                    variants={gitLineVariants}
                    custom={0.5}
                    initial="initial"
                    animate="animate"
                  />
                  <motion.rect
                    x="300"
                    y="280"
                    width="40"
                    height="6"
                    rx="3"
                    fill="#10b981"
                    opacity="0.6"
                    variants={gitLineVariants}
                    custom={2}
                    initial="initial"
                    animate="animate"
                  />
                  <motion.rect
                    x="300"
                    y="290"
                    width="60"
                    height="4"
                    rx="2"
                    fill="#10b981"
                    opacity="0.4"
                    variants={gitLineVariants}
                    custom={2.5}
                    initial="initial"
                    animate="animate"
                  />
                  <motion.rect
                    x="420"
                    y="280"
                    width="40"
                    height="6"
                    rx="3"
                    fill="#10b981"
                    opacity="0.6"
                    variants={gitLineVariants}
                    custom={4}
                    initial="initial"
                    animate="animate"
                  />
                  <motion.rect
                    x="420"
                    y="290"
                    width="60"
                    height="4"
                    rx="2"
                    fill="#10b981"
                    opacity="0.4"
                    variants={gitLineVariants}
                    custom={4.5}
                    initial="initial"
                    animate="animate"
                  />
                </g>

                {/* Connect Git to AI */}
                <motion.path
                  d="M440,250 C500,250 520,280 560,300"
                  stroke="#10b981"
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                  strokeLinecap="round"
                  variants={aiConnectionVariants}
                  custom={0}
                  initial="initial"
                  animate="animate"
                />

                {/* Codebase Knowledge Section (Right-Top) */}
                <g className="code-section">
                  <rect
                    x="700"
                    y="150"
                    width="300"
                    height="140"
                    rx="8"
                    fill="rgba(124, 58, 237, 0.05)"
                    stroke="rgba(124, 58, 237, 0.2)"
                    strokeWidth="1"
                  />

                  {/* Code lines */}
                  <motion.rect
                    x="720"
                    y="170"
                    width="120"
                    height="4"
                    rx="2"
                    fill="#7c3aed"
                    variants={codeLineVariants}
                    custom={0}
                    initial="initial"
                    animate="animate"
                  />
                  <motion.rect
                    x="720"
                    y="180"
                    width="260"
                    height="3"
                    rx="1.5"
                    fill="#7c3aed"
                    opacity="0.6"
                    variants={codeLineVariants}
                    custom={1}
                    initial="initial"
                    animate="animate"
                  />
                  <motion.rect
                    x="720"
                    y="190"
                    width="200"
                    height="3"
                    rx="1.5"
                    fill="#7c3aed"
                    opacity="0.4"
                    variants={codeLineVariants}
                    custom={2}
                    initial="initial"
                    animate="animate"
                  />
                  <motion.rect
                    x="740"
                    y="200"
                    width="180"
                    height="3"
                    rx="1.5"
                    fill="#7c3aed"
                    opacity="0.5"
                    variants={codeLineVariants}
                    custom={3}
                    initial="initial"
                    animate="animate"
                  />
                  <motion.rect
                    x="740"
                    y="210"
                    width="220"
                    height="3"
                    rx="1.5"
                    fill="#7c3aed"
                    opacity="0.6"
                    variants={codeLineVariants}
                    custom={4}
                    initial="initial"
                    animate="animate"
                  />
                  <motion.rect
                    x="720"
                    y="220"
                    width="160"
                    height="4"
                    rx="2"
                    fill="#7c3aed"
                    variants={codeLineVariants}
                    custom={5}
                    initial="initial"
                    animate="animate"
                  />
                  <motion.rect
                    x="720"
                    y="230"
                    width="240"
                    height="3"
                    rx="1.5"
                    fill="#7c3aed"
                    opacity="0.5"
                    variants={codeLineVariants}
                    custom={6}
                    initial="initial"
                    animate="animate"
                  />
                  <motion.rect
                    x="740"
                    y="240"
                    width="200"
                    height="3"
                    rx="1.5"
                    fill="#7c3aed"
                    opacity="0.4"
                    variants={codeLineVariants}
                    custom={7}
                    initial="initial"
                    animate="animate"
                  />
                  <motion.rect
                    x="720"
                    y="250"
                    width="180"
                    height="4"
                    rx="2"
                    fill="#7c3aed"
                    variants={codeLineVariants}
                    custom={8}
                    initial="initial"
                    animate="animate"
                  />
                </g>

                {/* Connect Codebase to AI */}
                <motion.path
                  d="M700,290 C650,320 620,310 600,300"
                  stroke="#7c3aed"
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                  strokeLinecap="round"
                  variants={aiConnectionVariants}
                  custom={1}
                  initial="initial"
                  animate="animate"
                />

                {/* Meeting Summaries Section (Bottom-Right) */}
                <g className="meeting-section">
                  <rect
                    x="800"
                    y="350"
                    width="300"
                    height="100"
                    rx="8"
                    fill="rgba(59, 130, 246, 0.05)"
                    stroke="rgba(59, 130, 246, 0.2)"
                    strokeWidth="1"
                  />

                  <motion.rect
                    x="820"
                    y="370"
                    width="260"
                    height="4"
                    rx="2"
                    fill="#3b82f6"
                    variants={meetingNoteVariants}
                    custom={0}
                    initial="initial"
                    animate="animate"
                  />
                  <motion.rect
                    x="820"
                    y="380"
                    width="200"
                    height="3"
                    rx="1.5"
                    fill="#3b82f6"
                    opacity="0.8"
                    variants={meetingNoteVariants}
                    custom={1}
                    initial="initial"
                    animate="animate"
                  />
                  <motion.rect
                    x="840"
                    y="390"
                    width="240"
                    height="3"
                    rx="1.5"
                    fill="#3b82f6"
                    opacity="0.6"
                    variants={meetingNoteVariants}
                    custom={2}
                    initial="initial"
                    animate="animate"
                  />
                  <motion.rect
                    x="820"
                    y="400"
                    width="180"
                    height="4"
                    rx="2"
                    fill="#3b82f6"
                    opacity="0.7"
                    variants={meetingNoteVariants}
                    custom={3}
                    initial="initial"
                    animate="animate"
                  />
                  <motion.rect
                    x="840"
                    y="410"
                    width="220"
                    height="3"
                    rx="1.5"
                    fill="#3b82f6"
                    opacity="0.5"
                    variants={meetingNoteVariants}
                    custom={4}
                    initial="initial"
                    animate="animate"
                  />
                </g>

                {/* Connect Meeting Summaries to AI */}
                <motion.path
                  d="M800,350 C750,340 650,320 600,300"
                  stroke="#3b82f6"
                  strokeWidth="1.5"
                  strokeDasharray="4 2"
                  strokeLinecap="round"
                  variants={aiConnectionVariants}
                  custom={2}
                  initial="initial"
                  animate="animate"
                />
              </svg>
            </motion.div>
          </div>
        </section>

        {/* Trusted By Section */}
        <section className="bg-background pb-2">
          <div className="group relative mx-auto max-w-7xl px-6">
            <div className="flex flex-col items-center md:flex-row">
              <motion.div
                className="md:max-w-44 md:border-r md:pr-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <p className="text-end text-sm text-gray-600 dark:text-gray-400">
                  Trusted by leading teams
                </p>
              </motion.div>
              <motion.div
                className="relative py-6 md:w-[calc(100%-11rem)]"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
              >
                <InfiniteSlider speedOnHover={20} speed={40} gap={112}>
                  {[
                    {
                      src: "https://html.tailus.io/blocks/customers/nvidia.svg",
                      height: 20,
                      alt: "Nvidia",
                    },
                    {
                      src: "https://html.tailus.io/blocks/customers/column.svg",
                      height: 16,
                      alt: "Column",
                    },
                    {
                      src: "https://html.tailus.io/blocks/customers/github.svg",
                      height: 16,
                      alt: "GitHub",
                    },
                    {
                      src: "https://html.tailus.io/blocks/customers/nike.svg",
                      height: 20,
                      alt: "Nike",
                    },
                    {
                      src: "https://html.tailus.io/blocks/customers/lemonsqueezy.svg",
                      height: 20,
                      alt: "Lemon Squeezy",
                    },
                    {
                      src: "https://html.tailus.io/blocks/customers/laravel.svg",
                      height: 16,
                      alt: "Laravel",
                    },
                    {
                      src: "https://html.tailus.io/blocks/customers/lilly.svg",
                      height: 28,
                      alt: "Lilly",
                    },
                    {
                      src: "https://html.tailus.io/blocks/customers/openai.svg",
                      height: 24,
                      alt: "OpenAI",
                    },
                  ].map((logo, index) => (
                    <motion.div
                      key={index}
                      className="flex"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                    >
                      <img
                        className="mx-auto h-fit w-fit opacity-70 transition-opacity hover:opacity-100 dark:invert"
                        src={logo.src}
                        alt={`${logo.alt} Logo`}
                        height={logo.height}
                        width="auto"
                      />
                    </motion.div>
                  ))}
                </InfiniteSlider>

                <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-background to-transparent" />
                <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-background to-transparent" />
                <ProgressiveBlur
                  className="pointer-events-none absolute left-0 top-0 h-full w-20"
                  direction="left"
                  blurIntensity={1}
                />
                <ProgressiveBlur
                  className="pointer-events-none absolute right-0 top-0 h-full w-20"
                  direction="right"
                  blurIntensity={1}
                />
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
