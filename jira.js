const axios = require('axios');

const loadCurrentTickets = (config) => {
    const jiraConfig = config.jira;
    return axios({
        method: 'get',
        url: `${jiraConfig.url}/rest/api/3/search`,
        headers: {
            Authorization: `Basic ${Buffer.from(`${jiraConfig.email}:${jiraConfig.apiToken}`).toString('base64')}`,
        },
        params: {
            jql: jiraConfig.ticketsJql,
        },
    }).then((res) => {
        return res.data.issues.map((issue) => {
            return {
                name: `(${issue.key}) ${issue.fields.summary}`,
                value: issue,
            };
        });
    });
};


module.exports = {
    loadCurrentTickets: loadCurrentTickets,
};