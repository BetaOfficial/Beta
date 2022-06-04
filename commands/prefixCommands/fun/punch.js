const Discord = require("discord.js");
const dsrandom = require('random-gif');
const { MessageEmbed, MessageButton, MessageActionRow, MessageCollector } = require('discord.js');
const db = require("quick.db");
const config = require('../../../database/config')

module.exports = {
    name: "punch",
    aliases: ["soco"],
    cooldown: 1000 * 2,

    run: async (client, message, args) => {

        let prefix = db.get(`prefix_${message.guild.id}`) || "-"

        let user = message.mentions.users.first() || client.users.cache.get(args[0]);

        var list = [
            'https://c.tenor.com/BoYBoopIkBcAAAAC/anime-smash.gif',
            'https://c.tenor.com/xJyw7SRtDRoAAAAC/anime-punch.gif',
            'https://giffiles.alphacoders.com/169/169956.gif',
            'https://media2.giphy.com/media/xUO4t2gkWBxDi/200.gif',
            'https://i.gifer.com/UUO5.gif'
        ];
        
        var list1 = [
            'https://64.media.tumblr.com/9941a405e4f201b55538705464e902b4/530bea8d2fa839d6-4f/s540x810/7cb9f1529ed6ffe5740b343f94020e8610fcb8cd.gif',
            'https://c.tenor.com/44IcPjhMv5oAAAAd/punch-anime.gif',
            'https://i.pinimg.com/originals/a0/f4/cd/a0f4cd2a0e2d9c6a00ee4064c773e9da.gif',
            'https://cutewallpaper.org/25/anime-action-wallpaper-gif/anime-fightpunch-gifs-album-on-imgur.gif',
            'https://media0.giphy.com/media/1mpAmSVQNOzxS/200.gif'
        ];
        
        var rand = list[Math.floor(Math.random() * list.length)];
        var rand1 = list1[Math.floor(Math.random() * list.length)];

        let language = db.get(`language_${message.guild.id}`);
        if (language === "pt-BR") { // PT-BR

            if (!user) return message.reply(`**${config.emoji.no} Mencione alguém para dar um soco!**`);
            if (user.id == message.author.id) return message.reply(`**${config.emoji.no} Você não pode dar um soco em você!**`);
            if (user.id == client.id) return message.reply(`**${config.emoji.no} Porque você quer dar um soco em mim? Descupa...**`);

            const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId("hug")
                .setStyle("SECONDARY")
                .setLabel("Retribuir")
                .setEmoji(`🔁`)
                .setDisabled(false),
                new MessageButton()
                .setCustomId("002")
                .setStyle("SECONDARY")
                .setLabel("Cancelar")
                .setEmoji(`❌`)
                .setDisabled(false)
            )

            let embed_01 = new Discord.MessageEmbed()
            .setTitle(`**😲 Que violência!**`)
            .setDescription(`**${message.author} deu um mega soco em ${user}!**`)
            .setImage(rand)
            .setTimestamp()
            .setColor("WHITE")
            .setThumbnail(message.author.displayAvatarURL({format:"png"}))
            const me = await message.channel.send({embeds: [embed_01], components: [row], fetchReply: true})

            const filter1 = (interaction) => {
                if(interaction.user.id == user) return true; 
                else {
                    interaction.reply({ content: `${config.emoji.no} Apenas ${user} pode apertar o botão!`, ephemeral: true })
                }
            }
    
    
            const collector = message.channel.createMessageComponentCollector({componentType: 'BUTTON', time: 10 * 6000, filter: filter1, max: 1 })

            collector.on('collect', async (m) => {
                if (!user) return;
                if (m.customId === 'hug') {
                    me.edit({
                        embeds: [
                            new Discord.MessageEmbed()
                            .setTitle(`**😲 Rapazz!**`)
                            .setDescription(`**${user} Retornou o soco para ${message.author}**!`)
                            .setColor("WHITE")
                            .setImage(rand1)
                            .setThumbnail(message.author.displayAvatarURL({format:"png"}))
                        ]
                    })
                };
                if (m.customId === '002') {
                    setTimeout(() => me.delete(), 100)
                };
            });
        }
        if (!language || language === "en") { // EN
            
            if (!user) return message.reply(`**${config.emoji.no} Mention someone for a punch!**`);
            if (user.id == message.author.id) return message.reply(`**${config.emoji.no} You can't punch yourself!**`);
            if (user.id == client.id) return message.reply(`**${config.emoji.no} Why do you want to punch me? excuse...**`);

            const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId("hug")
                .setStyle("SECONDARY")
                .setLabel("Give Back")
                .setEmoji(`🔁`)
                .setDisabled(false),
                new MessageButton()
                .setCustomId("002")
                .setStyle("SECONDARY")
                .setLabel("Cancel")
                .setEmoji(`❌`)
                .setDisabled(false)
            )

            let embed_01 = new Discord.MessageEmbed()
            .setTitle(`**😲 What a violence!**`)
            .setDescription(`**${message.author} give a big punch ${user}!**`)
            .setImage(rand)
            .setTimestamp()
            .setColor("WHITE")
            .setThumbnail(message.author.displayAvatarURL({format:"png"}))
            const me = await message.channel.send({embeds: [embed_01], components: [row], fetchReply: true})

            const filter1 = (interaction) => {
                if(interaction.user.id == user) return true; 
                else {
                    interaction.reply({ content: `${config.emoji.no} Only ${user}  you can click the button!`, ephemeral: true })
                }
            }
            const collector = message.channel.createMessageComponentCollector({componentType: 'BUTTON', time: 10 * 6000, filter: filter1, max: 1 })

            collector.on('collect', async (m) => {
                if (!user) return;
                if (m.customId === 'hug') {
                    me.edit({
                        embeds: [
                            new Discord.MessageEmbed()
                            .setTitle(`**😲 Wowww!**`)
                            .setDescription(`**${user} Returned the punch to ${message.author}**!`)
                            .setColor("WHITE")
                            .setImage(rand1)
                            .setThumbnail(message.author.displayAvatarURL({format:"png"}))
                        ]
                    })
                };
                if (m.customId === '002') {
                    setTimeout(() => me.delete(), 100)
                };
            });
        }
        
    }
}