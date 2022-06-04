const Discord = require("discord.js");
const db = require("quick.db")
const client = require("../../../index.js")
const { inviteTracker } = require("discord-inviter")

module.exports = {
    name: "invites",
    aliases: ["invite"],
    cooldown: 1000 * 2,

    run: async (client, message, args) => {
        let language = db.get(`language_${message.guild.id}`);
        let user = client.users.cache.get(args[0]) || message.mentions.users.first() || message.author;

        if (language === "pt-BR") { // PT-BR
            try {
                var invite = await inviteTracker.getMemberInvites(user.member);
                message.reply(
                    `> **\`${user.tag}\` tem \`${invite.count}\` convite(s).**`
                );
            } catch (err) {
                let embed = new Discord.MessageEmbed()
                .setDescription(`**Por algum motivo não consegui pegar seu número de convites!**`)
                .setColor("WHITE")
                message.reply({ embeds: [embed] })
            }
        }

        if (!language || language === "en") { // EN
            try {
                var invite = await inviteTracker.getMemberInvites(user.member);
                message.reply(
                    `> **\`${user.tag}\` has \`${invite.count}\` invite(s).**`
                );
            } catch (err) {
                let embed = new Discord.MessageEmbed()
                .setDescription(`**For some reason I couldn't get your invite number!**`)
                .setColor("WHITE")
                message.reply({ embeds: [embed] })
            }
        }
    }
}