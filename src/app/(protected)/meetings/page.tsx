"use client";

import useProject from "@/hooks/use-project";
import { api } from "@/trpc/react";
import MeetingCard from "../dashboard/meeting-card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarClock, Eye, Plus, Trash2, Loader2 } from "lucide-react";
import useRefetch from "@/hooks/use-refetch";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { useState } from "react";

const MeetingsPage = () => {
  const { projectId } = useProject();
  const refetch = useRefetch();
  const [meetingToDelete, setMeetingToDelete] = useState<string | null>(null);
  
  const { data: meetings, isLoading } = api.project.getMeetings.useQuery(
    { projectId },
    { refetchInterval: 4000 },
  );
  
  const deleteMeeting = api.project.deleteMeeting.useMutation();

  const handleDeleteMeeting = (meetingId: string) => {
    deleteMeeting.mutate(
      { meetingId },
      {
        onSuccess: () => {
          toast.success("Meeting deleted successfully");
          refetch();
          setMeetingToDelete(null);
        },
        onError: (error) => {
          toast.error(error.message || "Failed to delete meeting");
        }
      }
    );
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Meetings</h1>
          <p className="text-sm text-muted-foreground">
            View and manage your project meetings
          </p>
        </div>
      </div>
      
      <div className="flex items-center justify-center w-full">
        <MeetingCard />
        </div>

      <Card className="w-full">
        <CardHeader className="pb-3">
          <CardTitle className="text-lg flex items-center">
            <CalendarClock className="mr-2 h-5 w-5 text-primary" />
            Meeting History
          </CardTitle>
          <CardDescription>
            {meetings?.length 
              ? `You have ${meetings.length} recorded meeting${meetings.length > 1 ? 's' : ''}`
              : "No meetings recorded yet"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading && (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between gap-x-4 gap-y-2 py-3">
                  <div className="flex-1 space-y-2">
                    <Skeleton className="h-5 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                  </div>
                  <div className="flex gap-2">
                    <Skeleton className="h-9 w-20" />
                    <Skeleton className="h-9 w-20" />
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {!isLoading && meetings && meetings.length === 0 && (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <CalendarClock className="h-12 w-12 text-muted-foreground mb-4 opacity-50" />
              <h3 className="text-lg font-medium">No meetings yet</h3>
              <p className="text-sm text-muted-foreground mt-2 max-w-sm">
                Create your first meeting to start tracking issues and action items
              </p>
              <Button className="mt-4" size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Create Meeting
              </Button>
            </div>
          )}
          
          {!isLoading && meetings && meetings.length > 0 && (
            <div className="divide-y divide-border -mx-6">
              {meetings.map((meeting) => (
                <div
                  key={meeting.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between gap-x-4 gap-y-2 py-3 px-6 hover:bg-muted/50 transition-colors"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/meetings/${meeting.id}`}
                        className="text-sm sm:text-base font-medium hover:underline truncate"
                      >
                        {meeting.name}
                      </Link>
                      {meeting.status === "PROCESSING" && (
                        <Badge variant="outline" className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20 dark:bg-yellow-500/20 dark:text-yellow-400 dark:border-yellow-500/30">
                          <Loader2 className="h-3 w-3 mr-1 animate-spin" />
                          Processing
                        </Badge>
                      )}
                    </div>
                    <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs sm:text-sm text-muted-foreground">
                      <div className="flex items-center">
                        <CalendarClock className="mr-1 h-3.5 w-3.5 opacity-70" />
                        {new Date(meeting.createdAt).toLocaleDateString(undefined, { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </div>
                      <div className="flex items-center">
                        <Badge variant="secondary" className="text-xs">
                          {meeting.issues.length} issue{meeting.issues.length !== 1 ? 's' : ''}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-2 mt-2 sm:mt-0">
                    <Link href={`/meetings/${meeting.id}`}>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-9"
                      >
                        <Eye className="h-4 w-4 sm:mr-1" />
                        <span className="hidden sm:inline">View</span>
                      </Button>
                    </Link>
                    <AlertDialog open={meetingToDelete === meeting.id} onOpenChange={(open) => !open && setMeetingToDelete(null)}>
                      <AlertDialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="destructive"
                          className="h-9"
                          onClick={() => setMeetingToDelete(meeting.id)}
                        >
                          <Trash2 className="h-4 w-4 sm:mr-1" />
                          <span className="hidden sm:inline">Delete</span>
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Delete Meeting</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to delete this meeting? This action cannot be undone.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                            onClick={() => handleDeleteMeeting(meeting.id)}
                            disabled={deleteMeeting.isPending}
                          >
                            {deleteMeeting.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Delete
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default MeetingsPage;