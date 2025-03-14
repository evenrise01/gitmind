"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { uploadFile } from "@/lib/firebase";
import { Presentation, Upload } from "lucide-react";
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

const MeetingCard = () => {
  const { project } = useProject();
  const [isUploading, setIsUploading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
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

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "audio/*": [".mp3", ".wav", ".m4a"],
    },
    multiple: false,
    maxSize: 50_000_000,
    onDrop: async (acceptedFiles) => {
      if (!project) return;
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
              toast.success("Meeting uploaded successfully!");
              router.push("/meetings");
              processMeeting.mutateAsync({
                meetingUrl: downloadUrl,
                meetingId: meeting.id,
                projectId: project.id,
              });
            },
            onError: () => {
              toast.error("Failed to upload the meeting.");
            },
          },
        );
      } catch (error) {
        console.error("Upload failed:", error);
      }
      setIsUploading(false);
    },
  });

  return (
    <Card
      className="col-span-2 flex flex-col items-center justify-center border-gray-200 bg-white p-4 sm:p-6 md:p-10 transition-colors duration-200 dark:border-gray-700 dark:bg-gray-800 min-h-[200px] w-full max-w-2xl mx-auto"
      {...getRootProps()}
    >
      {!isUploading && (
        <>
          <Presentation 
            className="h-8 w-8 sm:h-10 sm:w-10 animate-bounce text-gray-700 dark:text-gray-200" 
          />
          <h3 className="mt-2 text-sm sm:text-base md:text-lg font-semibold text-gray-900 dark:text-white text-center">
            Create a new meeting
          </h3>
          <p className="mt-1 text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Analyse your meetings with <span className="font-semibold">GitMind.</span>
            <br />
            Powered by AI.
          </p>
          <div className="mt-4 sm:mt-6">
            <Button
              disabled={isUploading}
              className="bg-gray-900 text-white hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300 text-sm sm:text-base py-2 px-3 sm:px-4"
            >
              <Upload 
                className="-ml-0.5 mr-1.5 h-4 w-4 sm:h-5 sm:w-5" 
                aria-hidden="true" 
              />
              Upload Meeting
              <input className="hidden" {...getInputProps()} />
            </Button>
          </div>
        </>
      )}
      {isUploading && (
        <div className="flex flex-col items-center w-full">
          <CircularProgressbar
            value={progress}
            text={`${progress}%`}
            className="size-16 sm:size-20"
            styles={{
              root: {
                position: "relative",
              },
              path: {
                stroke: isDark ? "#60a5fa" : "#3b82f6",
                strokeWidth: 6,
                transition: "stroke-dasharray 0.5s ease 0s",
              },
              trail: {
                stroke: isDark ? "#4b5563" : "#e5e7eb",
                strokeWidth: 6,
              },
              text: {
                fill: isDark ? "#e5e7eb" : "#1f2937",
                fontSize: "1.25rem sm:1.5rem",
                fontWeight: "bold",
                dominantBaseline: "middle",
                textAnchor: "middle",
              },
            }}
          />
          <p className="mt-2 text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400">
            Uploading your meeting...
          </p>
        </div>
      )}
    </Card>
  );
};

export default MeetingCard;