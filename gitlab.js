const axios = require('axios');
const utils = require('./utils');

const loadCurrentTickets = (config) => {
    const gitlabConfig = config.gitlab;
    const gitlabUrl = gitlabConfig.url || 'https://gitlab.com';
    const url = `${gitlabUrl}/api/v4/projects/${encodeURIComponent(gitlabConfig.project)}/issues?${gitlabConfig.searchQuery}`;

    return axios({
        method: 'get',
        url: url,
        headers: {
            "PRIVATE-TOKEN": `${gitlabConfig.apiToken}`,
        },
    }).then((res) => {
        return res.data.map((issue) => {
            const formattedTicket = utils.ticketIdFormatter(config, issue.iid);
            return {
                name: `(${formattedTicket}) ${issue.title}`,
                value: issue,
            };
        });
    });
};

const extractTicketId = (ticket) => {
    return ticket.iid;
};

module.exports = {
    loadCurrentTickets: loadCurrentTickets,
    extractTicketId: extractTicketId,
};