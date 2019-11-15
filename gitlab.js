const axios = require('axios');
const utils = require('./utils');

const buildQueryApi = (config) => {
    const gitlabConfig = config.gitlab;
    const gitlabUrl = gitlabConfig.url || 'https://gitlab.com';
    const baseUrl = `${gitlabUrl}/api/v4/projects/${encodeURIComponent(gitlabConfig.project)}/issues`;
    const requestBase = {
        method: 'get',
        headers: {
            "PRIVATE-TOKEN": `${gitlabConfig.apiToken}`,
        },
    };
    return (searchQuery) => {
        return axios({...requestBase, url: `${baseUrl}?${searchQuery}`})
            .then(res => res.data.map((issue) => {
                const formattedTicket = utils.ticketIdFormatter(config, issue.iid);
                return {
                    name: `(${formattedTicket}) ${issue.title}`,
                    value: issue,
                };
            }))
    };
};

const loadCurrentTickets = (config) => {
    const gitlabConfig = config.gitlab;
    const queryApi = buildQueryApi(config);
    const queryPromises = gitlabConfig.searchQueries.map( q => queryApi(q));
    return Promise.all(queryPromises).then(
        ticketsArrs => ticketsArrs.reduce(
            (flattenArr, ticketsArr) => [].concat(flattenArr, ticketsArr), [],
        ),
    );
};

const extractTicketId = (ticket) => {
    return ticket.iid;
};

module.exports = {
    loadCurrentTickets: loadCurrentTickets,
    extractTicketId: extractTicketId,
};