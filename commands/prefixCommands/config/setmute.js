const { MessageEmbed } = require('discord.js')
const Discord = require("discord.js")
const db = require("quick.db");

module.exports = {
    name: "setmute",
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

                let servidor = message.guild.id;
                let cargo_mute = message.mentions.roles.first() || client.guilds.cache.get(servidor).roles.cache.get(args[0]);

                let embed_1 = new Discord.MessageEmbed()
                .setColor("WHITE")
                .setDescription(`**<:no:930170194494636152> Para usar esse comando use: \`${prefix}setmute <Marque o cargo>\`**`);

                if (!cargo_mute) return message.reply({embeds: [embed_1] });

                let embed_2 = new Discord.MessageEmbed()
                .setColor("WHITE")
                .setDescription(`**<:yes:930170194784043048> O cargo ${cargo_mute} foi configurado!**`);

                db.set(`cargo_mute_${message.guild.id}`, cargo_mute.id);

                message.reply({embeds: [embed_2] });

            } catch (err) {
                console.log('Error detected in setmute command')
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

                let servidor = message.guild.id;
                let cargo_mute = message.mentions.roles.first() || client.guilds.cache.get(servidor).roles.cache.get(args[0]);

                let embed_1 = new Discord.MessageEmbed()
                .setColor("WHITE")
                .setDescription(`**<:no:930170194494636152> To use this command use \`${prefix}setmute <mark role>\`**`);

                if (!cargo_mute) return message.reply({embeds: [embed_1] });

                let embed_2 = new Discord.MessageEmbed()
                .setColor("WHITE")
                .setDescription(`**<:yes:930170194784043048> The role ${cargo_mute} has been successfully configured!**`);

                db.set(`cargo_mute_${message.guild.id}`, cargo_mute.id);

                message.reply({embeds: [embed_2] });

            } catch (err) {
                console.log('Error detected in setmute command')
            }
        }

    }
}