const { SlashCommandBuilder } = require("@discordjs/builders");
const { CommandInteraction, MessageEmbed, User } = require("discord.js");
const { CronJob } = require("cron");
const timestring = require("timestring");

const jail = new Map()

const freeAnnouncement = (user, interaction) => {
  const freeMessage = new MessageEmbed()
    .setDescription(`El usuario **${user.user.username}** ha sido liberado.`)
    .setColor("RANDOM")
    .setImage("https://media.tenor.com/-B_ymXwK6xUAAAAC/cat-jailbreak.gif")

  interaction.channel.send({
    embeds: [freeMessage]
  })
}

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gulag")
    .setDescription("Encierra a un usuario en el gulag")
    .addUserOption((option) =>
      option
        .setRequired(true)
        .setName("victima")
        .setDescription("El usuario a encarcelar")
    )
    .addStringOption((option) =>
      option
        .setRequired(false)
        .setName("tiempo")
        .setDescription(
          "El tiempo (s | m | h | d) que el usuario permanecerá en el gulag "
        )
    ),
  permissions: ["KICK_MEMBERS", "BAN_MEMBERS", "MODERATE_MEMBERS"],
  roles: ["954523628177866793"],
  /**
   * @param {CommandInteraction} interaction
   */
  async execute(interaction) {
    // Get users
    const user = interaction.options.getMember("victima");
    const author = await interaction.guild.members.fetch({
      user: interaction.user.id
    })

    // Get Prisioner Role
    const prisionerRol = await interaction.guild.roles.fetch("1049156977902768228", {
      cache: true
    })

    // Check name
    if (user.user.username === author.user.username) {
      return interaction.reply({
        content: `¿**${author.user.username}-sama** por que te quieres encarcelar estas loco?`,
        ephemeral: true
      })
    }

    // Check if jailed & unjail
    if(prisionerRol.members.has(user.id)) {
      if(jail.has(user.id)) {
        const JailCron = jail.get(user.id)
        JailCron.stop();
        jail.delete(user.id)
      }
      
      user.roles.remove(prisionerRol);
      freeAnnouncement(user, interaction)

      return interaction.reply({
        content: `**${author.user.username}-sama** acabas de sacar a **${user.user.username}-sama** de su prision`,
        ephemeral: true
      })
    }
    
    
    // Get Roles
    const userRole = user.roles.highest
    const authorRole = author.roles.highest
    
    // Check position roles
    if (authorRole.position <= userRole.position) {
      return interaction.reply({
        content: `**${author.user.username}-sama** no puedo encarcela a **${user.user.username}-sama** por que su rol es superior al suyo.`,
        ephemeral: true
      })
    }
    
    // Get time in prision & jail
    try {
      let timeInPrision = interaction.options.getString("tiempo")
      if(!timeInPrision) timeInPrision = "1h" 
      const timePrision = timestring(timeInPrision, "ms")

      const timestamp = Math.floor(Date.now() / 1000)
      const timestampPrision = Math.floor(timePrision / 1000)
      const dateCron = new Date(Date.now() + timePrision)

      const jailCron = new CronJob(dateCron, function() {
        user.roles.remove(prisionerRol)
        jail.delete(user.id)
        freeAnnouncement(user, interaction)
        jailCron.stop();
      })

      user.roles.add(prisionerRol)
      jail.set(user.id, jailCron)
      jailCron.start()

      const jailMessage = new MessageEmbed()
        .setDescription(`El usuario **${user.user.username}** ha sido enviado al gulag. \rSaldra <t:${timestamp + timestampPrision}:R>`)
        .setColor("RANDOM")
        .setImage("https://media.tenor.com/ro-VMfAVHKMAAAAC/new-gulag.gif")

      return interaction.reply({
        embeds: [jailMessage],
        content: `**${author.user.username}-sama** acabas de enjaular a **${user.user.username}-sama**`,
      })

    } catch (error) {
      return interaction.reply({
        content: `**${author.user.username}-sama** no he podido enjaular a **${user.user.username}-sama** debido al siguiente error:
        \r${error.message}
        `,
        ephemeral: true,
        files: ["https://i.imgur.com/EQGWOB1.png"]
      })
    }


  },
};
