module.exports = {
    ticketIdFormatter: (config, ticketId) => config.ticketIdFormatter.replace("__COMMIT_CLI_TICKET_ID__", ticketId),
};