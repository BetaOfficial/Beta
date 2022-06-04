const Discord = require("discord.js")
const db = require("quick.db")

module.exports =  {
    name: "premium",
    description: "〘INFO〙》 Check the premium",
    type: "CHAT_INPUT",
    
    run: async (client, interaction, args) => {
        let language = db.get(`language_${interaction.guild.id}`);
        let premium = db.get(`premium_${interaction.user.id}`);
        if (language === "pt-BR") {
            if (premium != true) {
                premiumstats = "Desativado"
                premiumtime = "0"
            } else {
                premiumstats = "Ativado"
                premiumtime = "Ilimitado"
            }
            let embed = new Discord.MessageEmbed()
            .setColor("WHITE")
            .setDescription(`> **${interaction.user} verifique o seu status e benefícios como premium ou vire um usuário premium!**`)
            .addField(`**✨ Premium:**`, `**\`${premiumstats}\`**`, true)
            .addField(`**⏳ Tempo:**`, `**\`${premiumtime}\`**`, true)
            .addField(`**🎊 Benefícios:**`, `**\`Dobro de B$ e itens\`, \`Limite de volume em 200%\`**`, false)
            interaction.reply({ embeds: [embed] })
        } else if (language === "en" || !language) {
            if (premium != true) {
                premiumstats = "Desactived"
                premiumtime = "0"
            } else {
                premiumstats = "Actived"
                premiumtime = "Ilimited"
            }
            let embed = new Discord.MessageEmbed()
            .setColor("WHITE")
            .setDescription(`> **${interaction.user} check your status and benefits as a premium or become a premium user!**`)
            .addField(`**✨ Premium:**`, `**\`${premiumstats}\`**`, true)
            .addField(`**⏳ Time:**`, `**\`${premiumtime}\`**`, true)
            .addField(`**🎊 Benefits:**`, `**\`Double B$ and itens\`, \`Volume limit at 200%\`**`, false)
            interaction.reply({ embeds: [embed] })
        }
    }
}