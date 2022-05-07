const Discord = require('discord.js')
const db = require("quick.db")
module.exports = {
  name: 'achievement',
  aliases: ["challenge", "mcachievement", "conquista", "mcconquista"],
  cooldown: 1000 * 2,

  run :async (client, message, args) => {
    let language = db.get(`language_${message.guild.id}`);

    var randon_icon = [
      '20',
      '1',
      '21',
      '13',
      '18',
      '22',
      '15',
      '12',
      '23',
      '3',
    ]

    if (language === "pt-BR") { // PT-BR
      try {
      
        const mensagem = args.join("%20")
        if (!mensagem) {
            return message.reply('<:no:930170194494636152> **Insira uma conquista!**')
        }

        let embed = new Discord.MessageEmbed()
        .setAuthor('Conquista desbloqueada!', message.author.avatarURL())
        .setImage(`https://minecraftskinstealer.com/achievement/${randon_icon}/Conquista%20Desbloqueada/${mensagem}`)
        .setColor("WHITE")
        message.reply({ embeds: [embed] }).catch(() => {
          message.reply(`<:no:930170194494636152> **Desculpe mais evite pular linhas nesse comando! Use apenas \`${prefix}achievement <texto>\`!**`)
        })
        
      } catch (err) {
        message.reply(`<:no:930170194494636152> **Desculpe mais eu não tenho permissão de enviar imagens aqui!**`)
      }
    }
    if (!language || language === "en") { // EN
      try {
      
        const mensagem = args.join("%20")
        if (!mensagem) {
            return message.reply('<:no:930170194494636152> **Enter an achievement!**')
        }

        let embed = new Discord.MessageEmbed()
        .setAuthor('Achievement unlocked!', message.author.avatarURL())
        .setImage(`https://minecraftskinstealer.com/achievement/${randon_icon}/Challenge%20Complete/${mensagem}`)
        .setColor("WHITE")
        message.reply({ embeds: [embed] }).catch(() => {
          message.reply(`<:no:930170194494636152> **Sorry but avoid skipping lines in this command! use only \`${prefix}achievement <text>\`!**`)
        })
      } catch (err) {
        message.reply(`<:no:930170194494636152> **Sorry but I'm not allowed to upload images here!**`)
      }
    }
  }
}