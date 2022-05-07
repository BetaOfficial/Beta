const Discord = require("discord.js")
module.exports = async (client, guild) => {
    // BOT LEAVE GUILD => START
    const NOW = Date.now()
    let log = client.channels.cache.get("966395666689568860")
    let logsEMBED = new Discord.MessageEmbed()
    .setTitle(`Log - Leave Server`)
    .setColor("WHITE")
    .setDescription(`**I've been removed from a server now! See below for information on this:**`)
    .addFields(
        { name: 'Server:', value: `\`${guild.name}\` | \`(${guild.id})\``, inline: false },
        { name: 'Members:', value: `\`${guild.memberCount}\``, inline: false },
        { name: 'Servers Now:', value: `\`${client.guilds.cache.size}\``, inline: false },
    )
    .setTimestamp(Date.now())
    log.send({ embeds: [logsEMBED] });
    // BOT LEAVE GUILD => END
}