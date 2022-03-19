const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction, MessageEmbed, User } = require("discord.js");
const timestring = require("timestring");
const jailed = new Map();
const { usersJailed } = require("../utils/UserJailed");

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
  roles: [954523628177866793],
  /**
   * @param {CommandInteraction} interaction
   */
  async execute(interaction) {
    // Get user to jail
    const user = interaction.options.getMember("victima");

    // Embed
    const embed = new MessageEmbed()
      .setDescription(
        `**${user.user.username}** ha sido encarcelado por **${interaction.user.username}**`
      )
      .setColor("PURPLE")
      .setThumbnail("https://i.imgur.com/YsNLH6X.png")
      .setImage("https://c.tenor.com/ro-VMfAVHKMAAAAC/new-gulag.gif")
      .setTimestamp();

    if (Math.random() < 0.5) {
      embed.setImage("https://c.tenor.com/MEOjAEYcT2cAAAAd/bonk.gif");
    }

    // Time jail
    let timeMS = 0;

    if (user.user.id === interaction.user.id) {
      return interaction.reply({
        content: "No puedes encarcelarte a ti mismo",
        ephemeral: true,
      });
    }

    const authorUser = await interaction.guild.members.fetch(
      interaction.user.id
    );

    if (user.roles.highest.position >= authorUser.roles.highest.position) {
      return interaction.reply({
        content:
          "No puedes encarcelar a un usuario con un rol mayor o igual a tu rol",
        ephemeral: true,
      });
    }

    // Get "Prisionero" role
    const prisonerRole = interaction.guild.roles.cache.find(
      (role) => role.name === "Prisionero"
    );

    // get time to jail
    const time = interaction.options.getString("tiempo");

    // Check time to jail
    if (time) {
      try {
        if (jailed.has(user.id)) {
          return interaction.reply({
            content: "Ya tiene un fecha de liberación",
          });
        }

        const timeToJail = timestring(time);

        timeMS = timeToJail * 1000;
      } catch (err) {
        embed.setDescription(err.message);
        embed
          .addFields([
            {
              name: "Valores de tiempos válidos",
              value: `
            \`ms, milli, millisecond, milliseconds\`
            \`s, sec, secs, second, seconds\` 
            \`m, min, mins, minute, minutes\` 
            \`h, hr, hrs, hour, hours\`
            \`d, day, days\`
            \`w, week, weeks\`
            \`mon, mth, mths, month, months\`
            \`y, yr, yrs, year, years\`
            `,
            },
          ])
          .setImage(null);

        return interaction.reply({ embeds: [embed], ephemeral: true });
      }
    }

    // Remove timeout and remove from jailed
    const unjaild = () => {
      clearInterval(jailed.get(user.id));
      jailed.delete(user.id);
      usersJailed.delete(user.id);
    };

    // Check if has role "Prisionero" remove it else add it
    if (user.roles.cache.has(prisonerRole.id)) {
      await user.roles.remove(prisonerRole);

      embed.setDescription(`${user.user.tag} ha sido liberado`);
      embed.setImage(null);
      embed.setFields([]);

      jailed.has(user.id) ? unjaild() : null;
      usersJailed.has(user.id) ? usersJailed.delete(user.id) : null;
    } else {
      await user.roles.add(prisonerRole);
      usersJailed.add(user.id);
    }

    // Send Message function
    const sendMessage = async (embed) => {
      return interaction.replied
        ? interaction.channel.send({ embeds: [embed] })
        : interaction.reply({ embeds: [embed] });
    };

    if (timeMS > 0) {
      const timestamp = Math.floor((Date.now() + timeMS) / 1000);
      embed.addField("Volvera a salir", `<t:${timestamp}:R>`);

      jailed.set(
        user.id,
        setInterval(
          ((index) => () => {
            // perform the action with your array

            if (index >= timeMS) {
              user.roles.remove(prisonerRole);
              clearInterval(jailed.get(user.id));
              jailed.delete(user.id);

              embed.setDescription(`${user.user.tag} ha sido liberado`);
              embed.setImage(null);
              embed.setFields([]);

              sendMessage(embed);
            }

            index += 1000;
          })(0),
          1000
        )
      );
    }

    return sendMessage(embed);
  },
};
