'use strict';
const gitIntegration = require('../git-integration');
const commonBehaviors = require("../common-behaviors");


const run = async (config, ticketingService, branch, command) => {
    const {formattedTicketId} = await commonBehaviors.selectTicket(config, ticketingService);
    return await gitIntegration.checkout(formattedTicketId, branch);
};

module.exports = {
    run,
};