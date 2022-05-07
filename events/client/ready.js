const {MessageEmbed} = require('discord.js')
let os = require("os")
const db = require("quick.db")
const config = require("../../database/config.json")
const axios = require("axios")
let key = config.key
const cfonts = require('cfonts')
module.exports = async (client, message) => {

    const banner = cfonts.render((`BETA™ ${config.version}`), {
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
    .addFields({ name: 'Servers:', value: `\`${client.guilds.cache.size}\` Servers`, inline: false }, { name: 'Users:', value: `\`${client.users.cache.size}\` Users`, inline: false }, { name: 'Ping:', value: `\`${Math.round(client.ws.ping)}ms\``, inline: false }, { name: 'Ram Usage:', value: `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB\``, inline: false }, { name: 'Version:', value: `\`${config.version}\``, inline: false })
    .setTimestamp(Date.now())
    client.channels.cache.get("966395710465536070").send({ embeds: [logsEMBED] }); 
    // START LOGS => END

    // START LOGS => START
    let activities = [
        `${client.channels.cache.size} Channels`,
        `${client.users.cache.size} Users`,
        `${client.guilds.cache.size} Servers`,
        `-help | ${Math.round(client.ws.ping)}ms`,
        `bbb = big bots brazil | ${Math.round(client.ws.ping)}ms`,
        `dsc.gg/betasupport | ${Math.round(client.ws.ping)}ms`
      ],
      i = 0;     
    setInterval(()=>{
     client.user.setPresence({ activities: [{ name: `${activities[i++ % activities.length]}`, status: 'online' }] });
     client.user.setStatus('online')
    }, 10000)
    //FINAL STATUS BOT

    //USERS CHANNEL LOG
    setInterval(async() => { 
        client.channels.cache.get('966136853579317258').setName(`👥・Users: ${client.users.cache.size}`)
        client.channels.cache.get('966136957178630204').setName(`🔮・Guilds: ${client.guilds.cache.size}`)
        client.channels.cache.get('966379781014839326').setName(`🏓・Latency: ${Math.round(client.ws.ping)}ms`)
    }, 300000)
    //FINAL STATUS

    const ownerID = require("../../database/owners.json")
    let owner = ownerID.ID1 || ownerID.ID2

    // QUICK.DB BACKUP
    setInterval(async() => { 
        let embed = new MessageEmbed()
        .setTitle(`**💽 Database Backup!**`)
        .setTimestamp(Date.now())
        .setColor("WHITE")
        client.channels.cache.get('969325495479070760').send({ embeds: [embed] })
        client.channels.cache.get('969325495479070760').send({ files: ['./json.sqlite'] })
    }, 3600000)
    //QUICK.DB BACKUP

    // VERIFY API KEY
    let verify = async () => {
        let push = await axios.get("https://google.api/<BETA API KEY>/betasource");
        if (push.data.lisence != key) {
            console.log("❎・API Key is invalid!");
        
            setTimeout(() => process.exit(), 0);
            return;
        }
    };
    verify();

    //QUANDO O BOT LIGAR
    console.log(`-> ${client.user.username}(${client.user.id}) is online! In ${client.guilds.cache.size} servers!`)
    //A MENSAGEM ENVIA!
}
