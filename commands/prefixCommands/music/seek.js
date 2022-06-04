const Discord = require("discord.js")
const db = require("quick.db")
const config = require('../../../database/config')
const formatDuration = require('../../../structures/formatduration')
module.exports = {
    name: "seek",
    aliases: ["avancar"],
    cooldown: 1000 * 2,
    run: async (client, message, args) => {

        let prefix = db.get(`prefix_${message.guild.id}`) || "-"

        let language = db.get(`language_${message.guild.id}`)
        if (language === "pt-BR") { // PT-BR
            if(isNaN(args[0])) return message.reply(`**Você não me informou o tempo em segundos, use: \`${prefix}seek <segundos>\`**`)
            
            const player = client.manager.get(message.guild.id)
		    if (!player) return msg.edit("**Não estou tocando nesse servidor!**")

            const { channel } = message.member.voice;
            if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("**Você precisa estar no mesmo canal de voz que eu!**")

            if(args[0] * 1000 >= player.playing.length || args[0] < 0) return msg.edit('**Não é possivel ultrapassar o limite da musíca!**')
		    
            await player.seek(args[0] * 1000)

            const Duration = formatDuration(player.position)
            const seeked = new Discord.MessageEmbed()
            .setDescription(`\`⏭\` **Avançado para:** \`${Duration}\`\n**Pedido por: ${message.author}**!`)
            .setColor('WHITE')
            message.reply({ embeds: [seeked]})
        }
        if (!language || language === "en") { // EN
            if(isNaN(args[0])) return message.reply(`**You didn't tell me the time in seconds, use: \`${prefix}seek <seconds>\`**`)
            
            const player = client.manager.get(message.guild.id)
		    if (!player) return msg.edit("**I'm not touching this server!**")

            const { channel } = message.member.voice;
            if (!channel || message.member.voice.channel !== message.guild.me.voice.channel) return msg.edit("**You need to be on the same voice channel as me!**")

            if(args[0] * 1000 >= player.playing.length || args[0] < 0) return msg.edit('**It is not possible to exceed the limit of the music!**')
		    
            await player.seek(args[0] * 1000)

            const Duration = formatDuration(player.position)
            const seeked = new Discord.MessageEmbed()
            .setDescription(`\`⏭\` **Advanced to:** \`${Duration}\`\n**Order by: ${message.author}**!`)
            .setColor('WHITE')
            message.reply({ embeds: [seeked]})
        }
    }
}