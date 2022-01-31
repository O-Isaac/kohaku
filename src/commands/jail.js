const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction, MessageEmbed } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gulag")
    .setDescription("Encierra a un usuario en el gulag")
    .addUserOption((option) =>
      option
        .setRequired(true)
        .setName("victima")
        .setDescription("El usuario a encarcelar")
    ),
  permissions: ["KICK_MEMBERS", "BAN_MEMBERS", "MODERATE_MEMBERS"],
  /**
   * @param {CommandInteraction} interaction
   */
  async execute(interaction) {
    const victima = interaction.options.getUser("victima");
    const prisionero = interaction.guild.roles.cache.find(
      (role) => role.name === "Prisionero"
    );

    const embed = new MessageEmbed().setColor("PURPLE");

    embed.setThumbnail("https://i.imgur.com/YsNLH6X.png");
    embed.setTimestamp();

    const user = interaction.guild.members.cache.get(victima.id);

    for (const perm of user.permissions.toArray()) {
      if (this.permissions.includes(perm)) {
        return interaction.reply({
          content: "No puedo encarcelar a ese usuario",
          ephemeral: true,
        });
      }
    }

    if (prisionero.members.has(victima.id)) {
      user.roles.remove(prisionero);

      embed.setDescription(victima.username + " ha sido liberado del gulag");

      return interaction.reply({ embeds: [embed] });
    } else {
      user.roles.add(prisionero);

      embed.setDescription(
        victima.username + " ha sido encarcelado en el gulag"
      );

      embed.setImage("https://c.tenor.com/ro-VMfAVHKMAAAAC/new-gulag.gif");

      return interaction.reply({
        embeds: [embed],
      });
    }
  },
};
