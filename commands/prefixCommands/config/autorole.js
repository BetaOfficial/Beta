const Discord = require("discord.js")
const db = require("quick.db")
const config = require("../../../database/config");
module.exports = {
    name: "autorole",
    aliases: ["setautorole"],
    cooldown: 1000 * 2,
    run: async (client, message, args) => {

        let prefix = db.get(`prefix_${message.guild.id}`) || "-"
        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0])
        let role_check = db.get(`autorole_${message.guild.id}`)

        let language = db.get(`language_${message.guild.id}`);
        if (language === "pt-BR") { // PT-BR
            if (!role || role == false) {
                let embed = new Discord.MessageEmbed()
                .setDescription(`**${config.emoji.no} O cargo não foi falado ou não foi encontrado neste servidor! Para mais precisão mencione o cargo!**`)
                .setColor("WHITE")
                return message.reply({ embeds: [embed] })
            }
            if (!message.member.permissions.has("MANAGE_ROLES")) {
                let embed = new Discord.MessageEmbed()
                .setDescription(`> **${config.emoji.no} Você não tem permissão para \`Gerenciar Cargos\`**`)
                .setColor("WHITE")
                return message.reply({ embeds: [embed] });
            } else if (!message.guild.me.permissions.has("MANAGE_ROLES")) {
                let embed = new Discord.MessageEmbed()
                .setDescription(`> **${config.emoji.no} Eu não tenho permissão para \`Gerenciar Cargos\`**`)
                .setColor("WHITE")
                return message.reply({ embeds: [embed] });
            }

            db.set(`autorole_${message.guild.id}`, role.id)
            let embed = new Discord.MessageEmbed()
            .setDescription(`**${config.emoji.yes} Ok! O cargo ${role} já foi definido para todo mundo que entrar!**`)
            .setColor("WHITE")
            message.reply({ embeds: [embed] });
        }
        if (!language || language === "en") { // EN
            if (!role || role == false) {
                let embed = new Discord.MessageEmbed()
                .setDescription(`**${config.emoji.no} The role was not mentioned or not found on this server! For more precision mention the position!**`)
                .setColor("WHITE")
                return message.reply({ embeds: [embed] })
            }
            if (!message.member.permissions.has("MANAGE_ROLES")) {
                let embed = new Discord.MessageEmbed()
                .setDescription(`> **<:no:930170194494636152> You do not have permission to \`Manage Roles\`**`)
                .setColor("WHITE")
                return message.reply({ embeds: [embed] });
            } else if (!message.guild.me.permissions.has("MANAGE_ROLES")) {
                let embed = new Discord.MessageEmbed()
                .setDescription(`> **<:no:930170194494636152> I don't have permission to \`Manage Roles\`**`)
                .setColor("WHITE")
                return message.reply({ embeds: [embed] });
            }

            db.set(`autorole_${message.guild.id}`, role.id)
            let embed = new Discord.MessageEmbed()
            .setDescription(`**${config.emoji.yes} Ok! The role ${role} has already been set for everyone who enters!**`)
            .setColor("WHITE")
            message.reply({ embeds: [embed] });
        }
    }
}