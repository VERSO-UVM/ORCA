// Writes a student's onboarding checklist into their tracking issue in the
// private, staff-only VERSO-UVM/orca-onboarding repository.
//
// Run by that repository's workflow when a tracking issue is opened or edited:
//   node scripts/onboarding-checklist.mjs
// It reads the issue from GITHUB_EVENT_PATH and updates it with GITHUB_TOKEN.
//
// The checklist follows the issue's answers (new or returning, Pod lead,
// focus areas) and the task files in onboarding/tasks/. It only ever adds:
// ticking a focus area later adds that area's tasks, and existing ticks and
// tasks are kept. No dependencies; runs with Node 18+ or Bun.

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { FOCUS, SITE, anchor, onPath, readTasks } from "./onboarding-tasks.mjs";

const START = "<!-- checklist:start -->";
const END = "<!-- checklist:end -->";

// The answers in a GitHub issue form body, by heading.
export function parseForm(body) {
  const form = {};
  const parts = body.replace(/\r\n/g, "\n").split(/^### /m).slice(1);
  for (const part of parts) {
    const nl = part.indexOf("\n");
    form[part.slice(0, nl).trim()] = part.slice(nl + 1).split(START)[0].trim();
  }
  return form;
}

const ticked = (text = "") => [...text.matchAll(/^- \[[xX]\] (.+)$/gm)].map((m) => m[1].trim());

// A student's path from the issue form's answers.
export function pathFromForm(form) {
  const areaLabels = ticked(form["Focus areas"]);
  return {
    status: /return/i.test(form["Status"] || "") ? "returning" : "new",
    lead: ticked(form["Pod lead"]).length > 0,
    areas: FOCUS.filter((f) => areaLabels.includes(f.label)).map((f) => f.key),
  };
}

const minutes = (m) => (m < 60 ? `${m} min` : `${Math.round(m / 30) / 2} h`);
const line = (t) => `- [ ] [${t.id}](${SITE}#${anchor(t)}) ${t.title} · about ${minutes(t.minutes)}`;

// The issue body with its checklist added or brought up to date, or null if
// nothing changes.
export function withChecklist(body, tasks) {
  const path = pathFromForm(parseForm(body));
  const wanted = tasks.filter((t) => onPath(t, path));
  const s = body.indexOf(START);
  const e = body.indexOf(END);

  if (s < 0 || e < s) {
    const block = [
      START,
      "## Checklist",
      "",
      "Tick a task when its reflection arrives through the reflection form. Tick another focus area above to add its tasks.",
      "",
      ...wanted.map(line),
      END,
    ].join("\n");
    return `${body.trimEnd()}\n\n${block}\n`;
  }

  const current = body.slice(s, e);
  const missing = wanted.filter((t) => !current.includes(`[${t.id}]`));
  if (!missing.length) return null;
  const note = `\n_Added ${new Date().toISOString().slice(0, 10)}:_\n${missing.map(line).join("\n")}\n`;
  return body.slice(0, e).trimEnd() + "\n" + note + body.slice(e);
}

async function main() {
  const event = JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, "utf8"));
  const issue = event.issue;
  if (!issue.labels.some((l) => l.name === "onboarding")) {
    console.log("Not an onboarding tracking issue; nothing to do.");
    return;
  }
  const next = withChecklist(issue.body || "", readTasks());
  if (next === null) {
    console.log("Checklist is up to date.");
    return;
  }
  const api = process.env.GITHUB_API_URL || "https://api.github.com";
  const res = await fetch(`${api}/repos/${process.env.GITHUB_REPOSITORY}/issues/${issue.number}`, {
    method: "PATCH",
    headers: {
      authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      accept: "application/vnd.github+json",
      "x-github-api-version": "2022-11-28",
    },
    body: JSON.stringify({ body: next }),
  });
  if (!res.ok) throw new Error(`GitHub API ${res.status}: ${await res.text()}`);
  console.log(`Updated the checklist on issue #${issue.number}.`);
}

if (process.argv[1] && resolve(fileURLToPath(import.meta.url)) === resolve(process.argv[1])) {
  main().catch((err) => {
    console.error(err.message);
    process.exit(1);
  });
}
