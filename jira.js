const axios = require('axios');
const utils = require('./utils');

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
            const formattedTicket = utils.ticketIdFormatter(config, issue.key);
            return {
                name: `(${formattedTicket}) ${issue.fields.summary}`,
                value: issue,
            };
        });
    });
};

const extractTicketId = (ticket) => {
    return ticket.key;
};

module.exports = {
    loadCurrentTickets: loadCurrentTickets,
    extractTicketId: extractTicketId,
};