"use client";
import React from "react";
import { TracingBeam } from "./ui/tracing-beam";
import Image from "next/image";
import { Link } from "lucide-react";

const gitMindContent = [
  {
    title: "AI-Powered Commit Summary",
    description: (
      <>
        <p>
          See all your commits in a repository with an AI-generated summary to
          better understand the changes. GitMind analyzes your commit history,
          highlighting key updates and providing insights to streamline your
          workflow.
        </p>
        <p>
          Perfect for developers and teams, this feature helps you quickly grasp
          the evolution of your codebase without sifting through logs.
        </p>
      </>
    ),
    badge: "AI Features",
    content: (
      <Image
        src="/gifs/commit_summary.png" // Replace with your GIF path
        alt="AI-Powered Commit Summary Animation"
        width={400}
        height={400}
        className="h-full w-full rounded-lg object-cover"
      />
    ),
  },
  {
    title: "AI-Powered QA",
    description: (
      <>
        <p>
          Leverage GitMind’s knowledge of your codebase, built from commit
          changes and summaries. Ask questions about your project and save the
          answers for yourself or newly onboarded team members.
        </p>
        <p>
          This feature enhances onboarding and troubleshooting, ensuring
          everyone has access to accurate, AI-driven insights.
        </p>
      </>
    ),
    badge: "AI Features",
    content: (
      <Image
        src="/gifs/qa_feature.png" // Replace with your GIF path
        alt="AI-Powered QA Animation"
        width={400}
        height={400}
        className="h-full w-full rounded-lg object-cover"
      />
    ),
  },
  {
    title: "AI-Powered Meeting Transcripts",
    description: (
      <>
        <p>
          Upload meeting audio to get AI-generated transcripts. Focus on what
          matters—issues, headlines, and key points—to keep your team in sync.
        </p>
        <p>
          Save time and improve collaboration by turning discussions into
          actionable insights with GitMind’s transcript analysis.
        </p>
      </>
    ),
    badge: "Collaboration",
    content: (
      <Image
        src="/gifs/meeting_summary.png" // Replace with your GIF path
        alt="AI-Powered Meeting Transcripts Animation"
        width={400}
        height={400}
        className="h-full w-full rounded-lg object-cover"
      />
    ),
  },
  {
    title: "GitMind Credit-Based System",
    description: (
      <>
        <p>
          Pay only for what you need with GitMind’s transparent credit-based
          system. Use credits for features like AI summaries, transcripts, or
          exports, with full visibility into your usage.
        </p>
        <p>
          This flexible pricing model ensures cost efficiency and scalability
          for individuals and teams alike.
        </p>
        <p className="mt-4 pt-4">
          Learn more about GitMind Credits in the{" "}
          <a
            href="#pricing"
            className="duration-400 font-semibold text-primary underline decoration-transparent transition-colors hover:decoration-inherit"
          >
            Pricing
          </a>{" "}
          Section.
        </p>
      </>
    ),
    badge: "Pricing",
    content: (
      <Image
        src="/gifs/gitmind_credits.png" // Replace with your GIF path
        alt="GitMind Credit-Based System Animation"
        width={400}
        height={400}
        className="h-full w-full rounded-lg object-cover"
      />
    ),
  },
];

export function HowGitMindWorks() {
  return (
    <div className="min-h-screen bg-gray-50 py-4 dark:bg-transparent">
      <div className="mx-auto max-w-4xl px-4">
        <h1 className="mb-6 text-center text-2xl font-bold text-gray-900 dark:text-gray-100 sm:mb-8 sm:text-3xl md:text-4xl lg:text-5xl">
          How GitMind Works?
        </h1>
        <TracingBeam className="px-2 sm:px-4">
          <div className="relative mx-auto max-w-2xl pt-4 antialiased">
            {gitMindContent.map((item, index) => (
              <div key={`content-${index}`} className="mb-6 sm:mb-8 md:mb-10">
                <h2 className="mb-2 w-fit rounded-full bg-purple-600 px-2 py-1 text-xs text-white dark:bg-purple-800 sm:px-3 sm:text-sm">
                  {item.badge}
                </h2>
                <p className="mb-2 text-base text-gray-900 dark:text-gray-100 sm:mb-3 sm:text-lg md:text-xl">
                  {item.title}
                </p>
                <div className="prose prose-sm dark:prose-invert text-xs text-gray-700 dark:text-gray-300 sm:text-sm md:text-base">
                  {item?.content && (
                    <div className="mb-4 flex justify-center sm:mb-6 md:mb-8">
                      {item.content}
                    </div>
                  )}
                  {item.description}
                </div>
              </div>
            ))}
          </div>
        </TracingBeam>
      </div>
    </div>
  );
}
