const {
    MessageEmbed,
    Message
} = require("discord.js");
const Discord = require('discord.js')
let cpuStat = require("cpu-stat");
let os = require("os");
const db = require("quick.db");
const config = require("../../../database/config");

module.exports = {
    name: "botinfo",
    aliases: ["bi"],
    cooldown: 1000 * 2,
    
    run: async (client, interaction) => {

        let language = db.get(`language_${interaction.guild.id}`);
        if (language === "pt-BR") { // PT-BR
            try {
                let invite = new Discord.MessageButton().setStyle('LINK').setLabel('Me adicione!').setURL('https://discord.com/api/oauth2/authorize?client_id=914899917871394837&permissions=8&scope=bot%20applications.commands')
                const row = new Discord.MessageActionRow().addComponents([invite]);

                let support = new Discord.MessageButton().setStyle('LINK').setLabel('Suporte').setURL('https://discord.gg/5UhUYvW4Ka')
                const row1 = new Discord.MessageActionRow().addComponents([support]);

                let embed = new Discord.MessageEmbed()
                .setAuthor(client.user.username, client.user.displayAvatarURL({dynamic: false}))
                .setDescription(`Oi, eu sou o ${client.user}, um bot super seguro e com muitos usos para o seu servidor e para você! Veja minhas informações abaixo:`)
                .setColor('WHITE')
                .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
                .addFields(
                    {
                        name: '<:mod:918998856228823040> | **__Quem eu sou?:__**',
                        value: `\`${client.user.tag}\``,
                        inline: false
                    },
                    {
                        name: '<:js:919706151979991090> | **__Discord.js:__**',
                        value: `\`${Discord.version}\``,
                        inline: false
                    },
                    {
                        name: '💾 | **__Memória:__**',
                        value: `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB\``,
                        inline: false
                    },
                    {
                        name: '<:node:919705753638539276> | **__Node:__**',
                        value: `\`${process.version}\``
                    },
                    {
                        name: '🏓 | **__Meu ping:__**',
                        value: `\`${client.ws.ping}ms\``,
                        inline: false
                    },
                    {
                        name: '👥 | **__Usuários:__**',
                        value: `\`${client.users.cache.size}\``,
                        inline: false
                    },
                    {
                        name: '🖥 | **__Servidores:__**',
                        value: `\`${client.guilds.cache.size}\``,
                        inline: false
                    },
                    {

                        name: '👑 | **__Criador:__**',

                        value: `\`Roycy (${config.owners.ID1})/(${config.owners.ID2})\``,

                        inline: false

                    },
                )

                interaction.reply({ embeds: [embed], components: [row, row1]}).catch(() => {
                    message.channel.send('<:no:930170194494636152> **Desculpe, mas não tenho permissão para fazer upload de imagens!**')
                })

            } catch (err) {
                console.log('Error detected in botinfo command')
            }
        }
        if (!language || language === "en") { // EN
            try {
                let invite = new Discord.MessageButton().setStyle('LINK').setLabel('Invite Me').setURL('https://discord.com/api/oauth2/authorize?client_id=914899917871394837&permissions=8&scope=bot%20applications.commands')
                const row = new Discord.MessageActionRow().addComponents([invite]);

                let support = new Discord.MessageButton().setStyle('LINK').setLabel('Support').setURL('https://discord.gg/5UhUYvW4Ka')
                const row1 = new Discord.MessageActionRow().addComponents([support]);

                let embed = new Discord.MessageEmbed()
                .setAuthor(client.user.username, client.user.displayAvatarURL({dynamic: false}))
                .setDescription(`Hi, I'm ${client.user}, a super safe bot with many uses for your server and for you! See my information below:`)
                .setColor('WHITE')
                .setThumbnail(client.user.displayAvatarURL({dynamic: true}))
                .addFields(
                    {
                        name: '<:mod:918998856228823040> | **__Who am I?:__**',
                        value: `\`${client.user.tag}\``,
                        inline: false
                    },
                    {
                        name: '<:js:919706151979991090> | **__Discord.js:__**',
                        value: `\`${Discord.version}\``,
                        inline: false
                    },
                    {
                        name: '💾 | **__Memory:__**',
                        value: `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB\``,
                        inline: false
                    },
                    {
                        name: '<:node:919705753638539276> | **__Node:__**',
                        value: `\`${process.version}\``
                    },
                    {
                        name: '🏓 | **__My ping:__**',
                        value: `\`${client.ws.ping}ms\``,
                        inline: false
                    },
                    {
                        name: '👥 | **__Users:__**',
                        value: `\`${client.users.cache.size}\``,
                        inline: false
                    },
                    {
                        name: '🖥 | **__Servers:__**',
                        value: `\`${client.guilds.cache.size}\``,
                        inline: false
                    },
                    {
                        name: '👑 | **__Owner:__**',
                        value: `\`Roycy (${config.owners.ID1})/(${config.owners.ID2})\``,
                        inline: false
                    },
                )

                interaction.reply({ embeds: [embed], components: [row, row1]}).catch(() => {
                    message.channel.send('<:no:930170194494636152> **Sorry, but I\'m not allowed to upload images!**')
                })

            } catch (err) {
                console.log('Error detected in botinfo command')
            }
        }

    }
}