"use client";

import useProject from "@/hooks/use-project";
import { api } from "@/trpc/react";
import MeetingCard from "../dashboard/meeting-card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Trash2 } from "lucide-react";
import useRefetch from "@/hooks/use-refetch";
import { toast } from "sonner";

const MeetingsPage = () => {
  const { projectId } = useProject();
  const refetch = useRefetch();
  const { data: meetings, isLoading } = api.project.getMeetings.useQuery(
    { projectId },
    { refetchInterval: 4000 },
  );
  const deleteMeeting = api.project.deleteMeeting.useMutation();

  return (
    <div className="space-y-4 p-4 sm:p-6 lg:p-8">
      <MeetingCard />
      <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-900 dark:text-gray-100">
        Meetings
      </h1>

      {isLoading && (
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">Loading...</p>
      )}
      {meetings && meetings.length === 0 && (
        <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400">
          No meetings found.
        </p>
      )}
      {meetings && meetings.length > 0 && (
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {meetings.map((meeting) => (
            <li
              key={meeting.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-x-4 gap-y-2 py-3 sm:py-4"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/meetings/${meeting.id}`}
                    className="text-sm sm:text-base font-medium text-gray-900 hover:underline dark:text-gray-100 truncate"
                  >
                    {meeting.name}
                  </Link>
                  {meeting.status === "PROCESSING" && (
                    <Badge className="bg-yellow-500 text-xs text-white">
                      Processing
                    </Badge>
                  )}
                </div>
                <div className="mt-1 flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-500 dark:text-gray-400">
                  <p>{meeting.createdAt.toLocaleDateString()}</p>
                  <p>{meeting.issues.length} issues</p>
                </div>
              </div>
              <div className="flex-none flex gap-2 sm:gap-4">
                <Link href={`/meetings/${meeting.id}`}>
                  <Button
                    size={"sm"}
                    variant="outline"
                    className="w-full sm:w-auto border-gray-300 text-xs sm:text-sm text-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    <Eye className="h-4 w-4 mr-1" />
                    <span className="hidden sm:inline">View Meeting</span>
                    <span className="sm:hidden">View</span>
                  </Button>
                </Link>
                <Button
                  disabled={deleteMeeting.isPending}
                  variant={"destructive"}
                  onClick={() =>
                    deleteMeeting.mutate(
                      { meetingId: meeting.id },
                      {
                        onSuccess: () => {
                          toast.success("Meeting deleted successfully");
                          refetch();
                        },
                      },
                    )
                  }
                  size={"sm"}
                  className="w-full sm:w-auto"
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  <span className="hidden sm:inline">Delete Meeting</span>
                  <span className="sm:hidden">Delete</span>
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MeetingsPage;