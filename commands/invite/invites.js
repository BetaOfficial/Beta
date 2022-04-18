const Discord = require("discord.js");
const db = require("quick.db")
const client = require("../../index.js")
var { inviteTracker } = require("discord-inviter"),
    tracker = new inviteTracker(client);

module.exports = {
    name: "invites",
    aliases: ["invite"],
    cooldown: 1000 * 2,

    run: async (client, message, args) => {

        let language = db.get(`language_${message.guild.id}`);

        if (language === "pt-BR") { // PT-BR

            try {
                var invite = await inviteTracker.getMemberInvites(message.member);
                message.reply(
                  `> **\`${message.author.tag}\` tem \`${invite.count}\` convite(s).**`
                );
            } catch (err) {
                console.log(' [ ANTICRASH ] | CATCH ERROR');
                console.log(err);
                console.log('=================================');
            }
        }

        if (!language || language === "en") { // EN

            try {
                var invite = await inviteTracker.getMemberInvites(message.member);
                message.reply(
                  `> **\`${message.author.tag}\` has \`${invite.count}\` invite(s).**`
                );
            } catch (err) {
                console.log(' [ ANTICRASH ] | CATCH ERROR');
                console.log(err);
                console.log('=================================');
            }
        }
        
    }
}