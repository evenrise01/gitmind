"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Skeleton } from "@/components/ui/skeleton";
import useProject from "@/hooks/use-project";
import { api } from "@/trpc/react";
import AskQuestionCard from "../dashboard/ask-question-card";
import React, { useState, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import CodeReferences from "../dashboard/code-references";
import { motion } from "framer-motion";

const QAPage = () => {
  const { projectId } = useProject();
  const { data: questions, isLoading } = api.project.getQuestions.useQuery({ projectId });

  const [questionIndex, setQuestionIndex] = useState(0);
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const question = questions?.[questionIndex];

  // Detect theme changes
  useEffect(() => {
    const updateTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <Sheet>
      <AskQuestionCard />
      <div className="h-4" />
      <h1 className="text-2xl font-bold tracking-tight text-foreground">Saved Questions</h1>
      <div className="h-4" />
      <div className="flex flex-col gap-4">
        {isLoading ? (
          // Skeleton loading state
          Array(3)
            .fill(0)
            .map((_, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: idx * 0.1 }}
              >
                <div className="flex items-center gap-4 rounded-lg border bg-card p-4 shadow-md">
                  <Skeleton className="h-8 w-8 rounded-full" />
                  <div className="flex flex-col gap-2 flex-1">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-full" />
                  </div>
                </div>
              </motion.div>
            ))
        ) : questions?.length ? (
          questions.map((question, index) => (
            <React.Fragment key={question.id}>
              <SheetTrigger
                onClick={() => setQuestionIndex(index)}
                className="focus:ring-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background"
              >
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  whileHover={{ scale: 1.02, boxShadow: "0 4px 14px rgba(0, 0, 0, 0.1)" }}
                  className="dark:bg-card-dark flex items-center gap-4 rounded-lg border bg-card p-4 shadow-md transition-colors duration-200 hover:bg-card/90"
                >
                  <img
                    className="h-10 w-10 rounded-full object-cover border border-gray-200 dark:border-gray-700"
                    height={30}
                    width={30}
                    src={question.user.imageUrl ?? ""}
                    alt="User Avatar image"
                  />
                  <div className="flex flex-col text-left flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="line-clamp-1 text-base font-semibold text-foreground hover:text-primary transition-colors duration-200">
                        {question.question}
                      </p>
                      <span className="whitespace-nowrap text-sm text-muted-foreground bg-muted px-2 py-1 rounded-full">
                        {question.createdAt.toLocaleDateString()}
                      </span>
                    </div>
                    <p className="line-clamp-3 text-sm text-muted-foreground mt-1 italic">
                      {question.answer}
                    </p>
                  </div>
                </motion.div>
              </SheetTrigger>
            </React.Fragment>
          ))
        ) : (
          <p className="text-muted-foreground text-center">No saved questions yet.</p>
        )}
      </div>

      {question && (
        <SheetContent className="flex min-h-screen max-w-[95vw] flex-col overflow-y-auto p-6 sm:max-w-3xl">
          <SheetHeader className="mb-6">
            <SheetTitle className="text-2xl font-bold text-foreground break-words">
              {question.question}
            </SheetTitle>
            <div className="flex-1 space-y-4 overflow-y-auto">
              <div
                data-color-mode={theme}
                className="rounded-lg bg-card p-4 shadow-sm border border-gray-200 dark:border-gray-700"
              >
                <MDEditor.Markdown
                  source={question.answer}
                  className="prose dark:prose-invert max-w-none text-foreground text-base"
                  style={{ minHeight: "200px" }}
                />
              </div>
              <CodeReferences fileReferences={(question.filesReferences ?? []) as any} />
            </div>
          </SheetHeader>
        </SheetContent>
      )}
    </Sheet>
  );
};

export default QAPage;