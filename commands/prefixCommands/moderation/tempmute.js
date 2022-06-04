const Discord = require("discord.js");
const db = require("quick.db");
const config = require('../../../database/config')

module.exports = {
    name: "tempmute",
    cooldown: 1000 * 2,

    run: async (client, message, args) => {

        let prefix = db.get(`prefix_${message.guild.id}`) || "-"

        let language = db.get(`language_${message.guild.id}`);
        if (language === "pt-BR") { // PT-BR

            if (!message.guild.me.permissions.has('MANAGE_GUILD')) {
                let embed = new Discord.MessageEmbed()
                .setDescription('**<:no:930170194494636152> EU não tenho permissão para `Gerenciar o Servidor`**')
                .setColor("WHITE")
                return message.reply({ embeds: [embed] });
            } 

            try {

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
                let tempo = args[1];
        
                let embed_1 = new Discord.MessageEmbed()
                .setColor("WHITE")
                .setDescription(`${prefix}tempmute [\`usuário\`] [\`minutos\`]`);
        
                if (!membro || !tempo || isNaN(tempo) || tempo === "0") return message.reply({ content: `${message.author}`, embeds: [embed_1] });
        
                let tempo_ms = ms(`${tempo} minutes`);
        
                let embed_2 = new Discord.MessageEmbed()
                .setColor("WHITE")
                .setDescription(`**O usuário ${membro} foi mutado com sucesso por \`${tempo} minutos!\`.**`);
        
                let embed_unmute = new Discord.MessageEmbed()
                .setColor("WHITE")
                .setDescription(`**O usuário ${membro} foi desmutado!**`);
        
                message.reply({ content: `${message.author}`, embeds: [embed_2] }).then(msg => {
        
        
                    client.guilds.cache.get(servidor).members.cache.get(membro.id).roles.add(cargo_mute_no_servidor.id).catch(err => {
        
                        msg.edit({ content: `**Oops! Algo deu errado!**`, embeds: [] });
        
                    });
                        
        
                    setTimeout( () => {
        
                        let m = message.channel.send({ content: `${message.author}`, embeds: [embed_unmute] });
        
                        client.guilds.cache.get(servidor).members.cache.get(membro.id).roles.remove(cargo_mute_no_servidor.id).catch(err => {
        
                        m.edit({ content: `**Oops! Algo deu errado!**`, embeds: [] });
            
                        })
                        
        
                    }, tempo_ms);
                });
            } catch (err) {
                console.log('Error detected in tempmute command')
            }
        }
        if (!language || language === "en") { // EN

            if (!message.guild.me.permissions.has("MANAGE_GUILD")) {
                let embed = new Discord.MessageEmbed()
                .setDescription('**<:no:930170194494636152> You do not have the permission to `Manager Server`**')
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
                let tempo = args[1];
        
                let embed_1 = new Discord.MessageEmbed()
                .setColor("WHITE")
                .setDescription(`${prefix}tempmute [\`user\`] [\`minutes\`]`);
        
                if (!membro || !tempo || isNaN(tempo) || tempo === "0") return message.reply({ content: `${message.author}`, embeds: [embed_1] });
        
                let tempo_ms = ms(`${tempo} minutes`);
        
                let embed_2 = new Discord.MessageEmbed()
                .setColor("WHITE")
                .setDescription(`**The user ${membro} has been successfully mutated during \`${tempo} minutes!\`.**`);
        
                let embed_unmute = new Discord.MessageEmbed()
                .setColor("WHITE")
                .setDescription(`**The user ${membro} was unmuted.**`);
        
                message.reply({ content: `${message.author}`, embeds: [embed_2] }).then(msg => {
        
        
                    client.guilds.cache.get(servidor).members.cache.get(membro.id).roles.add(cargo_mute_no_servidor.id).catch(err => {
        
                        msg.edit({ content: `**Oops! Something went wrong.**`, embeds: [] });
        
                    });
                        
        
                    setTimeout( () => {
        
                        let m = message.channel.send({ content: `${message.author}`, embeds: [embed_unmute] });
        
                        client.guilds.cache.get(servidor).members.cache.get(membro.id).roles.remove(cargo_mute_no_servidor.id).catch(err => {
        
                        m.edit({ content: `**Oops! Something went wrong.**`, embeds: [] });
            
                        })
                        
        
                    }, tempo_ms);
                });
            } catch (err) {
                console.log('Error detected in tempmute command')
            }
        }
        
    }
}