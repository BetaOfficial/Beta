const { MessageEmbed } = require('discord.js')
const Discord = require("discord.js")
const db = require("quick.db");

module.exports = {
    name: "setlanguage",
    cooldown: 1000 * 2,

    run: async(client, message, args) => {

        let prefix = db.get(`prefix_${message.guild.id}`) || "-"
        let language = db.get(`language_${message.guild.id}`);

        if (language === "pt-BR") { // PT-BR
            if (!message.member.permissions.has("MANAGE_GUILD")) {
                let embed = new Discord.MessageEmbed()
                .setDescription('> **<:no:930170194494636152> Você não tem permissão para `Gerenciar Servidor`**')
                .setColor("WHITE")
                return message.reply({ embeds: [embed] });
            }

            if (!args[0] || args[0] !== "pt-BR" && args[0] !== "en") {
                let embed = new Discord.MessageEmbed()
                .setDescription(`> **Para alterar a linguagem padrão deste servidor basta usar \`${prefix}setlanguage <Codigo da línguagem>\`, Você pode conferir as línguagens disponíveis no momento logo abaixo:**`)
                .addField('<:web:918506821474451526> Linguagens disponíveis:', '\`pt-BR (Português)\`, \`en (Inglês)\`', true)
                .setColor("WHITE")
                message.reply({ embeds: [embed] });
            }
        }

        if (!language || language === "en") { // EN
            if (!message.member.permissions.has("MANAGE_GUILD")) {
                let embed = new Discord.MessageEmbed()
                .setDescription('> **<:no:930170194494636152> You do not have the permission to `Manager Server`**')
                .setColor("WHITE")
                return message.reply({ embeds: [embed] });
            }

            if (!args[0] || args[0] !== "pt-BR" && args[0] !== "en") {
                let embed = new Discord.MessageEmbed()
                .setDescription(`> **To change the default language of this server just use \`${prefix}setlanguage <Language code>\` You can check the languages currently available below:**`)
                .addField('<:web:918506821474451526> Available languages:', '\`pt-BR (Portuguese)\`, \`en (English)\`', true)
                .setColor("WHITE")
                message.reply({ embeds: [embed] });
            }
        }

        if (args[0] === "pt-BR") {

            db.set(`language_${message.guild.id}`, "pt-BR");

            let embed = new Discord.MessageEmbed()
            .setDescription('> **:flag_br: Ok, Esse servidor foi definido com o idioma: \`Português Brasileiro\`!**')
            .setColor("WHITE")

            message.reply({ embeds: [embed] });

        };

        if (args[0] === "en") {

            db.set(`language_${message.guild.id}`, "en");

            let embed = new Discord.MessageEmbed()
            .setDescription('> **:flag_us: Ok, This server has been configured with the language: \`English\`!**')
            .setColor("WHITE")

            message.reply({ embeds: [embed] });

        };
    }
}