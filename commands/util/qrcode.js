const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "qrcode",
    aliases: ["qr"],
    cooldown: 1000 * 2,
    args:true,

    run: async (client, message, args) => {
      let language = db.get(`language_${message.guild.id}`);
      let prefix = db.get(`prefix_${message.guild.id}`) || "-"

      if (language === "pt-BR") { // PT-BR
        const Msg = args.join("+");
        if(!Msg) return message.reply(`<:no:930170194494636152> **|** Você precisa inserir um link para criar seu QRCODE, Use \`${prefix}qrcode <link>\`.`);
        const Embed = new Discord.MessageEmbed()
        .setColor("WHITE")
        .setImage(encodeURI(`https://chart.googleapis.com/chart?chl=${Msg}&chs=200x200&cht=qr&chld=H%7C0`))
        .setTimestamp();
    
        return message.reply({embeds:[Embed]}).catch(() => {
          message.channel.send('<:no:930170194494636152> **Me desculpe mais eu não tenho permissão de enviar imagens!**')
        })
      }
      if (!language || language === "en") { // EN
        const Msg = args.join("+");
        if(!Msg) return message.reply(`<:no:930170194494636152> **|** You need to enter a link to create a QR Code, ${prefix}qrcode <link>.`);
        const Embed = new Discord.MessageEmbed()
        .setColor("WHITE")
        .setImage(encodeURI(`https://chart.googleapis.com/chart?chl=${Msg}&chs=200x200&cht=qr&chld=H%7C0`))
        .setTimestamp();
    
        return message.reply({embeds:[Embed]}).catch(() => {
          message.channel.send('<:no:930170194494636152> **Sorry, but I\'m not allowed to upload images!**')
        })
      }
    }
};