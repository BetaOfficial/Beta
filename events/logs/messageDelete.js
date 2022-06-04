const db = require("quick.db")
const Discord = require("discord.js")
module.exports = async (client, message) => {
    if (message.author.bot) return;
    let member = message.author;
    let msgchannel = message.channel;
    let msg = message.content;
    let logs = db.get(`channellogs_${message.guild.id}`)
    if (logs || logs != null || logs !=false) {
        try {
            let language = db.get(`language_${message.guild.id}`);
            if (language === "pt-BR") { // PT-BR
                let embed = new Discord.MessageEmbed() //mensagem embed
                .setTitle(`**Logs - Mensagem apagada**`)
                .setDescription(`**\`${member.tag}\` apagou uma mensagem!, verifique logo abaixo:**`)
                .addFields(
                    {
                        name: `**Canal:**`,
                        value: `${msgchannel}`,
                        inline: false,
                    },
                )
                .addFields(
                    {
                        name: `**Mensagem:**`,
                        value: `\`\`\`${msg}\`\`\``,
                        inline: false
                    },
                )
                .setColor("WHITE")
                .setThumbnail(member.avatarURL())
                .setTimestamp()
                client.channels.cache.get(logs).send({ embeds: [embed] }).catch({})
            }
            if (!language || language === "en") { // EN
                let embed = new Discord.MessageEmbed() //mensagem embed
                .setTitle(`**Logs - Message Delete**`)
                .setDescription(`**\`${member.tag}\` deleted the message, check it out below:**`)
                .addFields(
                    {
                        name: `**Channel:**`,
                        value: `${msgchannel}`,
                        inline: false,
                    },
                )
                .addFields(
                    {
                        name: `**Message:**`,
                        value: `\`\`\`${msg}\`\`\``,
                        inline: false
                    },
                )
                .setColor("WHITE")
                .setThumbnail(member.avatarURL())
                .setTimestamp()
                client.channels.cache.get(logs).send({ embeds: [embed] }).catch({})
            }
        } catch {
            
        }
    }
}