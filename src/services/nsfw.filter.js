const { Message, MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");

/**
 * Filtra el contenido de un mensaje para que no sea para adultos!
 * @param {Message} message
 */
module.exports = async function NSFWFilter(message) {
  const image = message.attachments.size > 0 ? message.attachments : null;

  if (image) {
  }
};
