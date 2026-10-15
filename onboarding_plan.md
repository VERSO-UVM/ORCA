# Onboarding revamp plan

Status: draft for Kendall's review. Written 2026-10-15 with AI assistance (Claude Code). Nothing below is built yet.

## Goals

1. **One home.** All onboarding content lives in a new `#onboarding` section of the single scrolling website. GitHub issues only track progress.
2. **Every task has a permanent ID** and its own link, for example `https://verso-uvm.github.io/ORCA/#ob-core-03`.
3. **Paths fit the student.** A student's path depends on their focus areas (GIS, Software, Data Science, AI), on whether they are new or returning, and on whether they lead a Pod. Focus areas describe the work a student is doing now. They are not tied to a Pod, because a Pod can take on a different kind of project at any time.
4. **Every task ends with a reflection.** The student comments on what they learned and mentions @kefortney.
5. **Easy to maintain.** Students can fix or add a task with one small pull request.
6. **Meets UVM rules.** The section meets accessibility standards and includes the AI use rules.

## What exists today

- 8 task files in `scripts/tasks/`. A student opens an issue, picks one task from a dropdown, and a workflow posts the task text as a comment. That makes one issue per task, and nothing sets the order.
- The wiki [Onboarding](https://github.com/VERSO-UVM/ORCA/wiki/Onboarding) page is a separate, Team Lead focused guide. It covers:
  - GitHub org invite, I-9, and PeopleSoft (admin steps)
  - four weeks of readings with reflections emailed to the Director by 3pm Friday
  - sprint setup steps
  - activities for new leads
- Nothing is specific to a focus area or to returning students. There is no AI guidance.
- Pods are loosely grouped by skills right now: Bolton is mostly GIS, Okemo mostly Data Science, Sugarbush and Killington mostly Software, and Mad River is the AI innovation team. This changes when projects change, so onboarding must not depend on it.

## Task IDs

Format: `AREA-NN`, for example `CORE-03`. The website anchor is the ID in lowercase with an `ob-` prefix, for example `#ob-core-03`.

| Area | For | Contents |
|:--|:--|:--|
| `ADM` | New students | Admin: GitHub org, I-9, PeopleSoft, time entry |
| `CORE` | Everyone | Policies, AI use, open science, licensing, goals |
| `GIT` | New students, skippable | GitHub skills |
| `GIS` | Anyone doing GIS work | Tools and data practices |
| `SW` | Anyone doing software work | Tools and code practices |
| `DS` | Anyone doing data science work | Tools and data practices |
| `AI` | Anyone doing AI work | Tools, evaluation, agent safety |
| `LEAD` | Pod leads | Readings and sprint setup from the wiki |
| `RET` | Returning students | What changed, goals, handoff, mentoring |

ID rules:

- Never reuse or renumber an ID. Links in old issues must keep working.
- A retired task stays on the page, marked "Retired", with a pointer to the task that replaced it.
- Small edits keep the same ID. Only a different task gets a new ID.

## Proposed task inventory

This is a starting list for us to edit together.

- **Existing** means the task is already in `scripts/tasks/` or the wiki.
- **New** means it still needs writing.
- **Owner** is who should write or check the content. These are guesses.

| ID | Task | Source | Owner |
|:--|:--|:--|:--|
| ADM-01 | Join the VERSO-UVM GitHub organization | Existing (wiki) | Kendall |
| ADM-02 | Complete your I-9 | Existing (wiki) | Kendall |
| ADM-03 | Set up PeopleSoft and direct deposit | Existing (wiki) | Kendall |
| ADM-04 | Enter your time every week | Existing (wiki) | Kendall |
| CORE-01 | Review the ORCA Handbook and Code of Conduct | Existing | Kendall |
| CORE-02 | Read The Future of ORCA | New (`future_of_orca.md`) | Kendall |
| CORE-03 | Using AI on ORCA projects | New (AI use draft) | Kendall |
| CORE-04 | IT and data security, and data levels | New (wiki IT page and the UVM Data Classification Matrix) | Kendall |
| CORE-05 | Create your ORCiD | Existing | Kendall |
| CORE-06 | Open Science 101, Module 1 | Existing | Kendall |
| CORE-07 | Introduction to open source licensing | Existing | Kendall |
| CORE-08 | Turing Way project design | Existing | Kendall |
| CORE-09 | Your first pull request: Open Resource Library | Existing | Kendall |
| CORE-10 | Set your semester growth goals | New (wiki performance evaluation) | Kendall |
| CORE-11 | Choose how ORCA lists you publicly (name, GitHub, ORCiD, or not at all) | New (see Student records below) | Kendall |
| GIT-01 | First Day on GitHub | Existing | Kendall |
| GIT-02 | First Week on GitHub | Existing | Kendall |
| GIS-01 | Set up QGIS or ArcGIS and get project data access | New | A GIS-heavy lead (Bolton now) |
| GIS-02 | Geospatial data basics: projections, metadata, dataset licenses | New | A GIS-heavy lead (Bolton now) |
| GIS-03 | Make a small data fix in a current project | New | A GIS-heavy lead (Bolton now) |
| SW-01 | Set up your dev environment and run your project locally | New | Software-heavy leads (Sugarbush, Killington now) |
| SW-02 | Code review and the PR workflow on your project | New | Software-heavy leads |
| SW-03 | Accessibility basics for web output | New | Software-heavy leads |
| DS-01 | Set up Python or R, notebooks, and a reproducible environment | New | A data-heavy lead (Okemo now) |
| DS-02 | Data documentation and data quality | New | A data-heavy lead (Okemo now) |
| DS-03 | Reproduce one analysis from a current project | New | A data-heavy lead (Okemo now) |
| AI-01 | Request the UVM Claude license and set up Copilot | New | Kendall, with the Mad River lead |
| AI-02 | Check AI output: verification, testing, bias | New | Kendall |
| AI-03 | Agent safety: permissions, logging, undoable changes | New (UVM guidance on autonomous systems) | Kendall |
| AI-04 | AI projects with people's data: IRB and data rules | New | Kendall |
| LEAD-01 | Lead readings, weeks 1 to 4 | Existing (wiki) | Kendall |
| LEAD-02 | Run your first sprint planning and review | Existing (wiki) | Kendall |
| LEAD-03 | Activities for new leads | Existing (wiki) | Kendall |
| RET-01 | What changed since last semester | New | Kendall |
| RET-02 | Review last semester's goals and set new ones | New (replaces CORE-10 for returning students) | Kendall |
| RET-03 | Read or update your project's handoff notes | New | Pod leads |
| RET-04 | Pair with a new student on their first pull request | New | Pod leads |

The AI tasks could also use the student skills planned in the VERSO agent-skills repo (`teach`, `how`, `why`). See `docs/orca-students-plan.md` there.

## Paths

| Step | New student | Returning student |
|:--|:--|:--|
| Before day 1 | ADM-01 to ADM-04 | ADM-04 (confirm only) |
| Week 1 | CORE-01 to CORE-05, CORE-10, GIT-01 | RET-01, CORE-01 and CORE-03 (re-confirm), RET-02 |
| Week 2 | GIT-02, CORE-06 to CORE-09 | RET-03, RET-04 |
| Weeks 2 to 3 | Focus area tasks for the work they start on | Focus area tasks for any area that is new to them |
| Any time | Add a focus area when a project needs it | Same |
| Weeks 1 to 4, leads only | LEAD-01 to LEAD-03 | LEAD-01 to LEAD-03 for first-time leads only |

Rough load for a new student: about 12 to 16 hours over three weeks. This is an estimate, to be checked against the time estimates we put on each task.

## Website design

The site stays one scrolling page. The new section sits after "Pods" and gets an "Onboarding" link in the nav.

- **Path picker** at the top of the section has three controls:
  - focus areas: GIS, Software, Data Science, AI (pick one or more)
  - status: New or Returning
  - a Lead checkbox

  The picker shows only the matching tasks, in order. Without JavaScript, every task shows.
- **Each task is a collapsed panel** with the task ID as its anchor.
  - The heading shows the ID, title, time estimate, and team tags.
  - Opening it shows: why it matters, the steps, and how to finish.
  - Opening `#ob-core-03` expands that task and scrolls to it.
  - A "Copy link" button copies the task's link.
- **Accessibility.**
  - Use built-in HTML controls for the panels (`details` and `summary`), so keyboards and screen readers work by default.
  - The picker buttons report their on/off state to screen readers, and the page announces how many tasks are showing.
  - Tags never rely on color alone.
  - Leave the onboarding section out of the existing fade-in animation.
  - Check with Lighthouse or axe and a keyboard-only pass before launch.

## Where task content lives

**Recommended:**

- Each task is one Markdown file at `onboarding/tasks/CORE-03.md`, with a short header listing:
  - ID and title
  - focus areas and status (new or returning)
  - minutes
  - finish type
  - active or retired
- A small Bun script (Bun is already used in `scripts/`) does two jobs:
  - builds the tasks into `index.html` between two marker comments
  - updates the issue form options
- A GitHub Action fails a pull request if the generated page is out of date.

Why this way:

- Students edit plain Markdown.
- The site stays static and works without JavaScript.
- The website and the issue form can never disagree.

Not recommended:

- **Hand-writing tasks into `index.html`.** The list drifts away from the issue form.
- **Loading tasks with JavaScript at runtime.** The page breaks without JavaScript, and screen reader and search behavior gets worse.

## GitHub issue flow

**Recommended: one tracking issue per student per semester.**

- **The form asks for:**
  - focus areas (one or more)
  - new or returning
  - lead or not
- **The workflow posts a checklist** of the student's task IDs, in order. Each item links to its anchor on the website.
- **For each task, the student comments a reflection:**
  - `CORE-03` (the task ID)
  - What I did
  - What I learned
  - One question or one thing I'd change
  - @kefortney
- **Some tasks add one item** to that comment:
  - CORE-05: the ORCiD
  - CORE-09: the pull request link
  - CORE-01 and CORE-04: initials and date
- Then the student ticks the box. Kendall closes the issue when every box is ticked.

**Other options:**

- **Keep one issue per task**, but the comment links to the website instead of pasting the text. This is the smallest change. It creates more issues and shows no overall progress.
- **Tracking issue plus one sub-issue per task.** Each task gets its own thread and the parent shows a progress bar. This needs more workflow code, and the sub-issue API needs checking.

**Transition:**

- Keep the old dropdown names working, mapped to the new IDs, until open onboarding issues are closed.
- Update the workflow's outdated actions (`actions/checkout@v2`, `actions/github-script@v4`).

**Privacy:**

- This repo is public, so reflections posted in its issues are public.
- Admin steps (I-9, PeopleSoft) must never ask for personal details in a comment.
- Recommended: put the tracking issues in a private repo, because reflections and goals are likely FERPA-protected student records (see below). The content can stay on the public website.

## Student records, alumni history, and FERPA

This section is not legal advice. Confirm it with the UVM Registrar (who handles FERPA) or the Office of General Counsel before building anything public.

- **FERPA may cover ORCA work records.** Records about a student employee usually fall outside FERPA. That exception does not apply when the job requires being a student, and every ORCA role requires current UVM student status. So treat ORCA records as education records.
- **Keep private:** reflections, goals, evaluations, hours, pay, and admin forms.
- **Public may be fine:** a name and "member of a Pod in a given semester" may count as directory information, if UVM's directory information list includes taking part in recognized activities. Check UVM's list. Students with a FERPA confidentiality hold must not appear.
- **Already public, by the student's choice:** commits and pull requests under their own GitHub account, and author lists on Zenodo releases.
- **Recommended for an alumni history:**
  - Make it opt-in, using task CORE-11.
  - Keep the consent records in a private place.
  - Honor removal requests.
  - For past students, list only those who say yes, or who are already public as authors on ORCA releases.
- The current Pods section already lists student names, so the same check applies to it.

## Phases

Each phase is its own pull request.

0. **Done on this branch:** typo and link fixes in the task files, the reworded AI paragraph in `future_of_orca.md`, the MIT license file, and the Mad River Pod card on the website.
1. **Decide** the open questions below. Agree on the task list and the paths.
2. **Content.**
   - Port the 8 existing tasks and the wiki onboarding content into the new task format, keeping every link.
   - Write CORE-03 from the AI use draft.
   - Leads draft the focus area tasks that match their current work.
3. **Website.** Build the generator, the `#onboarding` section, the path picker, and the deep-link code. Run the accessibility check.
4. **Issue flow.** Add the new issue form, the checklist workflow, and the old-name mapping.
5. **Pilot.** Run it with one new and one returning student. Fix what they trip on.
6. **Launch.** Point the wiki Onboarding page and the old task files to the website.

## How we'll know it works

- Days from a student's start to their first merged pull request
- How many tasks get finished, and where students stop
- An end-of-semester question: "What was missing from onboarding?"

## Open questions

1. Is UX Design a fifth focus area, or a role that cuts across all of them?
2. What are Mad River's current projects and members? The website card says "To be announced" for both.
3. Which private repo should hold the tracking issues? Is the FERPA reading in Student records confirmed by the Registrar or General Counsel?
4. Should we use one tracking issue per student, or sub-issues?
5. Should the lead readings stay as email to the Director, or move to issue comments?
6. Should every new student do all of CORE-06 to CORE-09, or should some depend on focus area?
7. Who writes each focus area's tasks, and by when?
8. Should the Open Science task keep asking for the ORCiD? The ORCiD task already collects it.
9. When a student adds a focus area mid-semester, should the workflow append tasks to their tracking issue, or should they open a new one?
10. What should an alumni history show (name, semesters, Pod, projects, links), and where should it live on the site?
