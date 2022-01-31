const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  CommandInteraction,
  MessageEmbed,
  MessageSelectMenu,
  MessageActionRow,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("roles")
    .setDescription("Crea un selector de roles en un canal."),
  permissions: ["KICK_MEMBERS", "BAN_MEMBERS", "MODERATE_MEMBERS"],
  /**
   * @param {CommandInteraction} interaction
   */
  async execute(interaction) {
    // Emojis cache
    const emoji = interaction.guild.emojis.cache;

    // Opciones
    const roles = [
      {
        label: "Proyecto Grand Order",
        description: "Informate sobre los avances del proyecto",
        value: "proyecto-grand-order",
        emoji: emoji.get("852059604002013196"),
      },
      {
        label: "Magia Record",
        description: "Informate sobre los avances de magia record",
        value: "magia-record",
        emoji: emoji.get("772949055185354794"),
      },
      {
        label: "Fate Grand Order",
        description: "Informate sobre las noticias de fate",
        value: "fate-grand-order",
        emoji: emoji.get("852059609559597056"),
      },
      {
        label: "ArKnight",
        description: "Informate sobre las noticias de arknight",
        value: "arknight",
        emoji: emoji.get("824817023837011968"),
      },
    ];

    // Selector
    const menuRoles = new MessageSelectMenu()
      .setCustomId("roles-selector")
      .setPlaceholder("¡Seleciona el rol que quieres!")
      .setMaxValues(roles.length)
      .setMinValues(1)
      .addOptions(roles);

    // Componente
    const row = new MessageActionRow({ components: [menuRoles] });

    await interaction.channel.send({
      content:
        "Bienvenido ha proyecto grand order ¿Qué rol te gustaría escoger?",
      components: [row],
    });

    await interaction.reply({
      content: "El selector de roles se ha creado con exito!",
      ephemeral: true,
    });
  },
};
