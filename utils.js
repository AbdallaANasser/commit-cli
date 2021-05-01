const isEmptyObj = (obj) => !Object.keys(obj).length;

const COMMIT_MESSAGE_TOKEN = '__COMMIT_CLI_MESSAGE__'
const TICKET_ID_TOKEN = '__COMMIT_CLI_TICKET_ID__'
const BRANCH_NAME_TOKEN = '__COMMIT_CLI_BRANCH_NAME__'

module.exports = {
    ticketIdFormatter: (config, ticketId) => config.ticketIdFormatter.replace(TICKET_ID_TOKEN, ticketId),
    commitMessageFormatter: (config, ticketId, message) => {
        const commitMessageFormatter = config.commitMessageFormatter || `${COMMIT_MESSAGE_TOKEN} ${TICKET_ID_TOKEN}`
        return commitMessageFormatter
            .replace(COMMIT_MESSAGE_TOKEN, message)
            .replace(TICKET_ID_TOKEN, ticketId);
    },
    branchNameFormatter: (config, ticketId, branchName) => {
        const commitMessageFormatter = config.branchNameFormatter || `${TICKET_ID_TOKEN}-${BRANCH_NAME_TOKEN}`;
        return commitMessageFormatter
            .replace(BRANCH_NAME_TOKEN, branchName)
            .replace(TICKET_ID_TOKEN, ticketId);
    },
    isEmptyObj,
};
