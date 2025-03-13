"use client";

import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import useProject from "@/hooks/use-project";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import { askQuestion } from "./actions";
import { readStreamableValue } from "ai/rsc";
import CodeReferences from "./code-references";
import { api } from "@/trpc/react";
import { toast } from "sonner";
import MagicButton from "@/components/ui/magic-button";
import { Brain } from "lucide-react";
import useRefetch from "@/hooks/use-refetch";

const AskQuestionCard = () => {
  const { project } = useProject();
  const [question, setQuestion] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [filesReferences, setFilesReferences] = React.useState<
    { fileName: string; sourceCode: string; summary: string }[]
  >([]);
  const [answer, setAnswer] = React.useState("");
  const [theme, setTheme] = React.useState<"light" | "dark">("light");
  const saveAnswer = api.project.saveAnswer.useMutation();

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

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    setAnswer("");
    setFilesReferences([]);
    if (!project?.id) return;
    e.preventDefault();
    setLoading(true);

    const { output, filesReferences } = await askQuestion(question, project.id);
    setOpen(true);
    setFilesReferences(filesReferences);

    for await (const delta of readStreamableValue(output)) {
      if (delta) {
        setAnswer((ans) => ans + delta);
      }
    }
    setLoading(false);
  };

  const refetch = useRefetch();
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex max-h-[80vh] flex-col sm:max-w-[80vw]">
          <DialogHeader>
            <div className="flex items-center gap-2">
              <DialogTitle className="flex items-center gap-2">
                <Image
                  src="/logo.svg"
                  alt="GitMind Logo"
                  width={40}
                  height={40}
                />
                Answer
              </DialogTitle>
              <Button
                disabled={saveAnswer.isPending}
                variant="outline"
                onClick={() => {
                  saveAnswer.mutate(
                    {
                      projectId: project!.id,
                      question,
                      answer,
                      filesReferences,
                    },
                    {
                      onSuccess: () => {
                        toast.success("Your answer has been saved!");
                        refetch();
                      },
                      onError: () => {
                        toast.error("Failed to save your answer!");
                      },
                    },
                  );
                }}
              >
                Save Answer
              </Button>
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto p-4">
            {loading ? (
              <div className="flex h-full items-center justify-center">
                <p className="text-foreground">Loading...</p>
              </div>
            ) : (
              <>
                <div data-color-mode={theme}>
                  <MDEditor.Markdown
                    source={answer}
                    className="prose dark:prose-invert max-w-none rounded-md bg-background p-4 text-foreground"
                    style={{ minHeight: "200px" }}
                  />
                </div>
                <div className="h-4" />
                <CodeReferences fileReferences={filesReferences} />
              </>
            )}
          </div>

          <div className="flex justify-end border-t p-4">
            <Button type="button" onClick={() => setOpen(false)}>
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Card className="relative col-span-3">
        <CardHeader>
          <CardTitle>Ask a Question</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSubmit}>
            <Textarea
              placeholder="Which file should I edit to change the home page?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
            <MagicButton
              title="Ask GitMind"
              position="left"
              icon={<Brain />}
              disabled={loading}
            />
            {/* <Button type="submit" disabled={loading}>
              Ask GitMind
            </Button> */}
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default AskQuestionCard;
