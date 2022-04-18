const { MessageEmbed } = require('discord.js')
const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "play",
    aliases: ["p"],
    cooldown: 1000 * 2,

    run: async (client, message, args) => {

        let language = db.get(`language_${message.guild.id}`);
        if (language === "pt-BR") { // PT-BR
            try {

                let channel = message.member.voice.channel;
                let myVoice = message.guild.me.voice.channel;

                if (!channel) {
                    let embed_error_1 = new Discord.MessageEmbed()
                    .setDescription('<:no:930170194494636152> **Você precisa estar em um canal de voz para poder tocar qualquer música!**')
                    .setColor("WHITE")
                    return message.reply({ embeds: [embed_error_1] }).catch(() => {
                        message.channel.send('<:no:930170194494636152> **Desculpe, não consigo executar este comando por falta de permissão!**')
                    })
                }
                
                if(!args[0]) {
                    let embed_error_3 = new Discord.MessageEmbed()
                    .setDescription('<:no:930170194494636152> **Você não me disse o que jogar! Digite um nome de música ou link para ele!**')
                    .setColor("WHITE")
                    return message.reply({ embeds: [embed_error_3] }).catch(() => {
                        message.channel.send('<:no:930170194494636152> **Desculpe, não consigo executar este comando por falta de permissão!**')
                    })
                }
                
            
            
                const res = await client.manager.search(
                    args.join(' '),
                    message.author
                );

                const player = client.manager.create({
                    guild: message.guild.id,
                    voiceChannel: message.member.voice.channel.id,
                    textChannel: message.channel.id,
                });

                player.connect()
                    

                player.queue.add(res.tracks[0]);

                if (!player.playing && !player.paused && !player.queue.size)
                player.play();

                if (
                    !player.playing &&
                    !player.paused &&
                    player.queue.totalSize === res.tracks.length
                )
                player.play();
                player.setVolume(50);
                
                let embed = new Discord.MessageEmbed()
                .setDescription(`<:yes:930170194784043048> **Eu adicionei a musíca: [${res.tracks[0].title}](${res.tracks[0].uri}), Pedido por: ${message.author}**`)
                .setColor("WHITE")
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
                    .setDescription('<:no:930170194494636152> **You need to be on a voice channel to be able to play any music!**')
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
                if(!args[0]) {
                    let embed_error_3 = new Discord.MessageEmbed()
                    .setDescription('<:no:930170194494636152> **You didn\'t tell me what to play! Type a song name or link to it!**')
                    .setColor("WHITE")
                    return message.reply({ embeds: [embed_error_3] }).catch(() => {
                        message.channel.send('<:no:930170194494636152> **Sorry, I can\'t execute this command due to lack to lack of permission!**')
                    })
                }
                
            
            
                const res = await client.manager.search(
                    args.join(' '),
                    message.author
                );

                const player = client.manager.create({
                    guild: message.guild.id,
                    voiceChannel: message.member.voice.channel.id,
                    textChannel: message.channel.id
                });

                player.connect();

                player.queue.add(res.tracks[0]);

                if (!player.playing && !player.paused && !player.queue.size)
                player.play();

                if (
                    !player.playing &&
                    !player.paused &&
                    player.queue.totalSize === res.tracks.length
                )
                player.play();
                player.setVolume(50);
                
                let embed = new Discord.MessageEmbed()
                .setDescription(`<:yes:930170194784043048> **I just added the song: [${res.tracks[0].title}](${res.tracks[0].uri}), Request by: ${message.author}**`)
                .setColor("WHITE")
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