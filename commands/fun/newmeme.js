const { MessageEmbed } = require('discord.js')
const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
  name: "newmeme",
  cooldown: 1000 * 2,
  run: async (client, message, args) => {

    let prefix = db.get(`prefix_${message.guild.id}`) || "-"
    let language = db.get(`language_${message.guild.id}`);
       
    if (language === "pt-BR") { // PT-BR
      try {
        const memetemplate = args[0];
        if (!memetemplate) {
          return message.channel.send(
            `**Você não mencionou o meme! Para ver os memes disponíveis, digite \`${prefix}memelist\``
          );
        }
        const memetext1 = args[1];
        if (!memetext1) {
          return message.channel.send("**Digite o texto a ser colocado no topo!**");
        }
        const memetext2 = args[2];
        if (!memetext2) {
          return message.channel.send("**Digite o texto a ser colocado na parte inferior!**");
        }

        message.channel.send({
          files: [
            {
              attachment: `https://api.memegen.link/images/${memetemplate}/${memetext1}/${memetext2}`,
              name: "custommeme.png",
            },
          ],
        }).catch(() => {
          message.channel.send('<:no:930170194494636152> **Desculpe, não consigo executar este comando por falta de permissão!**')
        })
      } catch (err) {
        console.log('Error detected in newmeme command')
      }
    }
    if (!language || language === "en") { // EN
      try {
        const memetemplate = args[0];
        if (!memetemplate) {
          return message.channel.send(
            `**You didn't mention the meme!. To see the available memes, type \`${prefix}memelist\``
          );
        }
        const memetext1 = args[1];
        if (!memetext1) {
          return message.channel.send("**Enter the text to be placed at the top!**");
        }
        const memetext2 = args[2];
        if (!memetext2) {
          return message.channel.send("**Enter the text to be placed at the bottom!**");
        }

        message.channel.send({
          files: [
            {
              attachment: `https://api.memegen.link/images/${memetemplate}/${memetext1}/${memetext2}`,
              name: "custommeme.png",
            },
          ],
        }).catch(() => {
          message.channel.send('<:no:930170194494636152> **Sorry, but I\'m not allowed to upload images!**')
        })
      } catch (err) {
        console.log('Error detected in newmeme command')
      }
    }
  },
};