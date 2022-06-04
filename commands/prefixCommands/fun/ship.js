const Discord = require("discord.js");
const db = require("quick.db");
const config = require('../../../database/config')

module.exports = {
    name: "ship",
    aliases: ["shipar"],
    cooldown: 1000 * 2,

    run: async (client, message, args) => {

        let prefix = db.get(`prefix_${message.guild.id}`) || "-"

        const user = client.users.cache.get(args[0] || args[1]) || message.mentions.users.first()

        var list = [
            'https://pa1.narvii.com/6496/d2f802d9b7843b933db5380e211d0cfde362e7b7_hq.gif',
            'https://i.pinimg.com/originals/55/9f/39/559f3903d8e090e82cf21e612704f786.gif',
            'https://i.pinimg.com/originals/55/9f/39/559f3903d8e090e82cf21e612704f786.gif'
        ];
        var gifs = list[Math.floor(Math.random() * list.length)];

        const love = Math.random() * 100;
        const loveIndex = Math.floor(love / 10);
        const loveLevel = '█'.repeat(loveIndex) + '.'.repeat(10 - loveIndex);

        let language = db.get(`language_${message.guild.id}`);
        if (language === "pt-BR") { // PT-BR
            if(user && user.id === message.author.id) {
                let embed = new Discord.MessageEmbed()
                .setDescription(`**${config.emoji.no} Você não pode mencionar a sí mesmo duas vezes!**`)
                .setColor("WHITE")
                return message.reply({ embeds: [embed] })
            }
            if (!user) {
                let embed = new Discord.MessageEmbed()
                .setDescription(`**${config.emoji.no} Você precisa marcar alguém!**`)
                .setColor("WHITE")
                return message.reply({ embeds: [embed] })
            }

            if (message.mentions.users.size < 2) {
                let embed = new Discord.MessageEmbed()
                .setDescription(`**> ${user} e ${message.author}**\n**${Math.floor(love)}%** : \`${loveLevel}\``)
                .setImage(gifs)
                .setColor("WHITE")
                return message.reply({ embeds: [embed] })
            } else if (message.mentions.users.size > 1) {
                let embed = new Discord.MessageEmbed()
                .setDescription(`**> ${message.mentions.users.first()} e ${message.mentions.users.last()}**\n**${Math.floor(love)}%** : \`${loveLevel}\``)
                .setImage(gifs)
                .setColor("WHITE")
                return message.reply({ embeds: [embed] })
            }
        }
        if (!language || language === "en") { // EN
            if(user && user.id === message.author.id) {
                let embed = new Discord.MessageEmbed()
                .setDescription(`**${config.emoji.no} You can't mention yourself twice!**`)
                .setColor("WHITE")
                return message.reply({ embeds: [embed] })
            }
            if (!user) {
                let embed = new Discord.MessageEmbed()
                .setDescription(`**${config.emoji.no} You need to tag someone!**`)
                .setColor("WHITE")
                return message.reply({ embeds: [embed] })
            }

            if (message.mentions.users.size < 2) {
                let embed = new Discord.MessageEmbed()
                .setDescription(`**> ${user} and ${message.author}**\n**${Math.floor(love)}%** : \`${loveLevel}\``)
                .setImage(gifs)
                .setColor("WHITE")
                return message.reply({ embeds: [embed] })
            } else if (message.mentions.users.size > 1) {
                let embed = new Discord.MessageEmbed()
                .setDescription(`**> ${message.mentions.users.first()} and ${message.mentions.users.last()}**\n**${Math.floor(love)}%** : \`${loveLevel}\``)
                .setImage(gifs)
                .setColor("WHITE")
                return message.reply({ embeds: [embed] })
            }
        }
    }
}