const fs = require("fs");
const path = require("path");

function loadEvents(kohaku, logger) {
  const dirEvents = path.join(process.cwd(), "src", "events");
  const eventFiles = fs
    .readdirSync(dirEvents)
    .filter((file) => file.endsWith(".js"));

  for (const file of eventFiles) {
    const event = require(path.join(dirEvents, file));

    if (event.once) {
      kohaku.once(event.name, (...args) => event.execute(...args, logger));
    } else {
      kohaku.on(event.name, (...args) => event.execute(...args, logger));
    }
  }
}

module.exports = loadEvents;
