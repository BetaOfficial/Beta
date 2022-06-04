const Discord = require("discord.js")
const db = require("quick.db")
const config = require("../../database/config");
const Timeout = new Discord.Collection()
module.exports = async (client, message) => { 
    let prefix = db.get(`prefix_${message.guild.id}`) || "-"
    let language = db.get(`language_${message.guild.id}`)
    let channelcommands = db.fetch(`channelcommands_${message.guild.id}`)
    let owner = config.owners.ID1 || config.owners.ID2

    // HANDLER EVENT => START
    try {
        let prefix_menction = new Discord.MessageEmbed()
        .setColor("WHITE")
        .setDescription(`\n> **Hi I am here, my prefix is:** \`${prefix}\`!\n> **To use me just use: \`${prefix}help\`**`)
        if (message.content.startsWith(`<@!${client.user.id}>`) || message.content.startsWith(`<@${client.user.id}>`)) {
            return message.reply({ embeds: [prefix_menction] });
        }
        if (message.content.toLowerCase().startsWith(prefix)) {
            if(message.author.bot) return 
            if(message.channel.type === 'dm') return 
            if(!message.guild) return;
            
            let args = message.content.slice(prefix.length).trim().split(/ +/g)
            let cmd = args.shift().toLowerCase()
            if(cmd.length == 0) return;
            let command = client.commands.get(cmd);
            if(!command) command = client.commands.get(client.aliases.get(cmd))
                
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
            
                    let blacklist = db.get(`blacklist`, `${message.author.id}`)
                    if (blacklist === message.author.id) {
                        let embed_01 = new Discord.MessageEmbed()
                        .setDescription(`**Hey! Você nesse momento está em minha blacklist! Caso queira mais informações abra um ticket em nosso suporte: [dsc.gg/betasupport](https://dsc.gg/betasupport)!**`)
                        .setColor("WHITE")
                        return message.reply({ embeds: [embed_01] })
                    }

                    let maintenance = db.get(`maintenance`)
                    if (!owner.includes(message.author.id)) {
                        if (maintenance) {
                            let embed_01 = new Discord.MessageEmbed()
                            .setDescription(`**Hey! Estou em manutenção no momento por:\n\`\`\`txt\n${maintenance}\`\`\`\nCaso queira mais informações abra um ticket em nosso suporte: [dsc.gg/betasupport](https://dsc.gg/betasupport)!**`)
                            .setColor("WHITE")
                            return message.reply({ embeds: [embed_01] })
                        }
                    }

                    if (channelcommands){
                        if(message.channel.id != channelcommands) return message.reply(`**Hey! Use comandos apenas em <#${channelcommands}>!**`)
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
            
                    let blacklist = db.get(`blacklist`, `${message.author.id}`)
                    if (blacklist === message.author.id) {
                        let embed_01 = new Discord.MessageEmbed()
                        .setDescription(`**Hey! You are currently on my blacklist! If you want more information, open a ticket with our support: [dsc.gg/betasupport](https://dsc.gg/betasupport)!**`)
                        .setColor("WHITE")
                        return message.reply({ embeds: [embed_01] })
                    }

                    if (channelcommands){
                        if(message.channel.id != channelcommands) return message.reply(`**Hey! Use commands in <#${channelcommands}> only!**`)
                    }
                }
            }

            try {
                command.run(client, message, args)
                Timeout.set(`${command.name}${message.author.id}`, Date.now() + command.cooldown)
                setTimeout(() => {
                    Timeout.delete(`${command.name}${message.author.id}`)
                }, command.cooldown)

                const NOW = Date.now()
                let log = client.channels.cache.get("972899197504335933")
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
                log.send({ embeds: [logsEMBED] })
            } catch (err) {
                const NOW = Date.now()
                let log = client.channels.cache.get("972899197504335933")
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
                log.send({ embeds: [logsEMBED] })
            }
        }
    } catch (err) {
        console.log('=====[ ANTI CRASH - HANDLER EVENT ]=====')
        console.log(err)
        console.log('========================================')
    }

    // HANDLER EVENT => END

    // AFK => START
    let pessoa = db.get(`verificando_afk_${message.author.id}`);
    if (pessoa) {
        try {
            if(message.author.bot) return
            if (language === "pt-BR") { // PT-BR
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
        } catch (err) {
            console.log('=====[ ANTI CRASH - AFK ]=====')
            console.log(err)
            console.log('==============================')
        }
    }
    // AFK => END

    // ANTILINK => START
    let verificando = db.get(`antilink_${message.guild.id}`);
    if (verificando) {
        try {
            if (language === "pt-BR") { // PT-BR
                if (message.author.bot) return;
                if (message.channel.type == 'dm') return;
                if (message.member.permissions.has("ADMINISTRATOR")) return;
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
        } catch {
            console.log('=====[ ANTI CRASH - ANTILINK ]=====')
            console.log(err)
            console.log('==================================')
        }
    }
    // ANTILINK => END

    // ANTILINK => START
    let verificando2 = db.get(`antimention_${message.guild.id}`);
    if (verificando2) {
        try {
            if (language === "pt-BR") { // PT-BR
                if (message.author.bot) return;
                if (message.channel.type == 'dm') return;
                if (message.member.permissions.has("ADMINISTRATOR")) return;
                let verificando2 = db.get(`antimention_${message.guild.id}`);
                if (!verificando2 || verificando2 === "off" || verificando2 === null || verificando2 === false) return;
                if (verificando2 === "on") {
                    if (message.content.includes("<@everyone>" || "<@here>" || "@everyone" || "@here")) {
                        message.delete();
                        let embed_alertlink = new Discord.MessageEmbed()
                        .setDescription('<:no:930170194494636152> **Hey, apenas administradores podem mencionar \`@everyone\` ou \`@here\`!**')
                        .setColor("WHITE")
                        message.channel.send({ embeds: [embed_alertlink]})
                    }
                }
            }
            if (!language || language === "en") { // EN
                if (message.author.bot) return;
                if (message.channel.type == 'dm') return;
                let verificando2 = db.get(`antimention_${message.guild.id}`);
                if (!verificando2 || verificando2 === "off" || verificando2 === null || verificando2 === false) return;
                if (verificando2 === "on") {
                    if (message.member.permissions.has("ADMINISTRATOR")) return;
                    if (message.content.includes("<@everyone>" || "<@here>" || "@everyone" || "@here")) {
                        message.delete();

                        let embed_alertlink = new Discord.MessageEmbed()
                        .setDescription('<:no:930170194494636152> **Hey, only admins can mention \`@everyone\` or \`@here\`!**')
                        .setColor("WHITE")
                        message.channel.send({ embeds: [embed_alertlink]})
                    }
                }
            }
        } catch {
            console.log('=====[ ANTI CRASH - ANTIMENTION ]=====')
            console.log(err)
            console.log('======================================')
        }
    }
    // ANTILINK => END
}