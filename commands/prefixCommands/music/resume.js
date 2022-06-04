const { MessageEmbed } = require('discord.js')
const Discord = require("discord.js");
const db = require("quick.db")

module.exports = {
    name: "resume",
    cooldown: 1000 * 2,

    run: async (client, message, args) => {

        let prefix = db.get(`prefix_${message.guild.id}`) || "-"

        let language = db.get(`language_${message.guild.id}`);
        if (language === "pt-BR") { // PT-BR
            try {

                let channel = message.member.voice.channel;
                let myVoice = message.guild.me.voice.channel;

                if (!channel) {
                    let embed_error_1 = new Discord.MessageEmbed()
                    .setDescription('<:no:930170194494636152> **Você precisa estar em um canal de voz para poder retomar qualquer música!**')
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

                if (!player.paused) {
                    let embed_error_3 = new Discord.MessageEmbed()
                    .setDescription(`<:no:930170194494636152> **A musíca já foi retomada! Se você quer pausar, use: \`${prefix}pause\` para pausar sua reprodução!**`)
                    .setColor("WHITE")
                    return message.reply({ embeds: [embed_error_3] }).catch(() => {
                        message.channel.send('<:no:930170194494636152> **Desculpe, não consigo executar este comando por falta de permissão!**')
                    })
                }

                player.pause(false)
            
                
                let embed = new Discord.MessageEmbed()
                .setDescription(`<:yes:930170194784043048> **Você retomou sua musíca! Use \`${prefix}pause\` para pausar sua reprodução!**`)
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
                    .setDescription('<:no:930170194494636152> **You need to be on a voice channel to be able to resume any music!**')
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

                if (!player.paused) {
                    let embed_error_3 = new Discord.MessageEmbed()
                    .setDescription('<:no:930170194494636152> **The music has already resumed! If you want to pause use: `-pause` to pause your music**')
                    .setColor("WHITE")
                    return message.reply({ embeds: [embed_error_3] }).catch(() => {
                        message.channel.send('<:no:930170194494636152> **Sorry, I can\'t execute this command due to lack to lack of permission!**')
                    })
                }

                player.pause(false)
            
                
                let embed = new Discord.MessageEmbed()
                .setDescription(`<:yes:930170194784043048> **You just resumed the music! Use \`${prefix}pause\` to pause your playback**`)
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