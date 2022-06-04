const Discord = require("discord.js");
const db = require("quick.db");
const config = require('../../../database/config');
const ms = require("pretty-ms");

module.exports = {
    name: "daily",
    cooldown: 1000 * 2,

    run: async (client, message, args) => {

        let prefix = db.get(`prefix_${message.guild.id}`) || "-"

        let timeout = 86400000;

        let user = message.author;
        let guild = message.guild;

        function ms(ms) {
            const seconds = ~~(ms/1000)
            const minutes = ~~(seconds/60)
            const hours = ~~(minutes/60) 
            const days = ~~(hours/24)
            
            return { days, hours: hours%24, minutes: minutes%60, seconds: seconds%60 }
        
        }

        let daily = await db.fetch(`daily_${user.id}`);

        let language = db.get(`language_${message.guild.id}`);
        if (language === "pt-BR") { // PT-BR
            if (daily !== null && timeout - (Date.now() - daily) > 0) {
                let time = ms(timeout - (Date.now() - daily));
    
                const error = new Discord.MessageEmbed()
                .setColor("WHITE")
                .setDescription(`**<:no:930170194494636152> | Você já recebeu seu prêmio diário! Espere \`${time.hours} horas e ${time.minutes} minutos\`**`)
                message.reply({embeds: [error]})

            } else {
                let premium = db.get(`premium_${message.author.id}`);

                if (premium !== true) {
                    let amount = Math.floor(Math.random() * 10000) + 1000;
                    let sucess = new Discord.MessageEmbed()
                    .setColor("WHITE")
                    .setDescription(`**<:yes:930170194784043048> Você coletou sua recompensa diária!**\n> **:coin: | Coletado: \`${amount} B$\`**\n**> 📦 | Caixas Coletadas: \`1\`**\n**> 🔫 | Munições encontradas: \`5\`**`);
                
                    message.reply({embeds: [sucess]})
                    db.add(`moedas_${user.id}`, amount);
                    db.add(`keys_${user.id}`, 1)
                    db.set(`daily_${user.id}`, Date.now());
                    db.set(`balas_${user.id}`, 5);
                }
                if (premium == true) {
                    let amount = Math.floor(Math.random() * 20000) + 2000;
                    let sucess = new Discord.MessageEmbed()
                    .setColor("WHITE")
                    .setDescription(`**<:yes:930170194784043048> Você coletou sua recompensa diária!**\n> **:coin: | Coletado: \`${amount} B$\`**\n**> 📦 | Caixas Coletadas: \`2\`**\n**> 🔫 | Munições encontradas: \`10\`**`);
                
                    message.reply({embeds: [sucess]})
                    db.add(`moedas_${user.id}`, amount);
                    db.add(`keys_${user.id}`, 2)
                    db.set(`daily_${user.id}`, Date.now());
                    db.set(`balas_${user.id}`, 10);
                }
            }
        }
        if (!language || language === "en") { // EN
            if (daily !== null && timeout - (Date.now() - daily) > 0) {
                let time = ms(timeout - (Date.now() - daily));
    
                const error = new Discord.MessageEmbed()
                .setColor("WHITE")
                .setDescription(`**<:no:930170194494636152> | You already got your daily prize! Hold \`${time.hours} hours and ${time.minutes} minutes\`**`)
                message.reply({embeds: [error]})

            } else {
                let premium = db.get(`premium_${message.author.id}`);

                if (premium !== true) {
                    let amount = Math.floor(Math.random() * 10000) + 1000;
                    let sucess = new Discord.MessageEmbed()
                    .setColor("WHITE")
                    .setDescription(`**<:yes:930170194784043048> You have collected your daily reward!**\n> **:coin: | Collected B$: \`B$${amount}\`**\n**> 📦 | Collected Boxes: \`1\`**\n**> 🔫 | Ammunition found: \`5\`**`);
                
                    message.reply({embeds: [sucess]})
                    db.add(`moedas_${user.id}`, amount);
                    db.add(`keys_${user.id}`, 1)
                    db.set(`daily_${user.id}`, Date.now());
                    db.set(`balas_${user.id}`, 5);
                }
                if (premium == true) {
                    let amount = Math.floor(Math.random() * 20000) + 2000;
                    let sucess = new Discord.MessageEmbed()
                    .setColor("WHITE")
                    .setDescription(`**<:yes:930170194784043048> You have collected your daily reward!**\n> **:coin: | Collected B$: \`B$${amount}\`**\n**> 📦 | Collected Boxes: \`2\`**\n**> 🔫 | Ammunition found: \`10\`**`);
                
                    message.reply({embeds: [sucess]})
                    db.add(`moedas_${user.id}`, amount);
                    db.add(`keys_${user.id}`, 2)
                    db.set(`daily_${user.id}`, Date.now());
                    db.set(`balas_${user.id}`, 10);
                }
            }
        }
        
    }
}