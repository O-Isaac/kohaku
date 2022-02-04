const { Client, Collection } = require("discord.js");
const Levels = require("discord-xp");

Levels.setURL(process.env.DATABASE_URI);
const levels = Levels;

class Kohaku extends Client {
  commands = new Collection();
  collectors = new Collection();
  levels = levels;
}

module.exports = Kohaku;
