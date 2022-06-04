const { MessageEmbed } = require('discord.js');
const Discord = require("discord.js");
const moment = require('moment');
const { mem, cpu, os } = require('node-os-utils');
const { stripIndent } = require('common-tags');
let ram = require("os");
const db = require("quick.db");
const config = require("../../../database/config");

module.exports = {
  name: "stats",
  cooldown: 1000 * 2,

  run: async (client, message, args) => {

    let language = db.get(`language_${message.guild.id}`);

    let prefix = db.get(`prefix_${message.guild.id}`) || "-"

    if (language === "pt-BR") { // PT-BR
      try {
                  
        const d = moment.duration(message.client.uptime);
        const days = (d.days() == 1) ? `${d.days()} dia` : `${d.days()} dias`;
        const hours = (d.hours() == 1) ? `${d.hours()} hora` : `${d.hours()} horas`;
        const minutes = (d.minutes() == 1) ? `${d.minutes()} minuto` : `${d.minutes()} minutos`;
        const seconds = (d.seconds() == 1) ? `${d.seconds()} segundo` : `${d.seconds()} segundos`;
        const clientStats = stripIndent`
          Servidores   :: ${message.client.guilds.cache.size}
          Prefixo    :: ${prefix}
          Usuários     :: ${message.client.users.cache.size}
          Canais  :: ${message.client.channels.cache.size}
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
        .addField('Comandos', `\`${message.client.commands.size}\` comandos`, true)
        .addField('Aliases', `\`${message.client.aliases.size}\` aliases`, true)
        .addField('Estatisticas Beta™:', `\`\`\`asciidoc\n${clientStats}\`\`\``)
        .addField('Estatisticas da Host:', `\`\`\`asciidoc\n${serverStats}\`\`\``)
        .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor('WHITE');
        message.channel.send({ embeds: [embed] });
      } catch (err) {
        console.log('Error detected in stats command')
      }
    }

    if (!language || language === "en") { // EN
      try {      
        const d = moment.duration(message.client.uptime);
        const days = (d.days() == 1) ? `${d.days()} day` : `${d.days()} days`;
        const hours = (d.hours() == 1) ? `${d.hours()} hour` : `${d.hours()} hours`;
        const minutes = (d.minutes() == 1) ? `${d.minutes()} minute` : `${d.minutes()} minutes`;
        const seconds = (d.seconds() == 1) ? `${d.seconds()} second` : `${d.seconds()} seconds`;
        const clientStats = stripIndent`
          Servers   :: ${message.client.guilds.cache.size}
          Prefix    :: ${prefix}
          Users     :: ${message.client.users.cache.size}
          Channels  :: ${message.client.channels.cache.size}
          Ping      :: ${Math.round(message.client.ws.ping)}ms
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
        .addField('Commands', `\`${message.client.commands.size}\` commands`, true)
        .addField('Aliases', `\`${message.client.aliases.size}\` aliases`, true)
        .addField('Beta™ Statistics:', `\`\`\`asciidoc\n${clientStats}\`\`\``)
        .addField('Host Statistics:', `\`\`\`asciidoc\n${serverStats}\`\`\``)
        .setFooter(message.member.displayName,  message.author.displayAvatarURL({ dynamic: true }))
        .setTimestamp()
        .setColor('WHITE');
        message.channel.send({ embeds: [embed] });
      } catch (err) {
        console.log('Error detected in stats command')
      }
    }
  }
}