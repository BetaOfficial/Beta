const db = require("quick.db")
const Discord = require("discord.js")
module.exports = async (client, member) => {
    let language = db.get(`language_${member.guild.id}`);
    let logs = db.get(`channellogs_${member.guild.id}`)
    if (!logs) {

    } else {
        if (language === "pt-BR") { // PT-BR
            let server_counter = member.guild.memberCount;
        
            let embed = new Discord.MessageEmbed()
            .setTitle(`**Logs - Usuário entrou**`)
            .setDescription(`**\`${member.user.tag}\` entrou e agora existem \`${server_counter}\` membros neste servidor!**`)
            .setColor("WHITE")
            .setThumbnail(member.user.avatarURL())
            .setTimestamp()
            client.channels.cache.get(logs).send({ embeds: [embed] })
        }
        if (!language ||language === "en") { // EN
            let server_counter = member.guild.memberCount;

            let embed = new Discord.MessageEmbed()
            .setTitle(`**Logs - User Join**`)
            .setDescription(`**\`${member.user.tag}\` joined and now we have \`${server_counter}\` members**`)
            .setColor("WHITE")
            .setThumbnail(member.user.avatarURL())
            .setTimestamp()
            client.channels.cache.get(logs).send({ embeds: [embed] })
        }
    }
    // NEW MEMBER LOGS => END
}