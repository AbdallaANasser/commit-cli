'use strict';
const gitIntegration = require('../git-integration');
const commonBehaviors = require("../common-behaviors");
const {branchNameFormatter} = require('../utils');


const run = async (config, ticketingService, branch, command) => {
    const {formattedTicketId} = await commonBehaviors.selectTicket(config, ticketingService);
    const formattedBranchName = branchNameFormatter(config, formattedTicketId, branch);
    return await gitIntegration.checkout(formattedTicketId, formattedBranchName);
};

module.exports = {
    run,
};
