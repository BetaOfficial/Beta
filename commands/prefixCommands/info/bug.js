const { MessageEmbed } = require('discord.js')
const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
  name: "bug",
  cooldown: 1000 * 2,

run: async (client, message, args) => {

  let prefix = db.get(`prefix_${message.guild.id}`) || "-"
  let language = db.get(`language_${message.guild.id}`);

  if (language === "pt-BR") { // PT-BR
    try {

      let sugerirENVIAR = client.channels.cache.get("979890601325654016")
      let sugestão = args.slice(0).join(" ");
      
      if(!sugestão) {
        let embed_sugestion = new Discord.MessageEmbed()
        .setDescription(`**<:no:930170194494636152> Para usar esse comando use \`${prefix}bug <reporte o bug>\`**`)
        .setColor("WHITE")
        return message.reply({ embeds: [embed_sugestion] }) 
      }
      
      if (sugestão.length > 215) {
        let embed_error = new Discord.MessageEmbed()
        .setDescription('**<:no:930170194494636152> Seu reportamento de bug ultrapassou o limite de 215 characteres!**')
        .setColor("WHITE")
        return message.reply({ embeds: [embed_error] }) 
      }
      
      let sugerirEMBED = new Discord.MessageEmbed()
      .setTitle(`🔩 Bug Reportado!`)
      .setThumbnail(message.author.displayAvatarURL())
      .setDescription(`**Um bug foi reportado por ${message.author.username}#${message.author.discriminator}:**\n**Bug:**\n${sugestão}`)
      .setColor("WHITE")
      .setFooter({ text: `${message.guild.name} ©️ All rights reserved` })

      let embed_sucess = new Discord.MessageEmbed()
      .setDescription(`**<:no:930170194494636152> **Obrigado, por me ajudar e me apoiar relatando este bug! Foi enviado para meu criador!**`)
      .setColor("WHITE")

      message.reply({ embeds: [embed_sucess] })
      sugerirENVIAR.send({ embeds: [sugerirEMBED] }).then(msg => {})

    } catch (err) {
      console.log('Error detected in bug command')
    }
  }
  if (!language || language === "en") { // EN
    try {

      let sugerirENVIAR = client.channels.cache.get("979890601325654016")
      let sugestão = args.slice(0).join(" ");
      
      if(!sugestão) {
        let embed_sugestion = new Discord.MessageEmbed()
        .setDescription(`**<:no:930170194494636152> To use this command use \`${prefix}bug <report bug>\`**`)
        .setColor("WHITE")
        return message.reply({ embeds: [embed_sugestion] }) 
      }
      
      if (sugestão.length > 215) {
        let embed_error = new Discord.MessageEmbed()
        .setDescription('**<:no:930170194494636152> The bug report cannot exceed 215 characters!**')
        .setColor("WHITE")
        return message.reply({ embeds: [embed_error] }) 
      }
      
      let sugerirEMBED = new Discord.MessageEmbed()
      .setTitle(`🔩 New Bug Reported!`)
      .setThumbnail(message.author.displayAvatarURL())
      .setDescription(`**A bug has just been reported by ${message.author.username}#${message.author.discriminator}:**\n**Bug:**\n${sugestão}`)
      .setColor("WHITE")
      .setFooter({ text: `${message.guild.name} ©️ All rights reserved` })

      let embed_sucess = new Discord.MessageEmbed()
      .setDescription(`**<:no:930170194494636152> **Thanks, for helping and supporting me by reporting this bug! It was sent to my creator!**`)
      .setColor("WHITE")

      message.reply({ embeds: [embed_sucess] })
      sugerirENVIAR.send({ embeds: [sugerirEMBED] }).then(msg => {})

    } catch (err) {
      console.log('Error detected in bug command')
    }
  }
}
}