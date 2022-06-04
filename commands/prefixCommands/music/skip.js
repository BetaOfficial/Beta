const { MessageEmbed } = require('discord.js')
const Discord = require("discord.js");
const db = require("quick.db")
const config = require('../../../database/config')

module.exports = {
    name: "skip",
    cooldown: 1000 * 2,

    run: async (client, message, args) => {

        let language = db.get(`language_${message.guild.id}`);
        if (language === "pt-BR") { // PT-BR

            try {

                let channel = message.member.voice.channel;
                let myVoice = message.guild.me.voice.channel;

                if (!channel) {
                    let embed_error_1 = new Discord.MessageEmbed()
                    .setDescription('<:no:930170194494636152> **Você precisa estar em um canal de voz para poder pular uma musíca!**')
                    .setColor("WHITE")
                    return message.reply({ embeds: [embed_error_1] }).catch(() => {
                        message.channel.send('<:no:930170194494636152> **Desculpe, não consigo executar este comando por falta de permissão!**')
                    })
                }
                if (myVoice && channel.id !== myVoice.id) {
                    let embed_error_2 = new Discord.MessageEmbed()
                    .setDescription(`<:no:930170194494636152> **Já estou tocando uma música neste servidor! Em: ${myVoice}**`)
                    .setColor("WHITE")
                    return message.reply({ embeds: [embed_error_2] }).catch(() => {
                        message.channel.send('<:no:930170194494636152> **Desculpe, não consigo executar este comando por falta de permissão!**')
                    })
                }

                const player = client.manager.create({
                    guild: message.guild.id,
                    voiceChannel: message.member.voice.channel.id,
                    textChannel: message.channel.id,
                    selfDeafen: true,
                });

                const title = player.queue.current.title

                player.stop()

                let embed = new Discord.MessageEmbed()
                .setDescription(`<:yes:930170194784043048> **Eu pulei a musíca atual, pedido por: ${message.author}**`)
                .setColor("WHITE")
                return message.reply({ embeds: [embed] }).catch(() => {
                    message.channel.send('<:no:930170194494636152> **Desculpe, não consigo executar este comando por falta de permissão!**')
                })
            } catch (err) {
                let embed = new Discord.MessageEmbed()
                .setDescription(`${config.emoji.no} **Eu não estou tocando nada nesse servidor ou não consegui concluir a ação!**`)
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
                    .setDescription('<:no:930170194494636152> **You need to be on a voice channel to be able to skip any music!**')
                    .setColor("WHITE")
                    return message.reply({ embeds: [embed_error_1] }).catch(() => {
                        message.channel.send('<:no:930170194494636152> **Sorry, I can\'t execute this command due to lack to lack of permission!**')
                    })
                }
                if (myVoice && channel.id !== myVoice.id) {
                    let embed_error_2 = new Discord.MessageEmbed()
                    .setDescription(`<:no:930170194494636152> **I\'m already playing a song on this server! On: ${myVoice}**`)
                    .setColor("WHITE")
                    return message.reply({ embeds: [embed_error_2] }).catch(() => {
                        message.channel.send('<:no:930170194494636152> **Sorry, I can\'t execute this command due to lack to lack of permission!**')
                    })
                }

                const player = client.manager.create({
                    guild: message.guild.id,
                    voiceChannel: message.member.voice.channel.id,
                    textChannel: message.channel.id,
                    selfDeafen: true,
                });

                const title = player.queue.current.title

                player.stop()

                let embed = new Discord.MessageEmbed()
                .setDescription(`<:yes:930170194784043048> **I skipped the current song, requested by ${message.author}**`)
                .setColor("WHITE")
                return message.reply({ embeds: [embed] }).catch(() => {
                    message.channel.send('<:no:930170194494636152> **Sorry, I can\'t execute this command due to lack to lack of permission!**')
                })
            } catch (err) {
                let embed = new Discord.MessageEmbed()
                .setDescription(`${config.emoji.no} **I'm not playing anything on this server or I couldn't complete the action**`)
                .setColor("WHITE")
                return message.reply({ embeds: [embed] }).catch(() => {
                    message.channel.send('<:no:930170194494636152> **Sorry, I can\'t execute this command due to lack to lack of permission!**')
                })
            }
        }
    }
}