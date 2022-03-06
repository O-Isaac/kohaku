const { GuildMember } = require("discord.js");
const welcome = require("../utils/welcome/GenerateImage");
const { usersJailed } = require("../commands/jail");

module.exports = {
  name: "guildMemberAdd",
  /**
   * Main guildMemberAdd event
   * @param {GuildMember} member
   */
  async execute(member) {
    const attachment = await welcome(member.user, member.guild);

    const welcomeChannel = member.guild.channels.cache.find(
      (channel) => channel.id === "440646967861706763"
    );

    welcomeChannel.send({ files: [attachment] });

    if (usersJailed.has(member.id)) {
      const role = member.guild.roles.cache.find((role) => role.name === "Prisionero" )
      member.roles.add(role);
      welcomeChannel.send('Bienvenido a la comunidad, pero debes esperar un poco para que te liberen de la prisión');
    }

  },
};
