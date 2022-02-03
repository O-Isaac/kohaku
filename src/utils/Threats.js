const { CommandInteraction, MessageEmbed } = require("discord.js");

/**
 * Devuelve una lista de los threat activos del canal
 * @param {CommandInteraction} interaction
 */
async function getChannelThreats(interaction) {
  const channel = await interaction.client.channels.fetch("478422142707433472");

  const threads = channel.threads.cache;

  const channelThreads = await channel.threads.create({
    name:
      "Error " +
      (threads.size + 1) +
      " | " +
      new Date().toLocaleDateString().replace(/\//g, ""),
    autoArchiveDuration: 60 * 24,
    reason: interaction.options.getString("descripcion"),
  });

  const embed = new MessageEmbed()
    .setColor("PURPLE")
    .setAuthor({
      name: interaction.user.tag,
      iconURL: interaction.user.displayAvatarURL({ dynamic: true }),
    })
    .setDescription(interaction.options.getString("descripcion"))
    .setTimestamp();

  channelThreads.send({
    content: `<@&443248646029574154> ha reportado un error ${interaction.user}, alguien del equipo intentar resolver su problema`,
    embeds: [embed],
  });

  interaction.reply({
    content:
      ":wrench: Se ha enviado un reporte al equipo, gracias por tu ayuda, en breve uno de los miembros del equipo se pondrá en contacto contigo en el canal <#478422142707433472>",
    ephemeral: true,
  });
}

module.exports = { getChannelThreats };
