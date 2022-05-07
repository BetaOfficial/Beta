const db = require("quick.db")
const Discord = require("discord.js")
module.exports = async (client, member) => {
    let language = db.get(`language_${member.guild.id}`);

    // LEAVE MEMBER => START
    let beta_leave_channel = db.get(`beta_leave_${member.guild.id}`);
    let server_counter = member.guild.memberCount;
    if (!beta_leave_channel) return;

    if (language === "pt-BR") { // PT-BR
        let embed = new Discord.MessageEmbed()
        .setTitle(`**Eu estou triste...**`)
        .setDescription(`**Oh, ${member.user} saiu do servidor...**`)
        .addField(`**Agora temos \`${server_counter}\` membros neste servidor!**`, '**Espero que ele volte...**')
        .setColor("WHITE")
        .setThumbnail(member.user.avatarURL())
        .setImage('https://i.imgur.com/TRCmCs4.jpg')
        client.channels.cache.get(beta_leave_channel).send({ embeds: [embed] })
    }
    if (!language || language === "en") { // EN
        let embed = new Discord.MessageEmbed()
        .setTitle(`**I am sad...**`)
        .setDescription(`**Oh, ${member.user} leave on the server...**`)
        .addField(`**We now have \`${server_counter}\` members on this server!**`, '**I hope he comes back...**')
        .setColor("WHITE")
        .setThumbnail(member.user.avatarURL())
        .setImage('https://i.imgur.com/TRCmCs4.jpg')
        client.channels.cache.get(beta_leave_channel).send({ embeds: [embed] })
    }
    // LEAVE MEMBER => END

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