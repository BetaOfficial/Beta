const Discord = require("discord.js");
const db = require("quick.db");
const owners = require("../../database/owners.json");
const config = require("../../database/config.json");
const e = require("../../database/emojis.json")

module.exports = {
    name: "emoji",
    cooldown: 1000 * 2,

    run: async (client, message, [emoji = '']) => {

        let prefix = db.get(`prefix_${message.guild.id}`) || "-"

        let language = db.get(`language_${message.guild.id}`);
        if (language === "pt-BR") { // PT-BR
            if (!emoji.match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/)){
                let embed = new Discord.MessageEmbed()
                .setDescription(`${e.no} **Você precisa inserir um emoji personalizado válido!**`)
                .setColor("WHITE")
                return message.reply({ embeds: [embed] })
            };
            let embed = new Discord.MessageEmbed()
            .setImage('https://cdn.discordapp.com/emojis/' + emoji.match(/\d{17,19}/)[0])
            return message.reply({ embeds: [embed] }).catch(() => {
                message.reply('<:no:930170194494636152> **Me desculpe mais eu não tenho permissão de enviar imagens!**')
            })
        }
        if (!language || language === "en") { // EN
            if (!emoji.match(/<?(a)?:?(\w{2,32}):(\d{17,19})>?/)){
                let embed = new Discord.MessageEmbed()
                .setDescription(`${e.no} **You need to enter a valid custom emoji!**`)
                .setColor("WHITE")
                return message.reply({ embeds: [embed] })
            };
            let embed = new Discord.MessageEmbed()
            .setImage('https://cdn.discordapp.com/emojis/' + emoji.match(/\d{17,19}/)[0])
            return message.reply({ embeds: [embed] }).catch(() => {
                message.reply('<:no:930170194494636152> **I\'m sorry but I\'m not allowed to upload images!**')
            })
        }
        
    }
}