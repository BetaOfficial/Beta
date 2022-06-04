const Discord = require("discord.js");
const { MessageEmbed, MessageButton, MessageActionRow, MessageCollector } = require('discord.js');
const db = require("quick.db");
const config = require('../../../database/config')

module.exports = {
    name: "hug",
    aliases: ["abraço", "abraço"],
    cooldown: 1000 * 2,

    run: async (client, message, args) => {

        let prefix = db.get(`prefix_${message.guild.id}`) || "-"

        let user = message.mentions.users.first() || client.users.cache.get(args[0]);

        var list = [
            'http://25.media.tumblr.com/tumblr_ma7l17EWnk1rq65rlo1_500.gif',
            'http://static.tumblr.com/8z6qtpu/tT5lq3v85/8022_-_animated_gif_puella_magi_madoka_magica_tagme.gif',
            'https://i.gifer.com/X6m5.gif',
            'https://animesher.com/orig/1/149/1493/14938/animesher.com_hug-menma-anohana-1493839.gif',
            'https://c.tenor.com/WBeVZm5cPN8AAAAC/hug-anime.gif'
        ];
        
        var list1 = [
            'https://c.tenor.com/4n3T2I239q8AAAAC/anime-cute.gif',
            'http://media.tumblr.com/tumblr_lqs0rikYtY1qb8bw4.gif',
            'https://c.tenor.com/wwg8merR-X8AAAAC/anime-run.gif',
            'https://c.tenor.com/ztEJgrjFe54AAAAC/hug-anime.gif',
            'https://media3.giphy.com/media/sUIZWMnfd4Mb6/giphy.gif'
        ];
        
        var rand = list[Math.floor(Math.random() * list.length)];
        var rand1 = list1[Math.floor(Math.random() * list.length)];

        let language = db.get(`language_${message.guild.id}`);
        if (language === "pt-BR") { // PT-BR

            if (!user) return message.reply(`**${config.emoji.no} Mencione alguém para dar um abraço!**`);
            if (user.id == message.author.id) return message.reply(`**${config.emoji.no} Ownn, Infelizmente você não pode abraçar a sí mesmo, mais fique com isso: 🐹!**`);
            if (user.id == client.id) return message.reply(`**${config.emoji.no} Ownnn, Obrigado pelo abraço 🤗! Mais não pude representar isso com um gif...**`);

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
            .setTitle(`**🤗 Que fofinhooo**`)
            .setDescription(`**${message.author} deu um abraço quentinho em ${user}!**`)
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
                            .setTitle(`**🤗 2x Ownnnn**`)
                            .setDescription(`**${user} retribuiu um abraço hiper quentinho para ${message.author}**!`)
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
            
            if (!user) return message.reply(`**${config.emoji.no} Mention someone for a hug!**`);
            if (user.id == message.author.id) return message.reply(`**${config.emoji.no} Ownn, Unfortunately you can't hug yourself, but keep this: 🐹!**`);
            if (user.id == client.id) return message.reply(`**${config.emoji.no} Ownnn, Thanks for the hug 🤗! But I couldn't represent this with a gif...**`);

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
            .setTitle(`**🤗 How cutee**`)
            .setDescription(`**${message.author} gave me a warm hug ${user}!**`)
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
                            .setTitle(`**🤗 2x Ownnnn!**`)
                            .setDescription(`**${user} returned a super warm hug to ${message.author}**!`)
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