const Discord = module.require("discord.js")
const db = require("quick.db")
const generator = require('generate-password')

module.exports = {
  name: "nitro",
  cooldown: 1000 * 2,
  run: async (client, message, args) => {

    let language = db.get(`language_${message.guild.id}`);
        
    if (language === "pt-BR") { // PT-BR
      try {

          let geradordenitro = generator.generate({
            length: 16,
            numbers: true
          });
          let geradordenitro2 = generator.generate({
            length: 16,
            numbers: true
          });

          var links = [
          `https://discord.gift/${geradordenitro2}`,
          `https://discord.gift/${geradordenitro}`
          ];
          var images = [
          `https://cdn.discordapp.com/attachments/716917641209708647/748945266979242106/IMG_20200828_215650.jpg`,
          `https://cdn.discordapp.com/attachments/716917641209708647/748945228907413675/IMG_20200828_220208.jpg`,
          ];
          const embed = new Discord.MessageEmbed()
          .setTitle("**Seu nitro está aqui!**")
          .setDescription(links[Math.floor(Math.random() * links.length)])
          .setImage(images[Math.floor(Math.random() * images.length)])
          .setColor("WHITE");
          message.reply({ embeds: [embed] }).catch(() => {
            message.channel.send('<:no:930170194494636152> **Desculpe, não consigo executar este comando por falta de permissão!**')
          })
      } catch (err) {
          console.log('Error detected in nitro command')
      }
    }
    if (!language || language === "en") { // EN
      try {

          let geradordenitro = generator.generate({
            length: 8,
            numbers: true
          });
          let geradordenitro2 = generator.generate({
            length: 8,
            numbers: true
          });

          var links = [
          `https://discord.gift/${geradordenitro2}`,
          `https://discord.gift/${geradordenitro}`
          ];
          var images = [
          `https://cdn.discordapp.com/attachments/716917641209708647/748945266979242106/IMG_20200828_215650.jpg`,
          `https://cdn.discordapp.com/attachments/716917641209708647/748945228907413675/IMG_20200828_220208.jpg`,
          ];
          const embed = new Discord.MessageEmbed()
          .setTitle("**Your nitro is here!**")
          .setDescription(links[Math.floor(Math.random() * links.length)])
          .setImage(images[Math.floor(Math.random() * images.length)])
          .setColor("WHITE");
          message.reply({ embeds: [embed] }).catch(() => {
            message.channel.send('<:no:930170194494636152> **Sorry, but I\'m not allowed to upload images!**')
          })
      } catch (err) {
          console.log('Error detected in nitro command')
      }
    }
  },
};