const path = require("path");
const fs = require("fs");

module.exports = function loadCollectors(kohaku) {
  const collectorsDir = path.join(process.cwd(), "src", "collectors");
  const collectors = fs.readdirSync(collectorsDir);

  for (const collector of collectors) {
    const collectorPath = path.join(collectorsDir, collector);
    const collectorModule = require(collectorPath);

    if (collectorModule.name) {
      kohaku.collectors.set(collectorModule.name, collectorModule);
    }
  }
};
