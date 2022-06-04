const Discord = require("discord.js");
const db = require("quick.db");
const config = require('../../../database/config')

module.exports = {
    name: "say",
    cooldown: 1000 * 2,

    run: async (client, message, args) => {

        let prefix = db.get(`prefix_${message.guild.id}`) || "-"
        let argsresult = args.join(' ')

        let language = db.get(`language_${message.guild.id}`);
        if (language === "pt-BR") { // PT-BR
            if (!message.member.permissions.has("MANAGE_GUILD")) {
                let embed = new Discord.MessageEmbed()
                .setDescription('**<:no:930170194494636152> Você não tem permissão para `Gerenciar o Servidor`**')
                .setColor("WHITE")
                return message.reply({ embeds: [embed] });
            }

            if (!argsresult) {
                let embed = new Discord.MessageEmbed()
                .setDescription(`**${config.emoji.no} Você precisa dizer algo para eu falar!**`)
                .setColor("WHITE")
                return message.reply({ embeds: [embed] });
            }

            let embed1 = new Discord.MessageEmbed()
            .setDescription(`**${argsresult}**\n\n**${config.emoji.yes} Enviado por: ${message.author}**`)
            .setColor("WHITE")
            return message.channel.send({ embeds: [embed1] });
        }
        if (!language || language === "en") { // EN

            if (!message.member.permissions.has("MANAGE_GUILD")) {
                let embed = new Discord.MessageEmbed()
                .setDescription('**<:no:930170194494636152> You do not have the permission to `Manager Server`**')
                .setColor("WHITE")
                return message.reply({ embeds: [embed] });
            }

            if (!argsresult) {
                let embed = new Discord.MessageEmbed()
                .setDescription(`**${config.emoji.no} You need to say something for me to say!**`)
                .setColor("WHITE")
                return message.reply({ embeds: [embed] });
            }

            let embed1 = new Discord.MessageEmbed()
            .setDescription(`**${argsresult}**\n\n**${config.emoji.yes} Send by: ${message.author}**`)
            .setColor("WHITE")
            return message.channel.send({ embeds: [embed1] });
        }
        
    }
}