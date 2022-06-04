const { MessageEmbed } = require('discord.js')
const db = require("quick.db")
const config = require('../../../database/config')

module.exports = {
        name: "eval",
        aliases: ["e"],
        cooldown: 1000 * 2,
    
    run: async (client, message, args) => {

        let prefix = db.get(`prefix_${message.guild.id}`) || "-"
        let owner = config.owners.ID1 || config.owners.ID2

        function clean(text) {
            if (typeof text === "string")
                return text
                    .replace(/`/g, "`" + String.fromCharCode(8203))
                    .replace(/@/g, "@" + String.fromCharCode(8203));
            else return text;
        }

        let language = db.get(`language_${message.guild.id}`);
        if (language === "pt-BR") { // PT-BR
            if (!owner.includes(message.author.id)) {
                let embed = new MessageEmbed()
                .setDescription('<:no:930170194494636152> **Somente meu criador pode usar este código!**')
                .setColor("WHITE")
                return message.reply({ embeds: [embed] })
            }

            try {
                const code = args.join(" ");
                let valor = eval(code);

                if (typeof valor !== "string") valor = require("util").inspect(valor);

                message.react(config.emoji.yes);
                var evalEmbed = new MessageEmbed()
                    .setTitle('Resultado:')
                    .setDescription(`\`\`\`js` + '\n' + clean(valor) + `\n` + `\`\`\``)
                    .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                    .setColor("WHITE")
                message.channel.send({embeds:[evalEmbed]});
            } catch (err) {
                message.react(config.emoji.no);
                var evalEmbed = new MessageEmbed()
                    .setTitle('Resultado:')
                    .setDescription(`\`\`\`js` + '\n' + clean(err) + `\n` + `\`\`\``)
                    .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                    .setColor("WHITE")
                message.channel.send({embeds:[evalEmbed]});
            }
        }
        if (!language || language === "en") { // EN
            if (!owner.includes(message.author.id)) {
                let embed = new MessageEmbed()
                .setDescription('<:no:930170194494636152> **Only my creator can use this code!**')
                .setColor("WHITE")
                return message.reply({ embeds: [embed] })
            }

            try {
                const code = args.join(" ");
                let valor = eval(code);

                if (typeof valor !== "string") valor = require("util").inspect(valor);

                message.react(config.emoji.yes);
                var evalEmbed = new MessageEmbed()
                    .setTitle('Result:')
                    .setDescription(`\`\`\`js` + '\n' + clean(valor) + `\n` + `\`\`\``)
                    .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                    .setColor("WHITE")
                message.channel.send({embeds:[evalEmbed]});
            } catch (err) {
                message.react(config.emoji.no);
                var evalEmbed = new MessageEmbed()
                    .setTitle('Result:')
                    .setDescription(`\`\`\`js` + '\n' + clean(err) + `\n` + `\`\`\``)
                    .setFooter(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                    .setColor("WHITE")
                message.channel.send({embeds:[evalEmbed]});
            }
        }
    }
}