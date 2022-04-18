const Discord = require("discord.js");
const db = require("quick.db")
const client = require("../../index.js")
var { inviteTracker } = require("discord-inviter"), tracker = new inviteTracker(client);
const e = require("../../Database/emojis.json")

module.exports = {
    name: "top",
    aliases: ["top-invites", "invitestop"],
    cooldown: 1000 * 2,

    run: async (client, message) => {

        let language = db.get(`language_${message.guild.id}`);

        var top = await inviteTracker.getTopInvites(message.guild);
        
        if (language === "pt-BR") { // PT-BR

            try {
                message.reply(top.map((i, n) => `\`#${n + 1}\`- **${i.user.tag} tem \`${i.count}\` convite(s)!**`).join("\n")).catch(() => {
                    return message.reply({ content: `**${e.no} Não achei uma lista de convites neste servidor!**`})
                })
            } catch (err) {
                console.log(' [ ANTICRASH ] | CATCH ERROR');
                console.log(err);
                console.log('=================================');
            }
        }

        if (!language || language === "en") { // EN

            try {
                message.reply(top.map((i, n) => `\`#${n + 1}\`- **${i.user.tag} has \`${i.count}\` invite(s)!**`).join("\n")).catch(() => {
                    return message.reply({ content: `**${e.no} I couldn't find a list of invites on this server!**`})
                })
            } catch (err) {
                console.log(' [ ANTICRASH ] | CATCH ERROR');
                console.log(err);
                console.log('=================================');
            }
        }
        
    }
}