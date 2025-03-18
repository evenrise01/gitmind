"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import MagicButton from "./ui/magic-button";
import { CanvasRevealEffect } from "./ui/canvas-reveal-effect";
import React from "react";
import { AnimatePresence } from "motion/react";
import Link from "next/link";

// Animation variants for Framer Motion
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

export default function Solutions() {
  return (
    <section id="solution">
      <div className="min-h-screen bg-gray-50 px-6 py-20 dark:bg-transparent sm:px-8 lg:px-12">
        {/* Hero Section */}
        <motion.div
          className="mb-20 text-center"
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100 sm:text-5xl">
            Unlock Your Codebase with GitMind
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-gray-600 dark:text-gray-400">
            Empower your team with instant insights into your GitHub
            repositories and meetings—streamline onboarding, boost productivity,
            and stay aligned.
          </p>
        </motion.div>

        {/* Features Section */}
        <motion.section
          className="mx-auto max-w-6xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <h2 className="mb-16 text-center text-3xl font-semibold text-gray-900 dark:text-gray-100">
            Features That Solve Real Problems
          </h2>
          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature 1: Codebase Insights */}
            <motion.div variants={fadeInUp}>
              <Card className="h-full border-gray-200 bg-gradient-to-br from-white to-gray-100 dark:border-gray-700 dark:from-gray-800 dark:to-gray-900">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    Codebase Insights
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    Connect your GitHub repo and let GitMind analyze commit
                    history to provide summaries and answer questions about your
                    codebase.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Feature 2: Q&A Knowledge Base */}
            <motion.div variants={fadeInUp}>
              <Card className="h-full border-gray-200 bg-gradient-to-br from-white to-gray-100 dark:border-gray-700 dark:from-gray-800 dark:to-gray-900">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    Q&A Knowledge Base
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    Save questions and answers about your codebase for quick
                    reference, perfect for onboarding juniors or refreshing your
                    memory.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Feature 3: Meeting Summaries */}
            <motion.div variants={fadeInUp}>
              <Card className="h-full border-gray-200 bg-gradient-to-br from-white to-gray-100 dark:border-gray-700 dark:from-gray-800 dark:to-gray-900">
                <CardHeader>
                  <CardTitle className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                    Meeting Summaries
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 dark:text-gray-400">
                    Upload meeting audio, and GitMind transcribes and summarizes
                    key points—ideal for recaps or catching up on missed
                    discussions.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.section>

        {/* Value Proposition Section */}
        <motion.section
          className="mx-auto mt-24 max-w-5xl"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
        >
          <h2 className="mb-16 text-center text-3xl font-semibold text-gray-900 dark:text-gray-100">
            Why GitMind?
          </h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2">
            <motion.div variants={fadeInUp}>
              <CanvasCard
                title="Accelerate Onboarding"
                des="New developers and interns can quickly grasp the codebase without digging through commits manually."
              >
                <CanvasRevealEffect
                  animationSpeed={5.1}
                  containerClassName="bg-emerald-900 rounded-3xl overflow-hidden"
                />
              </CanvasCard>
            </motion.div>
            <motion.div variants={fadeInUp}>
              <CanvasCard
                title="Boost Team Alignment"
                des="Keep everyone on the same page with concise meeting summaries and a shared knowledge base."
              >
                <CanvasRevealEffect
                  animationSpeed={3}
                  containerClassName="bg-sky-600 rounded-3xl overflow-hidden"
                  colors={[[125, 211, 252]]}
                />
              </CanvasCard>
            </motion.div>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.div
          className="mt-24 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <h2 className="p-4 text-2xl font-semibold text-gray-900 dark:text-gray-100">
            Ready to Simplify Your Workflow?
          </h2>
          <Link href={"/sign-up"}>
            <MagicButton title="Try GitMind Now" position="right" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

const CanvasCard = ({
  title,
  children,
  des,
}: {
  title: string;
  children?: React.ReactNode;
  des: string;
}) => {
  const [hovered, setHovered] = React.useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group/canvas-card relative mx-auto flex h-[25rem] w-full max-w-sm items-center justify-center rounded-3xl border border-black/[0.2] bg-white p-4 transition-colors duration-200 dark:border-white/[0.2] dark:bg-gray-900"
    >
      <Icon className="absolute -left-2 -top-2 h-8 w-8 text-gray-400 opacity-30 dark:text-gray-500" />
      <Icon className="absolute -bottom-2 -left-2 h-8 w-8 text-gray-400 opacity-30 dark:text-gray-500" />
      <Icon className="absolute -right-2 -top-2 h-8 w-8 text-gray-400 opacity-30 dark:text-gray-500" />
      <Icon className="absolute -bottom-2 -right-2 h-8 w-8 text-gray-400 opacity-30 dark:text-gray-500" />

      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 h-full w-full"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="relative z-20 px-6 text-center">
        <h2 className="mb-4 text-2xl font-bold text-gray-900 transition-all duration-200 group-hover/canvas-card:text-white dark:text-white">
          {title}
        </h2>

        <AnimatePresence>
          {hovered && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.2 }}
              className="mt-4 text-sm text-gray-600 group-hover/canvas-card:text-white dark:text-gray-300"
            >
              {des}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
// add order prop for the Phase number change
const AceternityIcon = ({ order }: { order: string }) => {
  return (
    <div>
      <button className="relative inline-flex overflow-hidden rounded-full p-[1px]">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
        <span className="text-purple inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-5 py-2 text-2xl font-bold backdrop-blur-3xl">
          {order}
        </span>
      </button>
    </div>
    // remove the svg and add the button
    // <svg
    //   width="66"
    //   height="65"
    //   viewBox="0 0 66 65"
    //   fill="none"
    //   xmlns="http://www.w3.org/2000/svg"
    //   className="h-10 w-10 text-black dark:text-white group-hover/canvas-card:text-white "
    // >
    //   <path
    //     d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
    //     stroke="currentColor"
    //     strokeWidth="15"
    //     strokeMiterlimit="3.86874"
    //     strokeLinecap="round"
    //     style={{ mixBlendMode: "darken" }}
    //   />
    // </svg>
  );
};

export const Icon = ({ className, ...rest }: any) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className={className}
      {...rest}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m6-6H6" />
    </svg>
  );
};
