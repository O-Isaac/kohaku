const { SelectMenuInteraction } = require("discord.js");

/**
 * Execute the command of the interaction if it is a SelectMenuInteraction
 * @param {SelectMenuInteraction} interaction
 */
async function SelectMenuFunction(interaction) {
  const command = interaction.client.collectors.get(interaction.customId);

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
