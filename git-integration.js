const git = require('simple-git/promise')();
const chalk = require('chalk');

const getLatestCommit = (config) => {
    return git.log({'--oneline': null, '-1': null})
        .then((logQuery) => {
            const latestCommit = logQuery.latest;
            const ticketId = latestCommit.hash.match(config.ticketIdExtractorRe, `ig`);
            return {latestCommit: latestCommit, ticketId: ticketId};
        });
};


function commit(commitMsg, ticketId) {
    const commitMessage = `${ticketId} ${commitMsg}`;
    return git.commit(commitMessage).then((output) => {
        if(!output.commit)
            return console.log(chalk.red.bold('No commits created!'));
        console.log(`commit "${commitMessage}" created successfully!`);
    });
}


module.exports = {
    getLatestCommit: getLatestCommit,
    commit: commit,
};