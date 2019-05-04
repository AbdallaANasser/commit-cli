## Prerequisites

you should add `.commit-cli.config.json` in the root directory of your project, 
which you are going to use the `commit-cli` on it.

And here is the sample of this file
```
{
  "projectId": "META",
  "jira": {
    "url": "https://your-company-instance.atlassian.net",
    "email": "aabdelnasser@sigmaproit.com",
    "apiToken": "jira-api-token",
    "ticketsJql": "project = META AND status in (\"In Progress\", \"Review/Test\") AND assignee in (aabdelnasser) ORDER BY Rank ASC"
  }
}
```