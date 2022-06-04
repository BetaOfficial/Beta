const { MessageEmbed } = require('discord.js');
const Discord = require("discord.js");
const moment = require('moment');
const { mem, cpu, os } = require('node-os-utils');
const { stripIndent } = require('common-tags');
let ram = require("os");
const db = require("quick.db");
const config = require("../../../database/config");

module.exports =  {
    name: "stats",
    description: "〘INFO〙》 See my stats",
    type: "CHAT_INPUT",
    
    run: async (client, interaction, args) => {
        let language = db.get(`language_${interaction.guild.id}`);
        let prefix = db.get(`prefix_${interaction.guild.id}`) || "-"
        if (language === "pt-BR") {
            try {
                  
                const d = moment.duration(interaction.client.uptime);
                const days = (d.days() == 1) ? `${d.days()} dia` : `${d.days()} dias`;
                const hours = (d.hours() == 1) ? `${d.hours()} hora` : `${d.hours()} horas`;
                const minutes = (d.minutes() == 1) ? `${d.minutes()} minuto` : `${d.minutes()} minutos`;
                const seconds = (d.seconds() == 1) ? `${d.seconds()} segundo` : `${d.seconds()} segundos`;
                const clientStats = stripIndent`
                  Servidores   :: ${interaction.client.guilds.cache.size}
                  Prefixo    :: ${prefix}
                  Usuários     :: ${interaction.client.users.cache.size}
                  Canais  :: ${interaction.client.channels.cache.size}
                  Ping      :: ${Math.round(message.client.ws.ping)}ms
                  Uptime    :: ${days}, ${hours}, ${minutes}, ${seconds}!
                  Uso de RAM :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(ram.totalmem() / 1024 / 1024).toFixed(2)}MB`;
                const { totalMemMb, usedMemMb } = await mem.info();
                const serverStats = stripIndent`
                  OS        :: ${await os.oos()}
                  Cores     :: ${cpu.count()}
                  Uso de CPU :: ${await cpu.usage()}%
                  Uso de RAM  :: ${totalMemMb}MB
                `;
                  
                const embed = new MessageEmbed()
                .setTitle('Estatisticas do Beta™ | ' + config.bot.version)
                .addField('Comandos', `\`${interaction.client.commands.size}\` comandos`, true)
                .addField('Aliases', `\`${interaction.client.aliases.size}\` aliases`, true)
                .addField('Estatisticas Beta™:', `\`\`\`asciidoc\n${clientStats}\`\`\``)
                .addField('Estatisticas da Host:', `\`\`\`asciidoc\n${serverStats}\`\`\``)
                .setTimestamp()
                .setColor('WHITE');
                interaction.reply({ embeds: [embed] });
            } catch (err) {
                console.log(err)
            }
        } else if (language === "en" || !language) {
            try {      
                const d = moment.duration(interaction.client.uptime);
                const days = (d.days() == 1) ? `${d.days()} day` : `${d.days()} days`;
                const hours = (d.hours() == 1) ? `${d.hours()} hour` : `${d.hours()} hours`;
                const minutes = (d.minutes() == 1) ? `${d.minutes()} minute` : `${d.minutes()} minutes`;
                const seconds = (d.seconds() == 1) ? `${d.seconds()} second` : `${d.seconds()} seconds`;
                const clientStats = stripIndent`
                  Servers   :: ${interaction.client.guilds.cache.size}
                  Prefix    :: ${prefix}
                  Users     :: ${interaction.client.users.cache.size}
                  Channels  :: ${interaction.client.channels.cache.size}
                  Ping      :: ${Math.round(interaction.client.ws.ping)}ms
                  Uptime    :: ${days}, ${hours}, ${minutes}, ${seconds}!
                  Ram Usage :: ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} / ${(ram.totalmem() / 1024 / 1024).toFixed(2)}MB
                `;
                const { totalMemMb, usedMemMb } = await mem.info();
                const serverStats = stripIndent`
                  OS        :: ${await os.oos()}
                  Cores     :: ${cpu.count()}
                  CPU Usage :: ${await cpu.usage()}%
                  RAM Host  :: ${totalMemMb}MB
                  Host Usage:: ${usedMemMb}MB
                `;
                
                const embed = new MessageEmbed()
                .setTitle('Beta™ Statistics | ' + config.bot.version)
                .addField('Commands', `\`${interaction.client.commands.size}\` commands`, true)
                .addField('Aliases', `\`${interaction.client.aliases.size}\` aliases`, true)
                .addField('Beta™ Statistics:', `\`\`\`asciidoc\n${clientStats}\`\`\``)
                .addField('Host Statistics:', `\`\`\`asciidoc\n${serverStats}\`\`\``)
                .setTimestamp()
                .setColor('WHITE');
                interaction.reply({ embeds: [embed] });
            } catch (err) {
                console.log(err)
            }
        }
    }
}