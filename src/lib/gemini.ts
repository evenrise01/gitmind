import { GoogleGenerativeAI } from "@google/generative-ai";
import { Document } from "@langchain/core/documents";

// Initialize the Google Generative AI client with the API key from environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Configure the generative model to use Gemini 1.5 Flash
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

/**
 * Summarizes a git commit diff using Gemini AI
 * @param diff - The git diff content to summarize
 * @returns A summary of the changes in the commit
 */
export const aiSummarizeCommit = async (diff: string) => {
  //https://github.com/docker/genai-stack/commit/<commithash>.diff
  const response = await model.generateContent([
    // System prompt that explains git diff format and provides examples of good summaries
    `You are an expert programmer, and you are trying to summarize a git.
        Reminders about the git diff format:
        For every file, there are a few metadata lines, like (for example):
        \'\'\'
        diff --git a/lib/index.js b/lib/index.js
        index aadf691..bfef603 100644
        --- a/lib/index.js
        +++ b/lib/index.js
        \'\'\'\'
        This means that \'lib/index.js\' was modified in this commit. Note that this is only an example.
        Then there is a specifier of the lines that were modified.
        A line starting with \'+\' means it was added.
        A line that starting with \'-\' means line was deleted.
        A line that starts with neither \'+\' or \'-\' is code given for context and better understanding.
        It is not part of the diff.
        [...]
        EXAMPLE SUMMARY COMMENTS:
        \'\'\'
        * Raised the amount of returned recordings from \'10\' to \'100\' [packages/server/recordings_api.ts], [packages/server/constants.ts]
        * Fixed a typo in the github action name [.github/workflow/gpt-commit-summarizer.yml]
        * Moved the \'octokit\' initialization to a separate file [src/octokit.ts], [src/index.ts]
        * Added an OpenAI API for completions [packages/utils/apis/openai.ts]
        * Lowered numeric tolerance for test files
        \'\'\'
        Most commits will have less comments than this example list.
        The last comment does not include the file names,
        because there were more than two relevant files in the hypothetical commit.
        Do not include parts of the example in your summary.
        It is given only as an example of appropriate comments.`,
    // User prompt that includes the diff to be summarized
    `Please summarize the following diff file: \n\n${diff}`,
  ]);

  return response.response.text();
};

/**
 * Generates a concise summary of a code file for onboarding junior engineers
 * @param doc - Document object containing the code and metadata
 * @returns A summary of the code's purpose, limited to 100 words
 */
export async function summarizeCode(doc: Document) {
  console.log("Getting summary for", doc.metadata.source);

  try {
    // Limit code to 10,000 characters to avoid token limitations
    const code = doc.pageContent.slice(0, 10000);
    const response = await model.generateContent([
      // System prompt that establishes the role and context
      `You are an intelligent senior software engineer who specializes in onboarding junior software engineersonto projects`,
      // User prompt that includes the file path and code to summarize
      `You are onboarding a junior software engineer and explaining to them the purpose of the ${doc.metadata.source} file
          Here is the code: 
          ---
          ${code}
          ---
          Give a summary no more than 100 words of the above code`,
    ]);

    return response.response.text();
  } catch (error) {
    // Return empty string if summarization fails
    return "";
  }
}

/**
 * Generates vector embeddings for a text summary using Google's text embedding model
 * @param summary - The text to convert into embeddings
 * @returns An array of numerical values representing the embedding vector
 */
export async function generateEmbedding(summary: string) {
  // Create a separate model instance for text embeddings
  const model = genAI.getGenerativeModel({
    model: "text-embedding-004",
  });
  // Generate embeddings from the summary text
  const result = await model.embedContent(summary);
  const embedding = result.embedding;
  return embedding.values;
}