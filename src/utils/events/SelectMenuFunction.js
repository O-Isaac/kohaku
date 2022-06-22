const { SelectMenuInteraction } = require("discord.js");

const overrides = {
  facciones: "roles-selector-facciones",
};

/**
 * Execute the command of the interaction if it is a SelectMenuInteraction
 * @param {SelectMenuInteraction} interaction
 */
async function SelectMenuFunction(interaction) {
  const customId = interaction.customId;
  let id = customId;

  const Overrides = Object.values(overrides);
  const includeOverride = Overrides.some((str) => customId.includes(str));

  if (includeOverride) {
    const value = Overrides.filter((value) => customId.includes(value)).pop();
    id = value;
  }

  const command = interaction.client.collectors.get(id);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
}

module.exports = SelectMenuFunction;
