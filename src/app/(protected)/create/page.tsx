"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Info, Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { api } from "@/trpc/react";
import useRefetch from "@/hooks/use-refetch";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

type FormInput = {
  repoUrl: string;
  projectName: string;
  githubToken?: string;
};

const CreatePage = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormInput>({
    defaultValues: {
      repoUrl: "",
      projectName: "",
      githubToken: "",
    },
  });

  const createProject = api.project.createProject.useMutation();
  const checkCredits = api.project.checkCredits.useMutation();
  const refetch = useRefetch();

  const onSubmit = (data: FormInput) => {
    if (checkCredits.data) {
      createProject.mutate(
        {
          githubUrl: data.repoUrl,
          name: data.projectName,
          githubToken: data.githubToken,
        },
        {
          onSuccess: () => {
            toast.success("Project created successfully!");
            reset();
            refetch();
            checkCredits.reset();
          },
          onError: () => {
            toast.error("Failed to create the project");
          },
        },
      );
    } else {
      checkCredits.mutate({
        githubUrl: data.repoUrl,
        githubToken: data.githubToken,
      });
    }
  };

  const hasEnoughCredits = checkCredits?.data?.userCredits
    ? checkCredits.data.fileCount <= checkCredits.data.userCredits
    : true;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 md:p-6 bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-800">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-5xl flex flex-col md:flex-row items-center gap-8"
      >
        {/* Image Section */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="hidden md:block md:w-1/2"
        >
          <img
            src="/undraw_developer.png"
            alt="Developer Illustration"
            className="h-56 w-auto mx-auto"
          />
        </motion.div>

        {/* Form Section */}
        <Card className="w-full md:w-1/2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 shadow-xl">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-900 dark:text-white">
              Link Your GitHub Repository
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Connect your repository to GitMind and start analyzing your projects with AI.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* Project Name Input */}
              <div className="space-y-2">
                <Label htmlFor="projectName" className="text-gray-900 dark:text-white">
                  Project Name
                </Label>
                <Input
                  id="projectName"
                  {...register("projectName", { required: "Project name is required" })}
                  placeholder="e.g., My Awesome Project"
                  className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:border-violet-500"
                />
                {errors.projectName && (
                  <p className="text-red-500 text-xs">{errors.projectName.message}</p>
                )}
              </div>

              {/* GitHub URL Input */}
              <div className="space-y-2">
                <Label htmlFor="repoUrl" className="text-gray-900 dark:text-white">
                  GitHub URL
                </Label>
                <Input
                  id="repoUrl"
                  type="url"
                  {...register("repoUrl", {
                    required: "GitHub URL is required",
                    pattern: {
                      value: /^(https?:\/\/)?(www\.)?github\.com\/[\w-]+\/[\w-]+\/?$/,
                      message: "Please enter a valid GitHub repository URL (e.g., https://github.com/user/repo)",
                    },
                  })}
                  placeholder="e.g., https://github.com/user/repo"
                  className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:border-violet-500"
                />
                {errors.repoUrl && (
                  <p className="text-red-500 text-xs">{errors.repoUrl.message}</p>
                )}
              </div>
              {/* GitHub Token Input */}
              <div className="space-y-2">
                <Label htmlFor="githubToken" className="text-gray-900 dark:text-white">
                  GitHub Token (Optional)
                </Label>
                <Input
                  id="githubToken"
                  {...register("githubToken")}
                  placeholder="Enter your GitHub token for private repos"
                  className="bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white border-gray-300 dark:border-gray-600 focus:border-violet-500"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Provide a token to access private repositories.
                </p>
              </div>

              {/* Credits Information */}
              <AnimatePresence>
                {checkCredits.data && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Alert
                      variant={hasEnoughCredits ? "default" : "destructive"}
                      className={hasEnoughCredits ? "bg-orange-100 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800 text-orange-700 dark:text-orange-300" : ""}
                    >
                      <Info className="h-4 w-4" />
                      <AlertTitle>Credits Required</AlertTitle>
                      <AlertDescription>
                        <p>
                          This repository will cost{" "}
                          <strong>{checkCredits.data?.fileCount}</strong> credits.
                        </p>
                        <p>
                          You have{" "}
                          <strong>{checkCredits.data?.userCredits}</strong>{" "}
                          credits remaining.
                        </p>
                        {!hasEnoughCredits && (
                          <p className="text-red-600 dark:text-red-400 mt-1">
                            Insufficient credits. Please buy more credits.
                          </p>
                        )}
                      </AlertDescription>
                    </Alert>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={createProject.isPending || checkCredits.isPending || !hasEnoughCredits}
                className="w-full bg-violet-600 hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600 text-white transition-all duration-200"
              >
                {createProject.isPending || checkCredits.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {createProject.isPending ? "Creating Project..." : "Checking Credits..."}
                  </>
                ) : (
                  <>{checkCredits.data ? "Create Project" : "Check Credits"}</>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

export default CreatePage;