const ora = require("ora");
const questions = require("./questions");
const utils = require("./utils");
const inquirer = require("inquirer");

const selectTicket = async (config, ticketingService) => {
    const spinner = ora({
        text: 'loading tickets...',
    }).start();
    const tickets = await ticketingService.loadCurrentTickets(config);
    spinner.stop();
    if (!tickets.length) {
        console.log("You don't have any tickets to choose one!");
        return {};
    }
    const ticketsListQ = questions.generateTicketsListQ(tickets);
    const {ticket} = await inquirer.prompt(ticketsListQ);
    const selectedTicketId = ticketingService.extractTicketId(ticket);
    const formattedTicketId = utils.ticketIdFormatter(config, selectedTicketId);
    return {ticket, selectedTicketId, formattedTicketId};
};

module.exports = {
    selectTicket,
};