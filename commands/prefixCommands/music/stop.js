const { MessageEmbed } = require('discord.js')
const Discord = require("discord.js");
const db = require("quick.db");
const config = require('../../../database/config')

module.exports = {
    name: "stop",
    aliases: ["parar", "leave", "sair"],
    cooldown: 1000 * 2,

    run: async (client, message, args) => {

        let channel = message.member.voice.channel;
        let myVoice = message.guild.me.voice.channel;

        let language = db.get(`language_${message.guild.id}`);
        
        if (language === "pt-BR") { // PT-BR
            try {
                if (!channel) {
                    let embed_error_1 = new Discord.MessageEmbed()
                    .setDescription('<:no:930170194494636152> **Você precisa estar em um canal de voz para poder tocar qualquer música!**')
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

                if (
                    !player.playing &&
                    !player.paused &&
                    player.queue.totalSize === res.tracks.length
                )
                
                player.disconnect();
                player.stop();
                player.destroy();
                
                let embed = new Discord.MessageEmbed()
                .setDescription(`<:yes:930170194784043048> **A música acabou e eu saí do canal de voz! Pedido por: ${message.author}**`)
                .setColor("WHITE")
                return message.reply({ embeds: [embed] }).catch(() => {
                    message.channel.send('<:no:930170194494636152> **Desculpe, não consigo executar este comando por falta de permissão!**')
                })
            } catch {
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

                if (
                    !player.playing &&
                    !player.paused &&
                    player.queue.totalSize === res.tracks.length
                )
                
                player.disconnect();
                player.stop();
                player.destroy();
                player.reset()
                
                let embed = new Discord.MessageEmbed()
                .setDescription(`<:yes:930170194784043048> **Okay, I stopped the music and left the channel! Requested by: ${message.author}**`)
                .setColor("WHITE")
                return message.reply({ embeds: [embed] }).catch(() => {
                    message.channel.send('<:no:930170194494636152> **Sorry, I can\'t execute this command due to lack to lack of permission!**')
                })
            } catch {
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