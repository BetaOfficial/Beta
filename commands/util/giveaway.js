const Discord = require("discord.js");
const { MessageEmbed } = require('discord.js')
const ms = require("ms")
const db = require("quick.db")

module.exports = {
    name: "giveaway",
    aliases: ["sorteio"],
    cooldown: 1000 * 2,
    
    run: async(client, message, args) => {

      let language = db.get(`language_${message.guild.id}`);
      let prefix = db.get(`prefix_${message.guild.id}`) || "-"
      
      if (language === "pt-BR") { // PT-BR
        if (!message.member.permissions.has("MANAGE_GUILD")) {
          let embed = new Discord.MessageEmbed()
          .setDescription('> **<:no:930170194494636152> Você não tem permissão para `Gerenciar Servidor`**')
          .setColor("WHITE")
          return message.reply({ embeds: [embed] });
        }

        const canal = message.mentions.channels.first();
        const tempo = args[0]
        const prémio = args.slice(2).join(" ");

        const erro1 = new Discord.MessageEmbed()
        .setColor('WHITE')
        .setDescription(`<:no:930170194494636152> **Use: \`${prefix}giveaway [tempo] + [canal] + [premio]\`**`)

        const erro2 = new Discord.MessageEmbed()
        .setColor('WHITE')
        .setDescription(`<:no:930170194494636152> **O tempo precisa seguir do seguinte formato: 1d, 1h or 1m, D = Dias / H = Horas / M = Minutos.**`)

        const erro3 = new Discord.MessageEmbed()
        .setColor('WHITE')
        .setDescription(`<:no:930170194494636152> **Você precisa definir um canal específico! Use: \`${prefix}giveaway [tempo] + [canal] + [premio]\`**`)

        const erro4 = new Discord.MessageEmbed()
        .setColor('WHITE')
        .setDescription(`<:no:930170194494636152> **Você precisa adicionar um premio! Use: \`${prefix}giveaway [tempo] + [canal] + [premio]\`**`)


        if (!args[0]) {
          return message.reply({ embeds: [erro1] }).then(m => {
            setTimeout(() => {
              m.delete()
            }, 15000) // 15 segundos
          })
        }

        if (!args[0].endsWith("d") && !args[0].endsWith("h") && !args[0].endsWith("m")) {
          return message.reply({ embeds: [erro2] }).then(m => {
            setTimeout(() => {
              m.delete()
            }, 15000) // 15 segundos
          })
        }

        if (isNaN(args[0][0])) {
          return message.reply({ embeds: [erro3] }).then(m => {
            setTimeout(() => {
                m.delete()
            }, 15000) // 15 segundos
          })
        }

        if (!canal) {
          return message.reply({ embeds: [erro3] }).then(m => {
            setTimeout(() => {
                m.delete()
            }, 15000) // 15 segundos
          })
        }

        if (!prémio) {
          return message.reply({ embeds: [erro4] }).then(m => {
            setTimeout(() => {
                m.delete()
            }, 15000) // 15 segundos
          })
        }

        const start = new Discord.MessageEmbed()
        .setTitle(prémio)
        .setDescription(`**Reaja (🎉) para participar!**\n **Acaba em: \`${tempo}\`**\n**Iniciado por: ${message.author}**`)
        .setTimestamp(Date.now() + ms(args[0]))
        .setFooter({ text: 'Termina ás' })
        .setColor("WHITE");

        const finish = new Discord.MessageEmbed()
        .setTitle(prémio)
        .setDescription(`**Não há participantes suficientes para determinar um vencedor!**\n**Iniciado por: ${message.author}**`)
        .setColor("WHITE")

          
        const m = await canal.send({ content: `🎉   **NOVO SORTEIO!**   🎉`, embeds: [start] })
        m.react("🎉");

        await message.channel.send({ content: `🎉 **NOVO SORTEIO EM:** ${canal}` });

        setTimeout(() => {
          if (m.reactions.cache.get("🎉").count <= 1) {
            return canal.send({ content: `🎉   **SORTEIO TERMINADO!**   🎉`, embeds: [finish]});
          }

          const decisão = m.reactions.cache
          .get("🎉")
          .users.cache.filter((u) => !u.bot)
          .random();

          const vencedor = new Discord.MessageEmbed()
          .setDescription(`**Ganhador: ${decisão}!**`)
          .setColor("WHITE")
          canal.send({ content: `**GG ${decisão}! Você acaba de ganhar: ${prémio}!**`, embeds: [vencedor] });
        }, ms(args[0]));
      }
      if (!language || language === "en") { // EN
        if (!message.member.permissions.has("MANAGE_GUILD")) {
          let embed = new Discord.MessageEmbed()
          .setDescription('**<:no:930170194494636152> You do not have the permission to `Manager Server`**')
          .setColor("WHITE")
          return message.reply({ embeds: [embed] });
        }

        const canal = message.mentions.channels.first();
        const tempo = args[0]
        const prémio = args.slice(2).join(" ");

        const erro1 = new Discord.MessageEmbed()
        .setColor('WHITE')
        .setDescription(`<:no:930170194494636152> **Use: \`${prefix}giveaway [time] + [channel] + [prize]\`**`)

        const erro2 = new Discord.MessageEmbed()
        .setColor('WHITE')
        .setDescription(`<:no:930170194494636152> **The time needs to have the following format: 1d, 1h or 1m, D = Day / H = Hour / M = Minute.**`)

        const erro3 = new Discord.MessageEmbed()
        .setColor('WHITE')
        .setDescription(`<:no:930170194494636152> **Have to mention a specific channel! Use: \`${prefix}giveaway [time] + [channel] + [prize]\`**`)

        const erro4 = new Discord.MessageEmbed()
        .setColor('WHITE')
        .setDescription(`<:no:930170194494636152> **Have to add a prize! Use: \`${prefix}giveaway [time] + [channel] + [prize]\`**`)


        if (!args[0]) {
          return message.reply({ embeds: [erro1] }).then(m => {
            setTimeout(() => {
              m.delete()
            }, 15000) // 15 segundos
          })
        }

        if (!args[0].endsWith("d") && !args[0].endsWith("h") && !args[0].endsWith("m")) {
          return message.reply({ embeds: [erro2] }).then(m => {
            setTimeout(() => {
              m.delete()
            }, 15000) // 15 segundos
          })
        }

        if (isNaN(args[0][0])) {
          return message.reply({ embeds: [erro3] }).then(m => {
            setTimeout(() => {
                m.delete()
            }, 15000) // 15 segundos
          })
        }

        if (!canal) {
          return message.reply({ embeds: [erro3] }).then(m => {
            setTimeout(() => {
                m.delete()
            }, 15000) // 15 segundos
          })
        }

        if (!prémio) {
          return message.reply({ embeds: [erro4] }).then(m => {
            setTimeout(() => {
                m.delete()
            }, 15000) // 15 segundos
          })
        }

        const start = new Discord.MessageEmbed()
        .setTitle(prémio)
        .setDescription(`**React (🎉) to participate!**\n **Ends within: \`${tempo}\`**\n**Started by: ${message.author}**`)
        .setTimestamp(Date.now() + ms(args[0]))
        .setFooter({ text: 'Ends at' })
        .setColor("WHITE");

        const finish = new Discord.MessageEmbed()
        .setTitle(prémio)
        .setDescription(`**There are not enough entrants to determine a winner!**\n**Started by: ${message.author}**`)
        .setColor("WHITE")

          
        const m = await canal.send({ content: `🎉   **NEW GIVEAWAY**   🎉`, embeds: [start] })
        m.react("🎉");

        await message.channel.send({ content: `🎉 **NEW GIVEAWAY IN** ${canal}` });

        setTimeout(() => {
          if (m.reactions.cache.get("🎉").count <= 1) {
            return canal.send({ content: `🎉   **GIVEAWAY END**   🎉`, embeds: [finish]});
          }

          const decisão = m.reactions.cache
          .get("🎉")
          .users.cache.filter((u) => !u.bot)
          .random();

          const vencedor = new Discord.MessageEmbed()
          .setDescription(`**Winner: ${decisão}!**`)
          .setColor("WHITE")
          canal.send({ content: `**Congratulations ${decisão}! you won the ${prémio}**`, embeds: [vencedor] });
        }, ms(args[0]));
      }
    },
}