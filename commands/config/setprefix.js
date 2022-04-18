const db = require('quick.db')
const Discord = require("discord.js")

module.exports = {
    name: "prefix",
    aliases: ["setprefix", "prefixset", "serverprefix"],
    cooldown: 1000 * 2,
    run: async (client, message, args) => {

        let language = db.get(`language_${message.guild.id}`);
        
        if (language === "pt-BR") { // PT-BR
            if (!message.member.permissions.has("MANAGE_GUILD")) {
                let embed = new Discord.MessageEmbed()
                .setDescription('**<:no:930170194494636152> Você não tem permissão para `Gerenciar o Servidor`**')
                .setColor("WHITE")
                return message.reply({ embeds: [embed] });
            }

            let error2_embed = new Discord.MessageEmbed()
            .setDescription(`**<:no:930170194494636152> Você precisa inserir um novo prefixo!**`)
            .setColor("WHITE")

            if (!args[0]) return message.channel.send({ embeds: [error2_embed] })

            let error3_embed = new Discord.MessageEmbed()
            .setDescription(`**<:no:930170194494636152> O prefixo não pode conter espaço!**`)
            .setColor("WHITE")

            if (args[1]) return message.reply({ embeds: [error3_embed] })

            db.set(`prefix_${message.guild.id}`, args[0])

            let confirm_embed = new Discord.MessageEmbed()
            .setDescription(`**<:yes:930170194784043048> Prefixo definido como: \`${args[0]}\`**`)
            .setColor("WHITE")

            message.reply({ embeds: [confirm_embed] })
        }
        if (!language || language === "en") { // EN
            if (!message.member.permissions.has("MANAGE_GUILD")) {
                let embed = new Discord.MessageEmbed()
                .setDescription('**<:no:930170194494636152> You do not have the permission to `Manager Server`**')
                .setColor("WHITE")
                return message.reply({ embeds: [embed] });
            }

            let error2_embed = new Discord.MessageEmbed()
            .setDescription(`**<:no:930170194494636152> You need to choose a new prefix!**`)
            .setColor("WHITE")

            if (!args[0]) return message.channel.send({ embeds: [error2_embed] })

            let error3_embed = new Discord.MessageEmbed()
            .setDescription(`**<:no:930170194494636152> The prefix cannot have a space between it!**`)
            .setColor("WHITE")

            if (args[1]) return message.reply({ embeds: [error3_embed] })

            db.set(`prefix_${message.guild.id}`, args[0])

            let confirm_embed = new Discord.MessageEmbed()
            .setDescription(`**<:yes:930170194784043048> Prefix set to: \`${args[0]}\`**`)
            .setColor("WHITE")

            message.reply({ embeds: [confirm_embed] })
        }
    }
}