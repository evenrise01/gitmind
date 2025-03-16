"use client";

import useProject from "@/hooks/use-project";
import { cn } from "@/lib/utils";
import { api } from "@/trpc/react";
import { ExternalLink, GitCommit } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
// Helper function to format commit summaries with bullet points
const formatCommitSummary = (summary: string) => {
  // Split the summary into lines
  const lines = summary.split("\n").filter((line) => line.trim());
  // If the summary has multiple lines, format them as a bullet list
  if (lines.length > 1) {
    return (
      <ul className="list-disc list-inside mt-1 space-y-1">
        {lines.map((line, index) => (
          <li key={index} className="text-sm text-gray-600 dark:text-gray-400">
            {line.trim()}
          </li>
        ))}
      </ul>
    );
  }
  // Single-line summary
  return <p className="text-sm text-gray-600 dark:text-gray-400">{summary}</p>;
};

const CommitLog = () => {
  const { projectId, project } = useProject();
  const { data: commits, isLoading, error } = api.project.getCommits.useQuery({ projectId });

  // Variants for animation
  const commitVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
      <Card className="w-full bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <GitCommit className="h-5 w-5 text-violet-600 dark:text-violet-400" />
            Commit History
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center py-6">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <GitCommit className="h-6 w-6 text-violet-600 dark:text-violet-400" />
              </motion.div>
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="text-center py-6 text-red-600 dark:text-red-400">
              Failed to load commits: {error.message}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && (!commits || commits.length === 0) && (
            <div className="text-center py-6 text-gray-500 dark:text-gray-400">
              No commits found for this project.
            </div>
          )}

          {/* Commit List */}
          {commits && commits.length > 0 && (
            <ScrollArea className="h-[500px] pr-4">
              <ul className="space-y-6">
                <AnimatePresence>
                  {commits.map((commit) => (
                    <motion.li
                      key={commit.id}
                      variants={commitVariants}
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      className="relative flex gap-x-4"
                    >
                      {/* Removed the inner timeline and purple dots since TracingBeam handles this */}
                      <div className="relative flex h-6 w-6 flex-none items-center justify-center">
                        {/* Spacer to align with TracingBeam */}
                      </div>

                      {/* Commit Content */}
                      <div className="flex-auto rounded-md bg-gray-50 dark:bg-gray-700 p-4 ring-1 ring-inset ring-gray-200 dark:ring-gray-600 transition-all duration-200 hover:shadow-md">
                        <div className="flex items-center justify-between gap-x-4">
                          <div className="flex items-center gap-x-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage src={commit.commitAuthorAvatar} alt="Commit Author Avatar" />
                              <AvatarFallback className="bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200">
                                {commit.commitAuthorName.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <Link
                              href={`${project?.githubUrl}/commit/${commit.commitHash}`}
                              target="_blank"
                              className="text-sm font-medium text-gray-900 dark:text-gray-100 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-200"
                            >
                              {commit.commitAuthorName}
                            </Link>
                          </div>
                          <Badge
                            variant="outline"
                            className="text-xs text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-500"
                          >
                            {formatDistanceToNow(new Date(commit.commitDate), { addSuffix: true })}
                          </Badge>
                        </div>

                        <div className="mt-2">
                          <p className="text-sm font-semibold text-gray-900 dark:text-white">
                            {commit.commitMessage}
                          </p>
                          {formatCommitSummary(commit.commitSummary)}
                        </div>

                        <div className="mt-2 flex justify-end">
                          <Link
                            href={`${project?.githubUrl}/commit/${commit.commitHash}`}
                            target="_blank"
                            className="text-xs text-violet-600 dark:text-violet-400 hover:underline flex items-center gap-1"
                          >
                            View on GitHub
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </AnimatePresence>
              </ul>
            </ScrollArea>
          )}
        </CardContent>
      </Card>
  );
};

export default CommitLog;