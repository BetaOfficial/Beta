const { MessageEmbed } = require('discord.js')
const Discord = require("discord.js")
const db = require("quick.db");

module.exports = {
    name: "mute",
    cooldown: 1000 * 2,

    run: async(client, message, args) => {

        let prefix = db.get(`prefix_${message.guild.id}`) || "-"

        let language = db.get(`language_${message.guild.id}`);
        if (language === "pt-BR") { // PT-BR
            try {

                if (!message.guild.me.permissions.has('MANAGE_GUILD')) {
                    let embed = new Discord.MessageEmbed()
                    .setDescription('**<:no:930170194494636152> EU não tenho permissão para `Gerenciar o Servidor`**')
                    .setColor("WHITE")
                    return message.reply({ embeds: [embed] });
                }    

                if (!message.member.permissions.has("MANAGE_GUILD")) {
                    let embed = new Discord.MessageEmbed()
                    .setDescription('**<:no:930170194494636152> Você não tem permissão para `Gerenciar o Servidor`**')
                    .setColor("WHITE")
                    return message.reply({ embeds: [embed] });
                }

                let servidor = message.guild.id;

                let cargo_mute = db.get(`cargo_mute_${message.guild.id}`);
                let cargo_mute_no_servidor = client.guilds.cache.get(servidor).roles.cache.get(cargo_mute);

                if (!cargo_mute_no_servidor || !cargo_mute || cargo_mute === null || cargo_mute === false) return message.reply(`**${message.author} O cargo de mute não foi setado aqui nesse servidor!**`);

                let membro = message.mentions.users.first() || client.guilds.cache.get(servidor).members.cache.get(args[0]);

                let embed_1 = new Discord.MessageEmbed()
                .setColor("WHITE")
                .setDescription(`${prefix}mute [\`usuário\`]`);

                if (!membro) return message.reply({ content: `${message.author}`, embeds: [embed_1] });

                let embed_2 = new Discord.MessageEmbed()
                .setColor("WHITE")
                .setDescription(`**O usuário ${membro} foi mutado!**`);

                message.reply({ content: `${message.author}`, embeds: [embed_2] }).then(msg => {

                    client.guilds.cache.get(servidor).members.cache.get(membro.id).roles.add(cargo_mute_no_servidor.id).catch(err => {

                        msg.edit({ content: `**Oops! Algo deu errado**`, embeds: [] });

                    })

                })

            } catch (err) {
                console.log('Error detected in mute command')
            }
        }
        if (!language || language === "en") { // EN

            if (!message.guild.me.permissions.has('MANAGE_GUILD')) {
                let embed = new Discord.MessageEmbed()
                .setDescription('**<:no:930170194494636152> I don\'t have permission to `Manage Server`**')
                .setColor("WHITE")
                return message.reply({ embeds: [embed] });
            }

            try {

                if (!message.member.permissions.has("MANAGE_GUILD")) {
                    let embed = new Discord.MessageEmbed()
                    .setDescription('**<:no:930170194494636152> You do not have the permission to `Manager Server`**')
                    .setColor("WHITE")
                    return message.reply({ embeds: [embed] });
                }

                let servidor = message.guild.id;

                let cargo_mute = db.get(`cargo_mute_${message.guild.id}`);
                let cargo_mute_no_servidor = client.guilds.cache.get(servidor).roles.cache.get(cargo_mute);

                if (!cargo_mute_no_servidor || !cargo_mute || cargo_mute === null || cargo_mute === false) return message.reply(`**${message.author} The mute role is not configured on the server.**`);

                let membro = message.mentions.users.first() || client.guilds.cache.get(servidor).members.cache.get(args[0]);

                let embed_1 = new Discord.MessageEmbed()
                .setColor("WHITE")
                .setDescription(`${prefix}mute [\`user\`]`);

                if (!membro) return message.reply({ content: `${message.author}`, embeds: [embed_1] });

                let embed_2 = new Discord.MessageEmbed()
                .setColor("WHITE")
                .setDescription(`**The user ${membro} has been successfully mutated.**`);

                message.reply({ content: `${message.author}`, embeds: [embed_2] }).then(msg => {

                    client.guilds.cache.get(servidor).members.cache.get(membro.id).roles.add(cargo_mute_no_servidor.id).catch(err => {

                        msg.edit({ content: `**Oops! Something went wrong.**`, embeds: [] });

                    })

                })

            } catch (err) {
                console.log('Error detected in mute command')
            }
        }
    }
}