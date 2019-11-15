'use strict';

const inquirer = require("inquirer");
const questions = require("../questions");
const gitIntegration = require("../git-integration");
const commonBehaviors = require("../common-behaviors");

const run = async (config, ticketingService, message, command) => {
    const {commitMsg, usePrev} = await getSimpleCommitMessageFlow(config, message);
    return usePrev ? await usePrevUsedTicket(config, commitMsg) : await useTicketFromList(config, ticketingService, commitMsg);
};

const getSimpleCommitMessageFlow = async (config, message) => {
    if (!message) {
        const {commitMsg} = await inquirer.prompt(questions.commitMsgQ);
        message = commitMsg;
    }
    const prevTicketQ = questions.generatePrevTicketQ(config);
    const {usePrev} = await inquirer.prompt(prevTicketQ);
    return {
        commitMsg: message,
        usePrev: usePrev,
    };
};

const useTicketFromList = async (config, ticketingService, commitMsg) => {
    const {formattedTicketId} = await commonBehaviors.selectTicket(config, ticketingService);
    if(!formattedTicketId)
        return;
    return await gitIntegration.commit(commitMsg, formattedTicketId);
};

const usePrevUsedTicket = (config, commitMsg) => {
    return gitIntegration.getLatestCommit(config).then((log) => {
        const {ticketId} = log;
        return gitIntegration.commit(commitMsg, ticketId);
    });
};

module.exports = {
    run,
};