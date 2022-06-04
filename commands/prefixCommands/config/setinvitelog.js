const { MessageEmbed } = require('discord.js')
const Discord = require("discord.js")
const db = require("quick.db");

module.exports = {
    name: "setinvitelog",
    cooldown: 1000 * 2,

    run: async(client, message, args) => {

        let prefix = db.get(`prefix_${message.guild.id}`) || "-"
        let language = db.get(`language_${message.guild.id}`);

        if (language === "pt-BR") { // PT-BR
            if (!message.member.permissions.has("MANAGE_GUILD")) {
                let embed = new Discord.MessageEmbed()
                .setDescription('> **<:no:930170194494636152> Você não tem permissão para `Gerenciar Servidor`**')
                .setColor("WHITE")
                return message.reply({ embeds: [embed] });
            }
            let channelMENTIONED = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
            if (!channelMENTIONED) {
                let embed = new Discord.MessageEmbed()
                .setDescription(`**<:no:930170194494636152> Para usar este comando use \`${prefix}setinvitelog <Marque o canal>\`**`)
                .setColor("WHITE")
                return message.reply({ embeds: [embed] });
            }

            db.set(`beta_invite_logger_${message.guild.id}`, `${channelMENTIONED.id}`)

            let embed = new Discord.MessageEmbed()
            .setDescription(`> **OK! Canal ${channelMENTIONED} foi definido como o canal de registro de convites!**`)
            .setColor("WHITE")

            message.reply({ embeds: [embed] });
        }

        if (!language || language === "en") { // EN
            if (!message.member.permissions.has("MANAGE_GUILD")) {
                let embed = new Discord.MessageEmbed()
                .setDescription('> **<:no:930170194494636152> You do not have the permission to `Manager Server`**')
                .setColor("WHITE")
                return message.reply({ embeds: [embed] });
            }

            let channelMENTIONED = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
            if (!channelMENTIONED) {
                let embed = new Discord.MessageEmbed()
                .setDescription(`**<:no:930170194494636152> To use this command use \`${prefix}setinvitelog <mark channel>\`**`)
                .setColor("WHITE")
                return message.reply({ embeds: [embed] });
            }

            db.set(`beta_invite_logger_${message.guild.id}`, `${channelMENTIONED.id}`)

            let embed = new Discord.MessageEmbed()
            .setDescription(`> **OK! Channel ${channelMENTIONED} has been set as the invite log channel!**`)
            .setColor("WHITE")

            message.reply({ embeds: [embed] });
        }
    }
}