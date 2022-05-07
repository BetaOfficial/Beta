const Discord = require("discord.js");
const db = require("quick.db")
const client = require("../../index.js")
var { inviteTracker } = require("discord-inviter"), tracker = new inviteTracker(client);
const e = require("../../database/emojis.json")

module.exports = {
    name: "top",
    aliases: ["top-invites", "invitestop"],
    cooldown: 1000 * 2,

    run: async (client, message) => {

        let language = db.get(`language_${message.guild.id}`);

        var top = await inviteTracker.getTopInvites(message.guild);
        
        if (language === "pt-BR") { // PT-BR

            if (!message.guild.me.permissions.has('MANAGE_INVITES')) {
                let embed = new Discord.MessageEmbed()
                .setDescription('**<:no:930170194494636152> Eu não tenho permissão para `Gerenciar Convites`**')
                .setColor("WHITE")
                return message.reply({ embeds: [embed] });
            }

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

            if (!message.guild.me.permissions.has('MANAGE_INVITES')) {
                let embed = new Discord.MessageEmbed()
                .setDescription('**<:no:930170194494636152> I don\'t have permission to `Manage Invites`**')
                .setColor("WHITE")
                return message.reply({ embeds: [embed] });
            }

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