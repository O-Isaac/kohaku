const { SelectMenuInteraction } = require("discord.js");

module.exports = {
  name: "roles-selector-facciones", // Esta es la custom id de este collector (se utiliza para idetificar el collector en el client)
  /**
   * @param {SelectMenuInteraction} interaction
   */
  execute: function (interaction) {
    const values = interaction.values;

    const member = interaction.guild.members.cache.get(interaction.user.id);
    const roles = interaction.guild.roles.cache;

    values.includes("nagao")
      ? member.roles.add(roles.get("954535672834822254"))
      : member.roles.remove(roles.get("954535672834822254"));

    values.includes("kohaku")
      ? member.roles.add(roles.get("883576480729284648"))
      : member.roles.remove(roles.get("883576480729284648"));

    values.includes("circe")
      ? member.roles.add(roles.get("878453327787098152"))
      : member.roles.remove(roles.get("878453327787098152"));

    values.includes("tamamo")
      ? member.roles.add(roles.get("884138354944389170"))
      : member.roles.remove(roles.get("884138354944389170"));

    values.includes("morgan")
      ? member.roles.add(roles.get("960990704979574794"))
      : member.roles.remove(roles.get("960990704979574794"));

    values.includes("shuten")
      ? member.roles.add(roles.get("979909507696197632"))
      : member.roles.remove(roles.get("979909507696197632"));

    return interaction.reply({
      content: `${
        interaction.user.username
      }-sama, Bienvendio a la faccion\n\`${values
        .map((faccion) => faccion.toUpperCase())
        .join(", ")}\``,
      ephemeral: true,
    });
  },
};
