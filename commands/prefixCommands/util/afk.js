const Discord = require("discord.js")
const { MessageEmbed } = require('discord.js')
const db = require("quick.db")

module.exports = {
    name: "afk",
    cooldown: 1000 * 2,

    run: async(client, message, args) => {

        let language = db.get(`language_${message.guild.id}`);
        
        if (language === "pt-BR") { // PT-BR
            let motivo = args.slice(0).join(" ");
            if (!motivo) motivo = "Não especificado.";
            let embed = new Discord.MessageEmbed()
            .setDescription(`<:yes:930170194784043048> **Seu modo AFK foi ativado! Motivo: \`${motivo}\`**`)
            .setColor('WHITE')
            message.reply({ embeds: [embed] }).then(msg => {
                db.set(`afk_${message.author.id}`, true);
                db.set(`motivo_afk_${message.author.id}`, motivo)
                db.set(`verificando_afk_${message.author.id}`, message.author.id)
            })
        }
        
        if (!language || language === "en") { // EN
            let motivo = args.slice(0).join(" ");
            if (!motivo) motivo = "Not specified.";
            let embed = new Discord.MessageEmbed()
            .setDescription(`<:yes:930170194784043048> **AFK mode activated successfully, with the reason: \`${motivo}\`**`)
            .setColor('WHITE')
            message.reply({ embeds: [embed] }).then(msg => {
                db.set(`afk_${message.author.id}`, true);
                db.set(`motivo_afk_${message.author.id}`, motivo)
                db.set(`verificando_afk_${message.author.id}`, message.author.id)
            })
        }        
    }
}