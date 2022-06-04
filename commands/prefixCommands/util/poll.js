const Discord = require("discord.js");
const db = require("quick.db");
const config = require('../../../database/config')

module.exports = {
    name: "poll",
    aliases: ["enquete"],
    cooldown: 1000 * 2,

    run: async (client, message, args) => {
        let prefix = db.get(`prefix_${message.guild.id}`) || "-"
        const poll = args.join(" ")

        let language = db.get(`language_${message.guild.id}`);
        if (language === "pt-BR") { // PT-BR
            if (!poll) {
                let embed = new Discord.MessageEmbed()
                .setDescription(`${config.emoji.no} **Diga uma enquete!**`)
                .setColor("WHITE")
                return message.reply({ embeds: [embed] })
            }
            let embed = new Discord.MessageEmbed()
            .setDescription(`**${poll}**`)
            .setColor("WHITE")
            let m = await message.channel.send({ embeds: [embed] })
            m.react("✅")
            m.react("❌")
        }
        if (!language || language === "en") { // EN
            if (!poll) {
                let embed = new Discord.MessageEmbed()
                .setDescription(`${config.emoji.no} **Make a poll!**`)
                .setColor("WHITE")
                return message.reply({ embeds: [embed] })
            }
            let embed = new Discord.MessageEmbed()
            .setDescription(`**${poll}**`)
            .setColor("WHITE")
            let m = await message.channel.send({ embeds: [embed] })
            m.react("✅")
            m.react("❌")
        }
    }
}