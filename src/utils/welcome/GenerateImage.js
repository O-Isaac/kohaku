const Canvas = require("canvas");
const { MessageAttachment, User, Guild } = require("discord.js");
const path = require("path");

/**
 * Generate a canvas image for welcome
 * @param {User} user
 * @param {Guild} guild
 * @returns {Promise<MessageAttachment>}
 */
async function welcome(user, guild) {
  const canvas = Canvas.createCanvas(700, 250);
  const context = canvas.getContext("2d");

  const background = await Canvas.loadImage(
    path.join(process.cwd(), "src", "utils", "welcome", "bg.png")
  );

  // This uses the canvas dimensions to stretch the image onto the entire canvas
  context.drawImage(background, 0, -31, canvas.width, canvas.height);

  // Half paint with color

  context.fillStyle = "#2f3136";
  context.shadowColor = "rgba(0, 0, 0, 0.5)";
  context.shadowBlur = 2;
  context.shadowOffsetX = 0;
  context.shadowOffsetY = 2;
  context.fillRect(0, canvas.height - 100, canvas.width, canvas.height);

  // Add text to canvas (Bienvenido {username} a {guildname})
  context.font = "20px sans-serif";
  context.fillStyle = "#ffffff";
  context.fillText(
    `Bienvenido@ ${user.username} al discord Proyecto Grand Order\nEres el usuario ${guild.memberCount} de nuestro servidor`,
    canvas.width / 6,
    canvas.height - 55
  );

  // User avatar
  const avatar = await Canvas.loadImage(
    user.displayAvatarURL({ dynamic: true, format: "png" })
  );

  // Add bottom border
  context.beginPath();
  context.lineWidth = 4;
  context.strokeStyle = "#23272a";
  context.moveTo(0, canvas.height - 100);
  context.lineTo(canvas.width, canvas.height - 100);
  context.stroke();

  context.drawImage(avatar, 25, 160, 80, 80);

  const attachment = new MessageAttachment(canvas.toBuffer(), "welcome.png");

  return attachment;
}

module.exports = welcome;
