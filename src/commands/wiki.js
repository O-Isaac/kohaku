const { SlashCommandBuilder } = require("@discordjs/builders");
const { stripIndents } = require("common-tags");
const { CommandInteraction, MessageEmbed, Message } = require("discord.js");
const FGO = require("../services/fgo.fandom");
const Genshin = require("../services/genshin.fandom");

const axios = require("axios").default;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("wiki")
    .setDescription("Busca informacion en el wiki de la comunidad")
    .addSubcommand((command) =>
      command
        .setName("fgo")
        .setDescription("Busca informacion en el wiki de la comunidad de fgo")
        .addStringOption((option) =>
          option
            .setRequired(true)
            .setName("busqueda")
            .setDescription("La busqueda a realizar")
        )
    )
    .addSubcommand((command) =>
      command
        .setName("genshin")
        .setDescription(
          "Busca informacion en el wiki de la comunidad de genshin impact"
        )
        .addStringOption((option) =>
          option
            .setRequired(true)
            .setName("busqueda")
            .setDescription("La busqueda a realizar")
        )
    ),
  /**
   * @param {CommandInteraction} interaction
   */
  async execute(interaction) {
    try {
      // Subcommnad
      const group = interaction.options.getSubcommand("fgo") || false;

      // Embeds
      const embedFgo = new MessageEmbed()
        .setColor("BLUE")
        .setTitle("Fate/Grand Order Wiki – Fandom")
        .setThumbnail("https://i.imgur.com/F6mU6jv.png")
        .setURL(
          "https://fategrandorder.fandom.com/wiki/Fate/Grand_Order_Wikia"
        );

      const embedGenshin = new MessageEmbed()
        .setColor("DARK_GOLD")
        .setTitle("Genshin Impact Wiki – Fandom")
        .setThumbnail(
          "https://static.wikia.nocookie.net/gen-impact/images/e/e6/Site-logo.png/revision/latest?cb=20210815130913&path-prefix=es"
        )
        .setURL(
          "https://genshin-impact.fandom.com/es/wiki/Wiki_Genshin_Impact"
        );

      // Functions
      const getPagesFGO = async (search) =>
        (await axios.get(FGO(search))).data.query.search;

      const getPagesGenshin = async (search) =>
        (await axios.get(Genshin(search))).data.query.search;

      const setResults = (embed, results, firstResult, url) => {
        embed.setDescription(stripIndents`
          Este es el primer resultado: [${firstResult.title}](${url}/?curid=${
          firstResult.pageid
        })
          
          **Otros resultados**
          ${results
            .slice(1)
            .map(
              (result) =>
                `[${result.title}](https://fategrandorder.fandom.com/?curid=${result.pageid})`
            )
            .join("\n")}
          `);
      };

      // Execs
      if (group === "fgo") {
        const search = interaction.options.getString("busqueda") || false;
        const results = await getPagesFGO(search);

        if (!results.length > 0) throw Error("No se encontraron resultados");

        const firstResult = results[0];

        setResults(
          embedFgo,
          results,
          firstResult,
          "https://fategrandorder.fandom.com"
        );

        return interaction.reply({ embeds: [embedFgo] });
      }

      if (group === "genshin") {
        const search = interaction.options.getString("busqueda") || false;
        const results = await getPagesGenshin(search);

        if (!results.length > 0) throw Error("No se encontraron resultados");

        const firstResult = results[0];

        setResults(
          embedGenshin,
          results,
          firstResult,
          "https://genshin-impact.fandom.com/es"
        );

        return interaction.reply({ embeds: [embedGenshin] });
      }

      return interaction.reply({
        content: "Comando realizado con exito",
        ephemeral: true,
      });
    } catch (e) {
      return interaction.reply({
        content: e.message,
        ephemeral: true,
      });
    }
  },
};
