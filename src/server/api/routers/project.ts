import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { pollCommits } from "@/lib/github";
import { indexGithubRepo } from "@/lib/github-loader";

// Define schemas for reusability and clarity
const projectIdSchema = z.object({ projectId: z.string() });
const meetingIdSchema = z.object({ meetingId: z.string() });

export const projectRouter = createTRPCRouter({
  createProject: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1, "Project name is required"),
        githubUrl: z.string().url("Invalid GitHub URL"),
        githubToken: z.string().optional(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const project = await ctx.db.project.create({
        data: {
          githubUrl: input.githubUrl,
          name: input.name,
          userToProjects: {
            create: {
              userId: ctx.user.userId!, // Safe due to protectedProcedure
            },
          },
        },
      });

      // Run async tasks in background without awaiting to improve response time
      Promise.all([
        indexGithubRepo(project.id, input.githubUrl, input.githubToken).catch(
          (error) =>
            console.error(
              `Failed to index GitHub repo for project ${project.id}:`,
              error,
            ),
        ),
        pollCommits(project.id).catch((error) =>
          console.error(
            `Failed to poll commits for project ${project.id}:`,
            error,
          ),
        ),
      ]);

      return project;
    }),

  getProjects: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.project.findMany({
      where: {
        userToProjects: {
          some: {
            userId: ctx.user.userId!, // Safe due to protectedProcedure
          },
        },
        deletedAt: null,
      },
      orderBy: { createdAt: "desc" }, // Added for consistent ordering
    });
  }),

  getCommits: protectedProcedure
    .input(projectIdSchema)
    .query(async ({ ctx, input }) => {
      // Run pollCommits in background
      pollCommits(input.projectId).catch((error) =>
        console.error(
          `Failed to poll commits for project ${input.projectId}:`,
          error,
        ),
      );
      return await ctx.db.commit.findMany({
        where: { projectId: input.projectId },
        orderBy: { createdAt: "desc" }, // Added for consistency
      });
    }),

  saveAnswer: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
        question: z.string().min(1, "Question is required"),
        answer: z.string().min(1, "Answer is required"),
        filesReferences: z.any(), // Consider typing this more strictly if possible
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.question.create({
        data: {
          answer: input.answer,
          filesReferences: input.filesReferences,
          projectId: input.projectId,
          question: input.question,
          userId: ctx.user.userId!,
        },
      });
    }),

  getQuestions: protectedProcedure
    .input(projectIdSchema)
    .query(async ({ ctx, input }) => {
      return await ctx.db.question.findMany({
        where: { projectId: input.projectId },
        include: { user: true },
        orderBy: { createdAt: "desc" },
      });
    }),

  uploadMeeting: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
        meetingUrl: z.string().url("Invalid meeting URL"),
        name: z.string().min(1, "Meeting name is required"),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.meeting.create({
        data: {
          meetingUrl: input.meetingUrl,
          projectId: input.projectId,
          name: input.name,
          status: "PROCESSING",
        },
      });
    }),

  getMeetings: protectedProcedure
    .input(projectIdSchema)
    .query(async ({ ctx, input }) => {
      return await ctx.db.meeting.findMany({
        where: { projectId: input.projectId },
        include: { issues: true },
        orderBy: { createdAt: "desc" }, // Added for consistency
      });
    }),

  deleteMeeting: protectedProcedure
    .input(meetingIdSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.meeting.delete({
        where: { id: input.meetingId },
      });
    }),

  getMeetingById: protectedProcedure
    .input(meetingIdSchema)
    .query(async ({ ctx, input }) => {
      return await ctx.db.meeting.findUnique({
        where: { id: input.meetingId },
        include: { issues: true },
      });
    }),

  archiveProject: protectedProcedure
    .input(projectIdSchema)
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.project.update({
        where: { id: input.projectId },
        data: { deletedAt: new Date() },
      });
    }),

  getTeamMembers: protectedProcedure
    .input(z.object({ projectId: z.string() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.userToProject.findMany({
        where: {
          projectId: input.projectId,
        },
        include: { user: true },
      });
    }),

  getMyCredits: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.user.findUnique({
      where: { id: ctx.user.userId! },
      select: { credits: true },
    });
  }),
});

// Export type for client-side usage
export type ProjectRouter = typeof projectRouter;
