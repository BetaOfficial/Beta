const {MessageEmbed} = require("discord.js");
const db = require("quick.db")

module.exports = {
  name: "bal",
  aliases: ["balance", "atm"],
  cooldown: 1000 * 2,

  run: async(client, message, args) => {
    let membro = message.mentions.members.first() || message.member;
  
    let guild = message.guild;

    let moedas = db.fetch(`moedas_${membro.id}`)
    if (moedas === null) moedas = 0;

    let banco = db.fetch(`banco_${membro.id}`)
    if (banco === null) banco = 0;

    let crates = db.fetch(`keys_${membro.id}`)
    if (crates === null) crates = 0;

    let balas = db.fetch(`balas_${membro.id}`);
    if (balas === null) balas = 0;

    let language = db.get(`language_${message.guild.id}`);

    if (language === "pt-BR") { // PT-BR
      let moneyEmbed = new MessageEmbed()
      .setTitle(`**💸 | Conta financeira de ${membro.displayName}**`)
      .setColor("WHITE")
      .setDescription(`> **:coin: | B$: \`${moedas}\`**\n> **🏦 | Banco: \`${banco}\`**\n> **📦 | Caixas: \`${crates}\`**\n> **🔫 | Munições: \`${balas}\`**`)
      message.reply({embeds: [moneyEmbed]})
    }
    if (!language || language === "en") { // EN
      let moneyEmbed = new MessageEmbed()
      .setTitle(`**💸 | ${membro.displayName}'s Balance**`)
      .setColor("WHITE")
      .setDescription(`> **:coin: | B$: \`${moedas}\`**\n> **🏦 | Bank: \`${banco}\`**\n> **📦 | Boxes: \`${crates}\`**\n> **🔫 | Ammunition: \`${balas}\`**`)
      message.reply({embeds: [moneyEmbed]})
    }    
}
}