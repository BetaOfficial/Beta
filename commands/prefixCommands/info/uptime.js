const Discord = require("discord.js");
const db = require("quick.db");
const config = require('../../../database/config');
const moment = require('moment');

module.exports = {
    name: "uptime",
    aliases: ["tempo-ligado", "up"],
    cooldown: 1000 * 2,
    run: async (client, message, args) => {

        let prefix = db.get(`prefix_${message.guild.id}`) || "-"

        const d = moment.duration(message.client.uptime);

        let language = db.get(`language_${message.guild.id}`);
        if (language === "pt-BR") { // PT-BR
            const days = (d.days() == 1) ? `${d.days()} dia` : `${d.days()} dias`;
            const hours = (d.hours() == 1) ? `${d.hours()} hora` : `${d.hours()} horas`;
            const minutes = (d.minutes() == 1) ? `${d.minutes()} minuto` : `${d.minutes()} minutos`;
            const seconds = (d.seconds() == 1) ? `${d.seconds()} segundo` : `${d.seconds()} segundos`;

            let embed01 = new Discord.MessageEmbed()
            .setDescription(`**${config.emoji.yes} Hey! Estou online há:**\n**\`${days}, ${hours}, ${minutes}, ${seconds}\`!**`)
            .setColor("WHITE")
            message.reply({ embeds: [embed01] })
        }
        if (!language || language === "en") { // EN
            const days = (d.days() == 1) ? `${d.days()} day` : `${d.days()} days`;
            const hours = (d.hours() == 1) ? `${d.hours()} hour` : `${d.hours()} hours`;
            const minutes = (d.minutes() == 1) ? `${d.minutes()} minute` : `${d.minutes()} minutes`;
            const seconds = (d.seconds() == 1) ? `${d.seconds()} second` : `${d.seconds()} seconds`;

            let embed02 = new Discord.MessageEmbed()
            .setDescription(`**${config.emoji.yes} Hey! I've been online for:**\n**\`${days}, ${hours}, ${minutes}, ${seconds}\`!**`)
            .setColor("WHITE")
            message.reply({ embeds: [embed02] })
        }
        
    }
}