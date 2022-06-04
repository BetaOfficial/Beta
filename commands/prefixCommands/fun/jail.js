const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js')
const db = require("quick.db")

module.exports = {
    name: 'jail',
    aliases: 'prender',
    cooldown: 1000 * 2,

    run: async (client, message, args) => {

        const url = 'https://some-random-api.ml/canvas/jail?avatar=';

        let language = db.get(`language_${message.guild.id}`);
        if (language === "pt-BR") { // PT-BR
            const user = client.users.cache.get(args[0]) || message.mentions.users.first() || message.author;

            const embed = new MessageEmbed()
                .setColor("WHITE")
                .setDescription(`**👮‍♂️  Parado ${user}! Você está preso!**`)
                .setImage(url + user.displayAvatarURL({ size: 4096, format: 'jpg' }))
                .setTimestamp();
            message.reply({ embeds: [embed] }).catch(() => {
                message.reply('<:no:930170194494636152> **Me desculpe mais eu não tenho permissão de enviar imagens!**')
            })
        }

        if (!language || language === "en") { // EN
            const user = client.users.cache.get(args[0]) || message.mentions.users.first() || message.author;

            const embed = new MessageEmbed()
                .setColor("WHITE")
                .setDescription(`**👮‍♂️  ${user} stop! You're stuck!**`)
                .setImage(url + user.displayAvatarURL({ size: 4096, format: 'jpg' }))
                .setTimestamp();
            message.reply({ embeds: [embed] }).catch(() => {
                message.reply('<:no:930170194494636152> **Sorry, but I\'m not allowed to send/upload images!**')
            })
        }
    },
};