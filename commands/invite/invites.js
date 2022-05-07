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

            if (!message.guild.me.permissions.has('MANAGE_INVITES')) {
                let embed = new Discord.MessageEmbed()
                .setDescription('**<:no:930170194494636152> Eu não tenho permissão para `Gerenciar Convites`**')
                .setColor("WHITE")
                return message.reply({ embeds: [embed] });
            }

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

            if (!message.guild.me.permissions.has('MANAGE_INVITES')) {
                let embed = new Discord.MessageEmbed()
                .setDescription('**<:no:930170194494636152> I don\'t have permission to `Manage Invites`**')
                .setColor("WHITE")
                return message.reply({ embeds: [embed] });
            }

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