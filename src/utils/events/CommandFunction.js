const { CommandInteraction } = require("discord.js");

/**
 * Execute the command of the interaction if it is a CommandInteraction
 * @param {CommandInteraction} interaction
 */
async function InteractionCommandFunc(interaction) {
  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    if (!interaction.member.permissions.has(command.permissions)) {
      return interaction.reply({
        content: "No tienes permisos para usar este comando.",
        ephemeral: true,
      });
    }

    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({
      content: "There was an error while executing this command!",
      ephemeral: true,
    });
  }
}

module.exports = InteractionCommandFunc;
