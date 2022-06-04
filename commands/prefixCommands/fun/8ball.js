const db = require("quick.db")
const Discord = require('discord.js')
const config = require('../../../database/config')

module.exports = {
    name: "8ball",
    aliases: ["bola8"],
    cooldown: 1000 * 2,

    run: async(client, message, args) => {

        let prefix = db.get(`prefix_${message.guild.id}`) || "-"
        let language = db.get(`language_${message.guild.id}`);
        let pergunta = args.join(" ")

        if (language === "pt-BR") { // PT-BR
            if (!args[0]) {
                let embed1_error = new Discord.MessageEmbed()
                .setDescription(`${config.emoji.no} **Você precisa fazer uma pergunta!**`)
                .setColor("WHITE")
                return message.reply({ embeds: [embed1_error] })
            }
            let respostas = ["sim", "provavelmente sim", "provavelmente não", "não", "obviamente não", "não faço ideia", "não me pergunte", "pergunte isso ao dono da padaria", "nunca nem vi"];
            let resposta = respostas[Math.floor(Math.random()*respostas.length)];

            try {
                let embed2_sucess = new Discord.MessageEmbed()
                .setDescription(`🔮 **Você me perguntou e eu tenho uma resposta para isso! Confira logo abaixo:**`)
                .addField(`❓ **Pergunta:**`, `**\`\`\`txt\n${pergunta}\`\`\`**`, false)
                .addField(`✨ **Resposta:**`, `**\`\`\`txt\n${resposta}\`\`\`**`, false)
                .setFooter({ text: `Lembrando que isso é apenas um gerador de respostas aleatórias, não leve isso a sério!` })
                .setColor("WHITE")
                return message.reply({ embeds: [embed2_sucess] })
            } catch (e) {  
                console.log(e)
                let embed3_error = new Discord.MessageEmbed()
                .setDescription(`${config.emoji.no} **Desculpe, não consigo executar este comando por falta de permissão!**`)
                .setColor("WHITE")
                return message.reply({ embeds: [embed3_error] })
            }
        }
        if (!language || language === "en") { // EN
            if (!args[0]) {
                let embed1_error = new Discord.MessageEmbed()
                .setDescription(`${config.emoji.no} **You need to ask a question!**`)
                .setColor("WHITE")
                return message.reply({ embeds: [embed1_error] })
            }
            let respostas = ["yes", "probably yes", "probably not", "no", "obviously not", "I have no idea", "Don't ask me", "Ask that to the bakery owner", "I've never even seen"];
            let resposta = respostas[Math.floor(Math.random()*respostas.length)];

            try {
                let embed2_sucess = new Discord.MessageEmbed()
                .setDescription(`🔮 **You asked me and I have an answer for that! Check it out below:**`)
                .addField(`❓ **Question:**`, `**\`\`\`txt\n${pergunta}\`\`\`**`, false)
                .addField(`✨ **Reply:**`, `**\`\`\`txt\n${resposta}\`\`\`**`, false)
                .setFooter({ text: `Remembering that this is just a random answer generator, don't take it seriously!` })
                .setColor("WHITE")
                return message.reply({ embeds: [embed2_sucess] })
            } catch (e) { 
                console.log(e)
                let embed3_error = new Discord.MessageEmbed()
                .setDescription(`${config.emoji.no} **Sorry, I can't run this command due to lack of permission!**`)
                .setColor("WHITE")
                return message.reply({ embeds: [embed3_error] })
            }
        }

	}
}