const { Message, MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const { AntiNsfwClient } = require("discord-antinsfw");

const nsfw = new AntiNsfwClient();

/**
 * Filtra el contenido de un mensaje para que no sea para adultos!
 * @param {Message} message
 */
module.exports = async function NSFWFilter(message) {
  nsfw.init(message);
};

nsfw.on("nsfw", (message, data) => {
  const embed = new MessageEmbed()
    .setTitle("NSFW Detectado!")
    .setDescription(
      "Este mensaje contiene contenido NSFW, por favor, no lo envíes a este canal."
    )
    .addField("Confidence", String(data.confidence), true)
    .addField("Es NSFW", String(data.isNSFW), true)
    .addField(
      "Detecciones",
      `${
        data.detections.length > 0
          ? "``" + data.detections.join(", ") + "``"
          : "Ninguna"
      }`,
      true
    );

  console.log(data);

  if (data.isNSFW) {
    message.delete();
    message.channel.send({ embeds: [embed] });
  }
});
