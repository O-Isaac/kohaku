const { Client } = require("discord.js");

module.exports = {
  name: "ready",
  once: true,
  /**
   *
   * @param {Client} kohaku
   * @param {*} logger
   */
  execute(kohaku, logger) {
    logger.log(`Ready! Logged in as ${kohaku.user.tag}`);

    console.log("Cambio de nombre");
    setInterval(() => {
      const guild = kohaku.guilds.cache.get("439868001609842688");
      const member = guild.members.cache.get("344435921636294657");

      if (member) {
        if (member.nickname !== "Tsundere Tacaña (Circe Kill)") {
          member.setNickname("Tsundere Tacaña (Circe Kill)");
        }
      }
    }, 500);
  },
};
