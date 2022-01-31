const Kohaku = require("./clients/discord.js");
const Logger = require("./utils/Logger");
const Color = require("kleur");
const Handlers = require("./handlers/index");

// Create an instance of a Discord client
// Calculate the intents to use (32479)
const kohaku = new Kohaku({ intents: 32479 });
const logger = new Logger("Kohaku", Color.blue);

// Use handlers
Handlers.use.commands(kohaku);
Handlers.use.events(kohaku, logger);

// Login
kohaku.login(process.env.DISCORD_TOKEN);
