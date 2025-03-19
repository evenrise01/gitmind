"use client";

import useProject from "@/hooks/use-project";
import { ExternalLink, Github, PlusCircle } from "lucide-react";
import Link from "next/link";
import CommitLog from "./commit-log";
import AskQuestionCard from "./ask-question-card";
import MeetingCard from "./meeting-card";
import ArchiveButton from "./archive-button";
import InviteButton from "./invite-button";
import TeamMembers from "./team-members";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

const DashboardPage = () => {
  const { project, projects } = useProject();
  const { theme } = useTheme();

  // Empty state when no projects exist
  if (!projects || projects.length === 0) {
    return (
      <div className="container mx-auto flex min-h-[80vh] flex-col items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md rounded-lg border border-border bg-card p-6 text-center shadow-lg"
        >
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <PlusCircle className="size-8 text-primary" />
          </div>
          
          <h2 className="mb-2 text-2xl font-semibold tracking-tight text-foreground">No Projects Yet</h2>
          <p className="mb-6 text-muted-foreground">
            Create your first project to get started with tracking commits, asking questions, and scheduling meetings.
          </p>
          <Link href={"/create"}>
          <Button 
            className="mx-auto w-full max-w-xs"
            size="lg"
          >
            <PlusCircle className="mr-2 size-4" />
            Create New Project
          </Button>
          </Link>
          
          <div className="mt-8 rounded-lg bg-muted p-4">
            <h3 className="mb-2 font-medium text-foreground">What you can do with projects:</h3>
            <ul className="list-inside list-disc text-left text-muted-foreground">
              <li>Link to GitHub repositories</li>
              <li>Track commit history</li>
              <li>Ask questions about your codebase</li>
              <li>Schedule team meetings</li>
              <li>Collaborate with team members</li>
              <li>Transcribe and save your meetings</li>
            </ul>
          </div>
        </motion.div>
      </div>
    );
  }

  // Regular dashboard when projects exist
  return (
    <div className="container mx-auto p-3 sm:p-6">
      <div className="flex flex-wrap items-center justify-between gap-y-4">
        {/* Github link */}
        <div className="w-fit rounded-md bg-primary px-4 py-3">
          <div className="flex items-center">
            <Github className="size-4 text-white" />
            <div className="ml-2">
              <p className="text-sm font-medium text-white">
                This project is linked to{" "}
                <Link
                  href={project?.githubUrl ?? ""}
                  className="inline-flex items-center text-white/80 hover:underline"
                >
                  {project?.githubUrl}
                  <ExternalLink className="ml-2 size-4" />
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="h-4"></div>

        <div className="flex items-center gap-4">
          <TeamMembers/>
          <InviteButton/>
          <ArchiveButton/>
        </div>
      </div>

      <div className="mt-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-5">
          <AskQuestionCard/> 
          <MeetingCard/>
        </div>
      </div>

      <div className="mt-8"></div>
      <CommitLog/>
    </div>
  );
};

export default DashboardPage;