"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { HoverBorderGradient } from "./ui/hover-border-gradient";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      staggerChildren: 0.2,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const buttonVariants = {
  rest: { scale: 1 },
  hover: {
    scale: 1.05,
    boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.1)",
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  tap: { scale: 0.95 },
};

export default function CallToAction() {
  return (
    <section className="py-16">
      <motion.div
        className="mx-auto max-w-5xl rounded-3xl border bg-gradient-to-b from-gray-50 to-white px-6 py-12 dark:from-gray-900 dark:to-gray-800 md:py-20 lg:py-32"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="text-center">
          <motion.h2
            className="text-balance bg-gradient-to-r from-purple-600 to-blue-500 bg-clip-text text-4xl font-semibold text-transparent dark:from-purple-400 dark:to-blue-400 lg:text-5xl"
            variants={childVariants}
          >
            Understand Your Code, Effortlessly
          </motion.h2>
          <motion.p
            className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground"
            variants={childVariants}
          >
            Get actionable insights from your code repositories, streamline collaboration, and boost productivity.
          </motion.p>

          <motion.div
            className="mt-12 flex flex-wrap justify-center gap-6"
            variants={childVariants}
          >
            <motion.div
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <HoverBorderGradient
                containerClassName="rounded-full"
                as="button"
                className="flex items-center space-x-2 bg-gradient-to-r from-purple-600 to-blue-500 text-white dark:from-purple-700 dark:to-blue-600 px-6 py-3 text-base font-medium"
              >
                <Link href="/">
                  <span>Get Started</span>
                </Link>
              </HoverBorderGradient>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}