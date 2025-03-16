import { GithubRepoLoader } from "@langchain/community/document_loaders/web/github";
import { Document } from "@langchain/core/documents";
import { generateEmbedding, summarizeCode } from "./gemini";
import { db } from "@/server/db";
import { Octokit } from "octokit";
import { array } from "zod";

/**
 * Loads a GitHub repository's content using LangChain's GithubRepoLoader
 * @param githubUrl - URL of the GitHub repository to load
 * @param githubToken - Optional GitHub access token for private repositories
 * @returns Array of Document objects containing the repository's files
 */

// Recursively counts the total number of files in a GitHub repository starting from a given path
const getFileCount = async (
  path: string, // The path in the repository to start counting from (e.g., "" for root, "src" for a folder)
  octokit: Octokit, // Octokit instance to interact with the GitHub API
  githubOwner: string, // Owner of the repository (e.g., a username or organization)
  githubRepo: string, // Name of the repository
  acc: number = 0, // Accumulator to track the total file count across recursive calls, defaults to 0
): Promise<number> => {
  // Fetch the contents of the repository at the specified path using the GitHub API
  const { data } = await octokit.rest.repos.getContent({
    owner: githubOwner,
    repo: githubRepo,
    path,
  });

  // Base case: If the path points to a single file (data is not an array and type is "file")
  if (!Array.isArray(data) && data.type === "file") {
    return acc + 1; // Increment the accumulator by 1 for this file and return
  }

  // Recursive case: If the path points to a directory (data is an array of items)
  if (Array.isArray(data)) {
    let fileCount = 0; // Track the number of files directly in this directory
    const directories: string[] = []; // Store paths of subdirectories to process recursively

    // Iterate over each item in the directory
    for (const item of data) {
      if (item.type === "dir") {
        // If the item is a directory, add its path to the directories array for recursive processing
        directories.push(item.path);
      } else {
        // If the item is a file, increment the file count for this directory
        fileCount++;
      }
    }

    // If there are subdirectories, recursively count the files in each one
    if (directories.length > 0) {
      // Use Promise.all to process all subdirectories in parallel
      const directoryCounts = await Promise.all(
        directories.map((dirPath) =>
          getFileCount(dirPath, octokit, githubOwner, githubRepo, 0)
        )
      );
      // Sum the file counts from all subdirectories and add to the current fileCount
      fileCount += directoryCounts.reduce((sum, count) => sum + count, 0);
    }

    // Return the accumulator plus the total file count for this directory (including its subdirectories)
    return acc + fileCount;
  }

  // Edge case: If data is neither a file nor a directory, return the accumulator unchanged
  return acc;
};

export default getFileCount;

export const checkCredits = async (githubUrl: string, githubToken?: string) => {
  //Find out how many files are there in the repo

  const octokit = new Octokit({ auth: githubToken });
  const githubOwner = githubUrl.split("/")[3];
  const githubRepo = githubUrl.split("/")[4];

  if (!githubOwner || !githubRepo) {
    return 0;
  }
 const fileCount = await getFileCount('', octokit, githubOwner, githubRepo, 0)
 return fileCount
};

export const loadGithubRepo = async (
  githubUrl: string,
  githubToken?: string,
) => {
  // Initialize the GitHub repo loader with configuration options
  const loader = new GithubRepoLoader(githubUrl, {
    accessToken: githubToken || "",
    branch: "main",
    // Ignore package lock files to reduce noise
    ignoreFiles: [
      "package-lock.json",
      "yarn.lock",
      "pnpm-lock.yaml",
      "bun.lockb",
    ],
    recursive: true, // Process all subdirectories
    unknown: "warn", // Warn about unknown file types
    maxConcurrency: 5, // Limit concurrent file processing
  });
  // Load all documents from the repository
  const docs = await loader.load();
  return docs;
};

/**
 * Indexes a GitHub repository by generating summaries and embeddings for its files
 * and storing them in the database
 * @param projectId - ID of the project to associate with the indexed files
 * @param githubUrl - URL of the GitHub repository to index
 * @param githubToken - Optional GitHub access token for private repositories
 */
export const indexGithubRepo = async (
  projectId: string,
  githubUrl: string,
  githubToken?: string,
) => {
  // Load all repository files
  const docs = await loadGithubRepo(githubUrl, githubToken);
  // Generate embeddings for all documents
  const allEmbeddings = await generateEmbeddings(docs);

  // Store embeddings in database - using Promise.allSettled to continue even if some operations fail
  await Promise.allSettled(
    allEmbeddings.map(async (embedding, index) => {
      console.log(`Processing ${index} of ${allEmbeddings.length}`);
      if (!embedding) return;

      // First create the basic embedding record
      const sourceCodeEmbedding = await db.sourceCodeEmbedding.create({
        data: {
          summary: embedding.summary,
          sourceCode: embedding.sourceCode,
          fileName: embedding.fileName,
          projectId,
        },
      });

      // Then update the record with the vector embedding using raw SQL
      // This is needed because Prisma doesn't directly support the pgvector type
      await db.$executeRaw`
    UPDATE "SourceCodeEmbedding"
    SET "summaryEmbedding" = ${embedding.embedding}::vector
    WHERE "id" = ${sourceCodeEmbedding.id}
    `;
    }),
  );
};

/**
 * Process an array of documents to generate summaries and embeddings for each file
 * @param docs - Array of Document objects containing file contents and metadata
 * @returns Array of objects containing summaries, embeddings, source code, and file names
 */
const generateEmbeddings = async (docs: Document[]) => {
  return await Promise.all(
    docs.map(async (doc) => {
      // Generate a summary of the code file using Gemini AI
      const summary = await summarizeCode(doc);
      // Generate vector embeddings for the summary
      const embedding = await generateEmbedding(summary);
      return {
        summary,
        embedding,
        // Convert to JSON and back to handle any serialization issues
        sourceCode: JSON.parse(JSON.stringify(doc.pageContent)),
        fileName: doc.metadata.source,
      };
    }),
  );
};
