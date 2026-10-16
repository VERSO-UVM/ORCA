// Reads and checks the onboarding task files in onboarding/tasks/.
// Shared by build-onboarding.mjs (the website) and onboarding-checklist.mjs
// (the staff tracking issues). No dependencies; runs with Node 18+ or Bun.

import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

export const TASKS_DIR = join(dirname(fileURLToPath(import.meta.url)), "..", "onboarding", "tasks");
export const SITE = "https://verso-uvm.github.io/ORCA/";

// Groups in page order. Tasks sort by number within a group.
export const GROUPS = [
  { area: "ADM", title: "Before your first day", note: "Admin steps for new students." },
  { area: "CORE", title: "Everyone", note: "Policies, AI use, open science and goals." },
  { area: "GIT", title: "GitHub skills", note: "Skip any course you already know." },
  { area: "GIS", title: "GIS work", note: "For anyone doing GIS work now." },
  { area: "SW", title: "Software work", note: "For anyone doing software work now." },
  { area: "DS", title: "Data science work", note: "For anyone doing data science work now." },
  { area: "AI", title: "AI work", note: "For anyone doing AI work now." },
  { area: "LEAD", title: "Pod leads", note: "For students leading a Pod." },
  { area: "RET", title: "Returning students", note: "What to do when you come back for another semester." },
];
export const FOCUS = [
  { key: "gis", label: "GIS" },
  { key: "sw", label: "Software" },
  { key: "ds", label: "Data Science" },
  { key: "ai", label: "AI" },
];
export const FOCUS_LABEL = Object.fromEntries(FOCUS.map((f) => [f.key, f.label]));
export const FINISH = new Set(["reflection", "reflection-weekly", "confirm", "orcid", "pr-link", "initials-date"]);

function parseValue(raw) {
  let v = raw.trim();
  if (!v.startsWith('"')) v = v.replace(/\s+#.*$/, "");
  if (/^".*"$/.test(v)) return v.slice(1, -1);
  if (/^\[.*\]$/.test(v)) return v.slice(1, -1).split(",").map((s) => s.trim()).filter(Boolean);
  if (v === "true" || v === "false") return v === "true";
  if (/^\d+$/.test(v)) return Number(v);
  return v;
}

function readTask(file) {
  const text = readFileSync(join(TASKS_DIR, file), "utf8").replace(/\r\n/g, "\n");
  const m = text.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) throw new Error(`${file}: missing the --- header`);
  const head = {};
  for (const line of m[1].split("\n")) {
    const kv = line.match(/^([a-z_]+):\s*(.*)$/);
    if (kv) head[kv[1]] = parseValue(kv[2]);
  }
  const problems = [];
  if (!/^[A-Z]+-\d{2}$/.test(head.id ?? "")) problems.push("id must look like CORE-03");
  if (`${head.id}.md` !== file) problems.push(`file name must be ${head.id}.md`);
  if (!GROUPS.some((g) => g.area === head.id?.split("-")[0])) problems.push("unknown area in id");
  if (!head.title) problems.push("title is missing");
  if (!Array.isArray(head.for) || !head.for.every((f) => f === "new" || f === "returning")) problems.push("for must be [new], [returning] or [new, returning]");
  if (!Array.isArray(head.areas) || !head.areas.every((a) => a === "all" || FOCUS_LABEL[a])) problems.push("areas must be [all] or a list of gis, sw, ds, ai");
  if (typeof head.minutes !== "number") problems.push("minutes must be a number");
  if (!Array.isArray(head.finish) || !head.finish.every((f) => FINISH.has(f))) problems.push(`finish must be a list of: ${[...FINISH].join(", ")}`);
  if (!["active", "draft", "retired"].includes(head.status)) problems.push("status must be active, draft or retired");
  if (problems.length) throw new Error(`${file}: ${problems.join("; ")}`);
  return { ...head, lead: head.lead === true, skippable: head.skippable === true, body: m[2].trim() };
}

// Every task, in page order: by group, then by number.
export function readTasks() {
  return readdirSync(TASKS_DIR).filter((f) => f.endsWith(".md")).map(readTask)
    .sort((a, b) => {
      const ga = GROUPS.findIndex((g) => a.id.startsWith(g.area + "-"));
      const gb = GROUPS.findIndex((g) => b.id.startsWith(g.area + "-"));
      return ga - gb || a.id.localeCompare(b.id, "en", { numeric: true });
    });
}

// Whether a task is on a student's path. Matches the website's path picker.
export function onPath(task, { status, lead, areas }) {
  if (task.status === "retired") return false;
  if (!task.for.includes(status)) return false;
  if (task.lead && !lead) return false;
  return task.areas.includes("all") || task.areas.some((a) => areas.includes(a));
}

export const anchor = (task) => `ob-${task.id.toLowerCase()}`;
