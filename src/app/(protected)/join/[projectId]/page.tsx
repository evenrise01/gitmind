import { db } from "@/server/db";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ projectId: string }>;
};

const JoinHandler = async (props: Props) => {
  // Await params to get the projectId
  const { projectId } = await props.params;

  // Check authentication
  const { userId } = await auth();
  if (!userId) {
    return redirect("/sign-in");
  }

  // Ensure user exists in the database
  const dbUser = await db.user.findUnique({
    where: { id: userId },
  });

  const client = await clerkClient();
  const user = await client.users.getUser(userId);

  if (!dbUser) {
    await db.user.create({
      data: {
        id: userId,
        imageUrl: user.imageUrl ?? "", // Handle potential null
        firstName: user.firstName ?? "", // Handle potential null
        lastName: user.lastName ?? "", // Handle potential null
        emailAddress: user.emailAddresses[0]?.emailAddress ?? "", // Handle potential undefined
      },
    });
  }

  // Verify project exists
  const project = await db.project.findUnique({
    where: { id: projectId },
  });
  if (!project) {
    return redirect("/dashboard?error=project-not-found");
  }

  // Join the project (idempotent operation)
  try {
    await db.userToProject.upsert({
      where: {
        userId_projectId: { userId, projectId }, // Composite key
      },
      create: {
        userId,
        projectId,
      },
      update: {}, // No update needed if already exists
    });
  } catch (error) {
    console.error(`Failed to join project ${projectId} for user ${userId}:`, error);
    return redirect("/dashboard?error=join-failed");
  }

  return redirect("/dashboard?success=joined");
};

export default JoinHandler;