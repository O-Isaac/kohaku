const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction } = require("discord.js");
const { getChannelThreats } = require("../utils/Threats");

const description =
  "¿Tienes algun problema con el parche? usa este comando para que equipo pueda atender tu caso.";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ayuda")
    .setDescription(description)
    .addStringOption((option) =>
      option
        .setRequired(true)
        .setName("descripcion")
        .setDescription("Descripción del problema")
    ),
  permissions: [],

  /**
   * @param {CommandInteraction} interaction
   */
  async execute(interaction) {
    // If interaction dont have any image return error
    getChannelThreats(interaction);
  },
};
