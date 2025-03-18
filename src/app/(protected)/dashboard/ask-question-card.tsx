"use client";

import MDEditor from "@uiw/react-md-editor";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Loader2} from "lucide-react";
import useRefetch from "@/hooks/use-refetch";
import { Logo } from "@/components/logo";

const AskQuestionCard = () => {
  const { project } = useProject();
  const [question, setQuestion] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filesReferences, setFilesReferences] = useState<
    { fileName: string; sourceCode: string; summary: string }[]
  >([]);
  const [answer, setAnswer] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const saveAnswer = api.project.saveAnswer.useMutation();
  const refetch = useRefetch();

  // Detect theme changes
  useEffect(() => {
    const updateTheme = () => {
      setTheme(document.documentElement.classList.contains("dark") ? "dark" : "light");
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!project?.id || !question.trim()) return;
    setAnswer("");
    setFilesReferences([]);
    setLoading(true);

    const { output, filesReferences } = await askQuestion(question, project.id);
    setOpen(true);
    setFilesReferences(filesReferences);

    for await (const delta of readStreamableValue(output)) {
      if (delta) setAnswer((ans) => ans + delta);
    }
    setLoading(false);
  };

  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex max-h-[85vh] w-full flex-col overflow-hidden rounded-lg bg-white p-0 shadow-xl dark:bg-gray-800 sm:max-w-2xl md:max-w-3xl">
          <DialogHeader className="border-b border-gray-200 px-4 py-3 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <DialogTitle className="flex items-center gap-2 text-lg font-semibold text-gray-900 dark:text-gray-100 sm:text-xl">
                <Image src="/logo.svg" alt="GitMind Logo" width={32} height={32} className="h-8 w-8" />
                Answer
              </DialogTitle>
              <div className="flex items-center gap-2">
                <Button
                  disabled={saveAnswer.isPending || !answer}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    saveAnswer.mutate(
                      { projectId: project!.id, question, answer, filesReferences },
                      {
                        onSuccess: () => {
                          toast.success("Answer saved successfully!");
                          refetch();
                        },
                        onError: () => toast.error("Failed to save answer!"),
                      },
                    );
                  }}
                  className="transition-all duration-200 hover:bg-gray-100 dark:hover:bg-gray-700 mr-8"
                >
                  {saveAnswer.isPending ? <Loader2 className="h-4 w-4 animate-spin" /> : "Save"}
                </Button>
                {/* Custom close button removed; relying on Dialog's built-in close */}
              </div>
            </div>
          </DialogHeader>

          <div className="flex-1 overflow-y-auto p-4 sm:p-6">
            {loading ? (
              <div className="flex h-full items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-gray-500 dark:text-gray-400" />
              </div>
            ) : (
              <div className="space-y-6">
                <div data-color-mode={theme} className="rounded-md bg-gray-50 p-4 dark:bg-gray-900">
                  <MDEditor.Markdown
                    source={answer}
                    className="prose max-w-none text-gray-900 dark:prose-invert dark:text-gray-100"
                    style={{ minHeight: "150px" }}
                  />
                </div>
                {filesReferences.length > 0 && <CodeReferences fileReferences={filesReferences} />}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <Card className="relative col-span-3 w-full overflow-hidden border-gray-300 bg-white shadow-lg transition-all duration-300 hover:shadow-xl dark:border-gray-700 dark:bg-gray-800">
        <CardHeader className="p-4 sm:p-6">
          <CardTitle className="text-lg font-semibold text-gray-900 dark:text-gray-100 sm:text-xl">
            Ask a Question
          </CardTitle>
          <CardDescription><strong>GitMind</strong> has knowledge of your Github Repository.</CardDescription>
        </CardHeader>
        <CardContent className="p-4 sm:p-6">
          <form onSubmit={onSubmit} className="space-y-4">
            <Textarea
              placeholder="Which file should I edit to change the home page?"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              className="min-h-[100px] resize-y rounded-lg border-gray-300 bg-gray-50 text-sm text-gray-900 placeholder-gray-400 focus:border-gray-400 focus:ring-gray-400 dark:border-gray-600 dark:bg-gray-900 dark:text-gray-100 dark:focus:border-gray-500 dark:focus:ring-gray-500 sm:text-base"
              disabled={loading}
            />
            <MagicButton
              title="Ask GitMind"
              position="left"
              icon={<Logo className="h-5 w-5" />}
              disabled={loading || !question.trim()}
            />
          </form>
        </CardContent>
      </Card>
    </>
  );
};

export default AskQuestionCard;