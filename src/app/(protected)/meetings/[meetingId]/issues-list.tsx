"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RouterOutputs, api } from "@/trpc/react";
import { Calendar, Clock, Eye, Quote, Video, VideoIcon } from "lucide-react";
import React from "react";

type Props = {
  meetingId: string;
};

const IssuesList = ({ meetingId }: { meetingId: string }) => {
    const { data: meeting, isLoading } = api.project.getMeetingById.useQuery(
      { meetingId },
      { refetchInterval: 4000 },
    );
  
    if (isLoading || !meeting) return (
      <div className="flex items-center justify-center h-screen text-sm sm:text-base text-gray-600 dark:text-gray-400">
        Loading...
      </div>
    );
  
    return (
      <div className="p-4 sm:p-6 lg:p-8 bg-gray-50 dark:bg-gray-900 min-h-screen transition-colors duration-300">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-8 pb-4 sm:pb-6 border-b border-gray-200 dark:border-gray-700 transition-colors duration-200">
            <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto">
              <div className="rounded-full bg-white dark:bg-gray-800 p-2 sm:p-3 shadow-md transition-all duration-200">
                <Video className="h-5 w-5 sm:h-6 sm:w-6 text-gray-600 dark:text-gray-300" />
              </div>
              <h1 className="flex-1">
                <div className="text-xs sm:text-sm leading-6 text-gray-600 dark:text-gray-400 flex items-center gap-2">
                  <span>Meeting on</span>
                  <span className="font-medium">{meeting.createdAt.toLocaleDateString()}</span>
                </div>
                <div className="mt-1 text-base sm:text-lg md:text-xl font-semibold leading-6 text-gray-900 dark:text-gray-100 line-clamp-2">
                  {meeting.name}
                </div>
              </h1>
            </div>
          </div>
  
          <div className="h-4 sm:h-6" />
  
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {meeting.issues.map((issue) => (
              <IssueCard key={issue.id} issue={issue} />
            ))}
          </div>
        </div>
      </div>
    );
  };

function IssueCard({
    issue,
  }: {
    issue: NonNullable<
      RouterOutputs["project"]["getMeetingById"]
    >["issues"][number];
  }) {
    const [open, setOpen] = React.useState(false);
  
    return (
      <>
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="max-w-xs sm:max-w-md md:max-w-lg transition-all duration-300 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
            <DialogHeader>
              <DialogTitle className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Quote className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                {issue.gist}
              </DialogTitle>
              <DialogDescription className="text-sm sm:text-base text-gray-600 dark:text-gray-300 flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                {issue.createdAt.toLocaleDateString()}
              </DialogDescription>
              <p className="mt-2 text-sm sm:text-base text-gray-500 dark:text-gray-400 leading-relaxed">
                {issue.headline}
              </p>
              <blockquote className="mt-3 sm:mt-4 border-l-4 border-gray-300 dark:border-gray-600 bg-gray-50 dark:bg-gray-900/50 p-3 sm:p-4 rounded-r-lg transition-colors duration-200">
                <span className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2 mb-2">
                  <Clock className="h-4 w-4" />
                  {issue.start} - {issue.end}
                </span>
                <p className="font-medium italic text-sm sm:text-base leading-relaxed text-gray-900 dark:text-gray-100">
                  {issue.summary}
                </p>
              </blockquote>
            </DialogHeader>
          </DialogContent>
        </Dialog>
  
        <Card className="relative w-full max-w-md mx-auto overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-gray-100 line-clamp-2">
              {issue.gist}
            </CardTitle>
            <div className="border-b border-gray-200 dark:border-gray-700 my-2 transition-colors duration-200" />
            <CardDescription className="text-sm sm:text-base text-gray-600 dark:text-gray-300 line-clamp-3">
              {issue.headline}
            </CardDescription>
          </CardHeader>
          <CardContent className="p-4 sm:p-6">
            <Button
              onClick={() => setOpen(true)}
              className="w-full sm:w-auto bg-gray-900 text-white hover:bg-gray-700 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-300 transition-all duration-200 flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              <Eye className="h-4 w-4 sm:h-5 sm:w-5" />
              Details
            </Button>
          </CardContent>
        </Card>
      </>
    );
  }

export default IssuesList;
