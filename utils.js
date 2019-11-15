const isEmptyObj = (obj) => !Object.keys(obj).length;

module.exports = {
    ticketIdFormatter: (config, ticketId) => config.ticketIdFormatter.replace("__COMMIT_CLI_TICKET_ID__", ticketId),
    isEmptyObj,
};