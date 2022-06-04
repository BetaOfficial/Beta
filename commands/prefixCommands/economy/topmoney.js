const Discord = require("discord.js")
const db = require("quick.db")
const config = require("../../../database/config");
module.exports = {
    name: "topmoney",
    aliases: ["topdinheiro", "moneytop", "dinheirotop"],
    cooldown: 1000 * 2,
    run: async (client, message, args) => {

        let money = db.all().filter(data => data.ID.startsWith(`money`)).sort((a, b) => b.data - a.data)
        money.length = 10;
        let finalLb = "";
        for (var i in money) {
            finalLb += `**${money.indexOf(money[i])+1}.**<@${money[i].ID.slice(25)}> - \`${money[i].data}B$\`\n`;
        }

        let prefix = db.get(`prefix_${message.guild.id}`) || "-"

        let language = db.get(`language_${message.guild.id}`);
        if (language === "pt-BR") { // PT-BR
            let embed = new Discord.MessageEmbed()
            .setDescription(`**Confira abaixo os top's usuários com mais moedas no Beta™:**\n**${finalLb}**`)
            .setColor("WHITE")
            message.reply({ embeds: [embed] })
        }
        if (!language || language === "en") { // EN
            let embed = new Discord.MessageEmbed()
            .setDescription(`**Confira abaixo os top's usuários com mais moedas no Beta™:**\n**${finalLb}**`)
            .setColor("WHITE")
            message.reply({ embeds: [embed] })
        }
    }
}