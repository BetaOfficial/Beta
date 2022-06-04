const Discord = require("discord.js");
const db = require("quick.db");
const config = require('../../../database/config')
const {MessageEmbed} = require("discord.js");
const { rangeTransformDependencies } = require("mathjs");

module.exports = {
    name: "addblacklist",
    aliases: ["ab"],
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
                .setDescription(`> **<:no:930170194494636152> Use: \`${prefix}addblacklist <usuário>\`**`);
                message.reply({ embeds: [embed] })
            } else {
                let embed = new Discord.MessageEmbed()
                .setColor("WHITE")
                .setDescription(`> **O usuário ${user} (\`${user.tag}\`) foi adicionado à minha blacklist!**`);
                message.reply({ embeds: [embed] })
                db.set(`blacklist`, `${user.id}`)
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
                .setDescription(`> **<:no:930170194494636152> Use: \`${prefix}addblacklist <user>\`**`);
                message.reply({ embeds: [embed] })
            } else {
                let embed = new Discord.MessageEmbed()
                .setColor("WHITE")
                .setDescription(`> **The user ${user} (\`${user.tag}\`) has been added to my blacklist!**`);
                message.reply({ embeds: [embed] })
                db.set(`blacklist`, `${user.id}`)
            }
        }
        
    }
}