const {MessageEmbed} = require("discord.js");
const Discord = require("discord.js");
const db = require("quick.db");
const config = require('../../../database/config');
const ms = require("pretty-ms");

module.exports = {
    name: "rob",
    aliases: ["roubar", "assaltar"],
    cooldown: 1000 * 2,

    run: async (client, message, args) => {

        let prefix = db.get(`prefix_${message.guild.id}`) || "-"

        let user = message.author;
        let timeout = 3600000;

        function ms(ms) {
            const seconds = ~~(ms/1000)
            const minutes = ~~(seconds/60)
            const hours = ~~(minutes/60) 
            const days = ~~(hours/24)
            
            return { days, hours: hours%24, minutes: minutes%60, seconds: seconds%60 }
        
        }

        let rob = await db.fetch(`rob_${user.id}`);
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

            if (rob !== null && timeout - (Date.now() - rob) > 0) {
                let time = ms(timeout - (Date.now() - rob));
    
                const error = new Discord.MessageEmbed()
                .setColor("WHITE")
                .setDescription(`**<:no:930170194494636152> | Você já tentou roubar faz um tempinho! Espere \`${time.hours} horas e ${time.minutes} minutos\`**`)
                return message.reply({embeds: [error]})

            }

            if (vitima.id === user.id) {
                let error = new MessageEmbed()
                .setColor("WHITE")
                .setDescription(`**${config.emoji.no} Você não pode assaltar a sí mesmo! Use: \`${prefix}rob <Marque alguem>\`**`)
                return message.reply({embeds: [error]})
            } else {   
                if (minimo < "999") {
                    let error2 = new MessageEmbed()
                    .setColor("WHITE")
                    .setDescription(`**${config.emoji.no} Infelizmente ${vitima} não tem 1000B$ disponíveis!**`)
                    return message.reply({embeds: [error2]})
                }

                let delegacia = Math.floor(Math.random() * 4);
                let money = Math.floor(Math.random() * 500) + 1;

                if (delegacia == 1 || 3) {
                    db.set(`rob_${user.id}`, Date.now());

                    let pego = new MessageEmbed()
                    .setColor("WHITE")
                    .setDescription(`**${config.emoji.no} Eita corre! Você foi pego tentando roubar ${vitima}! Tente novamente mais tarde!**`)
                    return message.reply({embeds: [pego]})
                }
                if (delegacia == 2 || 4) {
                    db.subtract(`moedas_${vitima.id}`, money)
                    db.add(`moedas_${user.id}`, money)
                    db.set(`rob_${user.id}`, Date.now());

                    let sucess = new MessageEmbed()
                    .setColor("WHITE")
                    .setDescription(`**${config.emoji.yes} Boa! Você conseguiu roubar \`${money}\` de ${vitima}!**`)
                    return message.reply({embeds: [sucess]})
                }
            }
        }
        if (!language || language === "en") { // EN
            let errorbalas = new MessageEmbed()
            .setColor("WHITE")
            .setDescription(`🔫 | **You don't have ammo to try to steal!**`)

            if (balas < 1) return message.reply({embeds: [errorbalas]})

            if (rob !== null && timeout - (Date.now() - rob) > 0) {
                let time = ms(timeout - (Date.now() - rob));
    
                const error = new Discord.MessageEmbed()
                .setColor("WHITE")
                .setDescription(`**<:no:930170194494636152> | You already tried to steal a while ago! Wait \`${time.hours} hours and ${time.minutes} minutes\`**`)
                return message.reply({embeds: [error]})

            }

            if (vitima.id === user.id) {
                let error = new MessageEmbed()
                .setColor("WHITE")
                .setDescription(`**${config.emoji.no} You cannot rob yourself! use: \`${prefix}rob <Tag someone>\`**`)
                return message.reply({embeds: [error]})
            } else {     
                if (minimo < "999") {
                    let error2 = new MessageEmbed()
                    .setColor("WHITE")
                    .setDescription(`**${config.emoji.no} Unfortunately ${vitima} doesn't have 1000B$ available!**`)
                    return message.reply({embeds: [error2]})
                }

                let delegacia = Math.floor(Math.random() * 4);
                let money = Math.floor(Math.random() * 500) + 1;

                if (delegacia == 1 || 3) {
                    db.set(`rob_${user.id}`, Date.now());

                    let pego = new MessageEmbed()
                    .setColor("WHITE")
                    .setDescription(`**${config.emoji.no} Jeez run! You got caught trying to steal ${vitima}! Try again later!**`)
                    return message.reply({embeds: [pego]})
                } 
                if (delegacia == 2 || 4) {
                    db.subtract(`moedas_${vitima.id}`, money)
                    db.add(`moedas_${user.id}`, money)
                    db.set(`rob_${user.id}`, Date.now());

                    let sucess = new MessageEmbed()
                    .setColor("WHITE")
                    .setDescription(`**${config.emoji.yes} Good! you managed to steal \`${money}\` for ${vitima}!**`)
                    return message.reply({embeds: [sucess]})
                }
            }
        }
        
    }
}