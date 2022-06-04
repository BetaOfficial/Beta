const { MessageEmbed } = require('discord.js')
const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
  name: "setsuggest",
  cooldown: 1000 * 2,

  run: async (client, message, args) => {

    let prefix = db.get(`prefix_${message.guild.id}`) || "-"

    let language = db.get(`language_${message.guild.id}`);
        
    if (language === "pt-BR") { // PT-BR

      if (!message.member.permissions.has("MANAGE_GUILD")) {
            let embed = new Discord.MessageEmbed()
            .setDescription('**<:no:930170194494636152> Você não tem permissão para `Gerenciar o Servidor`**')
            .setColor("WHITE")
            return message.reply({ embeds: [embed] });
        }

      try {

        let channelMENTIONED = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        if (!channelMENTIONED) {
          let embed = new Discord.MessageEmbed()
          .setDescription(`**<:no:930170194494636152> Para usar esse comando use: \`${prefix}setsuggest <Marque o Canal>\`**`)
          .setColor("WHITE")
          return message.reply({ embeds: [embed] });
        }

        db.set(`channelSUGERIR_${message.guild.id}`, `${channelMENTIONED.id}`)

        let embed1 = new Discord.MessageEmbed()
        .setDescription(`**<:yes:930170194784043048> Ok, eu setei o canal de sugestão do servidor para: ${channelMENTIONED}**`)
        .setColor("WHITE")

        message.reply({ embeds: [embed1] });

      } catch (err) {
        console.log('Error detected in setsuggest command')
      }
    }
    if (!language || language === "en") { // EN

      if (!message.member.permissions.has("MANAGE_GUILD")) {
            let embed = new Discord.MessageEmbed()
            .setDescription('**<:no:930170194494636152> You do not have the permission to `Manager Server`**')
            .setColor("WHITE")
            return message.reply({ embeds: [embed] });
        }

      try {

        let channelMENTIONED = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);
        if (!channelMENTIONED) {
          let embed = new Discord.MessageEmbed()
          .setDescription(`**<:no:930170194494636152> To use this command use \`${prefix}setsuggest <mark channel>\`**`)
          .setColor("WHITE")
          return message.reply({ embeds: [embed] });
        }

        db.set(`channelSUGERIR_${message.guild.id}`, `${channelMENTIONED.id}`)

        let embed1 = new Discord.MessageEmbed()
        .setDescription(`**<:yes:930170194784043048> Okay, I set the suggestion channel to ${channelMENTIONED}**`)
        .setColor("WHITE")

        message.reply({ embeds: [embed1] });

      } catch (err) {
        console.log('Error detected in setsuggest command')
      }
    }
  }
}