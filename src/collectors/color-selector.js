const { SelectMenuInteraction } = require("discord.js");

module.exports = {
  name: "color-selector",
  /**
   * @param {SelectMenuInteraction} interaction
   * @returns {Promise<void>}
   */
  execute: async function (interaction) {
    const values = interaction.values.join("");
    const member = interaction.guild.members.cache.get(interaction.user.id);

    const role = interaction.guild.roles.cache.find(
      (rol) => rol.name.toLowerCase() === values
    );

    if (!role) throw Error("No se encontro el rol");

    // Check if user has rol if has role remove it
    if (member.roles.cache.has(role.id)) {
      await member.roles.remove(role);
    } else {
      await member.roles.add(role);
    }

    await interaction.update({
      content: `${interaction.user.username}-sama, acabo de actualizar el color de tu nombre a \n\`${values}\``,
      components: [],
    });
  },
};
