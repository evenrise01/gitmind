import { GithubRepoLoader } from "@langchain/community/document_loaders/web/github";
import { Document } from "@langchain/core/documents";
import { generateEmbedding, summarizeCode } from "./gemini";
import { db } from "@/server/db";

/**
 * Loads a GitHub repository's content using LangChain's GithubRepoLoader
 * @param githubUrl - URL of the GitHub repository to load
 * @param githubToken - Optional GitHub access token for private repositories
 * @returns Array of Document objects containing the repository's files
 */
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
