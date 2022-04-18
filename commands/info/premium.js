const Discord = require("discord.js");
const db = require("quick.db");
const owners = require("../../Database/owners.json");
const config = require("../../Database/config.json");
const e = require("../../Database/emojis.json")
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
            } else {
                premiumstats = "Ativado"
            }

            let embed = new Discord.MessageEmbed()
            .setColor("WHITE")
            .setDescription(`> **${message.author} verifique o seu status e benefícios como premium ou vire um usuário premium!**`)
            .addField(`**✨ Premium:**`, `**\`${premiumstats}\`**`, true)
            .addField(`**⏳ Tempo:**`, `**\`Ilimitado\`**`, true)
            .addField(`**🎊 Benefícios:**`, `**\`Dobro de B$ e caixas no comando de daily\`**`, false)
            message.reply({ embeds: [embed] })

        }
        if (!language || language === "en") { // EN
            if (premium != true) {
                premiumstats = "Desactived"
            } else {
                premiumstats = "Actived"
            }

            let embed = new Discord.MessageEmbed()
            .setColor("WHITE")
            .setDescription(`> **${message.author} check your status and benefits as a premium or become a premium user!**`)
            .addField(`**✨ Premium:**`, `**\`${premiumstats}\`**`, true)
            .addField(`**⏳ Time:**`, `**\`Ilimitado\`**`, true)
            .addField(`**🎊 Benefits:**`, `**\`Double B$ and boxes in daily command\`**`, false)
            message.reply({ embeds: [embed] })
        
        }
        
    }
}