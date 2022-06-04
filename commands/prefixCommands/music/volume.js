const { MessageEmbed } = require("discord.js");
const db = require("quick.db")

module.exports = {
    name: "volume",
	aliases: ["vol"],
	cooldown: 1000 * 2,
	
	run: async (client, message, args) => {

		let prefix = db.get(`prefix_${message.guild.id}`) || "-"
		let language = db.get(`language_${message.guild.id}`);
		let d = db.get(`premium_${message.author.id}`);
        
        if (language === "pt-BR") { // PT-BR
			try {

				let channel = message.member.voice.channel;
				let myVoice = message.guild.me.voice.channel;

				if (!channel) {
					let embed_error_1 = new Discord.MessageEmbed()
					.setDescription('<:no:930170194494636152> **Você precisa estar em um canal de voz para poder tocar qualquer música!**')
					.setColor("WHITE")
					return message.reply({ embeds: [embed_error_1] }).catch(() => {
						message.channel.send('<:no:930170194494636152> **Desculpe, não consigo executar este comando por falta de permissão!**')
					})
				}
				if (myVoice && channel.id !== myVoice.id) {
					let embed_error_2 = new Discord.MessageEmbed()
					.setDescription('<:no:930170194494636152> **Já estou tocando uma música neste servidor!**')
					.setColor("WHITE")
					return message.reply({ embeds: [embed_error_2] }).catch(() => {
						message.channel.send('<:no:930170194494636152> **Desculpe, não consigo executar este comando por falta de permissão!**')
					})
				}

				
				const player = client.manager.create({
					guild: message.guild.id,
					voiceChannel: message.member.voice.channel.id,
					textChannel: message.channel.id
				});

				if (!player.queue.current) {
					let thing = new MessageEmbed()
					.setColor("WHITE")
					.setDescription("**<:no:930170194494636152> Não tem musica tocando agora!**");
					return message.reply({embeds: [thing]}).catch(() => {
						message.channel.send('<:no:930170194494636152> **Desculpe, não consigo executar este comando por falta de permissão!**')
					})
				}

				if (!args.length) {
					let thing = new MessageEmbed()
					.setColor("WHITE")
					.setTimestamp()
					.setDescription(`**<:yes:930170194784043048> O volume atual é: \`${player.volume}%\`**`)
					return message.reply({embeds: [thing]}).catch(() => {
							message.channel.send('<:no:930170194494636152> **Desculpe, não consigo executar este comando por falta de permissão!**')
					})
				}

				const volume = Number(args[0]);

				if (d != true) {
					if (!volume || volume < 0 || volume > 100) { 
						let thing = new MessageEmbed()
							.setColor("WHITE")
							.setDescription(`**<:no:930170194494636152> Use: \`${prefix}volume <Numero do volume, use de 0 - 100>\`**`)
						return message.reply({embeds: [thing]}).catch(() => {
							message.channel.send('<:no:930170194494636152> **Desculpe, não consigo executar este comando por falta de permissão!**')
						})
					}
				} else {
					if (!volume || volume < 0 || volume > 500) { 
						let thing = new MessageEmbed()
							.setColor("WHITE")
							.setDescription(`**<:no:930170194494636152> Use: \`${prefix}volume <Numero do volume, use de 0 - 500>\`**`)
						return message.reply({embeds: [thing]}).catch(() => {
							message.channel.send('<:no:930170194494636152> **Desculpe, não consigo executar este comando por falta de permissão!**')
						})
					}
				}

				player.setVolume(volume);

				if (volume > player.volume) {
					let thing = new MessageEmbed()
						.setColor("WHITE")
						.setTimestamp()
						.setDescription(`**<:yes:930170194784043048> Volume definido em: \`${volume}%\`**`)
				return message.reply({embeds: [thing]}).catch(() => {
					message.channel.send('<:no:930170194494636152> **Desculpe, não consigo executar este comando por falta de permissão!**')
				})
				} else if (volume < player.volume) {
					let thing = new MessageEmbed()
						.setColor("WHITE")
						.setTimestamp()
						.setDescription(`**<:yes:930170194784043048> Volume definido em: \`${volume}%\`**`)
				return message.reply({embeds: [thing]}).catch(() => {
					message.channel.send('<:no:930170194494636152> **Desculpe, não consigo executar este comando por falta de permissão!**')
				})
				} else {
					let thing = new MessageEmbed()
						.setColor("WHITE")
						.setTimestamp()
						.setDescription(`**<:yes:930170194784043048> Volume definido em: \`${volume}%\`**`)
					return message.reply({embeds: [thing]}).catch(() => {
						message.channel.send('<:no:930170194494636152> **Desculpe, não consigo executar este comando por falta de permissão!**')
					})
				}
			} catch (err) {
				let embed = new Discord.MessageEmbed()
                .setDescription(`${config.emoji.no} **Eu não estou tocando nada nesse servidor ou não consegui concluir a ação!**`)
                .setColor("WHITE")
                return message.reply({ embeds: [embed] }).catch(() => {
                    message.channel.send('<:no:930170194494636152> **Desculpe, não consigo executar este comando por falta de permissão!**')
                })
			}
		}
		if (!language || language === "en") { // EN
			try {

				let channel = message.member.voice.channel;
				let myVoice = message.guild.me.voice.channel;

				if (!channel) {
					let embed_error_1 = new Discord.MessageEmbed()
					.setDescription('<:no:930170194494636152> **You need to be on a voice channel to be able to volume any music!**')
					.setColor("WHITE")
					return message.reply({ embeds: [embed_error_1] }).catch(() => {
						message.channel.send('<:no:930170194494636152> **Sorry, I can\'t execute this command due to lack to lack of permission!**')
					})
				}
				if (myVoice && channel.id !== myVoice.id) {
					let embed_error_2 = new Discord.MessageEmbed()
					.setDescription('<:no:930170194494636152> **I\'m already playing a song on this server!**')
					.setColor("WHITE")
					return message.reply({ embeds: [embed_error_2] }).catch(() => {
						message.channel.send('<:no:930170194494636152> **Sorry, I can\'t execute this command due to lack to lack of permission!**')
					})
				}

				
				const player = client.manager.create({
					guild: message.guild.id,
					voiceChannel: message.member.voice.channel.id,
					textChannel: message.channel.id
				});

				if (!player.queue.current) {
					let thing = new MessageEmbed()
					.setColor("WHITE")
					.setDescription("**<:no:930170194494636152> There is no music playing.**");
					return message.reply({embeds: [thing]}).catch(() => {
						message.channel.send('<:no:930170194494636152> **Sorry, I can\'t execute this command due to lack to lack of permission!**')
					})
				}

				if (!args.length) {
					let thing = new MessageEmbed()
					.setColor("WHITE")
					.setTimestamp()
					.setDescription(`**<:yes:930170194784043048> The current volume is: \`${player.volume}%\`**`)
					return message.reply({embeds: [thing]}).catch(() => {
							message.channel.send('<:no:930170194494636152> **Sorry, I can\'t execute this command due to lack to lack of permission!**')
					})
				}

				const volume = Number(args[0]);

				if (d != true) {
					if (!volume || volume < 0 || volume > 100) { 
						let thing = new MessageEmbed()
							.setColor("WHITE")
							.setDescription(`**<:no:930170194494636152> Use: \`${prefix}volume <Number of volume between 0 - 100>\`**`)
						return message.reply({embeds: [thing]}).catch(() => {
							message.channel.send('<:no:930170194494636152> **Sorry, I can\'t execute this command due to lack to lack of permission!**')
						})
					}
				} else {
					if (!volume || volume < 0 || volume > 500) { 
					let thing = new MessageEmbed()
						.setColor("WHITE")
						.setDescription(`**<:no:930170194494636152> Use: \`${prefix}volume <Number of volume between 0 - 500>\`**`)
					return message.reply({embeds: [thing]}).catch(() => {
						message.channel.send('<:no:930170194494636152> **Sorry, I can\'t execute this command due to lack to lack of permission!**')
					})
				}
				}

				player.setVolume(volume);

				if (volume > player.volume) {
					let thing = new MessageEmbed()
						.setColor("WHITE")
						.setTimestamp()
						.setDescription(`**<:yes:930170194784043048> Volume set to: \`${volume}%\`**`)
				return message.reply({embeds: [thing]}).catch(() => {
					message.channel.send('<:no:930170194494636152> **Sorry, I can\'t execute this command due to lack to lack of permission!**')
				})
				} else if (volume < player.volume) {
					let thing = new MessageEmbed()
						.setColor("WHITE")
						.setTimestamp()
						.setDescription(`**<:yes:930170194784043048> Volume set to: \`${volume}%\`**`)
				return message.reply({embeds: [thing]}).catch(() => {
					message.channel.send('<:no:930170194494636152> **Sorry, I can\'t execute this command due to lack to lack of permission!**')
				})
				} else {
					let thing = new MessageEmbed()
						.setColor("WHITE")
						.setTimestamp()
						.setDescription(`**<:yes:930170194784043048> Volume set to: \`${volume}%\`**`)
					return message.reply({embeds: [thing]}).catch(() => {
						message.channel.send('<:no:930170194494636152> **Sorry, I can\'t execute this command due to lack to lack of permission!**')
					})
				}
			} catch (err) {
				let embed = new Discord.MessageEmbed()
                .setDescription(`${config.emoji.no} **I'm not playing anything on this server or I couldn't complete the action**`)
                .setColor("WHITE")
                return message.reply({ embeds: [embed] }).catch(() => {
                    message.channel.send('<:no:930170194494636152> **Sorry, I can\'t execute this command due to lack to lack of permission!**')
                })
			}
		}
	}
};