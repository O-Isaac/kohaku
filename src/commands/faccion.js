const { SlashCommandBuilder } = require("@discordjs/builders");
const {
  CommandInteraction,
  MessageSelectMenu,
  MessageActionRow,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("facciones")
    .setDescription("Crea un selector de facciones en el canal."),
  roles: ["613581775041593354"],
  /**
   * @param {CommandInteraction} interaction
   */
  async execute(interaction) {
    // Emojis cache
    const emoji = interaction.guild.emojis.cache;

    // Opciones
    const roles = [
      {
        label: "Piguereto de Circe NP3",
        description: "Faccion de Circe",
        value: "circe",
        emoji: emoji.get("844704981927723048"),
      },
      {
        label: "Cortesana de Tama",
        description: "Facción de Tamamo no Mae",
        value: "tamamo",
        emoji: emoji.get("852059602538594375"),
      },
      {
        label: "Exclavos de morgan",
        description: "Facción de Morgan Le Fay God",
        value: "morgan",
        emoji: emoji.get("960990607776579594"),
      },
    ];

    const roles2 = [
      {
        label: "Alcoholicos de Shuten",
        description: "Facción de Shuten y a los simps de onis",
        value: "shuten",
        emoji: emoji.get("979521949497712671"),
      },
      {
        label: "Bishamontent",
        description: "Faccion de Nagao Kagetora.",
        value: "nagao",
        emoji: emoji.get("955094923080773694"),
      },
      {
        label: "Culto Vacunado por Kohaku 5G",
        description: "Faccion de Kohaku",
        value: "kohaku",
        emoji: emoji.get("824799543899062273"),
      },
    ];

    // Selector
    const menuRoles = new MessageSelectMenu()
      .setCustomId("roles-selector-facciones")
      .setPlaceholder("¿Que faccion pertenes?")
      .setMaxValues(1)
      .setMinValues(1)
      .addOptions(roles);

    const menuRoles2 = new MessageSelectMenu()
      .setCustomId("roles-selector-facciones")
      .setPlaceholder("¿Que faccion pertenes? ¡Aqui hay mas roles!")
      .setMaxValues(1)
      .setMinValues(1)
      .addOptions(roles2);

    // Componente
    const row = new MessageActionRow({ components: [menuRoles, menuRoles2] });

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
