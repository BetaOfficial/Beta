const Discord = require("discord.js");
const db = require("quick.db");
const owners = require("../../database/owners.json");
const config = require("../../database/config.json");
const e = require("../../database/emojis.json")
const { MessageEmbed } = require('discord.js')
const math = require('mathjs')

module.exports = {
    name: "calculator",
    aliases: ["calc", "calculadora"],
    cooldown: 1000 * 2,

    run: async (client, message, args) => {

        let prefix = db.get(`prefix_${message.guild.id}`) || "-"

        let numbers = "1" || "2" || "3" || "4" || "5" || "6" || "7" || "8" || "9" || "0"

        let language = db.get(`language_${message.guild.id}`);
        if (language === "pt-BR") { // PT-BR

            if(!args[0]) {
                const calculatorError = new MessageEmbed()
                .setDescription(`> **Fale uma questão!\n> Por exemplo: \`${prefix}calculator 1+1\`**`)
                .setColor('WHITE')
                .setFooter({ text: 'Hey, Use apenas números aqui!' })
                return message.reply({ embeds: [calculatorError] })
            }

            if (!args[0].startsWith(numbers)) {
                const calculatorError2 = new MessageEmbed()
                .setDescription(`> **Fale uma questão!\n> Por exemplo: \`${prefix}calculator 1+1\`**`)
                .setColor('WHITE')
                .setFooter({ text: 'Hey, Use apenas números aqui!' })
                return message.reply({ embeds: [calculatorError2] })
            }

            let result;

            try {
                result = math.evaluate(args.join(" ").replace(/[x]/gi, "*").replace(/[,]/g, ".").replace(/[÷]/gi, "/"))
            } catch (error) {
                const calculatorError2 = new MessageEmbed()
                .setDescription(`> **Expressão inválida!\n> Use por exemplo: \`${prefix}calculator 1+1\`**`)
                .setColor('WHITE')
                return message.reply({ embeds: [calculatorError2] })
            }

            const calculator = new MessageEmbed()
            .setAuthor(`**Calculadora**`, client.user.displayAvatarURL())
            .addField(`**Questão:**`, `\`\`\`js\n${args.join("").replace(/[x]/gi, "*").replace(/[,]/g, ".").replace(/[÷]/gi, "/")}\`\`\``)
            .addField(`**Resultado:**`, `\`\`\`js\n${result}\`\`\``)
            .setColor("WHITE")
            message.reply({ embeds: [calculator] })
        }
        if (!language || language === "en") { // EN
            if(!args[0]) {
                const calculatorError = new MessageEmbed()
                .setDescription(`> **Ask a question!\n> For example: \`${prefix}calculator 1+1\`**`)
                .setColor('WHITE')
                return message.reply({ embeds: [calculatorError] })
            }

            if (!args[0].startsWith(numbers)) {
                const calculatorError2 = new MessageEmbed()
                .setDescription(`> **Ask a question!\n> For example: \`${prefix}calculator 1+1\`**`)
                .setColor('WHITE')
                .setFooter({ text: 'Hey, use only numbers here!' })
                return message.reply({ embeds: [calculatorError2] })
            }

            let result;

            try {
                result = math.evaluate(args.join(" ").replace(/[x]/gi, "*").replace(/[,]/g, ".").replace(/[÷]/gi, "/"))
            } catch (error) {
                const calculatorError2 = new MessageEmbed()
                .setDescription(`> **Invalid expression!\n> Use for example: \`${prefix}calculator 1+1\`**`)
                .setColor('WHITE')
                return message.reply({ embeds: [calculatorError2] })
            }

            const calculator = new MessageEmbed()
            .setAuthor(`**Calculator**`, client.user.displayAvatarURL())
            .addField(`**Question:**`, `\`\`\`js\n${args.join("").replace(/[x]/gi, "*").replace(/[,]/g, ".").replace(/[÷]/gi, "/")}\`\`\``)
            .addField(`**Result:**`, `\`\`\`js\n${result}\`\`\``)
            .setColor("WHITE")
            message.reply({ embeds: [calculator] })
        }
        
    }
}