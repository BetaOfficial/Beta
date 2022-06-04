const Discord = require("discord.js");
const db = require("quick.db");
const config = require('../../../database/config')

module.exports = {
    name: "kick",
    aliases: ["expulsar", "kickar"],
    cooldown: 1000 * 2,

    run: async (client, message, args) => {

        let prefix = db.get(`prefix_${message.guild.id}`) || "-"

        let language = db.get(`language_${message.guild.id}`);
        if (language === "pt-BR") { // PT-BR
            if (!message.member.permissions.has("KICK_MEMBERS")) {
                let embed01 = new Discord.MessageEmbed()
                .setDescription(`${config.emoji.no} **Hey! Você não pode expulsar membros!**`)
                .setColor("WHITE")
                return message.reply({ embeds: [embed01] })
            }
            if (!message.guild.me.permissions.has("KICK_MEMBERS")) {
                let embed02 = new Discord.MessageEmbed()
                .setDescription(`${config.emoji.no} **Hey! Eu não posso expulsar membros!**`)
                .setColor("WHITE")
                return message.reply({ embeds: [embed02] })
            } else {
                let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
                let reason = args[1];
                if (!reason) reason = "Não definido";

                if (!user) {
                    let embed03 = new Discord.MessageEmbed()
                    .setDescription(`${config.emoji.no} **Hey! Você esqueceu de citar alguem! Use:**\n**\`${prefix}kick <Usuário> <Motivo>\`**`)
                    .setColor("WHITE")
                    return message.reply({ embeds: [embed03] })
                }
                if (user.id == message.author.id) {
                    let embed04 = new Discord.MessageEmbed()
                    .setDescription(`${config.emoji.no} **Hey! Você não pode expulsar a sí mesmo!**`)
                    .setColor("WHITE")
                    return message.reply({ embeds: [embed04] })
                }
                if (user.id == client.user.id) {
                    let embed05 = new Discord.MessageEmbed()
                    .setDescription(`${config.emoji.no} **Hey! Você não pode me usar para me expusar!**`)
                    .setColor("WHITE")
                    return message.reply({ embeds: [embed05] })
                }
                if(!user.kickable) {
                    let embed06 = new Discord.MessageEmbed()
                    .setDescription(`${config.emoji.no} **Hey! Eu não tenho permissão para expulsar esse usuário!**`)
                    .setColor("WHITE")
                    return message.reply({ embeds: [embed06] })
                };

                let embed_complete = new Discord.MessageEmbed()
                .setDescription(`${config.emoji.yes} **Ok, Alguem foi expulso! Veja as informações abaixo:**`)
                .addField(`**👮‍♂️ MOD:**`, `**${message.author}**\n**\`${message.author.id}\`**`, true)
                .addField(`**👤 Usuário:**`, `**${user}**\n**\`${user.id}\`**`, true)
                .addField(`**📋 Motivo:**`, `**\`\`\`txt\n${reason}\`\`\`**`, true)
                .setColor("WHITE")
                let embed_error = new Discord.MessageEmbed()
                .setDescription(`${config.emoji.no} **Hey! Não consegui expulsar ${user}...**`)
                .setColor("WHITE")

                user.kick(reason).then(() => message.reply({ embeds: [embed_complete]})).catch(e => {
                    message.reply({ embeds: [embed_error] })
                })
            }
        }
        if (!language || language === "en") { // EN
            if (!message.member.permissions.has("KICK_MEMBERS")) {
                let embed01 = new Discord.MessageEmbed()
                .setDescription(`${config.emoji.no} **Hey! You cannot kick members!**`)
                .setColor("WHITE")
                return message.reply({ embeds: [embed01] })
            }
            if (!message.guild.me.permissions.has("KICK_MEMBERS")) {
                let embed02 = new Discord.MessageEmbed()
                .setDescription(`${config.emoji.no} **Hey! I can't kick out members!**`)
                .setColor("WHITE")
                return message.reply({ embeds: [embed02] })
            } else {
                let user = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
                let reason = args[1];
                if (!reason) reason = "Undefined";

                if (!user) {
                    let embed03 = new Discord.MessageEmbed()
                    .setDescription(`${config.emoji.no} **Hey! You forgot to name someone! Use:**\n**\`${prefix}kick <User> <Reason>\`**`)
                    .setColor("WHITE")
                    return message.reply({ embeds: [embed03] })
                }
                if (user.id == message.author.id) {
                    let embed04 = new Discord.MessageEmbed()
                    .setDescription(`${config.emoji.no} **Hey! You cannot expel yourself!**`)
                    .setColor("WHITE")
                    return message.reply({ embeds: [embed04] })
                }
                if (user.id == client.user.id) {
                    let embed05 = new Discord.MessageEmbed()
                    .setDescription(`${config.emoji.no} **Hey! You can't use me to expose myself!**`)
                    .setColor("WHITE")
                    return message.reply({ embeds: [embed05] })
                }
                if(!user.kickable) {
                    let embed06 = new Discord.MessageEmbed()
                    .setDescription(`${config.emoji.no} **Hey! I don't have permission to kick this user out!**`)
                    .setColor("WHITE")
                    return message.reply({ embeds: [embed06] })
                };

                let embed_complete = new Discord.MessageEmbed()
                .setDescription(`${config.emoji.yes} **Ok, Someone got kicked out! See the information below:**`)
                .addField(`**👮‍♂️ MOD:**`, `**${message.author}**\n**\`${message.author.id}\`**`, true)
                .addField(`**👤 User:**`, `**${user}**\n**\`${user.id}\`**`, true)
                .addField(`**📋 Reason:**`, `**\`\`\`txt\n${reason}\`\`\`**`, true)
                .setColor("WHITE")
                let embed_error = new Discord.MessageEmbed()
                .setDescription(`${config.emoji.no} **Hey! I could not kick ${user}...**`)
                .setColor("WHITE")

                user.kick(reason).then(() => message.reply({ embeds: [embed_complete]})).catch(e => {
                    message.reply({ embeds: [embed_error] })
                })
            }
        }
        
    }
}