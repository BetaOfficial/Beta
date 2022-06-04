const {MessageEmbed} = require('discord.js')
let os = require("os")
const db = require("quick.db")
const config = require("../../database/config");
const axios = require("axios")
let key = config.bot.key
const cfonts = require('cfonts')
module.exports = async (client, message) => {

    const banner = cfonts.render((`BETA™ ${config.bot.version}`), {
        font: 'block',
        color: 'white',
        align: 'left',
        lineHeight: 3
    });   
    console.log(banner.string);

        // START LOGS => START
    let logsEMBED = new MessageEmbed()
    .setTitle(`Log - Bot Initialized`)
    .setColor("GREEN")
    .setDescription(`**I just booted, see my boot info just below:**`)
    .addFields({ name: 'Servers:', value: `\`${client.guilds.cache.size}\` Servers`, inline: false }, { name: 'Users:', value: `\`${client.users.cache.size}\` Users`, inline: false }, { name: 'Ping:', value: `\`${client.ws.ping}ms\``, inline: false }, { name: 'Ram Usage:', value: `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB\``, inline: false }, { name: 'Version:', value: `\`${config.version}\``, inline: false })
    .setTimestamp(Date.now())
    let logs = client.channels.cache.get("972899197504335933")
    logs.send({ embeds: [logsEMBED] }); 
        // START LOGS => END

    // START LOGS => START
    let activities = [
        `${client.channels.cache.size} Channels`,
        `${client.users.cache.size} Users`,
        `${client.guilds.cache.size} Servers`,
        `-help | ${client.ws.ping}ms`,
        `bbb = big bots brazil | ${client.ws.ping}ms`,
        `dsc.gg/betasupport | ${client.ws.ping}ms`
      ],
      i = 0;     
    setInterval(()=>{
     client.user.setPresence({ activities: [{ name: `${activities[i++ % activities.length]}`, status: 'online' }] });
     client.user.setStatus('online')
    }, 10000)
    //FINAL STATUS BOT

    //USERS CHANNEL LOG
    setInterval(async() => { 
	client.channels.cache.get('972891749913608192').setName(`🔮・Guilds: ${client.guilds.cache.size}`)
        client.channels.cache.get('972890861295763537').setName(`👥・Users: ${client.users.cache.size}`)
        client.channels.cache.get('972890934599639120').setName(`🏓・Latency: ${client.ws.ping}ms`)
    }, 300000)
    //FINAL STATUS

    //QUANDO O BOT LIGAR
    console.log(`-> ${client.user.username}(${client.user.id}) is online! In ${client.guilds.cache.size} servers!`)
    //A MENSAGEM ENVIA!
}