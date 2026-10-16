# The onboarding survey (Qualtrics)

Students send each finished onboarding task through one UVM Qualtrics survey. Its responses are the record of each student's onboarding: only ORCA staff can see them, and they never go in GitHub. The website's [How to finish a task](https://verso-uvm.github.io/ORCA/#ob-how-to-finish) box links to it.

This page says what the survey must contain, and what to change when tasks change.

## Survey flow

Build it in this order under **Survey flow**:

1. **Authenticator:** SSO, with UVM NetID. Capture the identity fields as embedded data: NetID, name and email (ask UVM's Qualtrics administrator what the SSO passes through). Students then can't mistype who they are, and there is no name question.
2. **Block "Task":** question 1.
3. **Branch:** if question 1 is an admin task (see the table below), show **Block "Done"**, then **End of survey**.
4. **Block "Week":** question 2, with display logic: show only if question 1 is LEAD-01.
5. **Block "Reflection":** questions 3 to 5.
6. **Block "Extras":** questions 6 to 10, each with its own display logic.

## Questions

Use the export tags in brackets. Exports and reports depend on them, so never change them once responses exist.

**Block "Task"**

1. **Which task did you finish?** [`task`] Multiple choice, drop-down list, required. One choice per task, written as the ID and the title, in this order:

   | Choice | Kind |
   |:--|:--|
   | ADM-01 Join the VERSO-UVM GitHub organization | admin |
   | ADM-02 Complete your I-9 | admin |
   | ADM-03 Set up PeopleSoft and direct deposit | admin |
   | ADM-04 Enter your time every week | admin |
   | CORE-01 Review the ORCA Handbook and Code of Conduct | reflection, initials |
   | CORE-03 Using AI on ORCA projects | reflection, initials |
   | CORE-05 Create your ORCiD | reflection, ORCiD |
   | CORE-06 Open Science 101, Module 1 | reflection, activities |
   | CORE-07 Introduction to open source licensing | reflection |
   | CORE-08 Turing Way project design | reflection |
   | CORE-09 Your first pull request: Open Resource Library | reflection, pull request |
   | GIT-01 First Day on GitHub | reflection |
   | GIT-02 First Week on GitHub | reflection |
   | GIT-03 Get GitHub Education | admin |
   | LEAD-01 Lead readings, weeks 1 to 4 | reflection, week |
   | LEAD-02 Run your first sprint planning and review | reflection |
   | LEAD-03 Activities for new leads | reflection |

   Under **Recode values**, give each choice a fixed number and never reuse one.

**Block "Done"** (admin tasks only)

- **I have finished this task.** [`done`] One checkbox, required.

**Block "Week"** (LEAD-01 only)

2. **Which week's readings?** [`week`] Multiple choice, required: Week 1, Week 2, Week 3, Week 4.

**Block "Reflection"**

3. **What I did** [`did`] Text entry, essay box, required.
4. **What I learned** [`learned`] Text entry, essay box, required.
5. **One question, or one thing I'd change** [`question`] Text entry, essay box, required.

**Block "Extras"**

6. **Your ORCiD** [`orcid`] Text entry, required, shown only for CORE-05. Custom validation: matches the regular expression `^\d{4}-\d{4}-\d{4}-\d{3}[\dX]$`.
7. **Link to your pull request** [`pr_link`] Text entry, required, shown only for CORE-09. Custom validation: matches `^https://github\.com/.+/pull/\d+`.
8. **I have read this task's rules and will follow them.** [`affirm`] One checkbox, required, shown only for CORE-01 and CORE-03. Add **Your initials** [`initials`] as a required text entry beside it. Qualtrics records the date of every response, so there is no date question.
9. **Your answers to the 5 Module 1 activities** [`activities`] Text entry, essay box, required, shown only for CORE-06.
10. **Anything else the task asks for** [`extra`] Text entry, essay box, optional, shown for every task that reaches this block.

## Survey options

- **Responses:** allow more than one response per person (students send one per task). Turn off anything that prevents multiple submissions.
- **Save and continue:** on, so a long reflection isn't lost.
- **Anonymize responses:** off. You need to know who answered.
- **Survey protection:** prevent indexing.
- **End of survey message:** "Thanks! ORCA staff will read this. Your next task is on the ORCA website: https://verso-uvm.github.io/ORCA/#onboarding"
- **Actions (optional):** an email to ORCA staff for each response, and a confirmation email to the student with a copy of what they sent.
- **Collaborate:** share the survey with other ORCA staff, rather than sharing exports.

## Tracking progress

Each response is one finished task, from one NetID. To see where students are:

- **Data & Analysis:** filter by NetID to see everything one student has sent.
- **Reports or Stats iQ:** a cross tab of NetID against `task` shows every student's finished tasks at once.
- Each student's path (what they should do) is on the website's path picker: choose new or returning, Pod lead, and focus areas.

Exports are student records. Keep them in your UVM OneDrive or the staff Team, never in GitHub or anywhere public.

## When tasks change

Whenever a task file is added, retired or renamed in [`tasks/`](tasks/), update the survey in the same week:

- **New task:** add a choice to question 1, with a new recode value. If it is an admin task, add it to the branch in step 3. If it asks for something new, add a question to the Extras block with display logic for it, or use question 10.
- **Retired task:** don't delete its choice (that breaks old responses). Hide it with choice display logic instead.
- **Renamed task:** edit the choice's text only; keep its recode value.

## Put its link on the website

1. Copy the survey's anonymous link (**Distributions > Anonymous link**). The authenticator still requires a NetID sign-in.
2. Set it in [`config.json`](config.json):

   ```json
   {
     "reflectionSurvey": "https://uvm.co1.qualtrics.com/jfe/form/SV_..."
   }
   ```

3. Run `node scripts/build-onboarding.mjs` and open a pull request with both files.
