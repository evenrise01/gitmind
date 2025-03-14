"use client";

import useProject from "@/hooks/use-project";
import { api } from "@/trpc/react";
import MeetingCard from "../dashboard/meeting-card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const MeetingsPage = () => {
  const { projectId } = useProject();
  const { data: meetings, isLoading } = api.project.getMeetings.useQuery(
    { projectId },
    { refetchInterval: 4000 },
  );

  return (
    <div className="space-y-6 p-6">
      <MeetingCard />
      <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
        Meetings
      </h1>

      {isLoading && (
        <p className="text-sm text-gray-500 dark:text-gray-400">Loading...</p>
      )}
      {meetings && meetings.length === 0 && (
        <p className="text-sm text-gray-500 dark:text-gray-400">
          No meetings found.
        </p>
      )}
      {meetings && meetings.length > 0 && (
        <ul className="divide-y divide-gray-200 dark:divide-gray-700">
          {meetings.map((meeting) => (
            <li
              key={meeting.id}
              className="py-4 flex items-center justify-between gap-x-4"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/meeting/${meeting.id}`}
                    className="text-sm font-medium text-gray-900 dark:text-gray-100 hover:underline"
                  >
                    {meeting.name}
                  </Link>
                  {meeting.status === "PROCESSING" && (
                    <Badge className="bg-yellow-500 text-white text-xs">
                      Processing
                    </Badge>
                  )}
                </div>
                <div className="mt-1 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                  <p>{meeting.createdAt.toLocaleDateString()}</p>
                  <p>{meeting.issues.length} issues</p>
                </div>
              </div>
              <div className="flex-none">
                <Link href={`/meeting/${meeting.id}`}>
                  <Button
                    variant="outline"
                    className="text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 text-sm"
                  >
                    View
                  </Button>
                </Link>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MeetingsPage;