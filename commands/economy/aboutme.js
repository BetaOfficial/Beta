const Discord = require("discord.js");
const db = require("quick.db");
const owners = require("../../database/owners.json");
const config = require("../../database/config.json");
const e = require("../../database/emojis.json")

module.exports = {
    name: "aboutme",
    aliases: ["sobremim"],
    cooldown: 1000 * 2,

    run: async (client, message, args) => {

        let prefix = db.get(`prefix_${message.guild.id}`) || "-"
        let text = args.join(' ')

        let language = db.get(`language_${message.guild.id}`);
        if (language === "pt-BR") { // PT-BR
            if (!text || text.length > 250) {
                let embed = new Discord.MessageEmbed()
                .setDescription(`**${e.no} Você precisa digitar algo com no máximo 250 carácteres! Use: \`${prefix}aboutme <texto>\`**`)
                .setColor("WHITE")
                return message.reply({ embeds: [embed] })
            } else {
                db.set(`about_${message.author.id}`, text)
                let embed = new Discord.MessageEmbed()
                .setDescription(`**${e.yes} Perfeito! Seu sobre-mim foi setado com sucesso para:\n\`\`\`txt\n${text}\`\`\`**`)
                .setColor("WHITE")
                return message.reply({ embeds: [embed] })
            }
        }
        if (!language || language === "en") { // EN
            if (!text || text.length > 250) {
                let embed = new Discord.MessageEmbed()
                .setDescription(`**${e.no} You need to type something with a maximum of 250 characters! Use: \`${prefix}aboutme <text>\`**`)
                .setColor("WHITE")
                return message.reply({ embeds: [embed] })
            } else {
                db.set(`about_${message.author.id}`, text)
                let embed = new Discord.MessageEmbed()
                .setDescription(`**${e.yes} Perfect! Your about-me has been successfully set to:\n\`\`\`txt\n${text}\`\`\`**`)
                .setColor("WHITE")
                return message.reply({ embeds: [embed] })
            }
        }
        
    }
}