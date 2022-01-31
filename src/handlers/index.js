const Commands = require("./loadCommands");
const Events = require("./loadEvents");
const Collectors = require("./loadCollectors");

class Handlers {
  static use = {
    commands: Commands,
    events: Events,
    collectors: Collectors,
  };
}

module.exports = Handlers;
