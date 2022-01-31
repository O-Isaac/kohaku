const { SelectMenuInteraction } = require("discord.js");

module.exports = {
  name: "roles-selector", // Esta es la custom id de este collector (se utiliza para idetificar el collector en el client)
  /**
   * @param {SelectMenuInteraction} interaction
   */
  execute: function (interaction) {
    const values = interaction.values;

    const member = interaction.guild.members.cache.get(interaction.user.id);
    const roles = interaction.guild.roles.cache;

    values.includes("proyecto-grand-order")
      ? member.roles.add(roles.get("444643664258662410"))
      : member.roles.remove(roles.get("444643664258662410"));

    values.includes("magia-record")
      ? member.roles.add(roles.get("771890722353053697"))
      : member.roles.remove(roles.get("771890722353053697"));

    values.includes("fate-grand-order")
      ? member.roles.add(roles.get("445743979011506180"))
      : member.roles.remove(roles.get("445743979011506180"));

    values.includes("arknight")
      ? member.roles.add(roles.get("937802754804572240"))
      : member.roles.remove(roles.get("937802754804572240"));

    return interaction.reply({
      content: "Se añadio los roles: " + "``" + values.join(", ") + "``",
      ephemeral: true,
    });
  },
};
