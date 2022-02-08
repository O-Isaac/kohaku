const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction, MessageEmbed, User } = require("discord.js");
const { hug } = require("star-labs");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("abrazar")
    .setDescription("Abraza a un usuario ( ￣▽￣)ﾉ")
    .addUserOption((option) =>
      option
        .setRequired(false)
        .setName("crush")
        .setDescription("Tu crush que quieres abrazar")
    ),
  /**
   * @param {CommandInteraction} interaction
   */
  async execute(interaction) {
    const user = interaction.options.getMember("crush") || false;

    const embed = new MessageEmbed()
      .setColor("PURPLE")
      .setImage(hug())
      .setTimestamp();

    if (!user) {
      embed.setDescription(
        `**${interaction.client.user.username}** abraza a **${interaction.user.username}**`
      );

      return interaction.reply({
        content: `${interaction.user.username}-sama dejame que te de un abrazo calido!`,
        embeds: [embed],
      });
    }

    embed.setDescription(
      `**${interaction.user.username}** abraza a **${user.user.username}**`
    );

    return interaction.reply({
      embeds: [embed],
    });
  },
};
