const db = require("quick.db");

module.exports = {
    name: "ping",
    cooldown: 1000 * 2,
    run: async(client, message, args) => {
        let language = db.get(`language_${message.guild.id}`);
        if (language === "pt-BR") {
            await message.reply({ content: `> **🏓 Pong!**`, ephemeral: true }).then(msg => {
                setTimeout( () => {
                    msg.edit({ content: `> **🏓 Pong!**\n> **Latência: \`${client.ws.ping}ms\`**\n> **Database: \`-1ms\`**`, ephemeral: true })
                }, 2000)
            }) 
        } else if (language === "en" || !language) {
            await message.reply({ content: `> **🏓 Pong!**`, ephemeral: true }).then(msg => {
                setTimeout( () => {
                    msg.edit({ content: `> **🏓 Pong!**\n> **Latêncy: \`${client.ws.ping}ms\`**\n> **Database: \`-1ms\`**`, ephemeral: true })
                }, 2000)
            }) 
        }
    }
}