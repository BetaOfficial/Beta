const { MessageEmbed } = require('discord.js')
const Discord = require("discord.js")
const db = require("quick.db");

module.exports = {
    name: "antimention",
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

            if (!args[0] || args[0] !== "on" && args[0] !== "off") {
                let embed = new Discord.MessageEmbed()
                .setTitle('**Sistema Anti-Menção**')
                .setDescription(`**Para ativar use: \`${prefix}antimention on\`**\n**Desative o sistema usando: \`${prefix}antimention off\`**`)
                .setColor("WHITE")
                .setFooter({ text: 'Use isso para evitar que os usuários marquem everyone!' })
                message.reply({ embeds: [embed] });
            }

            try {

                if (args[0] === "on") {

                    db.set(`antimention_${message.guild.id}`, "on");

                    let embed = new Discord.MessageEmbed()
                    .setDescription('**<:yes:930170194784043048> O sistema foi ativado!**')
                    .setColor("WHITE")

                    message.reply({ embeds: [embed] });

                };

                if (args[0] === "off") {

                    db.set(`antimention_${message.guild.id}`, "off");

                    let embed = new Discord.MessageEmbed()
                    .setDescription('**<:no:930170194494636152> O sistema foi desativado!**')
                    .setColor("WHITE")
        
                    message.reply({ embeds: [embed] });
        
                };

            } catch (err) {
                console.log('Error detected in antimention command')
            }
        }
        if (!language || language === "en") { // EN  
            if (!message.member.permissions.has("MANAGE_GUILD")) {
                let embed = new Discord.MessageEmbed()
                .setDescription('**<:no:930170194494636152> You do not have the permission to `Manager Server`**')
                .setColor("WHITE")
                return message.reply({ embeds: [embed] });
            }

            if (!args[0] || args[0] !== "on" && args[0] !== "off") {
                let embed = new Discord.MessageEmbed()
                .setTitle('**Antimention System**')
                .setDescription(`**Activate the system with \`${prefix}antimention on\`**\n**Deactivate the system with \`${prefix}antimention off\`**`)
                .setColor("WHITE")
                .setFooter({ text: 'Use this command to prevent members from mention everyone!' })
                message.reply({ embeds: [embed] });
            }

            try {

                if (args[0] === "on") {

                    db.set(`antimention_${message.guild.id}`, "on");

                    let embed = new Discord.MessageEmbed()
                    .setDescription('**<:yes:930170194784043048> The system has been successfully activated!**')
                    .setColor("WHITE")

                    message.reply({ embeds: [embed] });

                };

                if (args[0] === "off") {

                    db.set(`antimention_${message.guild.id}`, "off");

                    let embed = new Discord.MessageEmbed()
                    .setDescription('**<:no:930170194494636152> The system has been successfully disabled!**')
                    .setColor("WHITE")
        
                    message.reply({ embeds: [embed] });
        
                };

            } catch (err) {
                console.log('Error detected in antimention command')
            }
        }

    }
}