const {MessageEmbed} = require("discord.js");;
const db = require('quick.db')

module.exports = {

  name: "openbox",
  aliases: ['opencrates'],
  cooldown: 1000 * 2,

  run: async(client, message, args) => {

    let user = message.author;
    let guild = message.guild

    let crates = db.fetch(`keys_${user.id}`);

    let language = db.get(`language_${message.guild.id}`);
    if (language === "pt-BR") { // PT-BR
      let errorkeys = new MessageEmbed()
      .setColor("WHITE")
      .setDescription(`📦 | **Você não tem caixas para abrir!**`)

      if (crates < 1) return message.reply({embeds: [errorkeys]})

      let amount = Math.floor(Math.random() * 1000) + 250;

      let sucess = new MessageEmbed()
      .setColor("WHITE")
      .setDescription(`📦 | **Na caixa tinha \`${amount} B$\`! Agora você tem \`${crates -1} caixas\`**`)

      db.add(`moedas_${user.id}`, amount)
      db.subtract(`keys_${user.id}`, 1)

      message.reply({embeds: [sucess]})
    }
    if (!language || language === "en") { // EN
      let errorkeys = new MessageEmbed()
      .setColor("WHITE")
      .setDescription(`📦 | **You have no boxes to open!**`)

      if (crates < 1) return message.reply({embeds: [errorkeys]})

      let amount = Math.floor(Math.random() * 1000) + 250;

      let sucess = new MessageEmbed()
      .setColor("WHITE")
      .setDescription(`📦 | **In that box had \`${amount} B$\`! Now you own \`${crates} boxes\`**`)

      db.add(`moedas_${user.id}`, amount)
      db.subtract(`keys_${user.id}`, 1)

      message.reply({embeds: [sucess]})
    }

  }

}