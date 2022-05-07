const { MessageEmbed } = require('discord.js');
const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "ping",
    cooldown: 1000 * 2,
    

    run: async(client, message, args) => {

        let language = db.get(`language_${message.guild.id}`);
        
        if (language === "pt-BR") { // PT-BR
            try {
                await message.reply({ content: `> **🏓 Pong!**` }).then(msg => {
                setTimeout( () => {
                 msg.edit({ content: `> **🏓 Pong!**\n> **Latência: \`${Math.round(client.ws.ping)}ms\`**` })
                }, 2000)
                })

            } catch (err) {
                conconsole.log('Error detected in ping command')
            }
        }
        if (!language || language === "en") { // EN
            try {
                await message.reply({ content: `> **🏓 Pong!**` }).then(msg => {
                    setTimeout( () => {
                     msg.edit({ content: `> **🏓 Pong!**\n> **Latency: \`${Math.round(client.ws.ping)}ms\`**` })
                    }, 2000)
                })

            } catch (err) {
                console.log('Error detected in ping command')
            }
        }
    }
}