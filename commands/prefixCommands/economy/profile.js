const Discord = require("discord.js");
const db = require("quick.db");
const config = require('../../../database/config');

module.exports = {
    name: "profile",
    aliases: ["perfil"],
    cooldown: 1000 * 2,

    run: async (client, message, args) => {
        let prefix = db.get(`prefix_${message.guild.id}`) || "-"

        let member = message.mentions.members.first() || message.member;
        let guild = message.guild;

        let moedas = db.fetch(`moedas_${member.id}`)
        if (moedas === null) moedas = 0;
        let banco = db.fetch(`banco_${member.id}`)
        if (banco === null) banco = 0;
        let reps = db.fetch(`reps_${member.id}`)
        if (reps === null) reps = 0;

        let banner = db.get(`banner_${member.id}`)
        if (!banner || banner == null) {
            banner = 'https://i.imgur.com/W8a1un9.jpg';
        }

        let language = db.get(`language_${message.guild.id}`);
        if (language === "pt-BR") { // PT-BR

            let about = db.get(`about_${member.id}`)
            if (!about || about == null) {
                about = `Use ${prefix}aboutme <texto>`;
            }

            let embed = new Discord.MessageEmbed()
            .setDescription(`**Perfil de ${member}**`)
            .setThumbnail(member.displayAvatarURL({format:"png"}))
            .setColor("WHITE")
            .addField(`**💵 B$:**`, `\`${moedas + banco}\``, false)
            .addField(`\n**Sobre mim:**`, `**\`\`\`txt\n${about}\`\`\`**`, false)
            .setImage(banner)
            .setFooter({ text: `Para alterar o banner use: ${prefix}banner <url> (Apenas Premiuns)` })
            message.reply({ embeds: [embed] })
        }
        if (!language || language === "en") { // EN
            let about = db.get(`about_${member.id}`)
            if (!about || about == null) {
                about = `Use ${prefix}aboutme <text>`;
            }

            let embed = new Discord.MessageEmbed()
            .setDescription(`**Profile from ${member}**`)
            .setThumbnail(member.displayAvatarURL({format:"png"}))
            .setColor("WHITE")
            .addField(`**💵 B$:**`, `\`${moedas + banco}\``, false)
            .setImage(banner)
            .addField(`\n**About me:**`, `**\`\`\`txt\n${about}\`\`\`**`, false)
            .setFooter({ text: `To change the banner use: ${prefix}banner <url> (Only Premiuns)` })
            message.reply({ embeds: [embed] })
        }       
    }
}