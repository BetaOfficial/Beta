const Discord = require("discord.js")
const db = require("quick.db")
const moment = require("moment")

module.exports = {
    name: "userinfo",
    aliases: ["ui"],
    cooldown: 1000 * 2,

    run: async(client, message, args) => {

        let language = db.get(`language_${message.guild.id}`);
        let user = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;

        let data = user.createdAt.toLocaleDateString("pt-br");
        let avatar = user.displayAvatarURL({ dynamic: true });

        if (language === "pt-BR") { // PT-BR

            moment.locale('pt-BR')

            let embed = new Discord.MessageEmbed()
            .setColor("WHITE")
            .setThumbnail(avatar)
            .addFields(
                {
                    name: `**\\#️⃣ Tag**`,
                    value: `**\`${user.tag}\`**`,
                    inline: true
                },
                {
                    name: `**\\🆔 ID**`,
                    value: `**\`${user.id}\`**`,
                    inline: true
                },
                {
                    name: `**\\📅 Data de criação:**`,
                    value: `**\`${moment(user.createdAt).format('LLL')}\`\n(${moment(user.createdAt).fromNow()})**`,
                    inline: false
                },
                {
                    name: `**\\🕒 Ultima vez:**`,
                    value: `**\`${moment(user.joinedAt).format('LLL')}\`\n(${moment(user.joinedAt).fromNow()})**`,
                    inline: false
                },
            );

            message.reply({ embeds: [embed]}).catch(() => {
                message.channel.send('<:no:930170194494636152> **Desculpe mas eu não posso executar esse comando por falta de permissões!**')
            })
        }
        if (!language || language === "en") { // EN

            moment.locale('en')

            let embed = new Discord.MessageEmbed()
            .setColor("WHITE")
            .setThumbnail(avatar)
            .addFields(
                {
                    name: `**\\#️⃣ Tag**`,
                    value: `**\`${user.tag}\`**`,
                    inline: true
                },
                {
                    name: `**\\🆔 ID**`,
                    value: `**\`${user.id}\`**`,
                    inline: true
                },
                {
                    name: `**\\📅 Account creation date:**`,
                    value: `**\`${moment(user.createdAt).format('LLL')}\`\n(${moment(user.createdAt).fromNow()})**`,
                    inline: false
                },
                {
                    name: `**\\🕒 Last time:**`,
                    value: `**\`${moment(user.joinedAt).format('LLL')}\`\n(${moment(user.joinedAt).fromNow()})**`,
                    inline: false
                },
            );

            message.reply({ embeds: [embed] }).catch(() => {
                message.channel.send('<:no:930170194494636152> **Sorry, but I\'m not allowed to upload images!**')
            })
        }

       
        
    }
}