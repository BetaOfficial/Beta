const { MessageEmbed } = require("discord.js");
const { stripIndents } = require("common-tags")
const moment = require("moment")
require("moment-duration-format")(moment);
const db = require ("quick.db");

module.exports = {
    name: "nowplaying",
    aliases: ["np", "now"],
    cooldown: 1000 * 2,

    run: async (client, message, args) => {
        const bot = client;
        const player = message.client.manager.get(message.guild.id);
        const currentTime = player.position;
        const trackLength = player.queue.current.duration;
        const timeDisplay = `\`${moment.duration(currentTime, "milliseconds").format()}/${moment.duration(trackLength, "milliseconds").format()}\``;
        const timeBar = "━".repeat(30).split("");
 
        for (let i = 0; i < timeBar.length; i++) {
          // Multiply len by the pattern length to get the right rate to change the dot's positon. Defaults to 1.
          if (i === timeBar.length - 1 || i === Math.round((30 * currentTime) / trackLength)) {
            timeBar.splice(i, 1, "🔘"); // Replace the character at this index with the dot to visualize the player's current position.
            break;
          }
        }
        
        let language = db.get(`language_${message.guild.id}`);
        if (language === "pt-BR") { // PT-BR

          if (!player || !player.queue.current)return message.channel.send({embed: {description: "Nenhuma música tocando atualmente neste servidor!", color: "WHITE"}})

          const { title, author, duration, thumbnail, requester } = player.queue.current;
          const part = Math.floor((player.position / duration) * 10);
          const embed = new MessageEmbed()
          .setAuthor("Tocando agora:", message.author.displayAvatarURL())
          .setThumbnail(thumbnail)
          .setDescription(stripIndents`**\`${player.playing ? "▶️" : "⏸️"}\` Tocando agora: [${player.queue.current.title}](${player.queue.current.uri})**\n\n\`${"▬".repeat(part) + "🔘" + "▬".repeat(10 - part)}\` \`(${timeDisplay})\``)
          .addField("Pedido por:", `${requester}`)
          .setColor("WHITE")

          return message.reply({ embeds: [embed] }).catch(err => message.channel.send({ content: `${err}`}))
        }
        if (!language || language === "en") { // EN

          if (!player || !player.queue.current)return message.channel.send({embed: {description: "No song currently playing in this guild!", color: "WHITE"}})

          const { title, author, duration, thumbnail, requester } = player.queue.current;
          const part = Math.floor((player.position / duration) * 10);
          const embed = new MessageEmbed()
          .setAuthor("Now Playing:", message.author.displayAvatarURL())
          .setThumbnail(thumbnail)
          .setDescription(stripIndents`**\`${player.playing ? "▶️" : "⏸️"}\` Currently Playing: [${player.queue.current.title}](${player.queue.current.uri})**\n\n\`${"▬".repeat(part) + "🔘" + "▬".repeat(10 - part)}\` \`(${timeDisplay})\``)
          .addField("Requested By:", `${requester}`)
          .setColor("WHITE")

          return message.reply({ embeds: [embed] }).catch(err => message.channel.send({ content: `${err}`}))
        }
    }
}