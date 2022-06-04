const Discord = require("discord.js");
const db = require("quick.db");
const config = require('../../../database/config')

module.exports = {
    name: "unlock",
    cooldown: 1000 * 2,

    run: async (client, message, args) => {

        let prefix = db.get(`prefix_${message.guild.id}`) || "-"

        let language = db.get(`language_${message.guild.id}`);
        if (language === "pt-BR") { // PT-BR

            if (!message.guild.me.permissions.has('MANAGE_CHANNELS')) {
                let embed = new Discord.MessageEmbed()
                .setDescription('**<:no:930170194494636152> Eu não tenho permissão para `Gerenciar Canais`**')
                .setColor("WHITE")
                return message.reply({ embeds: [embed] });
            }

            if(message.channel.permissionsFor(`${message.guild.id}`).has(`SEND_MESSAGES`)) {
                let embed = new Discord.MessageEmbed()
                .setDescription(`**${config.emoji.no} Esse canal já está desbloqueado! Use \`${prefix}lock\`**`)
                .setColor("WHITE")
                return message.reply({ embeds: [embed] });
            }

            try {

                if (!message.member.permissions.has("MANAGE_CHANNELS")) {
                    let embed = new Discord.MessageEmbed()
                    .setDescription('**<:no:930170194494636152> Você não tem permissão para `Gerenciar Canais`**')
                    .setColor("WHITE")
                    return message.reply({ embeds: [embed] });
                }
                
                message.channel.permissionOverwrites.edit(message.guild.id, {
                    SEND_MESSAGES: true,
                    ADD_REACTIONS: true
                });
    
                let sucess = new Discord.MessageEmbed()
                .setTitle(`✅ | Canal desbloqueado com sucesso!`)
                .setColor("WHITE")
                .setDescription(`🎉 | **${message.author} desbloqueou esse canal!**`)
    
                message.channel.send({embeds: [sucess]})
    
            } catch (err) {
                console.log('Error detected in unlock command')
            }
        }
        if (!language || language === "en") { // EN

            if (!message.guild.me.permissions.has('MANAGE_CHANNELS')) {
                let embed = new Discord.MessageEmbed()
                .setDescription('**<:no:930170194494636152> I don\'t have permission to `Manage Channels`**')
                .setColor("WHITE")
                return message.reply({ embeds: [embed] });
            }

            if(message.channel.permissionsFor(`${message.guild.id}`).has(`SEND_MESSAGES`)) {
                let embed = new Discord.MessageEmbed()
                .setDescription(`**${config.emoji.no} This channel is already unlocked! Use \`${prefix}lock\`**`)
                .setColor("WHITE")
                return message.reply({ embeds: [embed] });
            }

            try {

                if (!message.member.permissions.has("MANAGE_CHANNELS")) {
                    let embed = new Discord.MessageEmbed()
                    .setDescription('**<:no:930170194494636152> You do not have the permission to `Manage Channels`**')
                    .setColor("WHITE")
                    return message.reply({ embeds: [embed] });
                }
                
                message.channel.permissionOverwrites.edit(message.guild.id, {
                    SEND_MESSAGES: true,
                    ADD_REACTIONS: true
                });
    
                let sucess = new Discord.MessageEmbed()
                .setTitle(`✅ | Channel unblocked successfully!`)
                .setColor("WHITE")
                .setDescription(`🎉 | **${message.author} unblocked this channel!**`)
    
                message.channel.send({embeds: [sucess]})
    
            } catch (err) {
                console.log('Error detected in unlock command')
            }
        }
        
    }
}