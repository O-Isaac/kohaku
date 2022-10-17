const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction, MessageEmbed } = require("discord.js");

const images = [
    'https://i.imgur.com/cO4RHth.gif',
    'https://i.imgur.com/lsBViTX.gif',
    'https://i.imgur.com/oN0zDyV.gif',
    'https://i.imgur.com/WWBZkW1.gif',
    'https://i.imgur.com/8PB08Yn.gif',
    'https://i.imgur.com/Iv8yX71.gif',
    'https://i.imgur.com/GA3oOld.gif',
    'https://i.imgur.com/1mHKysX.gif',
    'https://i.imgur.com/XNw8b75.gif',
    'https://i.imgur.com/GNQj9CU.gif',
    'https://i.imgur.com/rkn7hiR.gif',
    'https://i.imgur.com/zyTLdET.gif',
    'https://i.imgur.com/2YwyRCG.gif',
    'https://i.imgur.com/hAMzC6q.gif',
    'https://i.imgur.com/tgFhVLu.gif',
    'https://i.imgur.com/MRNXbOK.gif',
    'https://i.imgur.com/fdSTlRr.gif',
    'https://i.imgur.com/oOI8jYV.gif',
    'https://i.imgur.com/vKa0sAV.gif',
    'https://i.imgur.com/TAlaaYy.gif'
]

module.exports = {
    data: new SlashCommandBuilder()
      .setName("encuerar")
      .setDescription("Encuera a un usuario ( ￣▽￣)ﾉ")
      .addUserOption((option) =>
        option
          .setRequired(false)
          .setName("crush")
          .setDescription("Tu crush que quieres encuerar")
      ),
    /**
     * @param {CommandInteraction} interaction
     */
    async execute(interaction) {
      const user = interaction.options.getMember("crush") || false;
      const author = interaction.user;
      const image = images[Math.floor(Math.random()*images.length)]

      const embed = new MessageEmbed()
        .setColor("PURPLE")
        .setImage(image)
        .setTimestamp();


      // if (user.id === "733475488017678407") {
      //   return interaction.reply({
      //     content: "No puedes encuerar a mi creador! (ノಠ益ಠ)ノ彡┻━┻"
      //   })
      // }

      if (user.id === "626504284267216926") {
        return interaction.reply({
          content: "No puedes encuerar a mi dios! (ノಠ益ಠ)ノ彡┻━┻"
        })
      }

      if (user) embed.setDescription(`**${author.username}** encuero a **${user.user.username}**`)
      else embed.setDescription(`**${interaction.client.user.username}** encuero a **${author.username}**`)
  
      return interaction.reply({
        content: `┬┴┬┴┤ ͜ʖ ͡°) ├┬┴┬┴\n${user}-sama **${author.username}** te acaba de encuerar`,
        embeds: [embed],
      });
    },
  };