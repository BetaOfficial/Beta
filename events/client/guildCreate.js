const Discord = require("discord.js")
module.exports = async (client, guild) => {
    // BOT JOIN GUILD => START
    const NOW = Date.now() //Logs
    let log = client.channels.cache.get("972899411745181696")
    let logsEMBED = new Discord.MessageEmbed()
    .setTitle(`Log - Join Server`)
    .setColor("WHITE")
    .setDescription(`**I've been add from a server now! See below for information on this:**`)
    .addFields(
        { name: 'Server:', value: `\`${guild.name}\` | \`(${guild.id})\``, inline: false },
        { name: 'Members:', value: `\`${guild.memberCount}\``, inline: false },
        { name: 'Servers Now:', value: `\`${client.guilds.cache.size}\``, inline: false },
    )
    .setTimestamp(Date.now())
    log.send({ embeds: [logsEMBED] }); //Logs
    // BOT JOIN GUILD => END
}