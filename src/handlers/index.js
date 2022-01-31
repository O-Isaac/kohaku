const Commands = require("./loadCommands");
const Events = require("./loadEvents");

class Handlers {
  static use = {
    commands: Commands,
    events: Events,
  };
}

module.exports = Handlers;
