const translate = require("@iamtraction/google-translate");
const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "translate",
    aliases: ["traduzir"],
    cooldown: 1000 * 2,

    run: async(client, message, args) => {
        let language = db.get(`language_${message.guild.id}`);
        let prefix = db.get(`prefix_${message.guild.id}`) || "-"

        if (language === "pt-BR") { // PT-BR
            const text = args.slice(1).join(" ");
            if (!text) {
                let embed= new Discord.MessageEmbed()
                .setDescription(`<:no:930170194494636152> **Você precisa digitar uma mensagem para eu traduzir!**\n**Siga o exemplo: \`${prefix}translate en Eu amo meus usuarios!\`**\n**Linguagens mais usadas: \`pt = Português\`, \`es = Espanhol\`, \`en = Inglês\`**`)
                .setColor("WHITE")
                return message.reply({ embeds: [embed] });
            }
            try {
            const trad = await translate(text, {
                to: args[0],
            });

            let tradu = trad.text ? trad.text : ""
            let embed_pt = new Discord.MessageEmbed()
            .setColor("WHITE")
            .setDescription(`**📝 Texto:**\n**\`\`\`\n${text}\`\`\`**\n**<:web:918506821474451526> Tradução:**\n**\`\`\`\n${tradu}\`\`\`**`)

            message.reply({ embeds: [embed_pt] }).catch(() => {
                message.channel.send('<:no:930170194494636152> **Sorry, I can\'t execute this command due to lack to lack of permission!**')
            })
            } catch (err) {
            console.log(`${err}`);
            if (err)
                if (
                err.message.startsWith("The language") &&
                err.message.endsWith("is not supported.")
                )
                return message.reply(
                    `<:no:930170194494636152> **This language is not supported! Use \`${prefix}translate\` to see my most popular languages!**`
                );
            }
        }
        if (!language || language === "en") { // EN
            const text = args.slice(1).join(" ");
            if (!text) {
                let embed= new Discord.MessageEmbed()
                .setDescription(`<:no:930170194494636152> **You need to enter a message for me to translate!**\n**Follow the example: \`${prefix}translate pt I love my users\`**\n**My most used languages: \`pt = Portuguese\`, \`es = Spanish\`, \`en = English\`**`)
                .setColor("WHITE")
                return message.reply({ embeds: [embed] });
            }
            try {
            const trad = await translate(text, {
                to: args[0],
            });
            
            let tradu = trad.text ? trad.text : ""
            let embed_en = new Discord.MessageEmbed()
            .setColor("WHITE")
            .setDescription(`**📝 Text:**\n**\`\`\`\n${text}\`\`\`**\n**<:web:918506821474451526> Translation:**\n**\`\`\`\n${tradu}\`\`\`**`)

            message.reply({ embeds: [embed_en] }).catch(() => {
                message.channel.send('<:no:930170194494636152> **Sorry, I can\'t execute this command due to lack to lack of permission!**')
            })
            } catch (err) {
            console.log('Error detected in translate command');
            if (err)
                if (
                err.message.startsWith("The language") &&
                err.message.endsWith("is not supported.")
                )
                return message.reply(
                    `<:no:930170194494636152> **This language is not supported! Use \`${prefix}translate\` to see my most popular languages!**`
                );
            }
        }
    }
}