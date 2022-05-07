const db = require("quick.db")
const Discord = require("discord.js")
const client = new Discord.Client({intents: 32767}); //Beta
const config = require("./database/config.json");
const e = require("./database/emojis.json")
const lavalink = require("./database/lavalink.json")
const spotify = require("./database/spotify.json")
const fs = require("fs");
const {readdirSync} = require("fs");
const Spotify = require("erela.js-spotify");
const AppleMusic = require("erela.js-apple");
const Deezer = require("erela.js-deezer");
const Facebook = require("erela.js-facebook");
const filter  = require("erela.js-filters");
const { Manager } = require("erela.js")

client.login(config.token_canary);  

/////////////// ANTI - CRASH ///////////////

process.on('unhandledRejection', (reason, p) => {
    console.log('=====[ ANTI CRASH ]=====')
    console.log(reason, p)
    console.log('========================')
})

process.on("uncaughtException", (err, origin) => {
    console.log('=====[ ANTI CRASH ]=====')
    console.log(err, origin)
    console.log('========================')
}) 

process.on('uncaughtExceptionMonitor', (err, origin) => {
    console.log('=====[ ANTI CRASH ]=====')
    console.log(err, origin)
    console.log('========================')
})

process.on('multipleResolves', (type, promise, reason) => {
    console.log('=====[ ANTI CRASH ]=====')
    console.log(type, promise, reason)
    console.log('========================')
})

////////////////////////////////////////////

// ========================[ HANDLER ]======================= //

readdirSync('./events/client').forEach(f => { let pull = require(`./events/client/${f}`);client.on(f.split('.')[0], pull.bind(null, client)); } )

client.commands = new Discord.Collection(); // Handler | Start
client.aliases = new Discord.Collection();
client.categories = fs.readdirSync(`./commands/`);

fs.readdirSync('./commands/').forEach(local => {
    const comandos = fs.readdirSync(`./commands/${local}`).filter(arquivo => arquivo.endsWith('.js'))

    for(let file of comandos) {
        let puxar= require(`./commands/${local}/${file}`)

        if(puxar.name) {
            client.commands.set(puxar.name, puxar)
        } 
        if(puxar.aliases && Array.isArray(puxar.aliases))
        puxar.aliases.forEach(x => client.aliases.set(x, puxar.name))
    } 
})

// ========================================================== //

// =======================[ LAVALINK ]======================= //

let clientID = spotify.clientID
let clientSecret = spotify.clientSecret

client.manager = new Manager({
    plugins: [
        new Spotify({
            clientID,
            clientSecret
        }),
        new Deezer(),
        new AppleMusic(),
        new filter(),
        new Facebook()
    ],
    nodes: [
        { host: `${lavalink.node01}`, port: lavalink.port01, password: `${lavalink.password01}`, secure: lavalink.secure01 },
        { host: `${lavalink.node02}`, port: lavalink.port02, password: `${lavalink.password02}`, secure: lavalink.secure02 },
        { host: `${lavalink.node03}`, port: lavalink.port03, password: `${lavalink.password03}`, secure: lavalink.secure03 },
        { host: `${lavalink.node04}`, port: lavalink.port04, password: `${lavalink.password04}`, secure: lavalink.secure04 },
        { host: `${lavalink.node05}`, port: lavalink.port05, password: `${lavalink.password05}`, secure: lavalink.secure05 },
    ],
    send(id, payload) {
        const guild = client.guilds.cache.get(id);
        if (guild) guild.shard.send(payload);
    },
})

client.manager.on("nodeConnect", node => console.log(`-> Node: ${node.options.identifier} ready!`))
client.manager.on("nodeError", (node, error) => console.log(`-> Error: ${node.options.identifier} error: ${error.message}`))

client.manager.on("trackStart", (player, track) => { // Queue Start (Lavalink) | Start
    let canal = client.channels.cache.get(player.textChannel) 
    let language = db.get(`language_${canal.guild.id}`); 
    if (language === "pt-BR") { // PT-BR
        let startqueue_embed = new Discord.MessageEmbed()
        .setDescription(`${e.yes} **Tocando agora: \`${track.title}\`**`)
        .setColor("WHITE")
        client.channels.cache.get(player.textChannel).send({ embeds: [startqueue_embed] })
    }
    if (!language || language === "en") { // EN
        let startqueue_embed = new Discord.MessageEmbed()
        .setDescription(`${e.yes} **Playing now: \`${track.title}\`**`)
        .setColor("WHITE")
        client.channels.cache.get(player.textChannel).send({ embeds: [startqueue_embed] })
    }
}) // Queue Start (Lavalink) | End

client.manager.on("queueEnd", (player) => { // Queue End (Lavalink) | Start
    let canal = client.channels.cache.get(player.textChannel) 
    let language = db.get(`language_${canal.guild.id}`);
    
    player.destroy()
    player.disconnect();

    if (language === "pt-BR") { // PT-BR
        let startqueue_embed = new Discord.MessageEmbed()
        .setDescription(`${e.no} **A música acabou e eu saí do canal de voz!**`)
        .setColor("WHITE")
        client.channels.cache.get(player.textChannel).send({ embeds: [startqueue_embed] })
    }
    if (!language || language === "en") { // EN
        let startqueue_embed = new Discord.MessageEmbed()
        .setDescription(`${e.no} **The music ended and I left the voice channel!**`)
        .setColor("WHITE")
        client.channels.cache.get(player.textChannel).send({ embeds: [startqueue_embed] })
    }
}) // Queue End (Lavalink) | End

client.manager.on("playerMove", (player, currentChannel, newChannel) => { // End Call (Lavalink) | Start
    let canal = client.channels.cache.get(player.textChannel) 
    player.voiceChannel = client.channels.cache.get(newChannel);
    let language = db.get(`language_${canal.guild.id}`);

    if (language === "pt-BR") { // PT-BR
        player.destroy()
        player.disconnect()
        player.reset()

        let startqueue_embed = new Discord.MessageEmbed()
        .setDescription(`${e.no} **Fui removido do canal ou tentaram me transferir para outro canal de voz! Então eu parei de tocar!**`)
        .setColor("WHITE")
        client.channels.cache.get(player.textChannel).send({ embeds: [startqueue_embed] })
    }
    if (!language || language === "en") { // EN
        player.destroy()
        player.disconnect()
        player.reset()

        let startqueue_embed = new Discord.MessageEmbed()
        .setDescription(`${e.no} **I was removed from the channel or they tried to move me to another voice channel! So I stopped playing!**`)
        .setColor("WHITE")
        client.channels.cache.get(player.textChannel).send({ embeds: [startqueue_embed] })
    }
}) // End Call (Lavalink) | End

client.once("ready", () => {
    console.log("-> Lavalink is online and ready!");
    client.manager.init(client.user.id);
})

client.on("raw", (d) => client.manager.updateVoiceState(d));

// ========================================================== //

var { inviteTracker } = require("discord-inviter"), // Inviter logger | Start
tracker = new inviteTracker(client);
tracker.on("guildMemberAdd", async (member, inviter, invite, error) => {
    let language = db.get(`language_${member.guild.id}`);
    if (language === "pt-BR") { // PT-BR

        let canal_invite_pt = db.get(`beta_invite_logger_${member.guild.id}`);
        if (!canal_invite_pt) {
            return
        }
        if(error) return console.error(error);
        Msg = `> **Bem vindo <@${member.id}>!**\n> **convidado por: \`${inviter.tag}\`**\n> **Agora \`${inviter.tag}\` tem \`${invite.count}\` convite(s)**`;
        if (member.user.bot) {
            Msg = `**Bem vindo <@${member.id}>! convidado por: \`${inviter.tag}\`**`;
        }
        client.channels.cache.get(canal_invite_pt).send({ content: Msg })
    }
    if (!language || language === "en") { // EN

        let canal_invite_en = db.get(`beta_invite_logger_${member.guild.id}`);
        if (!canal_invite_en) {
            return
        }
        if(error) return console.error(error);
        Msg = `> **Welcome <@${member.id}>!**\n> **Invited by: \`${inviter.tag}\`**\n> **Now \`${inviter.tag}\` has \`${invite.count}\` invite(s)**`;
        if (member.user.bot) {
            Msg = `**Welcome <@${member.id}>! invited by \`${inviter.tag}\`**`;
        }
        client.channels.cache.get(canal_invite_en).send({ content: Msg })
    }
}) // Inviter logger | End