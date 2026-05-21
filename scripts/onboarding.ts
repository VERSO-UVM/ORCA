import { Octokit } from "@octokit/core";
import { restEndpointMethods } from "@octokit/plugin-rest-endpoint-methods";
import { readFile } from "fs/promises";
import { z } from "zod";
import { join } from "path";

const contextSchema = z.object({
  issueNumber: z.number().int(),
  issueBody: z.string().min(1),
  repoOwner: z.string().min(1),
  repoName: z.string().min(1),
});

const OctokitWithREST = Octokit.plugin(restEndpointMethods);
const octo = new OctokitWithREST({ auth: Bun.env.GITHUB_TOKEN });

// --------- Main script ---------

// Read context information
const contextRaw = (await readFile("context.json")).toString();

const context = contextSchema.parse(JSON.parse(contextRaw));

// Parse the selected task name from the issue body
const taskMatch = context.issueBody.match(/### Select the onboarding task\s+\n(.+)/);
const taskName = taskMatch?.[1]?.trim();

if (!taskName) {
  console.error("No task found in issue body");
  process.exit(1);
}

// Derive filename from task name: spaces become underscores
const taskFile = `OB_${taskName.replaceAll(" ", "_")}.md`;
const taskContent = (await readFile(join("tasks", taskFile))).toString();

// Comment on the issue with the task content

const commentContent = "Here is your task:  \n---\n" + taskContent;

await octo.rest.issues.createComment({
  owner: context.repoOwner,
  repo: context.repoName,
  issue_number: context.issueNumber,
  body: commentContent,
});

console.log("Context:\n", JSON.parse(contextRaw));
