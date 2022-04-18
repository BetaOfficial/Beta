const { MessageEmbed } = require('discord.js')
const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
  name: "memelist",
  cooldown: 1000 * 2,

  run: async (client, message, args) => {
    let language = db.get(`language_${message.guild.id}`);
    let prefix = db.get(`prefix_${message.guild.id}`) || "-"
        
    if (language === "pt-BR") { // PT-BR
      try {

        const embed = new Discord.MessageEmbed()
        .setTitle("Modelos de memes disponíveis!")
        .setDescription(`**Exemplo de uso:** \`${prefix}newmeme facepalm Meu deus...\``)
        .addField('**Exemplo de memes:**', '`sohappy`, `tenguy`, `afraid`, `apcr`, `older`, `aag`, `atis`, `alyt`, `biw`, `stew`, `blb`, `bihw`, `kermit`, `bd`, `ch`, `cbg`, `wonka`, `cb`, `gandalf`, `keanu`, `cryingfloor`, `dsm`, `disastergirl`, `live`, `ants`, `doge`, `trump`, `drake`, `ermg`, `facepalm`, `feelsgood`, `firsttry`, `fwp`, `fa`, `fbf`, `fmr`, `fry`, `ggg`, `grumpycat`, `harold`, `hipster`, `icanhas`, `crazypills`', false)

        .setTimestamp()
        .setColor("WHITE");

        return message.channel.send({ embeds: [embed] });
      
      } catch (err) {
        console.log('Error detected in memelist command')
      }
    }
    if (language === "en") { // EN
      try {

        const embed = new Discord.MessageEmbed()
        .setTitle("Available Meme Templates")
        .setDescription(`**Usage Example:** \`${prefix}newmeme facepalm Oh Good\``)
        .addField('**Memes exemples:**', '`sohappy`, `tenguy`, `afraid`, `apcr`, `older`, `aag`, `atis`, `alyt`, `biw`, `stew`, `blb`, `bihw`, `kermit`, `bd`, `ch`, `cbg`, `wonka`, `cb`, `gandalf`, `keanu`, `cryingfloor`, `dsm`, `disastergirl`, `live`, `ants`, `doge`, `trump`, `drake`, `ermg`, `facepalm`, `feelsgood`, `firsttry`, `fwp`, `fa`, `fbf`, `fmr`, `fry`, `ggg`, `grumpycat`, `harold`, `hipster`, `icanhas`, `crazypills`', false)

        .setTimestamp()
        .setColor("WHITE");

        return message.channel.send({ embeds: [embed] });
      
      } catch (err) {
        console.log('Error detected in memelist command')
      }
    }   
  },
};