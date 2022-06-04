const {MessageEmbed} = require("discord.js");
const db = require("quick.db");
const config = require('../../../database/config');

module.exports = {

  name: "dep",
  aliases: ["deposit"],
  cooldown: 1000 * 2,

  run: async(client, message, args) => {
    
    let user = message.author;
    let guild = message.guild;

    let prefix = db.get(`prefix_${message.guild.id}`) || "-"

    let moedas = db.fetch(`moedas_${user.id}`)
    if (moedas === null) moedas = 0;

    let language = db.get(`language_${message.guild.id}`);
    if (language === "pt-BR") { // PT-BR

      let errorarg = new MessageEmbed()
      .setColor("WHITE")
      .setDescription(`> **<:no:930170194494636152> Você não disse o valor para depositar! Use \`${prefix}deposit <quantia>\`!**`)

      if (!args[0]) return message.reply({embeds: [errorarg]})

      if (Number(args[0]) < 0) {
        const calculatorError2 = new MessageEmbed()
        .setDescription(`> **${config.emoji.no} Infelizmente somente é possivel depositar valores positivos! Use por exemplo \`${prefix}deposit 50000\`!**`)
        .setColor('WHITE')
        .setFooter({ text: 'Hey, Use apenas números positivos aqui!' })
        return message.reply({ embeds: [calculatorError2] })
      }

      if (isNaN(args[0])) return message.reply({embeds: [errorarg]})

      let errorB$ = new MessageEmbed()
      .setColor("WHITE")
      .setDescription(`> **<:no:930170194494636152> Você não tem o suficiente B$ para depositar!**`)

      if (moedas < args[0]) return message.reply({embeds: [errorB$]})

      let sucess = new MessageEmbed()
      .setColor("WHITE")
      .setDescription(`**<:yes:930170194784043048> Você acabou de depositar no seu banco ${args[0]} B$**`)

      db.add(`banco_${user.id}`, args[0])
      db.subtract(`moedas_${user.id}`, args[0])

      message.reply({embeds: [sucess]})
    }
    if (!language || language === "en") { // EN

      if (Number(args[0]) < 0) {
        const calculatorError2 = new MessageEmbed()
        .setDescription(`> **${config.emoji.no} Unfortunately it is only possible to deposit positive values! Use for example \`${prefix}deposit 50000\`!**`)
        .setColor('WHITE')
        .setFooter({ text: 'Hey, only use positive numbers here!' })
        return message.reply({ embeds: [calculatorError2] })
      }

      let errorarg = new MessageEmbed()
      .setColor("WHITE")
      .setDescription(`> **<:no:930170194494636152> You didn't say the amount to deposit! Use \`${prefix}deposit <amount>\`!**`)

      if (!args[0]) return message.reply({embeds: [errorarg]})

      if (isNaN(args[0])) return message.reply({embeds: [errorarg]})

      let errorB$ = new MessageEmbed()
      .setColor("WHITE")
      .setDescription(`> **<:no:930170194494636152> You don't have enough B$ to deposit!**`)

      if (moedas < args[0]) return message.reply({embeds: [errorB$]})

      let sucess = new MessageEmbed()
      .setColor("WHITE")
      .setDescription(`**<:yes:930170194784043048> You just deposited in your bank ${args[0]} of B$**`)

      db.add(`banco_${user.id}`, args[0])
      db.subtract(`moedas_${user.id}`, args[0])

      message.reply({embeds: [sucess]})
    }

  }

}