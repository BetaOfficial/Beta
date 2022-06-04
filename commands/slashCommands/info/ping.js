const Discord = require("discord.js")
const db = require("quick.db")

module.exports =  {
    name: "ping",
    description: "〘INFO〙》 See my latency",
    type: "CHAT_INPUT",
    
    run: async (client, interaction, args) => {
        let language = db.get(`language_${interaction.guild.id}`);
        if (language === "pt-BR") {
            let embed = new Discord.MessageEmbed()
            .setColor("WHITE")
            .setDescription(`> **🏓 Pong!**`);
            let embed1 = new Discord.MessageEmbed()
            .setColor("WHITE")
            .setDescription(`> **🏓 Pong!**\n> **Latência: \`${client.ws.ping}ms\`**\n> **Database: \`-1ms\`**`);

            interaction.reply({ embeds: [embed], ephemeral: true }).then(msg => {
                setTimeout( () => {
                    interaction.editReply({ embeds: [embed1], ephemeral: true })
                }, 2000)
            })
        } else if (language === "en" || !language) {
            let embed = new Discord.MessageEmbed()
            .setColor("WHITE")
            .setDescription(`> **🏓 Pong!**`);
            let embed1 = new Discord.MessageEmbed()
            .setColor("WHITE")
            .setDescription(`> **🏓 Pong!**\n> **Latêncy: \`${client.ws.ping}ms\`**\n> **Database: \`-1ms\`**`);

            interaction.reply({ embeds: [embed] }).then(msg => {
                setTimeout( () => {
                    interaction.editReply({ embeds: [embed1] })
                }, 2000)
            })
        }
    }
}