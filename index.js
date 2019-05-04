#!/usr/bin/env node

'use strict';
const path = require('path');
const inquirer = require('inquirer');
const ora = require('ora');

const jira = require('./jira');
const gitIntegration = require('./git-integration');
const questions = require('./questions');

const getConfig = () => {
    const cwd = process.cwd();
    const configPath = path.join(cwd, '.commit-cli.config.json');
    let config = {};
    try {
        config = require(configPath);
    }
    catch (e) {
        throw new Error('No configuration file found');
    }

    return config;
};

function getSimpleCommitMessageFlow(config) {
    const prevTicketQ = questions.generatePrevTicketQ(config);
    return inquirer.prompt([questions.commitMsgQ, prevTicketQ]);
}

const usePrevUsedTicket = (config, commitMsg) => {
    return gitIntegration.getLatestCommit(config).then((log) => {
        const {latestCommit, ticketId} = log;
        return gitIntegration.commit(commitMsg, ticketId);
    });
};

const useTicketFromList = async (config, commitMsg) => {
    const spinner = ora({
        text: 'loading tickets...',
    }).start();
    const tickets = await jira.loadCurrentTickets(config);
    spinner.stop();
    if (!tickets.length)
        return console.log("You don't have any tickets to choose one!");
    const ticketsListQ = questions.generateTicketsListQ(tickets);
    const {commitTicket} = await inquirer.prompt(ticketsListQ);
    return await gitIntegration.commit(commitMsg, commitTicket.key);

};

const run = async () => {
    const config = getConfig();
    const {commitMsg, usePrev} = await getSimpleCommitMessageFlow(config);
    return usePrev ? await usePrevUsedTicket(config, commitMsg) : await useTicketFromList(config, commitMsg);
};

run();