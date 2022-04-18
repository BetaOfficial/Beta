const Discord = require("discord.js"); 
const client = new Discord.Client({intents: 32767}); //Beta
const config = require("./Database/config.json");
const e = require("./Database/emojis.json")
const lavalink = require("./Database/lavalink.json")
const spotify = require("./Database/spotify.json")
const fs = require("fs");
const db = require("quick.db");
const ms = require("ms")
const Timeout = new Discord.Collection()
const { Client } = require("discord.js");
const { Manager } = require("erela.js");
let cpuStat = require("cpu-stat");
const Spotify = require("erela.js-spotify");
const AppleMusic = require("erela.js-apple");
const Deezer = require("erela.js-deezer");
let os = require("os");
let axios = require("axios");
const filter  = require("erela.js-filters");
const activities = [{ name: 'dsc.gg/betasupport', type: 'STREAMING' }];

client.login(config.token);


/////////////// ANTI - CRASH ///////////////

process.on('unhandledRejection', (reason, p) => {
    console.log(' [ ANTICRASH ] | SCRIPT REJEITADO');
    console.log(reason, p);
    console.log('=================================');
})

process.on("uncaughtException", (err, origin) => {
    console.log(' [ ANTICRASH ] | CATCH ERROR');
    console.log(err, origin);
    console.log('=================================');
}) 

process.on('uncaughtExceptionMonitor', (err, origin) => {
    console.log(' [ ANTICRASH ] | BLOQUEADO');
    console.log(err, origin);
    console.log('=================================');
})

process.on('multipleResolves', (type, promise, reason) => {
    console.log(' [ ANTICRASH ] | VÁRIOS ERROS');
    console.log(type, promise, reason);
    console.log('=================================');
})

////////////////////////////////////////////

client.on('ready', () => { //On Ready | Start
    console.log(`✅ | ${client.user.username} has logged in ${client.guilds.cache.size} servers`);
    let log = client.channels.cache.get("938390659558178826")
    let logsEMBED = new Discord.MessageEmbed()
    .setTitle(`Log - Bot Initialized`)
    .setColor("GREEN")
    .setDescription(`**I just booted, see my boot info just below:**`)
    .addFields(
      { name: 'Servers:', value: `\`${client.guilds.cache.size}\` Servers`, inline: false },
      { name: 'Users:', value: `\`${client.users.cache.size}\` Users`, inline: false },
      { name: 'Ping:', value: `\`${Math.round(client.ws.ping)}ms\``, inline: false },
      { name: 'Ram Usage:', value: `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB\``, inline: false },
    )
    .setTimestamp(Date.now())
    log.send({ embeds: [logsEMBED] }); //Logs
    client.user.setPresence({ status: 'online', activity: activities[2] });
    let activity = 2;
    setInterval(() => {
        activities[2] = { name: `${client.channels.cache.size} Channels`, type: 'WATCHING' };
        activities[3] = { name: `${client.users.cache.size} Users`, type: 'WATCHING' };
        activities[4] = { name: `${client.guilds.cache.size} Servers`, type: 'WATCHING' };
        activities[5] = { name: `-help | ${Math.round(client.ws.ping)}ms`, type: 'WATCHING' };
        activities[6] = { name: `sbt = small bots tops | ${Math.round(client.ws.ping)}ms`, type: 'PLAYING' };
        activities[7] = { name: `dsc.gg/betasupport | ${Math.round(client.ws.ping)}ms`, type: 'PLAYING' };
        if (activity > 7) activity = 2;
        client.user.setActivity(activities[activity]);
        activity++;
    }, 10000);
}) //On Ready | End

client.on("messageCreate", message => { //Menction | Start
    if (message.author.bot) return;
    if (message.channel.type == '') return;
    if(message.content == `<@${client.user.id}>` || message.content == `<@!${client.user.id}>`) {
        let prefix = db.get(`prefix_${message.guild.id}`) || "-"
        let bot = new Discord.MessageEmbed()
        .setColor("WHITE")
        .setDescription(`\n> **Hi I am here, my prefix is:** \`${prefix}\`!\n> **To use me just use: \`${prefix}help\`**`)
        message.channel.send({ embeds: [bot] })
    }
}) //Menction | End

client.on('interactionCreate', interaction => { // Ticket | Start

    let language = db.get(`language_${interaction.guild.id}`);
        
    if (language === "pt-BR") { // PT-BR

        let criar = new Discord.MessageButton().setCustomId("c").setLabel("Abrir Ticket").setStyle("PRIMARY")
        let fechar = new Discord.MessageButton().setCustomId("f").setLabel("Fechar Ticket").setStyle("PRIMARY")

        if (interaction.isButton()) {
            if (interaction.customId.startsWith('c')) {

                let achando = interaction.guild.channels.cache.find(a => a.name === `ticket-${interaction.user.id}`);

                if (achando) return interaction.reply({ content: `**\❌ ${interaction.user} Você já tem um ticket: ${achando}**`, ephemeral: true })

                interaction.guild.channels.create(`ticket-${interaction.user}`, {
                    permissionOverwrites: [
                        {
                    id: interaction.guild.roles.everyone,
                    deny: ["VIEW_CHANNEL"],
                        },
                        {
                            id: interaction.user.id,
                            allow: ["VIEW_CHANNEL", "SEND_MESSAGES", 'READ_MESSAGE_HISTORY']
                        }
                    ], 
                    
                                }).then(async channel => {

                                    interaction.reply({content: `Seu ticket foi criado em: ${channel}`, ephemeral: true})

                                    const row = new Discord.MessageActionRow().addComponents(fechar)

                                    let embed = new Discord.MessageEmbed()
                                    .setAuthor(interaction.guild.name, interaction.guild.iconURL({dynamic:true}))
                                    .setDescription(`**${interaction.user}.\n> Seu ticket está aberto!\n> Feche usando o botão logo abaixo!**`)
                                    .setColor("WHITE")
                                    .setFooter(interaction.guild.name, interaction.guild.iconURL({dynamic:true}))

                                    channel.send({ content: `${interaction.user}`,embeds: [embed], components: [row]}).then(msg => {
                                        msg.pin()
                                    })
                                })
            }
            if (interaction.customId.startsWith('f')) {

                interaction.reply(`**\🔒 ${interaction.user} Seu ticket será fechado em 5 segundos!**`)

                setTimeout( () => {

                    try {

                    interaction.channel.delete()

                    }
                    catch (er) 
                    {
                        console.log(er)
                    }

                }, 5000)

            }
        }
    }
    if (!language || language === "en") { // EN

        let criar = new Discord.MessageButton().setCustomId("c").setLabel("Open ticket").setStyle("PRIMARY")
        let fechar = new Discord.MessageButton().setCustomId("f").setLabel("Close ticket").setStyle("PRIMARY")

        if (interaction.isButton()) {
            if (interaction.customId.startsWith('c')) {

                let achando = interaction.guild.channels.cache.find(a => a.name === `ticket-${interaction.user.id}`);

                if (achando) return interaction.reply({ content: `**\❌ ${interaction.user} You already have an open ticket: ${achando}**`, ephemeral: true })

                interaction.guild.channels.create(`ticket-${interaction.user}`, {
                    permissionOverwrites: [
                        {
                    id: interaction.guild.roles.everyone,
                    deny: ["VIEW_CHANNEL"],
                        },
                        {
                            id: interaction.user.id,
                            allow: ["VIEW_CHANNEL", "SEND_MESSAGES", 'READ_MESSAGE_HISTORY']
                        }
                    ], 
                    
                                }).then(async channel => {

                                    interaction.reply({content: `Your ticket was created in: ${channel}`, ephemeral: true})

                                    const row = new Discord.MessageActionRow().addComponents(fechar)

                                    let embed = new Discord.MessageEmbed()
                                    .setAuthor(interaction.guild.name, interaction.guild.iconURL({dynamic:true}))
                                    .setDescription(`**${interaction.user}.\n> Your ticket is open!\n> Close your ticket with the button below.**`)
                                    .setColor("WHITE")
                                    .setFooter(interaction.guild.name, interaction.guild.iconURL({dynamic:true}))

                                    channel.send({ content: `${interaction.user}`,embeds: [embed], components: [row]}).then(msg => {
                                        msg.pin()
                                    })
                                })
            }
            if (interaction.customId.startsWith('f')) {

                interaction.reply(`**\🔒 ${interaction.user} Your ticket will close in 5 seconds!**`)

                setTimeout( () => {

                    try {

                    interaction.channel.delete()

                    }
                    catch (er) 
                    {
                        console.log(er)
                    }

                }, 5000)

            }
        }
    }
}); // Ticket | End


/////////////// HANDLER ///////////////

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
});

client.on("messageCreate", async (message) => {

    if (message.author.bot) return;

    let prefix = db.get(`prefix_${message.guild.id}`) || "-"
    let channelcommands = db.fetch(`channelcommands_${message.guild.id}`)

    if(message.content.startsWith === `<@${client.user.id}>` || message.content.startsWith === `<@!${client.user.id}>`) {
        console.log('hi')
    }
    
    if (message.author.bot) return;
    if (message.channel.type == 'dm') return;  
    
    if (!message.content.toLowerCase().startsWith(prefix.toLowerCase())) return;
        
    if(message.author.bot) return;
    if(message.channel.type === 'dm') return;
    
    if(!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    
    let cmd = args.shift().toLowerCase()
    if(cmd.length === 0) return;

    let command = client.commands.get(cmd)
    if(!command) command = client.commands.get(client.aliases.get(cmd)) 

    let language = db.get(`language_${message.guild.id}`);

    if (language === "pt-BR") { // EN
        if(command){
            if(command.cooldown){
                if(Timeout.has(`${command.name}${message.author.id}`)) {
                    let embed01 = new Discord.MessageEmbed()
                    .setDescription(`**Hey! Você está usando comandos muito rápido! Aguarde alguns milísegundos para usar novamente!**`)
                    .setColor("WHITE")
                    return message.reply({ embeds: [embed01] })
                }
            }
        }
    }
    if (!language || language === "en") { // EN
        if(command){
            if(command.cooldown){
                if(Timeout.has(`${command.name}${message.author.id}`)) {
                    let embed01 = new Discord.MessageEmbed()
                    .setDescription(`**Hey! You are using commands too fast! Wait a few milliseconds to use again!**`)
                    .setColor("WHITE")
                    return message.reply({ embeds: [embed01] })
                }
            }
        }
    }

    try {
        if (channelcommands){
            if(message.channel.id != channelcommands) return message.reply(`**Hey! Use commands in <#${channelcommands}> only!**`)
        }
        command.run(client, message, args)

        Timeout.set(`${command.name}${message.author.id}`, Date.now() + command.cooldown)
        setTimeout(() => {
            Timeout.delete(`${command.name}${message.author.id}`)
        }, command.cooldown)
        const NOW = Date.now() //Logs
        let log = client.channels.cache.get("938390659558178826")
        let logsEMBED = new Discord.MessageEmbed()
        .setTitle(`Log - Command Executed`)
        .setColor("WHITE")
        .setThumbnail(message.author.displayAvatarURL())
        .setDescription(`**See information on who executed this command:**`)
        .addFields(
            { name: 'User:', value: `\`${message.author.username}#${message.author.discriminator}\` (\`${message.author.id}\`)`, inline: false },
            { name: 'Executed:', value: `\`${prefix}${command.name} ${args}\``, inline: false },
            { name: 'Server:', value: `\`${message.guild.name}\` (\`${message.guild.id}\`)`, inline: false },
        )
        .setTimestamp(Date.now())
        log.send({ embeds: [logsEMBED] }); //Logs
    } catch (err) { 
        const NOW = Date.now() //Logs
        let log = client.channels.cache.get("938390659558178826")
        let logsEMBED = new Discord.MessageEmbed()
        .setTitle(`Log - Command not found`)
        .setColor("RED")
        .setThumbnail(message.author.displayAvatarURL())
        .setDescription(`**They tried to run a command on me and I couldn't find it, See information about this below:**`)
        .addFields(
            { name: 'User:', value: `\`${message.author.username}#${message.author.discriminator}\` (\`${message.author.id}\`)`, inline: false },
            { name: 'Executed:', value: `\`-${cmd}\``, inline: false },
            { name: 'Server:', value: `\`${message.guild.name}\` (\`${message.guild.id}\`)`, inline: false },
            )
        .setTimestamp(Date.now())
        log.send({ embeds: [logsEMBED] }); //Logs
    }
})

let verify = async () => {
    let push = await axios.get("https://google.com/api/betabot");
    if (push.data.lisence != key) {
        console.log("❎ | Invalid Key!");
    
        setTimeout(() => process.exit(), 0);
        return;
    } else {
        console.log("✅ | Correct Key!");
    }
};
verify();

///////////////////////////////////////

client.on("messageCreate", (message) => { // AFK System | Start

    if (message.author.bot) return;

    let language = db.get(`language_${message.guild.id}`);
    if (message.author.bot) return;

    if (language === "pt-BR") { // PT-BR
        let pessoa = db.get(`verificando_afk_${message.author.id}`);

        if (message.author.id === pessoa) {
            let embed_back = new Discord.MessageEmbed()
            .setDescription(`> **<:yes:930170194784043048> ${message.author} Seja bem vindo novamente! Já desativei seu modo AFK!**`)
            .setColor('WHITE')
            message.reply({ embeds: [embed_back]}).then(msg => {
                db.delete(`afk_${message.author.id}`);
                db.delete(`motivo_afk_${message.author.id}`)
                db.delete(`verificando_afk_${message.author.id}`)
            })
        } else {

            let user_afk = message.mentions.members.first();

            if (!user_afk) return;

            let motivo = db.get(`motivo_afk_${user_afk.id}`);
            let afk = db.get(`afk_${user_afk.id}`);
            
            let embed_alert = new Discord.MessageEmbed()
            .setDescription(`<:no:930170194494636152> **Calma ${message.author}! Agora ${user_afk.user.username} está com o modo AFK ativado! Motivo: \`${motivo}\`**`)
            .setColor('WHITE')
            if (afk === true) return message.reply({ embeds: [embed_alert] });
        } 
    }

    if (!language || language === "en") { // EN
        let pessoa = db.get(`verificando_afk_${message.author.id}`);

        if (message.author.id === pessoa) {
            let embed_back = new Discord.MessageEmbed()
            .setDescription(`> **<:yes:930170194784043048> ${message.author} Welcome again! I have already disabled your AFK mode!**`)
            .setColor('WHITE')
            message.reply({ embeds: [embed_back]}).then(msg => {
                db.delete(`afk_${message.author.id}`);
                db.delete(`motivo_afk_${message.author.id}`)
                db.delete(`verificando_afk_${message.author.id}`)
            })
        } else {

            let user_afk = message.mentions.members.first();

            if (!user_afk) return;

            let motivo = db.get(`motivo_afk_${user_afk.id}`);
            let afk = db.get(`afk_${user_afk.id}`);
            
            let embed_alert = new Discord.MessageEmbed()
            .setDescription(`<:no:930170194494636152> **Calm down ${message.author}! Now ${user_afk.user.username} has AFK mode activated! Reason: \`${motivo}\`**`)
            .setColor('WHITE')
            if (afk === true) return message.reply({ embeds: [embed_alert] });
        } 
    }
}) // AFK System | End

client.on('messageCreate', async (message) => { // Antilink | Start

    if (message.author.bot) return;

    let language = db.get(`language_${message.guild.id}`);
    if (language === "pt-BR") { // PT-BR

        if (message.author.bot) return;
        if (message.channel.type == 'dm') return;

        if (message.member.permissions.has("ADMINISTRATOR")) return;

        let verificando = db.get(`antilink_${message.guild.id}`);
        if (!verificando || verificando === "off" || verificando === null || verificando === false) return;

        if (verificando === "on") {

            if (message.content.includes("https".toLowerCase() || "http".toLowerCase() || "www".toLowerCase() || ".com".toLowerCase() || ".br".toLowerCase() || ".tk".toLowerCase() || ".co".toLowerCase() || ".gg".toLowerCase())) {

            message.delete();

            let embed_alertlink = new Discord.MessageEmbed()
            .setDescription('<:no:930170194494636152> **Ei! Apenas Administradores podem enviar link aqui!**')
            .setColor("WHITE")
            message.channel.send({ embeds: [embed_alertlink]})

            }
        }
    }
    if (!language || language === "en") { // EN

        if (message.author.bot) return;
        if (message.channel.type == 'dm') return;

        let verificando = db.get(`antilink_${message.guild.id}`);
        if (!verificando || verificando === "off" || verificando === null || verificando === false) return;

        if (verificando === "on") {

            if (message.member.permissions.has("ADMINISTRATOR")) return;

            if (message.content.includes("https".toLowerCase() || "http".toLowerCase() || "www".toLowerCase() || ".com".toLowerCase() || ".br".toLowerCase() || ".tk".toLowerCase() || ".co".toLowerCase() || ".gg".toLowerCase())) {

            message.delete();

            let embed_alertlink = new Discord.MessageEmbed()
            .setDescription('<:no:930170194494636152> **Hey, only admins can send link here!**')
            .setColor("WHITE")
            message.channel.send({ embeds: [embed_alertlink]})

            }
        }
    }
}) // Antilink | End

///////////// LAVA LINK /////////////

let clientID = spotify.clientID
let clientSecret = spotify.clientSecret

client.manager = new Manager({
    plugins: [
        // Initiate the plugin and pass the two required options.
        new Spotify({
            clientID,
            clientSecret
        }),
        new Deezer(),
        new AppleMusic(),
        new filter()
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

console.log(`========= BETA - LOGS =========`)

client.manager.on("nodeConnect", node => console.log(`✅ | Node: ${node.options.identifier} ready!`))
client.manager.on("nodeError", (node, error) => console.log(`❎ | Error: ${node.options.identifier} error: ${error.message}`))

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
  console.log("✅ | Lavalink is ready!");
  client.manager.init(client.user.id);
})

client.on("raw", (d) => client.manager.updateVoiceState(d));

/////////////////////////////////////

client.on("guildMemberAdd", (member) => { // Welcome | Start
    let beta_welcome_channel = db.get(`beta_welcome_${member.guild.id}`);
    let server_counter = member.guild.memberCount;
    let server = member.guild.name;
  
    if (!beta_welcome_channel) return;

    let language = db.get(`language_${member.guild.id}`);

    if (language === "pt-BR") { // PT-BR

        let embed = new Discord.MessageEmbed()
        .setAuthor(`${member.user.tag}`, member.user.avatarURL())
        .setTitle(`**Bem vindo!**`)
        .setDescription(`**Bem vindo ${member.user} ao servidor: \n\`${server}\`!**\n\n`)
        .addField(`**Você é o \`${server_counter}*\` membro deste servidor!**`, '**Eu espero que goste do servidor!**')
        .setColor("WHITE")
        .setThumbnail(member.user.avatarURL())
        .setImage('https://i.imgur.com/mfcnP6O.jpg')
        
        let beta_channel = client.channels.cache.get(beta_welcome_channel)
        beta_channel.send({ embeds: [embed] }).catch(() => {
            console.log("error")
        })
    }
    if (!language || language === "en") { // EN

        let embed = new Discord.MessageEmbed()
        .setAuthor(`${member.user.tag}`, member.user.avatarURL())
        .setTitle(`**Welcome!**`)
        .setDescription(`**Welcome ${member.user} to the server \n\`${server}\`!**\n\n`)
        .addField(`**You are the \`${server_counter}th\` member of that server!**`, '**I hope you like this server!**')
        .setColor("WHITE")
        .setThumbnail(member.user.avatarURL())
        .setImage('https://i.imgur.com/mfcnP6O.jpg')
        
        let beta_channel = client.channels.cache.get(beta_welcome_channel)
        beta_channel.send({ embeds: [embed] }).catch(() => {
            console.log("error")
        })
    }
})// Welcome | End

client.on("guildMemberRemove", (member) => { // Leave | Start
    let language = db.get(`language_${member.guild.id}`);
        
    if (language === "pt-BR") { // PT-BR
        let beta_leave_channel = db.get(`beta_leave_${member.guild.id}`);
        let server_counter = member.guild.memberCount;

        if (!beta_leave_channel) return;
    
        let embed = new Discord.MessageEmbed() //mensagem embed
        .setAuthor(`${member.user.tag}`, member.user.avatarURL())
        .setTitle(`**Eu estou triste...**`)
        .setDescription(`**Oh, ${member.user} saiu do servidor...**`)
        .addField(`**Agora temos \`${server_counter}\` membros neste servidor!**`, '**Espero que ele volte...**')
        .setColor("WHITE")
        .setThumbnail(member.user.avatarURL())
        .setImage('https://i.imgur.com/TRCmCs4.jpg')
        
        let beta_channel = client.channels.cache.get(beta_leave_channel)
        beta_channel.send({ embeds: [embed] }).catch(() => {})
    }
    if (!language || language === "en") { // EN
        let beta_leave_channel = db.get(`beta_leave_${member.guild.id}`);
        let server_counter = member.guild.memberCount;

        if (!beta_leave_channel) return;
    
        let embed = new Discord.MessageEmbed() //mensagem embed
        .setAuthor(`${member.user.tag}`, member.user.avatarURL())
        .setTitle(`**I am sad...**`)
        .setDescription(`**Oh, ${member.user} leave on the server...**`)
        .addField(`**We now have \`${server_counter}\` members on this server!**`, '**I hope he comes back...**')
        .setColor("WHITE")
        .setThumbnail(member.user.avatarURL())
        .setImage('https://i.imgur.com/TRCmCs4.jpg')
        
        let beta_channel = client.channels.cache.get(beta_leave_channel)
        beta_channel.send({ embeds: [embed] }).catch(() => {})
    }
})// Leave | End

client.on('guildDelete', function(guild) { // Bot Leave Log (Owner) | Start
    const NOW = Date.now() //Logs
    let log = client.channels.cache.get("938390659558178826")
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
    log.send({ embeds: [logsEMBED] }); //Logs
}); // Bot Leave Log (Owner) | End

let key = config.key;

client.on('guildCreate', function(guild) { // Bot Join Log (Owner) | Start
    const NOW = Date.now() //Logs
    let log = client.channels.cache.get("938390659558178826")
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
}); // Bot Join Log (Owner) | End

client.on('messageCreate', async (message) => { // Antimention | Start

    if (message.author.bot) return;

    let language = db.get(`language_${message.guild.id}`);
        
    if (language === "pt-BR") { // PT-BR

        if (message.author.bot) return;
        if (message.channel.type == 'dm') return;

        let verificando = db.get(`antimention_${message.guild.id}`);
        if (!verificando || verificando === "off" || verificando === null || verificando === false) return;

        if (verificando === "on") {

            if (message.member.permissions.has("MANAGE_GUILD")) return;
            if (message.member.permissions.has("ADMINISTRATOR")) return;

            if (message.content.includes("@everyone".toLowerCase() || "@here".toLowerCase())) {

            message.delete();

            let embed_alertlink = new Discord.MessageEmbed()
            .setDescription('<:no:930170194494636152> **Ei! Você não pode marcar `@everyone`!**')
            .setColor("WHITE")
            message.channel.send({ embeds: [embed_alertlink]})

            }
        }
    }
    if (!language || language === "en") { // EN

        if (message.author.bot) return;
        if (message.channel.type == 'dm') return;

        let verificando = db.get(`antimention_${message.guild.id}`);
        if (!verificando || verificando === "off" || verificando === null || verificando === false) return;

        if (verificando === "on") {

            if (message.member.permissions.has("MANAGE_GUILD")) return;
            if (message.member.permissions.has("ADMINISTRATOR")) return;

            if (message.content.includes("@everyone".toLowerCase() || "@here".toLowerCase())) {

            message.delete();

            let embed_alertlink = new Discord.MessageEmbed()
            .setDescription('<:no:930170194494636152> **Hey, only admins can mark `@everyone`!**')
            .setColor("WHITE")
            message.channel.send({ embeds: [embed_alertlink]})

            }
        }
    }
}) // Antimention | End

client.on("guildMemberRemove", (member) => { // Logs leave member | Start
    let language = db.get(`language_${member.guild.id}`);
        
    if (language === "pt-BR") { // PT-BR
        let logs = db.get(`channellogs_${member.guild.id}`);

        if (!logs) return;

        let server_counter = member.guild.memberCount;
    
        let embed = new Discord.MessageEmbed() //mensagem embed
        .setAuthor(`${member.user.tag}`, member.user.avatarURL())
        .setTitle(`**Logs - Usuário saiu**`)
        .setDescription(`**\`${member.user.tag}\` saiu do servidor, \`${server_counter}\` membros restantes**`)
        .setColor("WHITE")
        .setThumbnail(member.user.avatarURL())
        .setTimestamp()
        
        let beta_channel = client.channels.cache.get(logs)
        beta_channel.send({ embeds: [embed] }).catch(() => {})
    }
    if (!language || language === "en") { // EN
        let logs = db.get(`channellogs_${member.guild.id}`);

        if (!logs) return;

        let server_counter = member.guild.memberCount;
    
        let embed = new Discord.MessageEmbed() //mensagem embed
        .setAuthor(`${member.user.tag}`, member.user.avatarURL())
        .setTitle(`**Logs - User Leave**`)
        .setDescription(`**\`${member.user.tag}\` left the server, \`${server_counter}\` members left**`)
        .setColor("WHITE")
        .setThumbnail(member.user.avatarURL())
        .setTimestamp()
        
        let beta_channel = client.channels.cache.get(logs)
        beta_channel.send({ embeds: [embed] }).catch(() => {})
    }
})// Logs leave member | End

client.on("guildMemberAdd", (member) => { // Logs join member | Start
    let language = db.get(`language_${member.guild.id}`);
    if (language === "pt-BR") { // PT-BR
            let logs = db.get(`channellogs_${member.guild.id}`);

            if (!logs) return;

            let server_counter = member.guild.memberCount;
        
            let embed = new Discord.MessageEmbed() //mensagem embed
            .setAuthor(`${member.user.tag}`, member.user.avatarURL())
            .setTitle(`**Logs - Usuário entrou**`)
            .setDescription(`**\`${member.user.tag}\` entrou e agora existem \`${server_counter}\` membros neste servidor!**`)
            .setColor("WHITE")
            .setThumbnail(member.user.avatarURL())
            .setTimestamp()
            
            let beta_channel = client.channels.cache.get(logs)
            beta_channel.send({ embeds: [embed] }).catch(() => {})
    }
    if (!language ||language === "en") { // EN
        let logs = db.get(`channellogs_${member.guild.id}`);

        if (!logs) return;

        let server_counter = member.guild.memberCount;
    
        let embed = new Discord.MessageEmbed() //mensagem embed
        .setAuthor(`${member.user.tag}`, member.user.avatarURL())
        .setTitle(`**Logs - User Join**`)
        .setDescription(`**\`${member.user.tag}\` joined and now we have \`${server_counter}\` members**`)
        .setColor("WHITE")
        .setThumbnail(member.user.avatarURL())
        .setTimestamp()
        
        let beta_channel = client.channels.cache.get(logs)
        beta_channel.send({ embeds: [embed] }).catch(() => {})
    }
})// Logs join member | End

client.on("messageDelete", (message, oldMessage) => { // Logs message delete | Start

    if (message.author.bot) return;

    let language = db.get(`language_${message.guild.id}`);
    if (language === "pt-BR") { // PT-BR
        let logs = db.get(`channellogs_${message.guild.id}`);

        if (!logs) return;

        let member = message.author;
        let msgchannel = message.channel;
        let msg = message.content;

        let embed = new Discord.MessageEmbed() //mensagem embed
        .setTitle(`**Logs - Mensagem apagada**`)
        .setDescription(`**\`${member.tag}\` apagou uma mensagem!, verifique logo abaixo:**`)
        .addFields(
            {
                name: `**Canal:**`,
                value: `${msgchannel}`,
                inline: false,
            },
        )
        .addFields(
            {
                name: `**Mensagem:**`,
                value: `\`\`\`${msg}\`\`\``,
                inline: false
            },
        )
        .setColor("WHITE")
        .setThumbnail(member.avatarURL())
        .setTimestamp()

        let beta_channel = client.channels.cache.get(logs)
        beta_channel.send({ embeds: [embed] }).catch(() => {})
    }
    if (!language || language === "en") { // EN
        let logs = db.get(`channellogs_${message.guild.id}`);

        if (!logs) return;

        let member = message.author;
        let msgchannel = message.channel;
        let msg = message.content;

        let embed = new Discord.MessageEmbed() //mensagem embed
        .setTitle(`**Logs - Message Delete**`)
        .setDescription(`**\`${member.tag}\` deleted the message, check it out below:**`)
        .addFields(
            {
                name: `**Channel:**`,
                value: `${msgchannel}`,
                inline: false,
            },
        )
        .addFields(
            {
                name: `**Message:**`,
                value: `\`\`\`${msg}\`\`\``,
                inline: false
            },
        )
        .setColor("WHITE")
        .setThumbnail(member.avatarURL())
        .setTimestamp()

        let beta_channel = client.channels.cache.get(logs)
        beta_channel.send({ embeds: [embed] }).catch(() => {})
    }
})// Logs message delete | End


var { inviteTracker } = require("discord-inviter"), // Inviter logger | Start
tracker = new inviteTracker(client);
tracker.on("guildMemberAdd", async (member, inviter, invite, error) => {
    let language = db.get(`language_${member.guild.id}`);
    if (language === "pt-BR") { // PT-BR

        let canal_invite_pt = db.get(`beta_invite_logger_${member.guild.id}`);
        if (!canal_invite_pt) {
            return
        }
        let canal_invite_1 = client.channels.cache.get(canal_invite_pt)
        if(error) return console.error(error);
        Msg = `> **Bem vindo ${member.user}!**\n> **convidado por: \`${inviter.tag}\`**\n> **Agora \`${inviter.tag}\` tem \`${invite.count}\` convite(s)**`;
        if (member.user.bot) {
            Msg = `**Bem vindo ${member.user}! convidado por: \`${inviter.tag}\`**`;
        }
        canal_invite_1.send(Msg);
    }
    if (!language || language === "en") { // EN

        let canal_invite_en = db.get(`beta_invite_logger_${member.guild.id}`);
        if (!canal_invite_en) {
            return
        }
        let canal_invite_2 = client.channels.cache.get(canal_invite_en)
        if(error) return console.error(error);
        Msg = `> **Welcome ${member.user}!**\n> **Invited by: \`${inviter.tag}\`**\n> **Now \`${inviter.tag}\` has \`${invite.count}\` invite(s)**`;
        if (member.user.bot) {
            Msg = `**Welcome ${member.user}! invited by \`${inviter.tag}\`**`;
        }
        canal_invite_2.send(Msg);
    }
}) // Inviter logger | End