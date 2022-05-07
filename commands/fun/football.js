const { MessageEmbed } = require('discord.js')
const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
	name: 'football',
	aliases: ['futebol'],
	cooldown: 1000 * 2,
	run: async (client, message, args) => {
		let language = db.get(`language_${message.guild.id}`);
        
    	if (language === "pt-BR") { // PT-BR
			try {
				const positions = {
					left: '_ _                   🥅🥅🥅\n_ _                   🕴️\n      \n_ _                         ⚽',
					middle: '_ _                   🥅🥅🥅\n_ _                        🕴️\n      \n_ _                         ⚽',
					right: '_ _                   🥅🥅🥅\n_ _                              🕴️\n      \n_ _                         ⚽',
				};
				let randomized = Math.floor(Math.random() * Object.keys(positions).length);
				let gameEnded = false;
				let randomPos = positions[Object.keys(positions)[randomized]];

				const componentsArray = [
					{
						type: 1,
						components: [
							{
								type: 2,
								style: 'SECONDARY',
								custom_id: 'left',
								label: '↖',
							},
							{
								type: 2,
								style: 'PRIMARY',
								custom_id: 'middle',
								label: '⬆',
							},
							{
								type: 2,
								style: 'SECONDARY',
								custom_id: 'right',
								label: '↗',
							},
						],
					},
				];

				const msg = await message.channel.send({
					content: randomPos,
					components: componentsArray,
				});
				function update() {
					randomized = Math.floor(Math.random() * Object.keys(positions).length);
					randomPos = positions[Object.keys(positions)[randomized]];

					msg.edit({
						content: randomPos,
						components: componentsArray,
					});
				}
				setInterval(() => {
					if(gameEnded == false) return update();
				}, 1000);

				const filter = button => {
					return button.user.id === message.author.id;
				};
				const button = await msg.awaitMessageComponent({ filter: filter, componentType: 'BUTTON', max: 1 });

				if(button.customId !== Object.keys(positions)[randomized]) {
					gameEnded = true;
					msg.delete()
					return button.reply({ content: '**GOOOOLLLL VOCÊ GANHOU!**' });
				}
				else {
					gameEnded = true;
					msg.delete()
					return button.reply({ content: '**Você perdeu...**' });
				}
			} catch (err) {
				console.log('Error detected in football command')
			}
		}
		if (!language || language === "en") { // EN
			try {
				const positions = {
					left: '_ _                   🥅🥅🥅\n_ _                   🕴️\n      \n_ _                         ⚽',
					middle: '_ _                   🥅🥅🥅\n_ _                        🕴️\n      \n_ _                         ⚽',
					right: '_ _                   🥅🥅🥅\n_ _                              🕴️\n      \n_ _                         ⚽',
				};
				let randomized = Math.floor(Math.random() * Object.keys(positions).length);
				let gameEnded = false;
				let randomPos = positions[Object.keys(positions)[randomized]];

				const componentsArray = [
					{
						type: 1,
						components: [
							{
								type: 2,
								style: 'SECONDARY',
								custom_id: 'left',
								label: '↖',
							},
							{
								type: 2,
								style: 'PRIMARY',
								custom_id: 'middle',
								label: '⬆',
							},
							{
								type: 2,
								style: 'SECONDARY',
								custom_id: 'right',
								label: '↗',
							},
						],
					},
				];

				const msg = await message.channel.send({
					content: randomPos,
					components: componentsArray,
				});
				function update() {
					randomized = Math.floor(Math.random() * Object.keys(positions).length);
					randomPos = positions[Object.keys(positions)[randomized]];

					msg.edit({
						content: randomPos,
						components: componentsArray,
					});
				}
				setInterval(() => {
					if(gameEnded == false) return update();
				}, 1000);

				const filter = button => {
					return button.user.id === message.author.id;
				};
				const button = await msg.awaitMessageComponent({ filter: filter, componentType: 'BUTTON', max: 1 });

				if(button.customId !== Object.keys(positions)[randomized]) {
					gameEnded = true;
					msg.delete()
					return button.reply({ content: '**You won the game! The game is finished!**' });
				}
				else {
					gameEnded = true;
					msg.delete()
					return button.reply({ content: '**You lose... The game is finished!**' });
				}
			} catch (err) {
				console.log('Error detected in football command')
			}
		}
	},
};