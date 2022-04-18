const { MessageEmbed } = require('discord.js');
const Discord = require("discord.js");
const db = require("quick.db");

module.exports = {
    name: "queue",
    aliases: ["q"],
    cooldown: 1000 * 2,

    run: async (client, message, args) => {

        let language = db.get(`language_${message.guild.id}`);
        if (language === "pt-BR") { // PT-BR

            try {

                let channel = message.member.voice.channel;
                let myVoice = message.guild.me.voice.channel;

                if (!channel) {
                    let embed_error_1 = new Discord.MessageEmbed()
                    .setDescription('<:no:930170194494636152> **Você precisa estar em um canal de voz para visualizar a fila!**')
                    .setColor("WHITE")
                    return message.reply({ embeds: [embed_error_1] }).catch(() => {
                        message.channel.send('<:no:930170194494636152> **Desculpe, não consigo executar este comando por falta de permissão!**')
                    })
                }
                if (myVoice && channel.id !== myVoice.id) {
                    let embed_error_2 = new Discord.MessageEmbed()
                    .setDescription('<:no:930170194494636152> **Já estou tocando uma música neste servidor!**')
                    .setColor("WHITE")
                    return message.reply({ embeds: [embed_error_2] }).catch(() => {
                        message.channel.send('<:no:930170194494636152> **Desculpe, não consigo executar este comando por falta de permissão!**')
                    })
                }
                
                const player = client.manager.create({
                    guild: message.guild.id,
                    voiceChannel: message.member.voice.channel.id,
                    textChannel: message.channel.id
                });

                const queue = player.queue

                const embed = new MessageEmbed()
                    .setTitle(`<:yes:930170194784043048> Server Queue`)
                    .setColor('WHITE')

                const tracks = queue.slice(0, 10)

                if (queue.current) embed.addField(`**Tocando agora:**`, `**[${queue.current.title}](${queue.current.uri})**`)
                if (!tracks.length) embed.setDescription(`**Não há músicas na fila!**`)
                else embed.setDescription(
                    tracks.map((t, i) => {
                        return `**${i + 1} - [${t.title}](${t.uri})**`
                    })
                    .join('\n')
                )

                return message.reply({ embeds: [embed] }).catch(() => {
                    message.channel.send('<:no:930170194494636152> **Desculpe, não consigo executar este comando por falta de permissão!**')
                })
            } catch (err) {
                let embed = new Discord.MessageEmbed()
                .setDescription(`${e.no} **Eu não estou tocando nada nesse servidor ou não consegui concluir a ação!**`)
                .setColor("WHITE")
                return message.reply({ embeds: [embed] }).catch(() => {
                    message.channel.send('<:no:930170194494636152> **Desculpe, não consigo executar este comando por falta de permissão!**')
                })
            }
        }
        if (!language || language === "en") { // EN

            try {

                let channel = message.member.voice.channel;
                let myVoice = message.guild.me.voice.channel;

                if (!channel) {
                    let embed_error_1 = new Discord.MessageEmbed()
                    .setDescription('<:no:930170194494636152> **You need to be on a voice channel to view the queue!**')
                    .setColor("WHITE")
                    return message.reply({ embeds: [embed_error_1] }).catch(() => {
                        message.channel.send('<:no:930170194494636152> **Sorry, I can\'t execute this command due to lack to lack of permission!**')
                    })
                }
                if (myVoice && channel.id !== myVoice.id) {
                    let embed_error_2 = new Discord.MessageEmbed()
                    .setDescription('<:no:930170194494636152> **I\'m already playing a song on this server!**')
                    .setColor("WHITE")
                    return message.reply({ embeds: [embed_error_2] }).catch(() => {
                        message.channel.send('<:no:930170194494636152> **Sorry, I can\'t execute this command due to lack to lack of permission!**')
                    })
                }
                
                const player = client.manager.create({
                    guild: message.guild.id,
                    voiceChannel: message.member.voice.channel.id,
                    textChannel: message.channel.id
                });

                const queue = player.queue

                const embed = new MessageEmbed()
                    .setTitle(`<:yes:930170194784043048> Server Queue`)
                    .setColor('WHITE')

                const tracks = queue.slice(0, 10)

                if (queue.current) embed.addField(`**Playing now:**`, `**[${queue.current.title}](${queue.current.uri})**`)
                if (!tracks.length) embed.setDescription(`**There are no songs in the queue!**`)
                else embed.setDescription(
                    tracks.map((t, i) => {
                        return `**${i + 1} - [${t.title}](${t.uri})**`
                    })
                    .join('\n')
                )

                return message.reply({ embeds: [embed] }).catch(() => {
                    message.channel.send('<:no:930170194494636152> **Sorry, I can\'t execute this command due to lack to lack of permission!**')
                })
            } catch (err) {
                let embed = new Discord.MessageEmbed()
                .setDescription(`${e.no} **I'm not playing anything on this server or I couldn't complete the action**`)
                .setColor("WHITE")
                return message.reply({ embeds: [embed] }).catch(() => {
                    message.channel.send('<:no:930170194494636152> **Sorry, I can\'t execute this command due to lack to lack of permission!**')
                })
            }
        }
    }
}