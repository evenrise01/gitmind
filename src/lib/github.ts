import { db } from "@/server/db";
import { Octokit } from "octokit";
import axios from "axios";
import { aiSummarizeCommit } from "./gemini";

// Initialize Octokit with GitHub token for API authentication
export const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
});

// Example GitHub repository URL
const githubUrl = "https://github.com/docker/genai-stack";

// Type definition for commit response data
type Response = {
  commitHash: string;
  commitMessage: string;
  commitAuthorName: string;
  commitAuthorAvatar: string;
  commitDate: string;
};

/**
 * Retrieves the most recent commit hashes from a GitHub repository
 * @param githubUrl - URL of the GitHub repository
 * @returns Array of commit data objects (max 10 commits)
 */
export const getCommitHashes = async (
  githubUrl: string,
): Promise<Response[]> => {
  // Extract owner and repository name from GitHub URL
  const [owner, repo] = githubUrl.split("/").slice(-2);
  if (!owner || !repo) {
    throw new Error("Invalid github url");
  }
  
  // Fetch commits using GitHub API
  const { data } = await octokit.rest.repos.listCommits({
    owner,
    repo,
  });

  // Sort commits by date (newest first)
  const sortedCommits = data.sort(
    (a: any, b: any) =>
      new Date(b.commit.author.date).getTime() -
      new Date(a.commit.author.date).getTime(),
  ) as any[];

  // Return only the 10 most recent commits with selected fields
  return sortedCommits.slice(0, 10).map((commit: any) => ({
    commitHash: commit.sha as string,
    commitMessage: commit.commit.message ?? "",
    commitAuthorName: commit.commit?.author?.name ?? "",
    commitAuthorAvatar: commit?.author?.avatar_url ?? "",
    commitDate: commit.commit?.author.date ?? "",
  }));
};

/**
 * Polls for new commits, summarizes them, and stores them in the database
 * @param projectId - ID of the project to associate with commits
 * @returns Result of database operation
 */
export const pollCommits = async (projectId: string) => {
  // Get project's GitHub URL from database
  const { project, githubUrl } = await fetchProjectGithubUrl(projectId);
  
  // Get recent commits from GitHub
  const commitHashes = await getCommitHashes(githubUrl);
  
  // Filter out commits that have already been processed
  const unprocessedCommits = await filterUnprocessedCommits(
    projectId,
    commitHashes,
  );
  
  // Generate AI summaries for all unprocessed commits
  const summaryResponses = await Promise.allSettled(
    unprocessedCommits.map((commit) => {
      return summarizeCommit(githubUrl, commit.commitHash);
    }),
  );

  // Extract summaries from successful responses
  const summaries = summaryResponses.map((response) => {
    if(response.status === 'fulfilled'){
        return response.value as string
    }
    return ""
  });

  // Store new commits with summaries in the database
  const commits = await db.commit.createMany({
    data: summaries.map((summary, index) => {
        console.log(`processing commit ${index}`)
        return {
            projectId: projectId,
            commitHash: unprocessedCommits[index]?.commitHash,
            commitMessage: unprocessedCommits[index]?.commitMessage,
            commitAuthorName: unprocessedCommits[index]?.commitAuthorName,
            commitAuthorAvatar: unprocessedCommits[index]?.commitAuthorAvatar,
            commitDate: unprocessedCommits[index]?.commitDate,
            commitSummary: summary
        }
    })
  });

  return commits;
};

/**
 * Fetches and summarizes a specific commit's changes
 * @param githubUrl - URL of the GitHub repository
 * @param commitHash - SHA hash of the commit to summarize
 * @returns AI-generated summary of commit changes
 */
async function summarizeCommit(githubUrl: string, commitHash: string) {
  // Fetch the diff for this commit
  const { data } = await axios.get(`${githubUrl}/commit/${commitHash}.diff`, {
    headers: {
      Accept: "application/vnd.github.v3.diff",
    },
  });
  
  // Use AI to summarize the diff content
  return (await aiSummarizeCommit(data)) || "";
}

/**
 * Retrieves a project's GitHub URL from the database
 * @param projectId - ID of the project
 * @returns Object containing project data and GitHub URL
 */
async function fetchProjectGithubUrl(projectId: string) {
  const project = await db.project.findUnique({
    where: {
      id: projectId,
    },
    select: {
      githubUrl: true,
    },
  });

  if (!project?.githubUrl) {
    throw new Error("Project has no github url");
  }
  return { project, githubUrl: project?.githubUrl };
}

/**
 * Filters out commits that have already been processed and stored in the database
 * @param projectId - ID of the project
 * @param commitHashes - Array of commit data to filter
 * @returns Array of unprocessed commits
 */
async function filterUnprocessedCommits(
  projectId: string,
  commitHashes: Response[],
) {
  // Get all commits already processed for this project
  const processedCommits = await db.commit.findMany({
    where: {
      projectId,
    },
  });

  // Filter out commits that already exist in the database
  const unprocessedCommits = commitHashes.filter(
    (commit) =>
      !processedCommits.some(
        (processedCommit: { commitHash: string }) =>
          processedCommit.commitHash === commit.commitHash,
      ),
  );
  return unprocessedCommits;
}