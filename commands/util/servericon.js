const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js')
const db = require("quick.db")

module.exports = {
    name: 'servericon',
    aliases: ["serveravatar"],
    cooldown: 1000 * 2,

    run: async (client, message, args) => {

        let language = db.get(`language_${message.guild.id}`);
        if (language === "pt-BR") { // PT-BR
            let msg = await message.reply("**🔍 | Carregando...**");

            let server_icon = message.guild.iconURL({ dynamic : true })
            if (!server_icon || server_icon == null) {
                server_icon = 'https://i.imgur.com/Hh30gfD.jpg'
            }

            const embed = new MessageEmbed()
                .setColor("WHITE")
                .setTitle(`**\`${message.guild.name}\`**`)
                .addField(`Download:`, `[[Aperte Aqui]](${server_icon})`, true)
                .setImage(server_icon)
                .setFooter(client.user.username)
                .setTimestamp();
            message.reply({ embeds: [embed] }).catch(() => {
                message.reply('<:no:930170194494636152> **Me desculpe mais eu não tenho permissão de enviar imagens!**')
            })
            msg.delete()
        }

        if (!language || language === "en") { // EN
            let msg = await message.reply("**🔍 | Loading...**");

            let server_icon = message.guild.iconURL({ dynamic : true })
            if (!server_icon || server_icon == null) {
                server_icon = 'https://i.imgur.com/Hh30gfD.jpg'
            }

            const embed = new MessageEmbed()
                .setColor("WHITE")
                .setTitle(`**\`${message.guild.name}\`**`)
                .addField(`Download:`, `[[Click Here]](${server_icon})`, true)
                .setImage(server_icon)
                .setFooter(client.user.username)
                .setTimestamp();
            message.reply({ embeds: [embed] }).catch(() => {
                message.reply('<:no:930170194494636152> **Sorry, but I\'m not allowed to send/upload images!**')
            })
            msg.delete()
        }
    },
};