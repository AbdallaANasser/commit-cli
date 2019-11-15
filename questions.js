const gitIntegration = require('./git-integration');

const qTypes = {
    input: 'input',
    confirm: 'confirm',
    list: 'list',
};

const commitMsgQ = {
    type: qTypes.input,
    name: 'commitMsg',
    message: 'What\'s the commit message',
};

const ticketsListQ = {
    type: qTypes.list,
    name: 'ticket',
    message: 'Choose a ticket',
};

const generatePrevTicketQ = (config) => {
    return  {
        type: qTypes.confirm,
        name: 'usePrev',
        message: (answers) => {
            return gitIntegration.getLatestCommit(config).then((log) => {
                const {latestCommit, ticketId} = log;
                return `Do you want to use the prev ticket hash (${ticketId}) used in (${latestCommit.hash}) ?`;
            });
        },
    };
};

const generateTicketsListQ = (tickets) => {
    return {
        choices: tickets,
        ...ticketsListQ,
    }
};

module.exports = {
    commitMsgQ: commitMsgQ,
    generatePrevTicketQ: generatePrevTicketQ,
    generateTicketsListQ: generateTicketsListQ,
};