module.exports = {
  name: "ready",
  once: true,
  execute(kohaku, logger) {
    logger.log(`Ready! Logged in as ${kohaku.user.tag}`);
  },
};
