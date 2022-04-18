const db = require("quick.db")
const { MessageEmbed } = require('discord.js')
const Discord = require("discord.js");

module.exports = {
    name: "setleave",
    cooldown: 1000 * 2,

    run: async(client, message, args) => {

        let prefix = db.get(`prefix_${message.guild.id}`) || "-"
        let language = db.get(`language_${message.guild.id}`);
        
        if (language === "pt-BR") { // PT-BR
            if (!message.member.permissions.has("MANAGE_GUILD")) {
                let embed = new Discord.MessageEmbed()
                .setDescription('**<:no:930170194494636152> Você não tem permissão para `Gerenciar o Servidor`**')
                .setColor("WHITE")
                return message.reply({ embeds: [embed] });
            }

            try {

                let beta_leave = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);

                if(!beta_leave) {
                    let embed = new Discord.MessageEmbed()
                    .setDescription(`**<:no:930170194494636152> Para usar esse comando use: \`${prefix}setleave <Marque o Canal>\`**`)
                    .setColor("WHITE")
                    return message.reply({ embeds: [embed] });
                }

                db.set(`beta_leave_${message.guild.id}`, beta_leave.id);

                let beta_leave_channel = db.get(`beta_leave_${beta_leave.id}`, "no");

                let embed = new Discord.MessageEmbed()
                .setDescription('**<:yes:930170194784043048> Canal de saida foi configurado!**')
                .setColor("WHITE")

                message.reply({ embeds: [embed] });

            } catch (err) {
                console.log('Error detected in setleave command')
            }
        }
        if (!language || language === "en") { // EN
            if (!message.member.permissions.has("MANAGE_GUILD")) {
                let embed = new Discord.MessageEmbed()
                .setDescription('**<:no:930170194494636152> You do not have the permission to `Manager Server`**')
                .setColor("WHITE")
                return message.reply({ embeds: [embed] });
            }

            try {

                let beta_leave = message.mentions.channels.first() || message.guild.channels.cache.get(args[0]);

                if(!beta_leave) {
                    let embed = new Discord.MessageEmbed()
                    .setDescription(`**<:no:930170194494636152> To use this command use \`${prefix}setleave <mark channel>\`**`)
                    .setColor("WHITE")
                    return message.reply({ embeds: [embed] });
                }

                db.set(`beta_leave_${message.guild.id}`, beta_leave.id);

                let beta_leave_channel = db.get(`beta_leave_${beta_leave.id}`, "no");

                let embed = new Discord.MessageEmbed()
                .setDescription('**<:yes:930170194784043048> Leave channel has been successfully set!**')
                .setColor("WHITE")

                message.reply({ embeds: [embed] });

            } catch (err) {
                console.log('Error detected in setleave command')
            }
        }
    }
}