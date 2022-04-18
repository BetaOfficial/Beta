const {MessageEmbed} = require("discord.js");
const db = require("quick.db");
const owners = require("../../Database/owners.json");
const config = require("../../Database/config.json");
const e = require("../../Database/emojis.json")

module.exports = {
    name: "rob",
    aliases: ["roubar", "assaltar"],
    cooldown: 1000 * 2,

    run: async (client, message, args) => {

        let prefix = db.get(`prefix_${message.guild.id}`) || "-"

        let user = message.author;
        let guild = message.guild;

        let vitima = client.users.cache.get(args[0]) || message.mentions.users.first() || message.author;

        let minimo = db.get(`moedas_${vitima.id}`)

        let balas = db.fetch(`balas_${user.id}`);
        let arma = db.get(`arma_${user.id}`);

        let language = db.get(`language_${message.guild.id}`);
        if (language === "pt-BR") { // PT-BR
            let errorbalas = new MessageEmbed()
            .setColor("WHITE")
            .setDescription(`🔫 | **Você não tem munições para tentar roubar!**`)

            if (balas < 1) return message.reply({embeds: [errorbalas]})

            if (vitima.id === user.id) {
                let error = new MessageEmbed()
                .setColor("WHITE")
                .setDescription(`**${e.no} Você não pode assaltar a sí mesmo! Use: \`${prefix}rob <Marque alguem>\`**`)
                return message.reply({embeds: [error]})
            } else {   
                if (minimo < "999") {
                    let error2 = new MessageEmbed()
                    .setColor("WHITE")
                    .setDescription(`**${e.no} Infelizmente ${vitima} não tem 1000B$ disponíveis!**`)
                    return message.reply({embeds: [error2]})
                }

                let delegacia = Math.floor(Math.random() * 4) + 1;
                let money = Math.floor(Math.random() * 1000) + 1;

                if (delegacia == 1 || 3) {
                    let pego = new MessageEmbed()
                    .setColor("WHITE")
                    .setDescription(`**${e.no} Eita corre! Você foi pego tentando roubar ${vitima}! Tente novamente mais tarde!**`)
                    return message.reply({embeds: [pego]})
                }
                if (delegacia == 2 || 4) {
                    db.subtract(`moedas_${vitima.id}`, money)
                    db.add(`moedas_${user.id}`, money)

                    let sucess = new MessageEmbed()
                    .setColor("WHITE")
                    .setDescription(`**${e.yes} Boa! Você conseguiu roubar \`${money}\` de ${vitima}!**`)
                    return message.reply({embeds: [sucess]})
                }
            }
        }
        if (!language || language === "en") { // EN
            let errorbalas = new MessageEmbed()
            .setColor("WHITE")
            .setDescription(`🔫 | **You don't have ammo to try to steal!**`)

            if (balas < 1) return message.reply({embeds: [errorbalas]})

            if (vitima.id === user.id) {
                let error = new MessageEmbed()
                .setColor("WHITE")
                .setDescription(`**${e.no} You cannot rob yourself! use: \`${prefix}rob <Tag someone>\`**`)
                return message.reply({embeds: [error]})
            } else {     
                if (minimo < "999") {
                    let error2 = new MessageEmbed()
                    .setColor("WHITE")
                    .setDescription(`**${e.no} Unfortunately ${vitima} doesn't have 1000B$ available!**`)
                    return message.reply({embeds: [error2]})
                }

                let delegacia = Math.floor(Math.random() * 4) + 1;
                let money = Math.floor(Math.random() * 1000) + 1;

                if (delegacia == 1 || 3) {
                    let pego = new MessageEmbed()
                    .setColor("WHITE")
                    .setDescription(`**${e.no} Jeez run! You got caught trying to steal ${vitima}! Try again later!**`)
                    return message.reply({embeds: [pego]})
                } 
                if (delegacia == 2 || 4) {
                    db.subtract(`moedas_${vitima.id}`, money)
                    db.add(`moedas_${user.id}`, money)

                    let sucess = new MessageEmbed()
                    .setColor("WHITE")
                    .setDescription(`**${e.yes} Good! you managed to steal \`${money}\` for ${vitima}!**`)
                    return message.reply({embeds: [sucess]})
                }
            }
        }
        
    }
}