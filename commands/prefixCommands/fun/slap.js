const Discord = require("discord.js");
const dsrandom = require('random-gif');
const { MessageEmbed, MessageButton, MessageActionRow, MessageCollector } = require('discord.js');
const db = require("quick.db");
const config = require('../../../database/config')

module.exports = {
    name: "slap",
    aliases: ["tapa"],
    cooldown: 1000 * 2,

    run: async (client, message, args) => {

        let prefix = db.get(`prefix_${message.guild.id}`) || "-"

        let user = message.mentions.users.first() || client.users.cache.get(args[0]);

        var list = [
            'https://imgur.com/HYJHoG7.gif',
            'https://imgur.com/9GxTsgl.gif',
            'https://imgur.com/mT4VjD6.gif',
            'https://imgur.com/mT4VjD6.gif',
            'https://imgur.com/w66ZqGR.gif'
        ];
        
        var list1 = [
            'https://imgur.com/oSoudVd.gif',
            'https://imgur.com/T9w8eFV.gif',
            'https://imgur.com/nuDmQu5.gif',
            'https://imgur.com/wlLCjRo.gif',
            'https://imgur.com/sVeYncu.gif'
        ];
        
        var rand = list[Math.floor(Math.random() * list.length)];
        var rand1 = list1[Math.floor(Math.random() * list.length)];

        let language = db.get(`language_${message.guild.id}`);
        if (language === "pt-BR") { // PT-BR

            if (!user) return message.reply(`**${config.emoji.no} Mencione alguém para dar um Tapa!**`);
            if (user.id == message.author.id) return message.reply(`**${config.emoji.no} Você não pode dar um Tapa em você!**`);
            if (user.id == client.id) return message.reply(`**${config.emoji.no} Porque você quer dar um tapa em mim? Descupa...**`);

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
            .setDescription(`**${message.author} deu um mega tapa em ${user}!**`)
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
                            .setDescription(`**${user} Retornou o tapa para ${message.author}**!`)
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
            
            if (!user) return message.reply(`**${config.emoji.no} Mention someone for a Slap!**`);
            if (user.id == message.author.id) return message.reply(`**${config.emoji.no} You can't slap yourself!**`);
            if (user.id == client.id) return message.reply(`**${config.emoji.no} Why do you want to slap me? excuse...**`);

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
            .setDescription(`**${message.author} give a big slap ${user}!**`)
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
                            .setDescription(`**${user} Returned the cover to ${message.author}**!`)
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