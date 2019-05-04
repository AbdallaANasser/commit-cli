#!/usr/bin/env node

'use strict';
const program = require('commander');
const path = require('path');
const inquirer = require('inquirer');
const ora = require('ora');

const jira = require('./jira');
const gitIntegration = require('./git-integration');
const questions = require('./questions');

program
    .version('1.1.0')
    .option('-m, --message <message>', 'commit message')
    .parse(process.argv);

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

const getSimpleCommitMessageFlow = async (config) => {
    let message = program.message;
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