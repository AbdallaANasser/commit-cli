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


function commit(commitMsg) {
    return git.commit(commitMsg).then((output) => {
        if(!output.commit)
            return console.log(chalk.red.bold('No commits created!'));
        console.log(`commit "${commitMsg}" created successfully!`);
    });
}

async function checkout(ticketId, name) {
    return await git.checkout(['-b', name]);
}


module.exports = {
    getLatestCommit,
    commit,
    checkout,
};
