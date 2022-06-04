const { MessageEmbed } = require('discord.js');
const Discord = require("discord.js");
const db = require ("quick.db");

module.exports = {
  name: "loop",
  aliases: ["lp"],
  cooldown: 1000 * 2,

  run: async (client, message, args) => {

    let prefix = db.get(`prefix_${message.guild.id}`) || "-"

    let channel = message.member.voice.channel;
    let myVoice = message.guild.me.voice.channel;

    let language = db.get(`language_${message.guild.id}`);
    if (language === "pt-BR") { // PT-BR
      if (!channel) {
        let embed_error_1 = new Discord.MessageEmbed()
        .setDescription('<:no:930170194494636152> **Você precisa estar em um canal de voz para poder fazer um loop em qualquer fila e faixa!**')
        .setColor("WHITE")
        return message.reply({ embeds: [embed_error_1] }).catch(() => {
            message.channel.send('<:no:930170194494636152> **Desculpe, não consigo executar este comando por falta de permissão!**')
        })
      }

      const player = client.manager.create({
        guild: message.guild.id,
        voiceChannel: message.member.voice.channel.id,
        textChannel: message.channel.id
      });

      
      if (!player) {
        let embed_error_music = new Discord.MessageEmbed()
        .setDescription(`**<:no:930170194494636152> Para você usar este comando eu preciso estar rocando alguma coisa!**`)
        .setColor("WHITE")
        return message.reply({ embeds: [embed_error_music] })
      }
      
      if (channel.id !== player.voiceChannel) {
        let embed_error_music_2 = new Discord.MessageEmbed()
        .setDescription(`**<:no:930170194494636152> Precisamos estar no mesmo canal!**`)
        .setColor("WHITE")
        return message.reply({ embeds: [embed_error_music_2] })
      }
      
      if (args.length && /queue/i.test(args[0])) {
        player.setQueueRepeat(!player.queueRepeat);
        const queueRepeat = player.queueRepeat ? "Habilitado" : "Desabilitado";
        const e = new MessageEmbed()
        .setDescription(`**<:yes:930170194784043048> \`${queueRepeat}\` repetindo a fila!**`)
        .setColor('WHITE')
        return message.reply({ embeds: [e] });
      }

      player.setTrackRepeat(!player.trackRepeat);
      const trackRepeat = player.trackRepeat ? "Habilitado" : "Desabilitado";
      const e1 = new MessageEmbed()
      .setDescription(`**<:yes:930170194784043048> \`${trackRepeat}\` repetindo a faixa!**`)
      .setColor('WHITE')
      return message.reply({ embeds: [e1] });
    }
    if (!language || language === "en") { // EN
      if (!channel) {
        let embed_error_1 = new Discord.MessageEmbed()
        .setDescription('<:no:930170194494636152> **You need to be on a voice channel to be able to loop any queue and track!**')
        .setColor("WHITE")
        return message.reply({ embeds: [embed_error_1] }).catch(() => {
            message.channel.send('<:no:930170194494636152> **Sorry, I can\'t execute this command due to lack to lack of permission!**')
        })
      }

      const player = client.manager.create({
        guild: message.guild.id,
        voiceChannel: message.member.voice.channel.id,
        textChannel: message.channel.id
      });

      
      if (!player) {
        let embed_error_music = new Discord.MessageEmbed()
        .setDescription(`**<:no:930170194494636152> For you to use this command I need to be castling something!**`)
        .setColor("WHITE")
        return message.reply({ embeds: [embed_error_music] })
      }
      
      if (channel.id !== player.voiceChannel) {
        let embed_error_music_2 = new Discord.MessageEmbed()
        .setDescription(`**<:no:930170194494636152> We need to be on the same channel!**`)
        .setColor("WHITE")
        return message.reply({ embeds: [embed_error_music_2] })
      }
      
      if (args.length && /queue/i.test(args[0])) {
        player.setQueueRepeat(!player.queueRepeat);
        const queueRepeat = player.queueRepeat ? "Enabled" : "Disabled";
        const e = new MessageEmbed()
        .setDescription(`**<:yes:930170194784043048> \`${queueRepeat}\` queue repeat!**`)
        .setColor('WHITE')
        return message.reply({ embeds: [e] });
      }

      player.setTrackRepeat(!player.trackRepeat);
      const trackRepeat = player.trackRepeat ? "Enabled" : "Disabled";
      const e1 = new MessageEmbed()
      .setDescription(`**<:yes:930170194784043048> \`${trackRepeat}\` track repeat!**`)
      .setColor('WHITE')
      return message.reply({ embeds: [e1] });
    }
  }
}