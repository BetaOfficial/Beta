const Discord = require("discord.js")
const db = require("quick.db");

module.exports = {
    name: "resetdb",
    cooldown: 1000 * 2,

    run: async(client, message, args) => {

        let prefix = db.get(`prefix_${message.guild.id}`) || "-"
        let language = db.get(`language_${message.guild.id}`);

        if (language === "pt-BR") { // PT-BR
            if (!message.member.permissions.has("MANAGE_GUILD")) {
                let embed = new Discord.MessageEmbed()
                .setDescription('**<:no:930170194494636152> Você não tem permissão para `Gerenciar Servidor`**')
                .setColor("WHITE")
                return message.reply({ embeds: [embed] });
            }

            if (!args[0] || args[0] !== "yes" && args[0] !== "cancel") {
                let embed = new Discord.MessageEmbed()
                .setTitle('**⚠ Apagar database do servidor**')
                .setDescription(`**Apagar database, use: \`${prefix}resetdb yes\`**\n**Para cancelar, use: \`${prefix}resetdb cancel\`**`)
                .setColor("WHITE")
                .setFooter({ text: 'Alerta!:  Isso pode apagar as configurações do servidor! Não afeta com comandos de economia!' })
                message.reply({ embeds: [embed] });
            }

            try {

                if (args[0] === "yes") {

                    db.set(`antilink_${message.guild.id}`, false)
                    db.set(`antimention_${message.guild.id}`, false)
                    db.set(`autorole_${message.guild.id}`, false)
                    db.set(`channelcommands_${message.guild.id}`, false)
                    db.set(`beta_invite_logger_${message.guild.id}`, false)
                    db.set(`language_${message.guild.id}`, false)
                    db.set(`beta_leave_${message.guild.id}`, false)
                    db.set(`channellogs_${message.guild.id}`, false)
                    db.set(`cargo_mute_${message.guild.id}`, false)
                    db.set(`prefix_${message.guild.id}`, false)
                    db.set(`channelSUGERIR_${message.guild.id}`, false)
                    db.set(`beta_welcome_${message.guild.id}`, false)
                    

                    let embed = new Discord.MessageEmbed()
                    .setDescription('**<:yes:930170194784043048> Ok, seu servidor foi resetado em minha database!**')
                    .setColor("WHITE")

                    message.reply({ embeds: [embed] });

                };

                if (args[0] === "cancel") {

                    let embed = new Discord.MessageEmbed()
                    .setDescription('**<:no:930170194494636152> Ok, Eu cancelei seu pedido!**')
                    .setColor("WHITE")
        
                    message.reply({ embeds: [embed] });
        
                };

            } catch (err) {
                console.log(`Error detected in resetdb command: ${err}`)
            }
        }
        if (!language || language === "en") { // EN
            if (!message.member.permissions.has("MANAGE_GUILD")) {
                let embed = new Discord.MessageEmbed()
                .setDescription('**<:no:930170194494636152> You do not have the permission to `Manager Server`**')
                .setColor("WHITE")
                return message.reply({ embeds: [embed] });
            }

            if (!args[0] || args[0] !== "yes" && args[0] !== "cancel") {
                let embed = new Discord.MessageEmbed()
                .setTitle('**⚠ Delete server database**')
                .setDescription(`**Delete database, use: \`${prefix}resetdb yes\`**\n**Cancel, use: \`${prefix}resetdb cancel\`**`)
                .setColor("WHITE")
                .setFooter({ text: 'Alert!: This may erase server settings! Does not affect with economy commands!' })
                message.reply({ embeds: [embed] });
            }

            try {

                if (args[0] === "yes") {

                    db.set(`antilink_${message.guild.id}`, false)
                    db.set(`antimention_${message.guild.id}`, false)
                    db.set(`autorole_${message.guild.id}`, false)
                    db.set(`channelcommands_${message.guild.id}`, false)
                    db.set(`beta_invite_logger_${message.guild.id}`, false)
                    db.set(`language_${message.guild.id}`, false)
                    db.set(`beta_leave_${message.guild.id}`, false)
                    db.set(`channellogs_${message.guild.id}`, false)
                    db.set(`cargo_mute_${message.guild.id}`, false)
                    db.set(`prefix_${message.guild.id}`, false)
                    db.set(`channelSUGERIR_${message.guild.id}`, false)
                    db.set(`beta_welcome_${message.guild.id}`, false)

                    let embed = new Discord.MessageEmbed()
                    .setDescription('**<:yes:930170194784043048> Ok, Your server configuration data has been reset!**')
                    .setColor("WHITE")

                    message.reply({ embeds: [embed] });

                };

                if (args[0] === "cancel") {

                    let embed = new Discord.MessageEmbed()
                    .setDescription('**<:no:930170194494636152> Ok, I canceled your order!**')
                    .setColor("WHITE")
        
                    message.reply({ embeds: [embed] });
        
                };

            } catch (err) {
                console.log(`Error detected in resetdb command: ${err}`)
            }
        }
    }
}