const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  CommandInteraction,
  MessageActionRow,
  MessageSelectMenu,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("color")
    .setDescription("¿Quiere un color para tu nombre?"),
  permissions: [],
  /**
   * @param {CommandInteraction} interaction
   * @returns {Promise<void>}
   */
  async execute(interaction) {
    const colorsOptions = [
      {
        label: "Negro",
        value: "negro",
        emoji: "⚫",
      },
      {
        label: "Azul",
        value: "azul",
        emoji: "🔵",
      },
      {
        label: "Verde",
        value: "verde",
        emoji: "🟢",
      },
      {
        label: "Naranja",
        value: "naranja",
        emoji: "🟠",
      },
      {
        label: "Purpura",
        value: "purpura",
        emoji: "🟣",
      },
      {
        label: "Rojo",
        value: "rojo",
        emoji: "🔴",
      },
      {
        label: "Amarillo",
        value: "amarillo",
        emoji: "🟡",
      },
    ];

    const menu = new MessageSelectMenu()
      .setCustomId("color-selector")
      .setPlaceholder("¡Selecciona un color!")
      .setMaxValues(1)
      .setMinValues(1)
      .addOptions(colorsOptions);

    const row = new MessageActionRow({ components: [menu] });

    await interaction.reply({
      content:
        interaction.user.username + "-sama ¿Qué color quieres para tu nombre?",
      components: [row],
      ephemeral: true,
    });
  },
};
