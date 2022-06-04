const { MessageEmbed } = require('discord.js')
const Discord = require("discord.js")
const db = require("quick.db")
const config = require('../../../database/config')
const { convertTime } = require("../../../structures/convert.js")

module.exports = {
    name: "play",
    aliases: ["p", "tocar", "join"],
    cooldown: 1000 * 2,

    run: async (client, message, args) => {

        let language = db.get(`language_${message.guild.id}`);

        let loading_embed = new Discord.MessageEmbed()
        .setDescription(config.emoji.load)
        .setColor("WHITE")
        const msg = await message.reply({ embeds: [loading_embed] });

        if (language === "pt-BR") { // PT-BR
            try {

                let channel = message.member.voice.channel;
                let myVoice = message.guild.me.voice.channel;

                if (!channel) {
                    let embed_error_1 = new Discord.MessageEmbed()
                    .setDescription('<:no:930170194494636152> **Você precisa estar em um canal de voz para poder tocar qualquer música!**')
                    .setColor("WHITE")
                    return msg.edit({ embeds: [embed_error_1] }).catch(() => {
                        msg.edit('<:no:930170194494636152> **Desculpe, não consigo executar este comando por falta de permissão!**')
                    })
                }
                if (myVoice && channel.id !== myVoice.id) {
                    let embed_error_2 = new Discord.MessageEmbed()
                    .setDescription(`<:no:930170194494636152> **Já estou tocando uma música neste servidor! Em: ${myVoice}**`)
                    .setColor("WHITE")
                    return msg.edit({ embeds: [embed_error_2] }).catch(() => {
                        msg.edit('<:no:930170194494636152> **Desculpe, não consigo executar este comando por falta de permissão!**')
                    })
                }
                
                if(!args[0]) {
                    let embed_error_3 = new Discord.MessageEmbed()
                    .setDescription('<:no:930170194494636152> **Você não me disse o que jogar! Digite um nome de música ou link para ele!**')
                    .setColor("WHITE")
                    return msg.edit({ embeds: [embed_error_3] }).catch(() => {
                        msg.edit('<:no:930170194494636152> **Desculpe, não consigo executar este comando por falta de permissão!**')
                    })
                }
            
                const res = await client.manager.search(
                    args.join(' '),
                    message.author
                );

                const search = args.join(' ')

                const player = client.manager.create({
                    guild: message.guild.id,
                    voiceChannel: message.member.voice.channel.id,
                    textChannel: message.channel.id,
                    selfDeafen: true,
                });

                if(res.loadType != "NO_MATCHES") {
                    if(res.loadType == "TRACK_LOADED") {
                        player.queue.add(res.tracks)
                        const embed = new MessageEmbed() //**Queued • [${res.playlist.name}](${search})** \`${convertTime(res.playlist.duration)}\` (${res.tracks.length} tracks) • ${res.tracks[0].requester}
                        .setDescription(`${config.emoji.load} **Eu adicionei a musíca: [${res.tracks[0].title}](${res.tracks[0].uri}) \`(${convertTime(res.tracks[0].duration, true)})\`, Pedido por: ${message.author}**`)
                        .setColor("WHITE")
                        msg.edit({ embeds: [embed] });
                        if(!player.playing) player.play();
                    }
                    else if(res.loadType == "PLAYLIST_LOADED") {
                        player.queue.add(res.tracks)
                        const embed = new MessageEmbed() //**Queued • [${res.playlist.name}](${search})** \`${convertTime(res.playlist.duration)}\` (${res.tracks.length} tracks) • ${res.tracks[0].requester}
                        .setDescription(`${config.emoji.load} **Eu adicionei a playlist: [${res.playlist.name}](${search}) \`(${convertTime(res.playlist.duration)})\`, Pedido por: ${message.author}**`)
                        .setColor("WHITE")
                        msg.edit({ embeds: [embed] });
                        if(!player.playing) player.play();
                    }
                    else if(res.loadType == "SEARCH_RESULT") {
                        player.queue.add(res.tracks[0])
                        const embed = new MessageEmbed() //**Queued • [${res.playlist.name}](${search})** \`${convertTime(res.playlist.duration)}\` (${res.tracks.length} tracks) • ${res.tracks[0].requester}
                        .setDescription(`${config.emoji.load} **Eu adicionei a musíca: [${res.tracks[0].title}](${res.tracks[0].uri}) \`(${convertTime(res.tracks[0].duration, true)})\`, Pedido por: ${message.author}**`)
                        .setColor("WHITE")
                        msg.edit({ embeds: [embed] });
                        if(!player.playing) player.play();
                    }
                }

                player.connect();

                if (!player.playing && !player.paused && !player.queue.size)

                if (
                    !player.playing &&
                    !player.paused &&
                    player.queue.totalSize === res.tracks.length
                )
                player.play();
                player.setVolume(50);

            } catch (err) {
                let embed = new Discord.MessageEmbed()
                .setDescription(`${config.emoji.no} **Não consegui tocar a musíca ou não consegui entrar na call!**`)
                .setColor("WHITE")
                message.reply({ embeds: [embed] });
            }
        }
        if (!language || language === "en") { // EN
            try {

                let channel = message.member.voice.channel;
                let myVoice = message.guild.me.voice.channel;

                if (!channel) {
                    let embed_error_1 = new Discord.MessageEmbed()
                    .setDescription('<:no:930170194494636152> **You need to be on a voice channel to be able to play any song!**')
                    .setColor("WHITE")
                    return msg.edit({ embeds: [embed_error_1] }).catch(() => {
                        msg.edit('<:no:930170194494636152> **Sorry, I can\'t execute this command due to lack of permission!**')
                    })
                }
                if (myVoice && channel.id !== myVoice.id) {
                    let embed_error_2 = new Discord.MessageEmbed()
                    .setDescription(`<:no:930170194494636152> **I'm already playing a song on this server! In: ${myVoice}**`)
                    .setColor("WHITE")
                    return msg.edit({ embeds: [embed_error_2] }).catch(() => {
                        msg.edit('<:no:930170194494636152> **Sorry, I can\'t execute this command due to lack of permission!**')
                    })
                }
                
                if(!args[0]) {
                    let embed_error_3 = new Discord.MessageEmbed()
                    .setDescription('<:no:930170194494636152> **You didn\'t tell me what to play! Enter a song name or link to it!**')
                    .setColor("WHITE")
                    return msg.edit({ embeds: [embed_error_3] }).catch(() => {
                        msg.edit('<:no:930170194494636152> **Sorry, I can\'t execute this command due to lack of permission!**')
                    })
                }
            
                const res = await client.manager.search(
                    args.join(' '),
                    message.author
                );

                const search = args.join(' ')

                const player = client.manager.create({
                    guild: message.guild.id,
                    voiceChannel: message.member.voice.channel.id,
                    textChannel: message.channel.id,
                    selfDeafen: true,
                });

                if(res.loadType != "NO_MATCHES") {
                    if(res.loadType == "TRACK_LOADED") {
                        player.queue.add(res.tracks)
                        const embed = new MessageEmbed() //**Queued • [${res.playlist.name}](${search})** \`${convertTime(res.playlist.duration)}\` (${res.tracks.length} tracks) • ${res.tracks[0].requester}
                        .setDescription(`${config.emoji.load} **I added the music: [${res.tracks[0].title}](${res.tracks[0].uri}) \`(${convertTime(res.tracks[0].duration, true)})\`, Requested by: ${message.author}**`)
                        .setColor("WHITE")
                        msg.edit({ embeds: [embed] });
                        if(!player.playing) player.play();
                    }
                    else if(res.loadType == "PLAYLIST_LOADED") {
                        player.queue.add(res.tracks)
                        const embed = new MessageEmbed() //**Queued • [${res.playlist.name}](${search})** \`${convertTime(res.playlist.duration)}\` (${res.tracks.length} tracks) • ${res.tracks[0].requester}
                        .setDescription(`${config.emoji.load} **I added the playlist: [${res.playlist.name}](${search}) \`(${convertTime(res.playlist.duration)})\`, Requested by: ${message.author}**`)
                        .setColor("WHITE")
                        msg.edit({ embeds: [embed] });
                        if(!player.playing) player.play();
                    }
                    else if(res.loadType == "SEARCH_RESULT") {
                        player.queue.add(res.tracks[0])
                        const embed = new MessageEmbed() //**Queued • [${res.playlist.name}](${search})** \`${convertTime(res.playlist.duration)}\` (${res.tracks.length} tracks) • ${res.tracks[0].requester}
                        .setDescription(`${config.emoji.load} **I added the music: [${res.tracks[0].title}](${res.tracks[0].uri}) \`(${convertTime(res.tracks[0].duration, true)})\`, Requested by: ${message.author}**`)
                        .setColor("WHITE")
                        msg.edit({ embeds: [embed] });
                        if(!player.playing) player.play();
                    }
                }

                player.connect();

                if (!player.playing && !player.paused && !player.queue.size)

                if (
                    !player.playing &&
                    !player.paused &&
                    player.queue.totalSize === res.tracks.length
                )
                player.play();
                player.setVolume(50);

            } catch (err) {
                let embed = new Discord.MessageEmbed()
                .setDescription(`${config.emoji.no} **I can't play the music or I couldn't get into the call!**`)
                .setColor("WHITE")
                message.reply({ embeds: [embed] });
            }
        }
    }
}