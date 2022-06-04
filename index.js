const db = require("quick.db")
const Discord = require("discord.js")
const client = new Discord.Client({intents: 32767})
const config = require('./database/config')
const { convertTime } = require("./structures/convert.js")
const fs = require("fs")
const Spotify = require("erela.js-spotify")
const AppleMusic = require("erela.js-apple")
const Deezer = require("erela.js-deezer")
const Facebook = require("erela.js-facebook")
const { Manager } = require("erela.js")
const { inviteTracker } = require("discord-inviter")
const tracker = new inviteTracker(client)
const clientID = config.spotify.clientID
const clientSecret = config.spotify.clientSecret

client.login(config.bot.token); 

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

// ========================[ HANDLER ]======================= //

const slash = require("./handlers/slash")

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
client.slash = new Discord.Collection();
client.categories = fs.readdirSync('./commands/');
slash.loadSlashCommands(client);

client.manager = new Manager({
    plugins: [
        new Spotify({
            clientID,
            clientSecret
        }),
        new Deezer(),
        new AppleMusic(),
        new Facebook()
    ],
    nodes: [
        { host: `${config.nodes.node1}`, port: config.nodes.port1, password: `${config.nodes.password1}`, secure: config.nodes.secure1 },
    ],
    send(id, payload) {
        const guild = client.guilds.cache.get(id);
        if (guild) guild.shard.send(payload);
    },
});

fs.readdirSync('./commands/prefixCommands').forEach(local => {
    const commands = fs.readdirSync(`./commands/prefixCommands/${local}`).filter(file => file.endsWith('.js'))
    for(let file of commands) {
        let load = require(`./commands/prefixCommands/${local}/${file}`)
        if (load.name) {
            client.commands.set(load.name, load)
            console.log(`[ PrefixCommand Loaded ] => ${file}`);
        } else {
            console.log(`[ PrefixCommand Error ] => ${file}`);
            continue;
	}
        if (load.aliases && Array.isArray(load.aliases)) {
            load.aliases.forEach(x => client.aliases.set(x, load.name))
        }
    }
})

const events = fs.readdirSync('./events/client').filter(file => file.endsWith('.js'));
const invite = fs.readdirSync('./events/invite').filter(file => file.endsWith('.js'));
const logs = fs.readdirSync('./events/logs').filter(file => file.endsWith('.js'));

for (const file of events) {
    console.log(`[ EVENT LOADED ] - ${file}`);
    const event = require(`./events/client/${file}`);
    client.on(file.split(".")[0], event.bind(null, client));
};
for (const file of invite) {
    console.log(`[ EVENT LOADED ] - ${file}`);
    const event = require(`./events/invite/${file}`);
    tracker.on(file.split(".")[0], event.bind(null, client));
};
for (const file of logs) {
    console.log(`[ EVENT LOADED ] - ${file}`);
    const event = require(`./events/logs/${file}`);
    tracker.on(file.split(".")[0], event.bind(null, client));
};

client.manager.on("nodeConnect", node => console.log(`-> Node: ${node.options.identifier} ready!`))
client.manager.on("nodeError", (node, error) => console.log(`-> Error: ${node.options.identifier} error: ${error.message}`))

// =======================[ LAVALINK ]======================= //
client.manager.on("trackStart", (player, track) => {
    let canal = client.channels.cache.get(player.textChannel) 
    let language = db.get(`language_${canal.guild.id}`); 
    if (language === "pt-BR") { // PT-BR
        let startqueue_embed = new Discord.MessageEmbed()
        .setDescription(`${config.emoji.yes} **Tocando agora: \`${track.title}\` \`(${convertTime(track.duration, true)})\`**`)
        .setColor("WHITE")
        client.channels.cache.get(player.textChannel).send({ embeds: [startqueue_embed] })
    }
    if (!language || language === "en") { // EN
        let startqueue_embed = new Discord.MessageEmbed()
        .setDescription(`${config.emoji.yes} **Playing now: \`${track.title}\` \`(${convertTime(track.duration, true)})\`**`)
        .setColor("WHITE")
        client.channels.cache.get(player.textChannel).send({ embeds: [startqueue_embed] })
    }
})
client.manager.on("queueEnd", (player) => { 
    let canal = client.channels.cache.get(player.textChannel) 
    let language = db.get(`language_${canal.guild.id}`);
    
    player.destroy()
    player.disconnect();

    if (language === "pt-BR") { // PT-BR
        let startqueue_embed = new Discord.MessageEmbed()
        .setDescription(`${config.emoji.no} **A música acabou e eu saí do canal de voz!**`)
        .setColor("WHITE")
        client.channels.cache.get(player.textChannel).send({ embeds: [startqueue_embed] })
    }
    if (!language || language === "en") { // EN
        let startqueue_embed = new Discord.MessageEmbed()
        .setDescription(`${config.emoji.no} **The music ended and I left the voice channel!**`)
        .setColor("WHITE")
        client.channels.cache.get(player.textChannel).send({ embeds: [startqueue_embed] })
    }
}) 
client.manager.on("playerMove", (player, currentChannel, newChannel) => {
    let canal = client.channels.cache.get(player.textChannel) 
    player.voiceChannel = client.channels.cache.get(newChannel);
    let language = db.get(`language_${canal.guild.id}`);

    if (language === "pt-BR") { // PT-BR
        player.destroy()
        player.disconnect()

        let startqueue_embed = new Discord.MessageEmbed()
        .setDescription(`${config.emoji.no} **Fui removido do canal ou tentaram me transferir para outro canal de voz! Então eu parei de tocar!**`)
        .setColor("WHITE")
        client.channels.cache.get(player.textChannel).send({ embeds: [startqueue_embed] })
    }
    if (!language || language === "en") { // EN
        player.destroy()
        player.disconnect()

        let startqueue_embed = new Discord.MessageEmbed()
        .setDescription(`${config.emoji.no} **I was removed from the channel or they tried to move me to another voice channel! So I stopped playing!**`)
        .setColor("WHITE")
        client.channels.cache.get(player.textChannel).send({ embeds: [startqueue_embed] })
    }
}) 
client.once("ready", () => {
    console.log("-> Lavalink is online and ready!");
    client.manager.init(client.user.id);
})

client.on("raw", (d) => client.manager.updateVoiceState(d));
// ========================================================== //