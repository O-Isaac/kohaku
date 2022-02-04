const { Console } = require("node:console");
const { Transform } = require("node:stream");

const ts = new Transform({
  transform(chunk, enc, cb) {
    cb(null, chunk);
  },
});

const logger = new Console({ stdout: ts });

module.exports = function getTable(data) {
  logger.table(data);
  return (ts.read() || "").toString();
};
