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
      .setName("Encuerar")
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
      const user = interaction.options.getMember("crush") || null;
      const author = interaction.user;

      const embed = new MessageEmbed()
        .setColor("PURPLE")
        .setDescription(`${author.username} encuero a ${user.username ?? author.username}`)
        .setImage(images[Math.floor(Math.random()*images.length)])
        .setTimestamp();
  
      return interaction.reply({
        embeds: [embed],
      });
    },
  };