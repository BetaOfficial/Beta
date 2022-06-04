const {MessageEmbed} = require("discord.js");
const db = require("quick.db");

module.exports = {

  name: "withdraw",
  aliases: ["sacar", "saque"],
  cooldown: 1000 * 2,

  run: async(client, message, args) => {

    let prefix = db.get(`prefix_${message.guild.id}`) || "-"
    
    let user = message.author;
    let guild = message.guild;

    let banco = db.fetch(`banco_${guild.id}_${user.id}`)
    if (banco === null) banco = 0;

    let language = db.get(`language_${message.guild.id}`);
    if (language === "pt-BR") { // PT-BR

      if (Number(args[0]) < 0) {
        const calculatorError2 = new MessageEmbed()
        .setDescription(`> **${config.emoji.no} Infelizmente somente é possivel sacar valores positivos! Use por exemplo \`${prefix}withdraw 50000\`!**`)
        .setColor('WHITE')
        .setFooter({ text: 'Hey, Use apenas números positivos aqui!' })
        return message.reply({ embeds: [calculatorError2] })
      }

      let errorarg = new MessageEmbed()
      .setColor("WHITE")
      .setDescription(`> **<:no:930170194494636152> Você não disse o valor para retirar! Use ${prefix}withdraw <quantia>!**`)

      if (!args[0]) return message.reply({embeds: [errorarg]})

      if (isNaN(args[0])) return message.reply({embeds: [errorarg]})

      let errorB$ = new MessageEmbed()
      .setColor("WHITE")
      .setDescription(`> **<:no:930170194494636152> Você não tem B$ suficiente no banco para sacar!**`)

      if (banco < args[0]) return message.reply({embeds: [errorB$]})

      let sucess = new MessageEmbed()
      .setColor("WHITE")
      .setDescription(`**<:yes:930170194784043048> Você acabou de sacar do seu banco ${args[0]} B$**`)

      db.add(`moedas_${user.id}`, args[0])
      db.subtract(`banco_${user.id}`, args[0])

      message.reply({embeds: [sucess]})
    }
    if (!language || language === "en") { // EN

      if (Number(args[0]) < 0) {
        const calculatorError2 = new MessageEmbed()
        .setDescription(`> **${config.emoji.no} Unfortunately it is only possible to draw positive values! Use for example \`${prefix}deposit 50000\`!**`)
        .setColor('WHITE')
        .setFooter({ text: 'Hey, only use positive numbers here!' })
        return message.reply({ embeds: [calculatorError2] })
      }

      let errorarg = new MessageEmbed()
      .setColor("WHITE")
      .setDescription(`> **<:no:930170194494636152> You didn't say the amount to withdraw! Use ${prefix}withdraw (amount)!**`)

      if (!args[0]) return message.reply({embeds: [errorarg]})

      if (isNaN(args[0])) return message.reply({embeds: [errorarg]})

      let errorB$ = new MessageEmbed()
      .setColor("WHITE")
      .setDescription(`> **<:no:930170194494636152> You don't have enough B$ in the bank to withdraw!**`)

      if (banco < args[0]) return message.reply({embeds: [errorB$]})

      let sucess = new MessageEmbed()
      .setColor("WHITE")
      .setDescription(`**<:yes:930170194784043048> You have just withdrawn from your bank ${args[0]} of B$**`)

      db.add(`moedas_${user.id}`, args[0])
      db.subtract(`banco_${user.id}`, args[0])

      message.reply({embeds: [sucess]})
    }

  }

}