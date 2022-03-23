const { Message } = require("discord.js");
const NSFWFilter = require("../services/nsfw.filter");

module.exports = {
  name: "messageCreate",
  /**
   * Main messageCreate event
   * @param {Message} message
   */
  async execute(message) {
    //NSFWFilter(message);
  },
};
