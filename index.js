const commands = require('./commands');
const config_module = require('./config');

commands.run(
    config_module.getConfig(),
    config_module.getTicketingService(),
);