const axios = require('axios');
const utils = require('./utils');

const loadCurrentTickets = (config) => {
    const clubhouseConfig = config.clubhouse;
    return axios({
        method: 'get',
        url: `https://api.clubhouse.io/api/v3/search/stories`,
        headers: {
            "Clubhouse-Token": clubhouseConfig.apiToken
        },
        params: {
            query: clubhouseConfig.query,
        },
    }).then((res) => {
        return res.data.data.map((ticket) => {
            const formattedTicket = utils.ticketIdFormatter(config, ticket.id);
            return {
                name: `(${formattedTicket}) ${ticket.name}`,
                value: ticket,
            };
        });
    });
};

const extractTicketId = (ticket) => {
    return ticket.id;
};

module.exports = {
    loadCurrentTickets: loadCurrentTickets,
    extractTicketId: extractTicketId,
};
