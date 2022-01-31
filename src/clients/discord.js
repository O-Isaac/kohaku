const { Client, Collection } = require("discord.js");

class Kohaku extends Client {
  commands = new Collection();
}

module.exports = Kohaku;
