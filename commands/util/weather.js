const weather = require('weather-js')
const Discord = require('discord.js')
const db = require("quick.db")
module.exports = {
    name: "weather",
    aliases: ["clima"],
    cooldown: 1000 * 2,

    run: async(client, message, args) => {

        let language = db.get(`language_${message.guild.id}`);
        let prefix = db.get(`prefix_${message.guild.id}`) || "-"

        if (language === "pt-BR") { // PT-BR
            if (!args[0]) {
                return message.reply(`**Você precisa inserir uma localidade para isso! Exemplo: \`${prefix}weather Brasil\`**`)
            }
            weather.find({ search: args.join(' '), degreeType: 'C' }, function(err, result) {
                if (result[0] != undefined) {
                    var current = result[0].current;
                    var location = result[0].location;
                    const tempEmbed = new Discord.MessageEmbed()
                        .setDescription(`**${current.skytext}**`)
                        .setAuthor(`O clima atual da região de: ${current.observationpoint}`)
                        .setThumbnail(current.imageUrl)
                        .setColor('WHITE')
                        .addField(`Fuso horário:`, `UTC${location.timezone}`, true)
                        .addField(`Temperatura:`, `${current.temperature} Cº`, true)
                        .addField(`Sensação:`, `${current.feelslike} Cº`, true)
                        .addField(`Vento:`, `${current.winddisplay}`, true)
                        .addField(`Umidade:`, `${current.humidity}%`, true)
                    message.channel.send({ embeds: [tempEmbed] });
                } else {
                    message.reply('**<:no:930170194494636152> Este local está fora do meu alcance!**')
                }
            })
        }
        if (!language || language === "en") { // EN
            if (!args[0]) {
                return message.reply(`**You need to enter a locale for this! Example: \`${prefix}weather Canadá\`**`)
            }
            weather.find({ search: args.join(' '), degreeType: 'C' }, function(err, result) {
                if (result[0] != undefined) {
                    var current = result[0].current;
                    var location = result[0].location;
                    const tempEmbed = new Discord.MessageEmbed()
                        .setDescription(`**${current.skytext}**`)
                        .setAuthor(`Current climate in the region of: ${current.observationpoint}`)
                        .setThumbnail(current.imageUrl)
                        .setColor('WHITE')
                        .addField(`Timezone:`, `UTC${location.timezone}`, true)
                        .addField(`Temperature:`, `${current.temperature} Cº`, true)
                        .addField(`Sensation:`, `${current.feelslike} Cº`, true)
                        .addField(`Wind:`, `${current.winddisplay}`, true)
                        .addField(`Moisture:`, `${current.humidity}%`, true)
                    message.channel.send({ embeds: [tempEmbed] });
                } else {
                    message.reply('**<:no:930170194494636152> This location is out of my reach!**')
                }
            })
        }

    }
}