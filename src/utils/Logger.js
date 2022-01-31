class Logger {
  constructor(prefix, color) {
    this.prefix = color ? color(prefix) : prefix;
  }

  log(msg, symbol = "") {
    let text = `${symbol} ${this.prefix}: ${msg}`;

    if (!symbol) text = `${this.prefix}: ${msg}`;

    console.log(text);
  }

  error(msg, symbol = "") {
    let text = `${symbol} ${this.prefix}: ${msg}`;

    if (!symbol) text = `${this.prefix}: ${msg}`;

    console.error(text);
  }

  warn(msg, symbol = "") {
    let text = `${symbol} ${this.prefix}: ${msg}`;

    if (!symbol) text = `${this.prefix}: ${msg}`;

    console.warn(text);
  }
}

module.exports = Logger;
