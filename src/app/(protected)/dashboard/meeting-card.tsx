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

const MeetingCard = () => {
  const { project } = useProject();
  const [isUploading, setIsUploading] = React.useState(false);
  const [progress, setProgress] = React.useState(0);
  const router = useRouter()
  const uploadMeeting = api.project.uploadMeeting.useMutation();
  const [isDark, setIsDark] = React.useState(false); // Default to false, update in useEffect

  // Set initial theme and watch for changes (client-side only)
  React.useEffect(() => {
    // Set initial value
    setIsDark(document.documentElement.classList.contains("dark"));

    // Watch for theme changes
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Cleanup observer on unmount
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
      console.log(acceptedFiles);
      const file = acceptedFiles[0];
      if (!file) return;
      try {
        const downloadUrl = (await uploadFile(
          file as File,
          setProgress,
        )) as string;
        uploadMeeting.mutate({
          projectId: project.id,
          meetingUrl: downloadUrl,
          name: file?.name,
        }, {
          onSuccess: () => {
            toast.success("Meeting uploaded successfully!")
            router.push("/dashboard/meetings")
          },
          onError: () => {
            toast.error("Failed to upload the meeting.")
          }
        });
        console.log("Upload successful:", downloadUrl);
      } catch (error) {
        console.error("Upload failed:", error);
      }
      setIsUploading(false);
    },
  });

  return (
    <Card
      className="col-span-2 flex flex-col items-center justify-center border-gray-200 bg-white p-10 transition-colors duration-200 dark:border-gray-700 dark:bg-gray-800"
      {...getRootProps()}
    >
      {!isUploading && (
        <>
          <Presentation className="h-10 w-10 animate-bounce text-gray-700 dark:text-gray-200" />
          <h3 className="mt-2 text-sm font-semibold text-gray-900 dark:text-white">
            Create a new meeting
          </h3>
          <p className="mt-1 text-center text-sm text-gray-500 dark:text-gray-400">
            Analyse your meetings with GitMind
            <br />
            Powered by AI.
          </p>
          <div className="mt-6">
            <Button
              disabled={isUploading}
              className="bg-gray-900 text-white hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300"
            >
              <Upload className="-ml-0.5 mr-1.5 h-5 w-5" aria-hidden="true" />
              Upload Meeting
              <input className="hidden" {...getInputProps()} />
            </Button>
          </div>
        </>
      )}
      {isUploading && (
        <div className="flex flex-col items-center">
          <CircularProgressbar
            value={progress}
            text={`${progress}%`}
            className="size-20"
            styles={{
              root: {
                position: "relative",
              },
              path: {
                stroke: isDark ? "#60a5fa" : "#3b82f6", // Blue-400 for dark, Blue-500 for light
                strokeWidth: 6,
                transition: "stroke-dasharray 0.5s ease 0s",
              },
              trail: {
                stroke: isDark ? "#4b5563" : "#e5e7eb", // Gray-600 for dark, Gray-200 for light
                strokeWidth: 6,
              },
              text: {
                fill: isDark ? "#e5e7eb" : "#1f2937", // Gray-200 for dark, Gray-800 for light
                fontSize: "1.5rem",
                fontWeight: "bold",
                dominantBaseline: "middle",
                textAnchor: "middle",
              },
            }}
          />
          <p className="mt-2 text-center text-sm text-gray-500 dark:text-gray-400">
            Uploading your meeting...
          </p>
        </div>
      )}
    </Card>
  );
};

export default MeetingCard;
