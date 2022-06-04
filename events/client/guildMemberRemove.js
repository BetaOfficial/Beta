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
}