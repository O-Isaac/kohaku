const nsfwjs = require("nsfwjs");
const tf = require("@tensorflow/tfjs");
const { Message, MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const decodeImage = require("image-decode");

tf.enableProdMode();

const convert = async (img, type) => {
  const image = decodeImage(img, type);

  const numChannels = 3;
  const numPixels = image.width * image.height;
  const values = new Int32Array(numPixels * numChannels);

  for (let i = 0; i < numPixels; i++)
    for (let c = 0; c < numChannels; ++c)
      values[i * numChannels + c] = image.data[i * 4 + c];

  return tf.tensor3d(values, [image.height, image.width, numChannels], "int32");
};

/**
 * Filtra el contenido de un mensaje para que no sea para adultos!
 * @param {Message} message
 */
module.exports = async function NSFWFilter(message) {
  const image = message.attachments.size > 0 ? message.attachments : null;

  if (image) {
    image.forEach(async (image) => {
      try {
        const dImage = await fetch(image.url);
        const bufferImage = await dImage.buffer();
        const tensorImage = await convert(bufferImage, image.contentType);

        const NSFWClient = await nsfwjs.load("https://nsfwjs.com/model/", {
          size: 299,
        });

        const NSFWResult = await NSFWClient.classify(tensorImage);

        const result = NSFWResult.map((result) => {
          return {
            type: result.className,
            probability: (result.probability * 100).toFixed(2),
          };
        });

        const resultsNSFW = ["Hentai", "Sexy", "Porn"];

        const hasNSFW = result.some(
          (result) =>
            resultsNSFW.includes(result.type) && result.probability > 50
        );

        if (hasNSFW) {
          const embed = new MessageEmbed()
            .setTitle("NSFW Detectado!")
            .setDescription(
              `${message.author} No esta permitido enviar contenido NSFW!`
            );

          result.forEach((data) => {
            embed.addField(data.type, data.probability + "%", true);
          });

          message.delete();
          message.channel.send({ embeds: [embed] });
          return;
        }
      } catch (err) {
        console.log(err);
      }
    });
  }
};
