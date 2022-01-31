const { SelectMenuInteraction } = require("discord.js");

module.exports = {
  name: "roles-selector", // Esta es la custom id de este collector (se utiliza para idetificar el collector en el client)
  /**
   * @param {SelectMenuInteraction} interaction
   */
  execute: function (interaction) {
    const values = interaction.values;

    return interaction.reply({
      content: "Se añadio los roles: " + "``" + values.join(", ") + "``",
      ephemeral: true,
    });
  },
};
