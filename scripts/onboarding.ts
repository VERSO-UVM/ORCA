import { Octokit } from "@octokit/core";
import { restEndpointMethods } from "@octokit/plugin-rest-endpoint-methods";
import { readFile } from "fs/promises";
import { z } from "zod";
import { join } from "path";

// --------- Constants and stuff ---------

const contextSchema = z.object({
  issueNumber: z.number().int(),
  issueBody: z.string().min(1),
  repoOwner: z.string().min(1),
  repoName: z.string().min(1),
});

const taskNameToFileMap = {
  "Create ORCiD": "OB_CreateORCiD.md",
  "First Day on Github": "OB_FirstDayOnGithub.md",
  "First Week on Github": "OB_FirstWeekOnGithub.md",
  "NASA Open Science Modules": "OB_NASAOpenScienceModules.md",
  "OSS Licensing Introduction": "OB_OSSLicensingIntroduction.md",
  "Review ORCA Handbook": "OB_ReviewORCAHandbook.md",
  "Review Turing Project Design Guide": "OB_ReviewTuringProjectDesignGuide.md",
  "Explore Open Resource Library": "OB_ExploreOpenResourceLibrary.md",
  "Record Audio Evaluation": "OB_RecordAudioEvaluation.md",
} as const;

const OctokitWithREST = Octokit.plugin(restEndpointMethods);
const octo = new OctokitWithREST({ auth: Bun.env.GITHUB_TOKEN });

// --------- Main script ---------

// Read context information
const contextRaw = (await readFile("context.json")).toString();

const context = contextSchema.parse(JSON.parse(contextRaw));

// Find onboarding task from issue body
const taskName = Object.keys(taskNameToFileMap).find((taskName) =>
  context.issueBody.includes(taskName)
);

if (!taskName) {
  console.error("No task found in issue body");
  process.exit(1);
}

// Get task information from file
const taskFile = taskNameToFileMap[taskName as keyof typeof taskNameToFileMap];
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
