const Discord = require("discord.js")
const db = require("quick.db");

module.exports = {
    name: 'clear',
    aliases: ["clean", "purge"],
    cooldown: 1000 * 2,
    /** 
     * @param {Client} client 
     * @param {Message} message 
     * @param {String[]} args 
     */
    run: async (client, message, args) => {

        let prefix = db.get(`prefix_${message.guild.id}`) || "-"

        let language = db.get(`language_${message.guild.id}`);
        
        if (language === "pt-BR") { // PT-BR
            if (!message.guild.me.permissions.has('MANAGE_MESSAGES')) {
                let embed = new Discord.MessageEmbed()
                .setDescription('**<:no:930170194494636152> Eu não tenho permissão para `Gerenciar Mensagens`**')
                .setColor("WHITE")
                return message.reply({ embeds: [embed] });
            }
            if (!message.member.permissions.has("MANAGE_MESSAGES")) {
                return message.reply(`**Você não tem permissão para \`Gerenciar Mensagens\`**`)
            }
            try {
                let delamount = args[0];
                let msg_del = parseInt(delamount) + 1

                const usage = new Discord.MessageEmbed()
                .setColor('WHITE')
                .setDescription(`**> Use \`${prefix}clear <quantia>\`**`)

                if (isNaN(delamount) || parseInt(delamount <= 0)) return message.reply({ embeds: [usage] }).then(m => {
                    setTimeout(() => {
                        m.delete()
                    }, 15000) // 15 segundos
                })

                const valmáx = new Discord.MessageEmbed()
                .setColor("WHITE")
                .setDescription(`> **${message.author} o valor máximo é de 99 mensagens!**`)

                if (parseInt(delamount) > 99) return message.reply({ embeds: [valmáx] }).then(m => {
                    setTimeout(() => {
                        m.delete()
                    }, 15000) // 15 segundos
                })

                await message.channel.bulkDelete(parseInt(delamount) + 1, true);

                const clear = new Discord.MessageEmbed()
                .setColor('WHITE')
                .setDescription(`> **${message.author} o chat foi limpo! Foram apagadas ${delamount} mensagens!**`)

                await message.channel.send({ embeds: [clear] }).then(m => {
                    setTimeout(() => {
                        m.delete()
                    }, 15000) // 15 segundos
                })
            } catch (error) {
                console.log(error)
            }
        }
        if (!language || language === "en") { // EN
            if (!message.guild.me.permissions.has('MANAGE_MESSAGES')) {
                let embed = new Discord.MessageEmbed()
                .setDescription('**<:no:930170194494636152> I don\'t have permission to `Manage Messages`**')
                .setColor("WHITE")
                return message.reply({ embeds: [embed] });
            }
            if (!message.member.permissions.has("MANAGE_MESSAGES")) {
                return message.reply(`**You are not allowed to \`Manage Messages\`**`)
            }
            try {
                let delamount = args[0];
                let msg_del = parseInt(delamount) + 1

                const usage = new Discord.MessageEmbed()
                .setColor('WHITE')
                .setDescription(`**> Use \`${prefix}clear <amount>\`**`)

                if (isNaN(delamount) || parseInt(delamount <= 0)) return message.reply({ embeds: [usage] }).then(m => {
                    setTimeout(() => {
                        m.delete()
                    }, 15000) // 15 segundos
                })

                const valmáx = new Discord.MessageEmbed()
                .setColor("WHITE")
                .setDescription(`> **${message.author} the maximum value is 99 messages!**`)

                if (parseInt(delamount) > 99) return message.reply({ embeds: [valmáx] }).then(m => {
                    setTimeout(() => {
                        m.delete()
                    }, 15000) // 15 segundos
                })

                await message.channel.bulkDelete(parseInt(delamount) + 1, true)

                const clear = new Discord.MessageEmbed()
                .setColor('WHITE')
                .setDescription(`> **${message.author} the chat has been cleaned! \`${delamount}\` messages were deleted!**`)

                await message.channel.send({ embeds: [clear] }).then(m => {
                    setTimeout(() => {
                        m.delete()
                    }, 15000) // 15 segundos
                })
            } catch (error) {
                console.log(error)
            }
        }
    }
}