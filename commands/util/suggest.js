const Discord = require("discord.js");
const db = require("quick.db")
const { MessageEmbed } = require('discord.js')

module.exports = {
  name: "suggest",
  aliases: ["sugerir"],
  cooldown: 1000 * 2,

run: async (client, message, args) => {

  let language = db.get(`language_${message.guild.id}`);

  if (language === "pt-BR") { // PT-BR
    let prefix = db.get(`prefix_${message.guild.id}`) || "-"
    let channelSUGERIR = db.fetch(`channelSUGERIR_${message.guild.id}`)
    if (!channelSUGERIR) return message.reply(`<:no:930170194494636152> **|** O servidor não está configurado um canal de sugestões!.... \`${prefix}setsuggest <#canal>\``);
    let sugerirENVIAR = client.channels.cache.get(channelSUGERIR)
    let sugestão = args.slice(0).join(" ");
    if(!sugestão) return message.reply(`<:no:930170194494636152> **|** Você precisa inserir uma sugestão! ${prefix}suggest <sugestão>.`);
    if (sugestão.length > 425) return interaction.reply(`<:no:930170194494636152> **|** Sua sugestão não pode ultrapassar 425 caractéres.`);
    let sugerirEMBED = new Discord.MessageEmbed()
    .setTitle(`💡 **-** Uma nova sugestão foi enviada!`)
    .setThumbnail(message.author.displayAvatarURL())
    .setDescription(`**Sugestão:**\n${sugestão}`)
    .setColor("WHITE")
    .setFooter({ text: `${message.guild.name} ©️ All rights reserved` })

    message.reply(`✅ **|** Ok! Eu enviei sua sugestão em: ${sugerirENVIAR}.`).catch(() => {
      message.channel.send('<:no:930170194494636152> **Desculpe mas eu não posso executar esse comando por falta de permissões!**')
    })

    sugerirENVIAR.send({ content: `${message.author}`, embeds: [sugerirEMBED] }).then(msg => {

      msg.react('✅')
      msg.react('❌')
    })
  }
  if (!language || language === "en") { // EN
    let prefix = db.get(`prefix_${message.guild.id}`) || "-"

    let channelSUGERIR = db.fetch(`channelSUGERIR_${message.guild.id}`)
    if (!channelSUGERIR) return message.reply(`<:no:930170194494636152> **|** This server has not set up a suggestion channel.... \`${prefix}setsuggest <#channel>\``);
    let sugerirENVIAR = client.channels.cache.get(channelSUGERIR)
    let sugestão = args.slice(0).join(" ");
    if(!sugestão) return message.reply(`<:no:930170194494636152> **|** You must enter a suggestion, ${prefix}suggest <suggestion>.`);
    if (sugestão.length > 425) return interaction.reply(`<:no:930170194494636152> **|** The suggestion cannot exceed 425 characters.`);
    let sugerirEMBED = new Discord.MessageEmbed()
    .setTitle(`💡 **-** A new suggestion has been sent!`)
    .setThumbnail(message.author.displayAvatarURL())
    .setDescription(`**Suggestion:**\n${sugestão}`)
    .setColor("WHITE")
    .setFooter({ text: `${message.guild.name} ©️ All rights reserved` })

    message.reply(`✅ **|** Okay, I sent your suggestion, check it out at ${sugerirENVIAR}.`).catch(() => {
      message.channel.send('<:no:930170194494636152> **Sorry, I can\'t execute this command due to lack to lack of permission!**')
    })

    sugerirENVIAR.send({ content: `${message.author}`, embeds: [sugerirEMBED] }).then(msg => {

      msg.react('✅')
      msg.react('❌')
    })
  }

}
}