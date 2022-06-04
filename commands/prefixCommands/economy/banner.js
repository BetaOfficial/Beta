const Discord = require("discord.js");
const db = require("quick.db");
const config = require('../../../database/config');

module.exports = {
    name: "banner",
    aliases: ["setbanner"],
    cooldown: 1000 * 2,

    run: async (client, message, args) => {

        let d = db.get(`premium_${message.author.id}`);
        let language = db.get(`language_${message.guild.id}`);
        let prefix = db.get(`prefix_${message.guild.id}`) || "-"

        let url = args[0]

        if (d !== true) {
            if (language === "pt-BR") { // PT-BR
                let Embed = new Discord.MessageEmbed()
                .setDescription(`> **Hey esse comando são apenas para meus usuários premium!**`)
                .setColor("WHITE")
                return message.reply({ embeds: [Embed] })
            }
            if (!language || language === "en") { // EN
                let Embed = new Discord.MessageEmbed()
                .setDescription(`> **Hey this command are just for my premium users!**`)
                .setColor("WHITE")
                return message.reply({ embeds: [Embed] })
            }
        } else {
            if (language === "pt-BR") { // PT-BR
                if (!url) {
                    let embed = new Discord.MessageEmbed()
                    .setDescription(`**${config.emoji.no} Você precisa inserir um link! Use: \`${prefix}banner <url>\`**`)
                    .setColor("WHITE")
                    return message.reply({ embeds: [embed] })
                } else {
                    let banner_view = db.set(`banner_${message.author.id}`, url)
                    let embed = new Discord.MessageEmbed()
                    .setDescription(`**${config.emoji.yes} Perfeito! Seu banner foi setado com sucesso! Veja ele abaixo!**`)
                    .setColor("WHITE")
                    .setImage(banner_view)
                    return message.reply({ embeds: [embed] })
                }
            }
            if (!language || language === "en") { // EN
                if (!url) {
                    let embed = new Discord.MessageEmbed()
                    .setDescription(`**${config.emoji.no} You need to insert a link! Use: \`${prefix}banner <url>\`**`)
                    .setColor("WHITE")
                    return message.reply({ embeds: [embed] })
                } else {
                    let banner_view = db.set(`banner_${message.author.id}`, url)
                    let embed = new Discord.MessageEmbed()
                    .setDescription(`**${config.emoji.yes} Perfect! Your banner has been successfully set! See him below!**`)
                    .setColor("WHITE")
                    .setImage(banner_view)
                    return message.reply({ embeds: [embed] })
                }
            }
        }
    }
}