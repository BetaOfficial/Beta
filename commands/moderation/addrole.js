const Discord = require("discord.js");
const db = require("quick.db");
const owners = require("../../database/owners.json");
const config = require("../../database/config.json");
const e = require("../../database/emojis.json")

module.exports = {
    name: "addrole",
    aliases: ["adicionar-cargo"],
    cooldown: 1000 * 2,

    run: async (client, message, args) => {

        let prefix = db.get(`prefix_${message.guild.id}`) || "-"

        let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[1]);

        let server = message.guild.id;

        let language = db.get(`language_${message.guild.id}`);
        if (language === "pt-BR") { // PT-BR
            if (!message.guild.me.permissions.has('MANAGE_ROLES')) {
                let embed = new Discord.MessageEmbed()
                .setDescription('**<:no:930170194494636152> Eu não tenho permissão para `Gerenciar Cargos`**')
                .setColor("WHITE")
                return message.reply({ embeds: [embed] });
            }
            if (!message.member.permissions.has("MANAGE_ROLES")) {
                return message.reply(`**${e.no} Você não tem permissão para \`Gerenciar Cargos\`**`)
            }

            if(!member || !role) {
                let embed = new Discord.MessageEmbed()
                .setDescription(`**${e.no} Você precisa me dizer um cargo e um usuário válido! Use: \`${prefix}addrole <usuário> <cargo>\`**`)
                .setColor("WHITE")
                return message.reply({ embeds: [embed] });
            }

            try {
                client.guilds.cache.get(server).members.cache.get(member.id).roles.add(role.id)

                let embed_complete = new Discord.MessageEmbed()
                .setDescription(`${e.yes} **Adicionei o cargo pedido em um usuário! Veja as informações abaixo:**`)
                .addField(`**👮‍♂️ MOD:**`, `**${message.author}**\n**\`${message.author.id}\`**`, false)
                .addField(`**👤 Usuário:**`, `**${member}**\n**\`${member.id}\`**`, false)
                .addField(`**💼 Cargo:**`, `**${role}**\n**\`${role.id}\`**`, false)
                .setColor("WHITE")
                message.reply({ embeds: [embed_complete] });
            } catch {
                let embed_error = new Discord.MessageEmbed()
                .setDescription(`${e.no} **Hey! Não consegui adicionar o cargo ${role} em ${member}!**`)
                .setColor("WHITE")
                return message.reply({ embeds: [embed_error] });
            }
        }
        if (!language || language === "en") { // EN
            if (!message.guild.me.permissions.has('MANAGE_ROLES')) {
                let embed = new Discord.MessageEmbed()
                .setDescription('**<:no:930170194494636152> I am not allowed to `Manage Roles`**')
                .setColor("WHITE")
                return message.reply({ embeds: [embed] });
            }
            if (!message.member.permissions.has("MANAGE_ROLES")) {
                return message.reply(`**${e.no} You do not have permission to \`Manage Roles\`**`)
            }

            if(!member || !role) {
                let embed = new Discord.MessageEmbed()
                .setDescription(`**${e.no} You need to tell me a title and a valid username! Use: \`${prefix}addrole <username> <role>\`**`)
                .setColor("WHITE")
                return message.reply({ embeds: [embed] });
            }

            try {
                client.guilds.cache.get(server).members.cache.get(member.id).roles.add(role.id)

                let embed_complete = new Discord.MessageEmbed()
                .setDescription(`${e.yes} **I added the requested role in a user! See the information below:**`)
                .addField(`**👮‍♂️ MOD:**`, `**${message.author}**\n**\`${message.author.id}\`**`, false)
                .addField(`**👤 User:**`, `**${member}**\n**\`${member.id}\`**`, false)
                .addField(`**💼 Role:**`, `**${role}**\n**\`${role.id}\`**`, false)
                .setColor("WHITE")
                message.reply({ embeds: [embed_complete] });
            } catch {
                let embed_error = new Discord.MessageEmbed()
                .setDescription(`${e.no} **Hey! I couldn't add the role ${role} in ${member}!**`)
                .setColor("WHITE")
                return message.reply({ embeds: [embed_error] });
            }
        }
        
    }
}