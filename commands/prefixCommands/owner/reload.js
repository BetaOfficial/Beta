const { MessageEmbed } = require('discord.js');
const Discord = require("discord.js");
const db = require("quick.db");
const config = require('../../../database/config')

module.exports = {
    name: "reload",
    aliases: ["recarregar"],
    cooldown: 1000 * 2,

    run: async (client, message, args) => {

        let prefix = db.get(`prefix_${message.guild.id}`) || "-"

        let owner = config.owners.ID1 || config.owners.ID2

        let language = db.get(`language_${message.guild.id}`);
        if (language === "pt-BR") { // PT-BR
            if (!owner.includes(message.author.id)) {
                let embed = new MessageEmbed()
                .setDescription('<:no:930170194494636152> **Somente meu criador pode usar este código!**')
                .setColor("WHITE")
                return message.reply({ embeds: [embed] })
            }

            if(!args[0] || !args[1]) {
                let Embed_01 = new Discord.MessageEmbed()
                .setDescription(`**\`${prefix}reload <categoria> <comando>\`**`)
                .setColor("WHITE")
                return message.reply({ embeds: [Embed_01] })
            }
            
            let category = args[0]
            let command = args[1]

            try {
                delete require.cache[require.resolve(`../../prefixCommands/${category}/${command}.js`)]
                client.commands.delete(command)
                const pull = require(`../../commands/${category}/${command}.js`)
                client.commands.set(command, pull)
            } catch(e) {
                let Embed_02 = new Discord.MessageEmbed()
                .setDescription(`**Não foi possível recarregar \`${command}\`!**`)
                .addField(`**Caminho:**`, `> **\`.../${category}/${command}.js\`**`)
                .setColor("WHITE")
                return message.reply({ embeds: [Embed_02] })
            }

            let Embed_03 = new Discord.MessageEmbed()
            .setDescription(`**O comando \`${command}\` foi atualizado!**`)
            .addField(`**Caminho:**`, `> **\`.../${category}/${command}.js\`**`)
            .setColor("WHITE")
            message.reply({ embeds: [Embed_03] })

        }
        if (!language || language === "en") { // EN
            if (!owner.includes(message.author.id)) {
                let embed = new MessageEmbed()
                .setDescription('<:no:930170194494636152> **Only my creator can use this code!**')
                .setColor("WHITE")
                return message.reply({ embeds: [embed] })
            }

            if(!args[0] || !args[1]) {
                let Embed_01 = new Discord.MessageEmbed()
                .setDescription(`**\`${prefix}reload <category> <command>\`**`)
                .setColor("WHITE")
                return message.reply({ embeds: [Embed_01] })
            }
			
            let category = args[0]
            let command = args[1]
            
            try {
                delete require.cache[require.resolve(`../../prefixCommands/${category}/${command}.js`)]
                client.commands.delete(command)
                const pull = require(`../../commands/${category}/${command}.js`)
                client.commands.set(command, pull)
            } catch(e) {
                let Embed_02 = new Discord.MessageEmbed()
                .setDescription(`**Could not reload \`${command}\`!**`)
                .addField(`**Path:**`, `> **\`.../${category}/${command}.js\`**`)
                .setColor("WHITE")
                return message.reply({ embeds: [Embed_02] })
            }

            let Embed_03 = new Discord.MessageEmbed()
            .setDescription(`**The command \`${command}\` It has been updated!**`)
            .addField(`**Path:**`, `> **\`.../${category}/${command}.js\`**`)
            .setColor("WHITE")
            message.reply({ embeds: [Embed_03] })
        }
        
    }
}