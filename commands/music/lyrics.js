const Discord = require("discord.js");
const db = require("quick.db");
const lyrics = require("music-lyrics"); 

module.exports = {
    name: "lyrics",
    aliases: ["letra"],
    cooldown: 1000 * 2,

    run: async (client, message, args) => {

        let prefix = db.get(`prefix_${message.guild.id}`) || "-"
        let music_lyrics = args.join(" ")

        let language = db.get(`language_${message.guild.id}`);
        if (language === "pt-BR") { // PT-BR
            try {
                if (!music_lyrics) {
                    let embed = new Discord.MessageEmbed()
                    .setColor("WHITE")
                    .setDescription(`> **Você não inseriu o nome de uma musíca! Para funcionar use: \`${prefix}lyrics <Nome da musíca>\`!**`)
                    return message.reply({ embeds: [embed] })
                }

                const lyric = await lyrics.search(music_lyrics);

                let embed_2 = new Discord.MessageEmbed()
                .setColor("WHITE")
                .setDescription(`**Letra da musíca ${music_lyrics}!**\n**\`\`\`txt\n${lyric}\`\`\`**`)
                message.reply({ embeds: [embed_2] })
            } catch {
                let embed_3 = new Discord.MessageEmbed()
                .setColor("WHITE")
                .setDescription(`> **Eu não achei a letra da musíca \`${music_lyrics}\`!**`)
                return message.reply({ embeds: [embed_3] })
            }
        }
        if (!language || language === "en") { // EN
            try {
                if (!music_lyrics) {
                    let embed = new Discord.MessageEmbed()
                    .setColor("WHITE")
                    .setDescription(`> **You didn't enter the name of a song! To work use: \`${prefix}lyrics <Song name>\`!**`)
                    return message.reply({ embeds: [embed] })
                }

                const lyric = await lyrics.search(music_lyrics);

                let embed_2 = new Discord.MessageEmbed()
                .setColor("WHITE")
                .setDescription(`**${music_lyrics} Lyrics!**\n**\`\`\`txt\n${lyric}\`\`\`**`)
                message.reply({ embeds: [embed_2] })
            } catch {
                let embed_3 = new Discord.MessageEmbed()
                .setColor("WHITE")
                .setDescription(`> **I couldn't find the song lyrics \`${music_lyrics}\`!**`)
                return message.reply({ embeds: [embed_3] })
            }
        }
        
    }
}