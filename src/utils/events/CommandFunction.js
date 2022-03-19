const { CommandInteraction } = require("discord.js");

/**
 * Execute the command of the interaction if it is a CommandInteraction
 * @param {CommandInteraction} interaction
 */
async function InteractionCommandFunc(interaction) {
  const command = interaction.client.commands.get(interaction.commandName);

  if (!command) return;

  const hasRole = interaction.member.roles.cache.some((role) =>
    command.roles.includes(role.id)
  );

  try {
    if (!hasRole) {
      // Check if the user has the required roles
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
