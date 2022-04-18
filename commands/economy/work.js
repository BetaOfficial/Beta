const {MessageEmbed} = require("discord.js");
const db = require('quick.db');
const ms = require("pretty-ms");

module.exports = {

    name: "work", 
    cooldown: 1000 * 2,

    run: async(client, message, args) => {

        let timeout = 6000000;

        let user = message.author;
        let guild = message.guild;

        function ms(ms) {
            const seconds = ~~(ms/1000)
            const minutes = ~~(seconds/60)
            const hours = ~~(minutes/60) 
            const days = ~~(hours/24)
            
            return { days, hours: hours%24, minutes: minutes%60, seconds: seconds%60 }
        
        }

        let author = await db.fetch(`work_${user.id}`)  

        let language = db.get(`language_${message.guild.id}`);

        if (language === "pt-BR") { // PT-BR

            if (author !== null && timeout - (Date.now() - author) > 0) {
                
                let time = ms(timeout - (Date.now() - author));

                let error = new MessageEmbed()
                .setColor("WHITE")
                .setDescription(`**<:no:930170194494636152> | Você trabalhou muito amigo! Espera \`${time.hours} horas e ${time.minutes} minutos\`**`)
                message.reply({embeds: [error]})

            } else {     

                let amount = Math.floor(Math.random() * 1000) + 1;

                let sucess = new MessageEmbed()
                .setColor("WHITE")
                .setDescription(`**<:yes:930170194784043048> Você trabalhou duro e conseguiu \`${amount} B$\`!**`)
                message.reply({embeds: [sucess]})

                db.add(`moedas_${user.id}`, amount)
                db.set(`work_${user.id}`, Date.now())

            }
        }
        if (!language || language === "en") { // EN

            if (author !== null && timeout - (Date.now() - author) > 0) {
                
                let time = ms(timeout - (Date.now() - author));

                let error = new MessageEmbed()
                .setColor("WHITE")
                .setDescription(`**<:no:930170194494636152> |  You worked a lot friend! Wait \`${time.hours} hours and ${time.minutes} minutes\`**`)
                message.reply({embeds: [error]})

            } else {     

                let amount = Math.floor(Math.random() * 1000) + 1;

                let sucess = new MessageEmbed()
                .setColor("WHITE")
                .setDescription(`**<:yes:930170194784043048> You worked hard and you made it \`${amount} B$\`!**`)
                message.reply({embeds: [sucess]})

                db.add(`moedas_${user.id}`, amount)
                db.set(`work_${user.id}`, Date.now())

            }
        }
    }
}