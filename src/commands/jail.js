const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction, MessageEmbed, User } = require("discord.js");
const getTable = require("../utils/TableString");

/**
 * @param {CommandInteraction} interaction
 * @param {User} victima
 * @param {MessageEmbed} embed
 * @param {number} time
 * @param {User} user
 * @returns
 */
function encarcelar(
  interaction,
  prisionero,
  victima,
  embed,
  time = 0,
  user,
  channel = false
) {
  if (time > 0) {
    embed.addField(
      "Este usuario va ha salir",
      `<t:${Math.floor((Date.now() + time) / 1000)}:R>`,
      true
    );
  }

  if (prisionero.members.has(victima.id)) {
    user.roles.remove(prisionero);

    embed.setDescription(victima.username + " ha sido liberado del gulag");

    embed.setImage(null);
    embed.setFields([]);

    return channel
      ? interaction.channel.send({ embeds: [embed] })
      : interaction.reply({ embeds: [embed] });
  } else {
    user.roles.add(prisionero);

    embed.setDescription(victima.username + " ha sido encarcelado en el gulag");

    embed.setImage("https://c.tenor.com/ro-VMfAVHKMAAAAC/new-gulag.gif");

    return interaction.reply({ embeds: [embed] });
  }
}

function getTime(string, arrayString, arrayNumber) {
  return string
    ?.match(new RegExp(`(${arrayString.join("|")})`, "gi"))
    ?.map((data, index) => {
      const obj = {};

      obj.type = data.split(" ");
      obj.numeric = string.match(/[-]{0,1}[\d]*[.]{0,1}[\d]+/g)
        ? string.match(/[-]{0,1}[\d]*[.]{0,1}[\d]+/g)[index]
        : 0;

      obj.ms =
        arrayNumber[arrayString.indexOf(data)] * Number(obj.numeric) * 1000;

      return obj;
    });
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gulag")
    .setDescription("Encierra a un usuario en el gulag")
    .addUserOption((option) =>
      option
        .setRequired(true)
        .setName("victima")
        .setDescription("El usuario a encarcelar")
    )
    .addStringOption((option) =>
      option
        .setRequired(false)
        .setName("tiempo")
        .setDescription(
          "El tiempo (s | m | h | d) que el usuario permanecerá en el gulag "
        )
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

    const time = interaction.options.getString("tiempo");

    const embed = new MessageEmbed().setColor("PURPLE");

    embed.setThumbnail("https://i.imgur.com/YsNLH6X.png");
    embed.setTimestamp();

    const user = interaction.guild.members.cache.get(victima.id);

    for (const perm of user.permissions.toArray()) {
      if (this.permissions.includes(perm) && !user.roles.highest) {
        return interaction.reply({
          content: "No puedo encarcelar a ese usuario",
          ephemeral: true,
        });
      }
    }

    if (time) {
      const timesStringsArray = ["s", "m", "h", "d"];
      const timesNumbersArray = [1, 60, 3600, 86400];
      const timeLowerCase = time?.toLowerCase();

      const timeProperty = getTime(
        timeLowerCase,
        timesStringsArray,
        timesNumbersArray
      );

      if (!timeProperty) {
        const embed = new MessageEmbed()
          .setColor("PURPLE")
          .setAuthor({
            name: interaction.client.user.username,
            iconURL: interaction.client.user.displayAvatarURL({
              dynamic: true,
            }),
            url: "https://proyectograndorder.es",
          })
          .setDescription("Lo siento el schema de tiempo no es correcto")
          .addField(
            "Tabla de tiempos",
            "```" +
              getTable({
                s: "segundos",
                m: "minutos",
                h: "horas",
                d: "dias",
              }) +
              "```"
          )
          .addField(
            "Ejemplo",
            "```h10 m5 s10```10 horas, 5 minutos, 10 segundos"
          );

        return interaction.reply({
          embeds: [embed],
          ephemeral: true,
        });
      }

      let timeTotal = 0;

      for (const time of timeProperty) {
        timeTotal += time.ms;
      }

      encarcelar(interaction, prisionero, victima, embed, timeTotal, user);

      setTimeout(() => {
        encarcelar(interaction, prisionero, victima, embed, 0, user, true);
      }, timeTotal);
    } else {
      encarcelar(interaction, prisionero, victima, embed, 0, user);
    }
  },
};
