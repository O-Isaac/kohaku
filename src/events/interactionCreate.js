const { Interaction } = require("discord.js");
const InteractionCommandFunc = require("../utils/events/CommandFunction");
const SelectMenuCommandFunc = require("../utils/events/SelectMenuFunction");

module.exports = {
  name: "interactionCreate",
  /**
   * Main interactionCreate event
   * @param {Interaction} interaction
   * @returns
   */
  async execute(interaction) {
    if (interaction.isCommand()) InteractionCommandFunc(interaction);
    if (interaction.isSelectMenu()) SelectMenuCommandFunc(interaction);
  },
};
