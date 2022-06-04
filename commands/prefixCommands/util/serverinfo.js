const Discord = require("discord.js");
const db = require("quick.db");
const config = require('../../../database/config')

module.exports = {
    name: "serverinfo",
    aliases: ["server", "servidor"],
    cooldown: 1000 * 2,

    run: async (client, message, args) => {

        let prefix = db.get(`prefix_${message.guild.id}`) || "-"

        const  { guild, author} = message;
        const voiceChannels = message.guild.channels.cache.filter(c => c.type === 'GUILD_VOICE');
        let count = 0;
        let count2 = 0;

        for (const [id, voiceChannel] of voiceChannels) count += voiceChannel.members.size;
        for (const [id, voiceChannel] of voiceChannels)
        count2 += voiceChannel.members.filter(m => m.user.bot).size;

        let membros = message.guild.memberCount;
        let cargos = message.guild.roles.cache.size;
        let canais = message.guild.channels.cache.size;
        let servidor = message.guild;

        let chats = message.guild.channels.cache.filter(a => a.type === "GUILD_TEXT").size;
        let calls = message.guild.channels.cache.filter(a => a.type === "GUILD_VOICE").size;

        let emojis = message.guild.emojis.cache.size;
        let dono_id = message.guild.ownerId;
        let dono = message.guild.members.cache.get(dono_id);
        let impulsos = message.guild.premiumSubscriptionCount;

        let server_icon = message.guild.iconURL({ dynamic : true })

        if (!server_icon || server_icon == null) {
            server_icon = 'https://i.imgur.com/Hh30gfD.jpg'
        }

        let language = db.get(`language_${message.guild.id}`);
        if (language === "pt-BR") { // PT-BR
            let data = message.guild.createdAt.toLocaleDateString("pt-br");

            let embed01 = new Discord.MessageEmbed()
            .setColor("WHITE")
            .setThumbnail(`${server_icon}`)
            .setTitle(`**__${message.guild.name}__ \`(${message.guild.id})\`**`)
            .addFields(
                {
                    name: `> \\📌 Servidor:`,
                    value: `**Dono: ${dono} \`(${dono.id})\`**\n**Membros: \`${membros + 1}\`**\n**Bots: \`${message.guild.members.cache.filter(m => m.user.bot).size}\`**\n**Impulsos: \`${impulsos}\`**`,
                    inline: false
                },
                {
                    name: `> \\💬 Canais:`,
                    value: `**Geral: \`${canais}\`**\n**Chats: \`${chats}\`**\n**Calls: \`${calls}\`**\n**Membros em Call: \`${count}\`**\n**Bots em Call: \`${count2}\`**`,
                    inline: false
                },
                {
                    name: `> \\💼 Cargos:`,
                    value: `\`${cargos}\``,
                    inline: true
                },
                {
                    name: `\\🤯 Emojis:`,
                    value: `\`${emojis}\``,
                    inline: true
                },
                {
                    name: `> \\📅 Data de criação:`,
                    value: `\`${data}\``,
                    inline: false
                },
            )
            message.reply({ embeds: [embed01] })
        }
        if (!language || language === "en") { // EN
            let data = message.guild.createdAt.toLocaleDateString("en");

            let embed02 = new Discord.MessageEmbed()
            .setColor("WHITE")
            .setThumbnail(`${server_icon}`)
            .setTitle(`**__${message.guild.name}__ \`(${message.guild.id})\`**`)
            .addFields(
                {
                    name: `> \\📌 Server:`,
                    value: `**Owner: ${dono} \`(${dono.id})\`**\n**Members: \`${membros + 1}\`**\n**Bots: \`${message.guild.members.cache.filter(m => m.user.bot).size}\`**\n**Impulses: \`${impulsos}\`**`,
                    inline: false
                },
                {
                    name: `> \\💬 Channels:`,
                    value: `**General: \`${canais}\`**\n**Chats: \`${chats}\`**\n**Calls: \`${calls}\`**\n**Members in Call: \`${count}\`**\n**Bots in Call: \`${count2}\`**`,
                    inline: false
                },
                {
                    name: `> \\💼 Roles:`,
                    value: `\`${cargos}\``,
                    inline: true
                },
                {
                    name: `\\🤯 Emojis:`,
                    value: `\`${emojis}\``,
                    inline: true
                },
                {
                    name: `> \\📅 Creation Date:`,
                    value: `\`${data}\``,
                    inline: false
                },
            )
            message.reply({ embeds: [embed02] })
        }
        
    }
}