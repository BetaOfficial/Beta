const Discord = require("discord.js");
const db = require("quick.db");
const config = require('../../../database/config')

module.exports = {
    name: "slowmode",
    aliases: ["modolento"],
    cooldown: 1000 * 2,

    run: async (client, message, args) => {

        let prefix = db.get(`prefix_${message.guild.id}`) || "-"
        let time = args[0]

        let language = db.get(`language_${message.guild.id}`);
        if (language === "pt-BR") { // PT-BR
            if (!message.guild.me.permissions.has('MANAGE_CHANNELS')) {
                let embed = new Discord.MessageEmbed()
                .setDescription('**<:no:930170194494636152> Eu não tenho permissão para `Gerenciar Canais`**')
                .setColor("WHITE")
                return message.reply({ embeds: [embed] });
            }
            if (!message.member.permissions.has("MANAGE_CHANNELS")) {
                return message.reply(`**Você não tem permissão para \`Gerenciar Canais\`**`)
            }
            if (!time) {
                let embed01 = new Discord.MessageEmbed()
                .setDescription(`${config.emoji.no} **Hey! Você esqueceu de falar um tempo! Use:**\n**\`${prefix}slowmode <Tempo>\`**`)
                .setColor("WHITE")
                return message.reply({ embeds: [embed01] })
            }
            if (Number(time) < 0) {
                let embed02 = new Discord.MessageEmbed()
                .setDescription(`${config.emoji.no} **Hey! Você não pode usar números negativos! Exemplo:**\n**\`${prefix}slowmode 5\`**`)
                .setColor("WHITE")
                return message.reply({ embeds: [embed02] })
            } else {

                let embed_error = new Discord.MessageEmbed()
                .setDescription(`${config.emoji.no} **Hey! Não consegui setar o modo lento deste canal!**`)
                .setColor("WHITE")

                let embed03 = new Discord.MessageEmbed()
                .setDescription(`${config.emoji.yes} **Ok, Setei este canal com o modo lento! Verifique as informações abaixo:**`)
                .addField(`**🎪 Canal:**`, `**<#${message.channel.id}>**`, true)
                .addField(`**👮‍♂️ MOD:**`, `**${message.author}**`, true)
                .addField(`**🕐 Tempo:**`, `**\`${time}\`**`, true)
                .setColor("WHITE")

                message.channel.setRateLimitPerUser(time).then(() => message.reply({ embeds: [embed03]})).catch(e => {
                    message.reply({ embeds: [embed_error] })
                })
            }
        }
        if (!language || language === "en") { // EN
            if (!message.guild.me.permissions.has('MANAGE_CHANNELS')) {
                let embed = new Discord.MessageEmbed()
                .setDescription('**<:no:930170194494636152> I don\'t have permission to `Manage Channels`**')
                .setColor("WHITE")
                return message.reply({ embeds: [embed] });
            }
            if (!message.member.permissions.has("MANAGE_CHANNELS")) {
                return message.reply(`**You are not allowed to \`Manage Channels\`**`)
            }
            if (!time) {
                let embed01 = new Discord.MessageEmbed()
                .setDescription(`${config.emoji.no} **Hey! You forgot to speak time! Use:**\n**\`${prefix}slowmode <Time>\`**`)
                .setColor("WHITE")
                return message.reply({ embeds: [embed01] })
            }
            if (Number(time) < 0) {
                let embed02 = new Discord.MessageEmbed()
                .setDescription(`${config.emoji.no} **Hey! You cannot use negative numbers! Exemplo:**\n**\`${prefix}slowmode 5\`**`)
                .setColor("WHITE")
                return message.reply({ embeds: [embed02] })
            } else {

                let embed_error = new Discord.MessageEmbed()
                .setDescription(`${config.emoji.no} **Hey! I couldn't set the slow mode of this channel!**`)
                .setColor("WHITE")

                let embed03 = new Discord.MessageEmbed()
                .setDescription(`${config.emoji.yes} **Ok, I set this channel to slow mode! Check the information below:**`)
                .addField(`**🎪 Channel:**`, `**<#${message.channel.id}>**`, true)
                .addField(`**👮‍♂️ MOD:**`, `**${message.author}**`, true)
                .addField(`**🕐 Time:**`, `**\`${time}\`**`, true)
                .setColor("WHITE")

                message.channel.setRateLimitPerUser(time).then(() => message.reply({ embeds: [embed03]})).catch(e => {
                    message.reply({ embeds: [embed_error] })
                })
            }
        }
        
    }
}