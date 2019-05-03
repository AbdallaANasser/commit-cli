'use strict';
const inquirer = require('inquirer');
const simpleGit = require('simple-git');

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

const prevTicketQ = {
    type: qTypes.confirm,
    name: 'usePrev',
    message: (answers) => {
        const latestCommit = simpleGit().log({'--oneline': null, '-1': null});
        console.log(latestCommit);
        return `Do you want to use the prev ticket hash (${latestCommit}) ?`;
    },
};

inquirer.prompt(prevTicketQ).then((a) => console.log(a));