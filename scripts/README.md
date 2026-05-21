# Onboarding Automation Docs

Task files are named `OB_<task name with spaces replaced by underscores>.md`. The script derives the filename directly from the dropdown selection, so there is no separate name-to-file mapping to maintain.

## Add a task

*For this guide, the placeholder name will be "Example Task".*

1. Create `tasks/OB_Example_Task.md` with the task instructions. The filename must follow the pattern `OB_` + task name with spaces replaced by underscores.
2. Add the task name to the dropdown options in [`.github/ISSUE_TEMPLATE/Onboarding.yaml`](/.github/ISSUE_TEMPLATE/Onboarding.yaml):

```yaml
options:
  - First Day on Github
  - First Week on Github
  # ...
  - Example Task
```

Once these changes are merged into main, the new task option will be live.

## Remove a task

1. Delete the corresponding markdown file from the `tasks` folder.
2. Remove its name from the dropdown options in [`.github/ISSUE_TEMPLATE/Onboarding.yaml`](/.github/ISSUE_TEMPLATE/Onboarding.yaml).

## Edit task content

Edit the corresponding markdown file in the `tasks` folder. Existing issues will not be updated — the automation only runs once when an issue is opened. A new issue must be created to get updated content.

## Deploy changes

There is no separate deploy step. The automation runs entirely on GitHub Actions and triggers automatically when a new onboarding issue is opened. Once your changes are merged into `main`, they are live.
