const Discord = require("discord.js");
const db = require("quick.db")
const client = require("../../../index.js")
const { inviteTracker } = require("discord-inviter")
const config = require('../../../database/config')

module.exports = {
    name: "top",
    aliases: ["top-invites", "invitestop", "topinvite"],
    cooldown: 1000 * 2,

    run: async (client, message) => {
        let language = db.get(`language_${message.guild.id}`);
        var top = await inviteTracker.getTopInvites(message.guild.id);
        
        if (language === "pt-BR") { // PT-BR
            try {
                message.reply(top.map((i, n) => `\`#${n + 1}\`- **${i.user.tag} tem \`${i.count}\` convite(s)!**`).join("\n")).catch(() => {
                    return message.reply({ content: `**${config.emoji.no} Não achei uma lista de convites neste servidor!**`})
                })
            } catch (err) {
                let embed = new Discord.MessageEmbed()
                .setDescription(`**Por algum motivo não consegui pegar os número de convites do seu servidor!**`)
                .setColor("WHITE")
                message.reply({ embeds: [embed] })
            }
        }

        if (!language || language === "en") { // EN
            try {
                message.reply(top.map((i, n) => `\`#${n + 1}\`- **${i.user.tag} has \`${i.count}\` invite(s)!**`).join("\n")).catch(() => {
                    return message.reply({ content: `**${config.emoji.no} I couldn't find a list of invites on this server!**`})
                })
            } catch (err) {
                let embed = new Discord.MessageEmbed()
                .setDescription(`**For some reason I couldn't get the number of invites from your server!**`)
                .setColor("WHITE")
                message.reply({ embeds: [embed] })
            }
        }
        
    }
}