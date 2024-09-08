# Onboarding Automation Docs

## Add new tasks
*For this guide, the placeholder name will be "Example Task" and the filename will be "OB_ExampleTask.md"*
1. Create a Markdown file in the `tasks` folder containing the task instructions itself. The file should preferably start with `OB_`, i.e. `OB_ExampleTask.md`
2. Come up with a name for the task and add it to the `taskNameToFileMap` in [`onboarding.ts`](/scripts/onboarding.ts). Example:
```ts
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
  // NEW TASK BELOW
  "Example Task": "OB_ExampleTask.md"
  // ^ task name      ^ task file
} as const;
```
3. Add the task name to the options in the Onboarding Issue template ([.github/ISSUE_TEMPLATE/Onboarding.yaml](/.github/ISSUE_TEMPLATE/Onboarding.yaml)). Example:
```yaml
body:
  - type: dropdown
    id: browsers
    attributes:
      label: Select the onboarding task
      multiple: false
      options:
        - First Day on Github
        - First Week on Github
        - Create ORCiD
        - NASA Open Science Modules
        - OSS Licensing Introduction
        - Review ORCA Handbook
        - Review Turing Project Design Guide
        - Explore Open Resource Library
        - Record Audio Evaluation
        # NEW TASK BELOW
        - Example Task # This must match the task name in onboarding.ts, or else the script cannot read the correct file.
```

Now, once these changes are merged into main, there will be a new task option!

## Editing task content
All you have to do is edit the corresponding markdown file in the `tasks` folder. *Do note, existing tasks will not be updated since the automation only runs once. For tasks to contain the updated content, a new issue must be created.*
