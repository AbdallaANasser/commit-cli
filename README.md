Link daily commits with your issue tracking system simply ✨

Using **`commit-cli`** will allow you to easily create a new branches using the **issue ID** you are working on and also to add this ID to your commit messages automatically.

### Creating New branch
![](docs/new-branch.gif)

### Commit Messages
![](docs/commits.gif)

## Installation

```
npm i -g @aabdelnasser/commit-cli
```

Then add `.commit-cli.config.json` in the root directory of your project

Currently `commit-cli` support **Gitlab Issues** and **Atlassian Jira** but you can support any other issue tracking system in a PR

### `.commit-cli.config.json` for Gitlab integration

```
{
  "ticketIdExtractorRe": "#\\d*",
  "ticketIdFormatter": "#__COMMIT_CLI_TICKET_ID__",
  "commitMessageFormatter": "__COMMIT_CLI_MESSAGE__ [__COMMIT_CLI_TICKET_ID__]",
  "branchNameFormatter": "abdallahabdelnasser/__COMMIT_CLI_TICKET_ID__/__COMMIT_CLI_BRANCH_NAME__",
  "usedService": "gitlab",
  "gitlab": {
    "apiToken": "******************",
    "project": "AAbdelnasser/commit-cli",
    "searchQueries": [
      "scope=all&state=opened&labels=in%20progress&assignee_username[]=AAbdelnasser",
      "scope=all&state=opened&labels=review&assignee_username[]=AAbdelnasser"
    ]
  }
}
```

### `.commit-cli.config.json` for Atlassian Jira integration

```
{
  "ticketIdExtractorRe": "EX-\\d+",
  "ticketIdFormatter": "__COMMIT_CLI_TICKET_ID__",
  "commitMessageFormatter": "__COMMIT_CLI_MESSAGE__ [__COMMIT_CLI_TICKET_ID__]",
  "branchNameFormatter": "abdallahabdelnasser/__COMMIT_CLI_TICKET_ID__/__COMMIT_CLI_BRANCH_NAME__",
  "usedService": "jira",
  "jira": {
    "url": "https://my-domain.atlassian.net",
    "email": "aabdelnasser@sigmaproit.com",
    "apiToken": "********************",
    "ticketsJql": "project = EX AND status in (\"In Progress\", Review) AND assignee in (abdalla.abdelnasser)"
  }
}

```




### `.commit-cli.config.json` for Clubhouse

```
{
  "ticketIdExtractorRe": "ch\\d+",
  "ticketIdFormatter": "ch__COMMIT_CLI_TICKET_ID__",
  "commitMessageFormatter": "__COMMIT_CLI_MESSAGE__ [__COMMIT_CLI_TICKET_ID__]",
  "branchNameFormatter": "abdallahabdelnasser/__COMMIT_CLI_TICKET_ID__/__COMMIT_CLI_BRANCH_NAME__",
  "usedService": "clubhouse",
  "clubhouse": {
    "apiToken": "********************",
    "query": "owner:abdallahabdelnasser state:\"Ready for Deploy\""
  }
}

```




## Usage

### for creating new branch
```
commit-cli b branch-name
```

then your issues will be loaded, so you can select which issue related to this branch.

### to commit
```
commit-cli c "your-commit-message"
```
you can use the latest issue ID from your previous commit directly, or you type N (No)
then your issues will be loaded, so you can select which issue related to this commit.
