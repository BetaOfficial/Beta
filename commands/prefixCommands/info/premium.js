const Discord = require("discord.js");
const db = require("quick.db");
const config = require('../../../database/config')
const {MessageEmbed} = require("discord.js");

module.exports = {
    name: "premium",
    cooldown: 1000 * 2,

    run: async (client, message, args) => {

        let prefix = db.get(`prefix_${message.guild.id}`) || "-"
        let premium = db.get(`premium_${message.author.id}`);

        let language = db.get(`language_${message.guild.id}`);
        if (language === "pt-BR") { // PT-BR

            if (premium != true) {
                premiumstats = "Desativado"
                premiumtime = "0"
            } else {
                premiumstats = "Ativado"
                premiumtime = "Ilimitado"
            }

            let embed = new Discord.MessageEmbed()
            .setColor("WHITE")
            .setDescription(`> **${message.author} verifique o seu status e benefícios como premium ou vire um usuário premium!**`)
            .addField(`**✨ Premium:**`, `**\`${premiumstats}\`**`, true)
            .addField(`**⏳ Tempo:**`, `**\`${premiumtime}\`**`, true)
            .addField(`**🎊 Benefícios:**`, `**\`Dobro de B$ e itens\`, \`Limite de volume em 500%\`**`, false)
            message.reply({ embeds: [embed] })

        }
        if (!language || language === "en") { // EN
            if (premium != true) {
                premiumstats = "Desactived"
                premiumtime = "0"
            } else {
                premiumstats = "Actived"
                premiumtime = "Ilimited"
            }

            let embed = new Discord.MessageEmbed()
            .setColor("WHITE")
            .setDescription(`> **${message.author} check your status and benefits as a premium or become a premium user!**`)
            .addField(`**✨ Premium:**`, `**\`${premiumstats}\`**`, true)
            .addField(`**⏳ Time:**`, `**\`${premiumtime}\`**`, true)
            .addField(`**🎊 Benefits:**`, `**\`Double B$ and itens\`, \`Volume limit at 500%\`**`, false)
            message.reply({ embeds: [embed] })
        
        }
        
    }
}