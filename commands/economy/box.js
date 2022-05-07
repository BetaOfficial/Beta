const {MessageEmbed} = require("discord.js");;
const db = require('quick.db');
const ms = require("pretty-ms");

module.exports = {

    name: "box",
    aliases: ['crates', 'key'], 
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

        let author = await db.fetch(`key_${user.id}`)  

        let language = db.get(`language_${message.guild.id}`);

        if (language === "pt-BR") { // PT-BR

            if (author !== null && timeout - (Date.now() - author) > 0) {
                
                let time = ms(timeout - (Date.now() - author));

                let error = new MessageEmbed()
                .setColor("WHITE")
                .setDescription(`**<:no:930170194494636152> | Você já coletou sua caixa diária hoje! Espere \`${time.hours} horas e ${time.minutes} minutos\`**`)
                message.reply({embeds: [error]})

            } else {    

                let sucess = new MessageEmbed()
                .setColor("WHITE")
                .setDescription(`**📦 | Você ganhou uma caixa!**`)
                message.reply({embeds: [sucess]})

                db.add(`keys_${user.id}`, 1)
                db.set(`key_${user.id}`, Date.now())

            }
        }
        if (!language || language === "en") { // EN

            if (author !== null && timeout - (Date.now() - author) > 0) {
                
                let time = ms(timeout - (Date.now() - author));

                let error = new MessageEmbed()
                .setColor("WHITE")
                .setDescription(`**<:no:930170194494636152> | You've collected your daily box today! Hold \`${time.hours} hours and ${time.minutes} minutes\`**`)
                message.reply({embeds: [error]})

            } else {    

                let sucess = new MessageEmbed()
                .setColor("WHITE")
                .setDescription(`**📦 | You won a box!**`)
                message.reply({embeds: [sucess]})

                db.add(`keys_${user.id}`, 1)
                db.set(`key_${user.id}`, Date.now())

            }
        }
    }
}