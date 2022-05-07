const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js')
const db = require("quick.db")

module.exports = {
    name: 'avatar',
    cooldown: 1000 * 2,

    run: async (client, message, args) => {

        let language = db.get(`language_${message.guild.id}`);
        if (language === "pt-BR") { // PT-BR
            let msg = await message.reply("**🔍 | Procurando...**");
            const user = client.users.cache.get(args[0]) || message.mentions.users.first() || message.author;
            const avatar = user.displayAvatarURL({ dynamic: true, format: "png", size: 4096 });
            const embed = new MessageEmbed()
                .setColor("WHITE")
                .setTitle(`📷 Foto de perfil`)
                .addField(`Avatar de:`, `\`${user.username}\``, true)
                .addField(`Download:`, `[[Aperte Aqui]](${avatar})`, true)
                .setImage(avatar)
                .setFooter(client.user.username)
                .setTimestamp();
            message.reply({ embeds: [embed] }).catch(() => {
                message.reply('<:no:930170194494636152> **Me desculpe mais eu não tenho permissão de enviar imagens!**')
            })
            msg.delete()
        }

        if (!language || language === "en") { // EN
            let msg = await message.reply("**🔍 | Searching...**");
            const user = client.users.cache.get(args[0]) || message.mentions.users.first() || message.author;
            const avatar = user.displayAvatarURL({ dynamic: true, format: "png", size: 4096 });
            const embed = new MessageEmbed()
                .setColor("WHITE")
                .setTitle(`📷 Profile Avatar`)
                .addField(`Avatar from:`, `\`${user.username}\``, true)
                .addField(`Download:`, `[[Click Here]](${avatar})`, true)
                .setImage(avatar)
                .setFooter(client.user.username)
                .setTimestamp();
            message.reply({ embeds: [embed] }).catch(() => {
                message.reply('<:no:930170194494636152> **Sorry, but I\'m not allowed to send/upload images!**')
            })
            msg.delete()
        }
    },
};