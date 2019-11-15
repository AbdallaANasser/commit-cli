const path = require('path');
const utils = require('./utils');
let config = {};
let ticketingService = null;

const getConfig = () => {
    if(!utils.isEmptyObj(config))
        return config;
    const cwd = process.cwd();
    const configPath = path.join(cwd, '.commit-cli.config.json');
    try {
        config = require(configPath);
    }
    catch (e) {
        throw new Error('No configuration file found');
    }

    return config;
};

const getTicketingService = () => {
    if(!!ticketingService)
        return;
    const config = getConfig();
    const ticketingServiceModulePath = path.join(__dirname, config.usedService);
    return ticketingService = require(ticketingServiceModulePath);
};


module.exports = {
    getConfig,
    getTicketingService,
};