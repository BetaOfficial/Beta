const Discord = require("discord.js");
const db = require("quick.db");
const config = require('../../../database/config')

module.exports = {
    name: "unban",
    aliases: ["desbanir"],
    cooldown: 1000 * 2,

    run: async (client, message, args) => {

        let prefix = db.get(`prefix_${message.guild.id}`) || "-"

        let user = client.users.cache.get(args[0])

        let language = db.get(`language_${message.guild.id}`);
        if (language === "pt-BR") { // PT-BR
            if (!message.member.permissions.has("BAN_MEMBERS")) {
                let embed01 = new Discord.MessageEmbed()
                .setDescription(`${config.emoji.no} **Hey! Você não pode desbanir membros!**`)
                .setColor("WHITE")
                return message.reply({ embeds: [embed01] })
            }
            if (!message.guild.me.permissions.has("BAN_MEMBERS")) {
                let embed02 = new Discord.MessageEmbed()
                .setDescription(`${config.emoji.no} **Hey! Eu não posso desbanir membros!**`)
                .setColor("WHITE")
                return message.reply({ embeds: [embed02] })
            } else {
                if (!user) {
                    let embed03 = new Discord.MessageEmbed()
                    .setDescription(`${config.emoji.no} **Hey! Você esqueceu de citar alguem! Use:**\n**\`${prefix}unban <Usuário>\`**`)
                    .setColor("WHITE")
                    return message.reply({ embeds: [embed03] })
                }
                if (user.id == message.author.id) {
                    let embed04 = new Discord.MessageEmbed()
                    .setDescription(`${config.emoji.no} **Hey! Você não pode desbanir a sí mesmo!**`)
                    .setColor("WHITE")
                    return message.reply({ embeds: [embed04] })
                }
                if (user.id == client.user.id) {
                    let embed05 = new Discord.MessageEmbed()
                    .setDescription(`${config.emoji.no} **Hey! Você não pode me usar para me desbanir!**`)
                    .setColor("WHITE")
                    return message.reply({ embeds: [embed05] })
                }

                let embed_complete = new Discord.MessageEmbed()
                .setDescription(`${config.emoji.yes} **Ok, Alguem foi desbanido! Veja as informações abaixo:**`)
                .addField(`**👮‍♂️ MOD:**`, `**${message.author}**\n**\`${message.author.id}\`**`, true)
                .addField(`**👤 Usuário:**`, `**${user}**\n**\`${user.id}\`**`, true)
                .setColor("WHITE")
                let embed_error = new Discord.MessageEmbed()
                .setDescription(`${config.emoji.no} **Hey! Não consegui desbanir ${user}...**`)
                .setColor("WHITE")

                message.guild.members.unban(user.id).then(() => message.reply({ embeds: [embed_complete] })).catch(e => {
                    message.reply({ embeds: [embed_error] })
                })
            }
        }
        if (!language || language === "en") { // EN
            if (!message.member.permissions.has("BAN_MEMBERS")) {
                let embed01 = new Discord.MessageEmbed()
                .setDescription(`${config.emoji.no} **Hey! You cannot unban members!**`)
                .setColor("WHITE")
                return message.reply({ embeds: [embed01] })
            }
            if (!message.guild.me.permissions.has("BAN_MEMBERS")) {
                let embed02 = new Discord.MessageEmbed()
                .setDescription(`${config.emoji.no} **Hey! I can't unban out members!**`)
                .setColor("WHITE")
                return message.reply({ embeds: [embed02] })
            } else {
                if (!user) {
                    let embed03 = new Discord.MessageEmbed()
                    .setDescription(`${config.emoji.no} **Hey! You forgot to name someone! Use:**\n**\`${prefix}unban <User>\`**`)
                    .setColor("WHITE")
                    return message.reply({ embeds: [embed03] })
                }
                if (user.id == message.author.id) {
                    let embed04 = new Discord.MessageEmbed()
                    .setDescription(`${config.emoji.no} **Hey! You cannot unban yourself!**`)
                    .setColor("WHITE")
                    return message.reply({ embeds: [embed04] })
                }
                if (user.id == client.user.id) {
                    let embed05 = new Discord.MessageEmbed()
                    .setDescription(`${config.emoji.no} **Hey! You can't use me to unban myself!**`)
                    .setColor("WHITE")
                    return message.reply({ embeds: [embed05] })
                }
                let embed_complete = new Discord.MessageEmbed()
                .setDescription(`${config.emoji.yes} **Ok, Someone got unban out! See the information below:**`)
                .addField(`**👮‍♂️ MOD:**`, `**${message.author}**\n**\`${message.author.id}\`**`, true)
                .addField(`**👤 User:**`, `**${user}**\n**\`${user.id}\`**`, true)
                .setColor("WHITE")
                let embed_error = new Discord.MessageEmbed()
                .setDescription(`${config.emoji.no} **Hey! I could not unban ${user}...**`)
                .setColor("WHITE")

                message.guild.members.unban(user.id).then(() => message.reply({ embeds: [embed_complete] })).catch(e => {
                    message.reply({ embeds: [embed_error] })
                })
            }
        }
        
    }
}