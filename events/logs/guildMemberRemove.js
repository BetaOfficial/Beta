const db = require("quick.db")
const Discord = require("discord.js")
module.exports = async (client, member) => {
    let language = db.get(`language_${member.guild.id}`);
    
    // LEAVE MEMBER LOGS => START
    let logs = db.get(`channellogs_${member.guild.id}`);
    if (!logs) return;
    if (language === "pt-BR") { // PT-BR
        let server_counter = member.guild.memberCount;
    
        let embed = new Discord.MessageEmbed()
        .setTitle(`**Logs - Usuário saiu**`)
        .setDescription(`**\`${member.user.tag}\` saiu do servidor, \`${server_counter}\` membros restantes**`)
        .setColor("WHITE")
        .setThumbnail(member.user.avatarURL())
        .setTimestamp()
        client.channels.cache.get(logs).send({ embeds: [embed] })
    }
    if (!language || language === "en") { // EN
        let server_counter = member.guild.memberCount;
    
        let embed = new Discord.MessageEmbed()
        .setTitle(`**Logs - User Leave**`)
        .setDescription(`**\`${member.user.tag}\` left the server, \`${server_counter}\` members left**`)
        .setColor("WHITE")
        .setThumbnail(member.user.avatarURL())
        .setTimestamp()
        client.channels.cache.get(logs).send({ embeds: [embed] })
    }
    // LEAVE MEMBER LOGS => END
}