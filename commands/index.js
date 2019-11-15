'use strict';

const commander = require('commander');
const commit = require('./commit');
const branch = require("./branch");

const run = (config, ticketingService) => {
    const program = new commander.Command();
    program.version('1.1.0');

    program
        .command("commit <message>").alias("c")
        .description("commit using some message and hash for this ticket")
        .action(commit.run.bind(commit, config, ticketingService));

    program
        .command("branch <branch>").alias("b")
        .description("open new branch with some-name and the hash of your ticket")
        .action(branch.run.bind(branch, config, ticketingService));

    program.parse(process.argv);

};

module.exports = {
    run,
};