# Onboarding tasks

Every ORCA onboarding task is one Markdown file in [`tasks/`](tasks/), named by its ID, such as `tasks/CORE-03.md`. These files build the [Onboarding section](https://verso-uvm.github.io/ORCA/#onboarding) of the ORCA website, where each task has its own link, such as [`#ob-core-03`](https://verso-uvm.github.io/ORCA/#ob-core-03). The plan behind this is in [onboarding_plan.md](../onboarding_plan.md).

To fix or add a task:

1. Edit or add its file in `tasks/`.
2. Rebuild the website section: `node scripts/build-onboarding.mjs` (or `bun scripts/build-onboarding.mjs`). This rewrites the Onboarding section of `index.html`; never edit that part of `index.html` by hand.
3. Open a pull request with both files. A check fails the pull request if you forgot step 2.

Task files can use `##` headings, paragraphs, `-` and `1.` lists, `**bold**`, `` `code` `` and `[links](https://...)`. Nothing else is converted.

## How to finish a task

Students send each finished task with ORCA's **reflection form**, a UVM Microsoft Form linked from the [How to finish a task](https://verso-uvm.github.io/ORCA/#ob-how-to-finish) box on the website. They sign in with their NetID, choose the task's ID, and answer:

- What I did
- What I learned
- One question, or one thing I'd change

Some tasks ask for one more thing, which goes in the form's last box: CORE-05 the ORCiD, CORE-09 the pull request link, CORE-01 and CORE-03 initials and the date, CORE-06 the 5 activities. Admin tasks (`ADM`) and GIT-03 only need "done". LEAD-01 is sent once a week.

Only ORCA staff see the answers. Reflections and goals are student records, so they never go in GitHub issues or pull requests. Staff track each student's progress in the private, staff-only [orca-onboarding](https://github.com/VERSO-UVM/orca-onboarding) repository.

The form's link is set in [`config.json`](config.json). Until it is set, the website tells students to use the old onboarding issue form.

## Task IDs

| Area | For |
|:--|:--|
| `ADM` | Admin, for new students |
| `CORE` | Everyone |
| `GIT` | GitHub skills, for new students; skip what you already know |
| `GIS`, `SW`, `DS`, `AI` | Anyone doing that kind of work now |
| `LEAD` | Pod leads |
| `RET` | Returning students |

- Never reuse or renumber an ID. Links in old issues must keep working.
- A small edit keeps the ID. A different task gets a new ID.
- To retire a task, set `status: retired` and say which task replaced it. Don't delete the file.

## The header

Each file starts with a header:

```yaml
---
id: CORE-05                 # area and number
title: Create your ORCiD
for: [new]                  # new, returning, or both
areas: [all]                # all, or gis, sw, ds, ai
lead: false                 # true for Pod leads only
minutes: 15                 # a rough estimate
finish: [reflection, orcid] # what the comment must include
status: active              # active, draft or retired
skippable: false            # optional: true if students may skip what they know
old_name: Create ORCiD      # optional: the name in the old issue form
---
```

Then three sections: **Why it matters**, **Steps** and **How to finish**.

`finish` values: `reflection` (the format above), `reflection-weekly` (one per week, LEAD-01), `confirm` ("done" only), `orcid`, `pr-link` and `initials-date`.

## Status

| ID | Title | Status |
|:--|:--|:--|
| ADM-01 to ADM-04 | GitHub org, I-9, PeopleSoft, time entry | Written, from the wiki |
| CORE-01 | Review the ORCA Handbook and Code of Conduct | Written |
| CORE-02 | Read The Future of ORCA | Not yet written |
| CORE-03 | Using AI on ORCA projects | Written; reviewed by Kendall |
| CORE-04 | IT and data security, and data levels | Not yet written |
| CORE-05 to CORE-09 | ORCiD, Open Science, licensing, Turing Way, first pull request | Written |
| CORE-10, CORE-11 | Growth goals; how ORCA lists you publicly | Not yet written |
| GIT-01 to GIT-03 | First day and first week on GitHub; GitHub Education | Written |
| GIS, SW, DS | Focus area tasks | Not yet written; Pod leads |
| AI-01 to AI-04 | AI focus area tasks | Not yet written; Kendall with the Mad River lead |
| LEAD-01 to LEAD-03 | Lead readings, first sprints, activities for new leads | Written, from the wiki |
| RET-01 to RET-04 | Returning students | Not yet written |

Until the new issue flow is built, the current issue form still uses the old task files in `scripts/tasks/`.
