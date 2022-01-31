const fs = require("fs");
const path = require("path");

function loadCommands(kohaku, app = false) {
  const dirCommands = path.join(process.cwd(), "src", "commands");
  const commandFiles = fs
    .readdirSync(dirCommands)
    .filter((file) => file.endsWith(".js"));

  const commands = [];

  for (const file of commandFiles) {
    const command = require(path.join(dirCommands, file));

    const { data } = command;
    const { name } = data;

    if (!app) kohaku.commands.set(name, command);
    else commands.push(command.data.toJSON());
  }

  return commands;
}

module.exports = loadCommands;
