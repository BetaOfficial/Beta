const db = require("quick.db")
const Discord = require("discord.js")
module.exports = async (client, member) => {
    let language = db.get(`language_${member.guild.id}`);

    // NEW MEMBER => START
    let beta_welcome_channel = db.get(`beta_welcome_${member.guild.id}`);
    let server_counter = member.guild.memberCount;
    let server = member.guild.name;
    if (!beta_welcome_channel) {

    } else {
        if (language === "pt-BR") { // PT-BR
            let embed = new Discord.MessageEmbed()
            .setTitle(`**Bem vindo!**`)
            .setDescription(`**Bem vindo ${member.user} ao servidor: \n\`${server}\`!**\n\n`)
            .addField(`**Você é o \`${server_counter}*\` membro deste servidor!**`, '**Eu espero que goste do servidor!**')
            .setColor("WHITE")
            .setThumbnail(member.user.avatarURL())
            .setImage('https://i.imgur.com/mfcnP6O.jpg')
            client.channels.cache.get(beta_welcome_channel).send({ embeds: [embed] })
        }
        if (!language || language === "en") { // EN
            let embed = new Discord.MessageEmbed()
            .setTitle(`**Welcome!**`)
            .setDescription(`**Welcome ${member.user} to the server \n\`${server}\`!**\n\n`)
            .addField(`**You are the \`${server_counter}th\` member of that server!**`, '**I hope you like this server!**')
            .setColor("WHITE")
            .setThumbnail(member.user.avatarURL())
            .setImage('https://i.imgur.com/mfcnP6O.jpg')
            client.channels.cache.get(beta_welcome_channel).send({ embeds: [embed] })
        }
    }
    // NEW MEMBER => END

    // AUTO ROLE => START
    let roleID = db.get(`autorole_${member.guild.id}`)
    if (!roleID) {

    } else {
        let role = member.guild.roles.cache.find(r => r.id === roleID)
        member.roles.add(role)
    }
    // AUTO ROLE => END
}