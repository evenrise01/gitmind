"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { uploadFile } from "@/lib/firebase";
import { Check, HelpCircle, Presentation, Upload } from "lucide-react";
import React from "react";
import { useDropzone } from "react-dropzone";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { api } from "@/trpc/react";
import useProject from "@/hooks/use-project";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { cn } from "@/lib/utils";

const MeetingCard = () => {
  const { project } = useProject();
  const [isUploading, setIsUploading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const [dragActive, setDragActive] = React.useState(false);
  const [isSuccess, setIsSuccess] = React.useState(false); // Success state
  const router = useRouter();
  const uploadMeeting = api.project.uploadMeeting.useMutation();
  const [isDark, setIsDark] = React.useState(false);

  const processMeeting = useMutation({
    mutationFn: async (data: {
      meetingUrl: string;
      projectId: string;
      meetingId: string;
    }) => {
      const { meetingUrl, projectId, meetingId } = data;
      const response = await axios.post("/api/process-meeting", {
        meetingUrl,
        meetingId,
        projectId,
      });
      return response.data;
    },
  });

  React.useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });
    return () => observer.disconnect();
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "audio/*": [".mp3", ".wav", ".m4a"],
    },
    multiple: false,
    maxSize: 50_000_000,
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false),
    onDrop: async (acceptedFiles) => {
      setDragActive(false);
      if (!project) {
        toast.error("No active project found.");
        return;
      }
      setIsUploading(true);
      const file = acceptedFiles[0];
      if (!file) return;
      try {
        const downloadUrl = (await uploadFile(
          file as File,
          setProgress,
        )) as string;
        uploadMeeting.mutate(
          {
            projectId: project.id,
            meetingUrl: downloadUrl,
            name: file?.name,
          },
          {
            onSuccess: (meeting) => {
              toast.success("Meeting uploaded successfully. Check the meetings tab!");
              setIsSuccess(true); // Show success state
              setTimeout(() => {
                setIsSuccess(false); // Reset success state after animation
                setIsUploading(false); // Reset uploading state
                setProgress(0); // Reset progress
                // Do not navigate; stay on the same page
                processMeeting.mutateAsync({
                  meetingUrl: downloadUrl,
                  meetingId: meeting.id,
                  projectId: project.id,
                });
              }, 4000); // 2-second animation duration
            },
            onError: () => {
              toast.error("Failed to upload the meeting.");
              setIsUploading(false);
            },
          },
        );
      } catch (error) {
        console.error("Upload failed:", error);
        toast.error("Upload failed. Please try again.");
        setIsUploading(false);
      }
    },
  });

  return (
    <Card
      className={cn(
        "col-span-2 border-gray-200 bg-white transition-all duration-300 dark:border-gray-700 dark:bg-gray-800 min-h-[200px] w-full shadow-lg group",
        dragActive || isDragActive ? "ring-2 ring-violet-500 dark:ring-violet-400 scale-[1.01]" : "hover:shadow-xl",
        (isUploading || isSuccess) ? "cursor-default" : "cursor-pointer"
      )}
      {...((isUploading || isSuccess) ? {} : getRootProps())}
    >
      <CardHeader className={cn(
        "flex items-center justify-center pt-6",
        dragActive || isDragActive ? "pb-2" : "pb-4"
      )}>
        {!isUploading && !isSuccess && (
          <Presentation 
            className={cn(
              "h-12 w-12 text-violet-700 dark:text-violet-300 transition-transform duration-1000 animate-bounce"
            )}
          />
        )}
        {isSuccess && (
          <Check 
            className={cn(
              "h-12 w-12 text-green-500 dark:text-green-400 animate-[fadeInScale_0.5s_ease-in-out]",
              "transition-transform duration-500"
            )}
          />
        )}
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center px-6 pb-6 text-center">
        {!isUploading && !isSuccess && (
          <>
            <CardTitle className="text-lg md:text-xl text-gray-900 dark:text-white">
              Create a new meeting
            </CardTitle>
            <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
              Analyse your meetings with <span className="font-semibold text-violet-600 dark:text-violet-400">GitMind.</span>
              <br />
              Powered by AI.
            </p>
            <div className="mt-6 flex items-center gap-2">
              <Button
                disabled={isUploading}
                className="bg-violet-600 text-white hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600 font-medium transition-all duration-200 transform hover:scale-105"
                size="lg"
              >
                <Upload 
                  className="mr-2 h-5 w-5" 
                  aria-hidden="true" 
                />
                Upload Meeting
                <input className="hidden" {...getInputProps()} />
              </Button>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full border-violet-200 dark:border-violet-700">
                      <HelpCircle className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs max-w-xs">
                      Upload audio files (.mp3, .wav, .m4a) up to 50MB
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            {(dragActive || isDragActive) && (
              <div className="mt-4 p-3 bg-violet-50 dark:bg-violet-900/30 rounded-lg text-violet-700 dark:text-violet-300 text-sm animate-pulse">
                Drop your audio file here
              </div>
            )}
          </>
        )}
        {isUploading && (
          <div className="flex flex-col items-center w-full py-4">
            <div className="relative mb-2">
              <CircularProgressbar
                value={progress}
                text={`${progress}%`}
                className="size-24 md:size-32"
                styles={{
                  path: {
                    stroke: isDark ? "#a78bfa" : "#8B5CF6",
                    strokeWidth: 6,
                    transition: "stroke-dasharray 0.5s ease 0s",
                  },
                  trail: {
                    stroke: isDark ? "#4b5563" : "#e5e7eb",
                    strokeWidth: 6,
                  },
                  text: {
                    fill: isDark ? "#e5e7eb" : "#1f2937",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                  },
                }}
              />
            </div>
            <p className="mt-4 text-center text-sm font-medium text-gray-700 dark:text-gray-300">
              Uploading your meeting...
            </p>
            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
              This might take a few moments
            </p>
          </div>
        )}
        {isSuccess && (
          <div className="flex flex-col items-center w-full py-4">
            <p className="mt-4 text-center text-sm font-medium text-green-600 dark:text-green-400">
              Meeting uploaded successfully!
            </p>
          </div>
        )}
      </CardContent>
      {!isUploading && !isSuccess && (
        <CardFooter className="flex justify-center pb-6 pt-0 text-xs text-gray-400">
          <p>Supports .mp3, .wav, and .m4a files (max 50MB)</p>
        </CardFooter>
      )}
    </Card>
  );
};

export default MeetingCard;