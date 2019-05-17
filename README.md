## Prerequisites

you should add `.commit-cli.config.json` in the root directory of your project, 
which you are going to use the `commit-cli` on it.

And here is the sample of this file

```
{
  "ticketIdExtractorRe": "#\\d*",
  "ticketIdFormatter": "#__COMMIT_CLI_TICKET_ID__",
  "usedService": "gitlab",
  "gitlab": {
    "apiToken": "GITLAB-PRIVATE-TOKEN",
    "project": "AAbdelnasser/commit-cli",
    "searchQuery": "scope=all&state=opened&label_name[]=in%20progress&label_name[]=review&assignee_username[]=AAbdelnasser"
  }
}
```


```
{
  "ticketIdExtractorRe": "META-\\d*",
  "ticketIdFormatter": "#__COMMIT_CLI_TICKET_ID__",
  "usedService": "jira",
  "jira": {
    "url": "https://magalixcorp.atlassian.net",
    "email": "abdallah.nasser@magalix.com",
    "apiToken": "JIRA-API-TOKEN",
    "ticketsJql": "project = META AND status in (\"In Progress\", \"Review/Test\") AND assignee in (abdallah.nasser-c) ORDER BY Rank ASC"
  }
}
```