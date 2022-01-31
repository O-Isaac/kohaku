const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const Logger = require("./utils/Logger");
const Color = require("kleur");
const Handlers = require("./handlers/index");

const logger = new Logger("Slash", Color.green);

const commands = Handlers.use.commands(null, true);

const rest = new REST({ version: "9" }).setToken(process.env.DISCORD_TOKEN);

rest
  .put(
    Routes.applicationGuildCommands(
      process.env.DISCORD_CLIENT_ID,
      process.env.DISCORD_GUILD
    ),
    { body: commands }
  )
  .then(() => logger.log("Successfully registered application commands."))
  .catch((error) =>
    logger.error("Failed to register application commands: " + error.message)
  );
