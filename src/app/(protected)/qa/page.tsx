"use client";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import useProject from "@/hooks/use-project";
import { api } from "@/trpc/react";
import AskQuestionCard from "../dashboard/ask-question-card";
import React, { useState, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";
import CodeReferences from "../dashboard/code-references";

const QAPage = () => {
  const { projectId } = useProject();
  const { data: questions } = api.project.getQuestions.useQuery({ projectId });

  const [questionIndex, setQuestionIndex] = React.useState(0);
  const [theme, setTheme] = React.useState<"light" | "dark">("light");
  const question = questions?.[questionIndex];

  // Detect theme changes
  useEffect(() => {
    const updateTheme = () => {
      const isDark = document.documentElement.classList.contains("dark");
      setTheme(isDark ? "dark" : "light");
    };

    updateTheme(); // Initial check
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <Sheet>
      <AskQuestionCard />
      <div className="h-4" />
      <h1 className="text-2xl font-bold tracking-tight">Saved Questions</h1>
      <div className="h-4" />
      <div className="flex flex-col gap-4">
        {questions?.map((question, index) => (
          <React.Fragment key={question.id}>
            <SheetTrigger
              onClick={() => setQuestionIndex(index)}
              className="focus:ring-primary-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background"
            >
              <div className="dark:bg-card-dark flex items-center gap-4 rounded-lg border bg-card p-4 shadow-md transition-colors duration-200 hover:bg-card/80">
                <img
                  className="rounded-full"
                  height={30}
                  width={30}
                  src={question.user.imageUrl ?? ""}
                  alt="User Avatar image"
                />
                <div className="flex flex-col text-left">
                  <div className="flex items-center gap-2">
                    <p className="line-clamp-1 text-base font-medium text-foreground">
                      {question.question}
                    </p>
                    <span className="whitespace-nowrap text-sm text-muted-foreground">
                      {question.createdAt.toLocaleDateString()}
                    </span>
                  </div>
                  <p className="line-clamp-3 text-sm text-muted-foreground">
                    {question.answer}
                  </p>
                </div>
              </div>
            </SheetTrigger>
          </React.Fragment>
        ))}
      </div>

      {question && (
        <SheetContent className="flex min-h-screen max-w-[95vw] flex-col overflow-y-auto p-6 sm:max-w-3xl">
          <SheetHeader className="mb-6">
            <SheetTitle className="text-2xl font-bold text-foreground">
              {question.question}
            </SheetTitle>
            <div className="flex-1 space-y-4 overflow-y-auto">
              <div data-color-mode={theme}>
                <MDEditor.Markdown
                  source={question.answer}
                  className="prose dark:prose-invert max-w-none rounded-lg bg-background p-4 text-foreground"
                  style={{ minHeight: "200px" }}
                />
              </div>
              <CodeReferences
                fileReferences={(question.filesReferences ?? []) as any}
              />
            </div>
          </SheetHeader>
        </SheetContent>
      )}
    </Sheet>
  );
};

export default QAPage;
