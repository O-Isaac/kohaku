const { GuildMember } = require("discord.js");
const welcome = require("../utils/welcome/GenerateImage");

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
  },
};
