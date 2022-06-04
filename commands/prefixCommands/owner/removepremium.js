const Discord = require("discord.js");
const db = require("quick.db");
const config = require('../../../database/config')
const { MessageEmbed } = require('discord.js')

module.exports = {
    name: "removepremium",
    aliases: ["rp"],
    cooldown: 1000 * 2,

    run: async (client, message, args) => {

        let prefix = db.get(`prefix_${message.guild.id}`) || "-"
        let owner = config.owners.ID1 || config.owners.ID2

        let language = db.get(`language_${message.guild.id}`);
        if (language === "pt-BR") { // PT-BR
            if (!owner.includes(message.author.id)) {
                let embed = new MessageEmbed()
                .setDescription('<:no:930170194494636152> **Somente meu criador pode usar este código!**')
                .setColor("WHITE")
                return message.reply({ embeds: [embed] })
            }
    
            let user = message.mentions.users.first() || client.users.cache.get(args[0]);
    
            if (!user) {
                let embed = new Discord.MessageEmbed()
                .setColor("WHITE")
                .setDescription(`> **<:no:930170194494636152> Use: \`${prefix}removepremium <usuário>\`**`);
                return message.reply({ embeds: [embed] })
            } 
            if (db.get(`premium_${user.id}`) === null || db.get(`premium_${user.id}`) === false) {
                let embed = new Discord.MessageEmbed()
                .setColor("WHITE")
                .setDescription(`> **<:no:930170194494636152> O usuário ${user.tag} não está na minha lista de usuários premium!**`);
                message.reply({ embeds: [embed] })
            } else {
                let embed = new Discord.MessageEmbed()
                .setColor("WHITE")
                .setDescription(`> **${config.emoji.yes} ${user.tag} agora não está mais na minha lista de usuários premium!**`);
                message.reply({ embeds: [embed] })
                db.set(`premium_${user.id}`, false)

            }
        }
        if (!language || language === "en") { // EN
            if (!owner.includes(message.author.id)) {
                let embed = new MessageEmbed()
                .setDescription('<:no:930170194494636152> **Only my creator can use this code!**')
                .setColor("WHITE")
                return message.reply({ embeds: [embed] })
            }
    
            let user = message.mentions.users.first() || client.users.cache.get(args[0]);
    
            if (!user) {
                let embed = new Discord.MessageEmbed()
                .setColor("WHITE")
                .setDescription(`> **<:no:930170194494636152> Use: \`${prefix}removepremium <user>\`**`);
                return message.reply({ embeds: [embed] })
            } 
            if (db.get(`premium_${user.id}`) === null || db.get(`premium_${user.id}`) === false) {
                let embed = new Discord.MessageEmbed()
                .setColor("WHITE")
                .setDescription(`> **<:no:930170194494636152> The user ${user.tag} is not on my premium users list!**`);
                message.reply({ embeds: [embed] })
            } else {
                let embed = new Discord.MessageEmbed()
                .setColor("WHITE")
                .setDescription(`> **${config.emoji.yes} ${user.tag} is now no longer on my premium users list!**`);
                message.reply({ embeds: [embed] })
                db.set(`premium_${user.id}`, false)

            }
        }
        
    }
}