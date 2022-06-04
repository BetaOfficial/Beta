const {MessageEmbed} = require("discord.js");;
const db = require('quick.db');
const ms = require("pretty-ms");
const config = require('../../../database/config')

module.exports = {

    name: "removecoins",
    cooldown: 1000 * 2,

    run: async(client, message, args) => {

      let prefix = db.get(`prefix_${message.guild.id}`) || "-"

      let owner = config.owners.ID1 || config.owners.ID2

      let user = message.author;
      let guild = message.guild;

      let language = db.get(`language_${message.guild.id}`);
      if (language === "pt-BR") { // PT-BR
        if (!owner.includes(message.author.id)) {
          let embed = new MessageEmbed()
          .setDescription('<:no:930170194494636152> **Somente meu criador pode usar este código!**')
          .setColor("WHITE")
          return message.reply({ embeds: [embed] })
        }

        let errorarg = new MessageEmbed()
        .setColor("WHITE")
        .setDescription(`**<:no:930170194494636152> Digite o nome de usuário e o valor para remover Moedas! Use \`${prefix}removecoins <usuário> <quantia>\`!**`)

        if (!args[0]) return message.reply({embeds: [errorarg]})
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0].replace(/[<>@!]/g, ""));
        if (!args[1]) return message.reply({embeds: [errorarg]})
        if (isNaN(args[1])) return message.reply({embeds: [errorarg]})

        let sucess = new MessageEmbed()
        .setColor("WHITE")
        .setDescription(`**\`${args[1]}\` moedas retiradas de ${member}**`)
      
        db.subtract(`moedas_${member.id}`, args[1]);

        message.reply({embeds: [sucess]})
      }

      if (!language || language === "en") { // EN
        if (!owner.includes(message.author.id)) {
          let embed = new MessageEmbed()
          .setDescription('<:no:930170194494636152> **Only my creator can use this code!**')
          .setColor("WHITE")
          return message.reply({ embeds: [embed] })
        }

        let errorarg = new MessageEmbed()
        .setColor("WHITE")
        .setDescription(`**<:no:930170194494636152> Enter username and amount to add coins! Use \`${prefix}removecoins <user> <amount>\`!**`)

        if (!args[0]) return message.reply({embeds: [errorarg]})
        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0].replace(/[<>@!]/g, ""));
        if (!args[1]) return message.reply({embeds: [errorarg]})
        if (isNaN(args[1])) return message.reply({embeds: [errorarg]})

        let sucess = new MessageEmbed()
        .setColor("WHITE")
        .setDescription(`**\`${args[1]}\` coins removed from ${member}**`)
      
        db.subtract(`moedas_${member.id}`, args[1]);

        message.reply({embeds: [sucess]})
      }

    }

}