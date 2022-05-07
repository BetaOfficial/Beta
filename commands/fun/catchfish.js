const { MessageEmbed } = require('discord.js')
const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
	name: 'catchfish',
	aliases: ["peguepeixe"],
	cooldown: 1000 * 2,
 	
	run: async (client, message, args) => {
		let language = db.get(`language_${message.guild.id}`);
        
    	if (language === "pt-BR") { // PT-BR
			try {
				const positions = {
					safe: '_ _                          :fish:\n            _ _              :hand_splayed:\n            _ _              :cat:',
					danger: '_ _                          :bomb:\n            _ _              :hand_splayed:\n            _ _              :cat:',
					win: '_ _           :crown:**You won.**:crown:\n_ _                      :hand_splayed:\n_ _                      :cat:',
					lose: '_ _           :skull:**You lost.**:skull:             \n_ _                      :hand_splayed:\n_ _                      :cat:',
				};

				let randomized = Math.floor(Math.random() * 2);
				let gameEnded = false;
				let randomPos = positions[Object.keys(positions)[randomized]];
				let data = 0;

				const componentsArray = [
					{
						type: 1,
						components: [
							{
								type: 2,
								style: 'SECONDARY',
								custom_id: 'e',
								label: '\u200b',
								disabled: true,
							},
							{
								type: 2,
								style: 'PRIMARY',
								custom_id: String(Math.random()),
								emoji: { id: '890611575227023391' },
							},
							{
								type: 2,
								style: 'SECONDARY',
								custom_id: 'ee',
								label: '\u200b',
								disabled: true,
							},
						],
					},
				];

				const msg = await message.channel.send({
					content: `Pegue 3 peixes para ganhar!\n\n${randomPos}`,
					components: componentsArray,
				});

				const filter = (button => { return button.user.id === message.author.id; });
				const game = await message.channel.createMessageComponentCollector({
					filter,
					componentType: 'BUTTON',
				});

				function update(button) {
					randomized = Math.floor(Math.random() * 2);
					randomPos = positions[Object.keys(positions)[randomized]];

					if(data === 3) {
						gameEnded = true;
						game.stop();
						componentsArray[0].components[1].disabled = true;

						msg.delete()
						button.reply({ content: '**GG! Você pegou 3 peixes!**' });
					}
					else if (data <= -9) {
						gameEnded = true;
						game.stop();
						componentsArray[0].components[1].disabled = true;

						msg.delete()
						button.reply({ content: '**GG... Você perdeu...**' });
					}
					else {
						if(button) return button.deferUpdate();
						msg.edit({
							content: randomPos + `           **${data}**`,
							components: componentsArray,
						});
					}
				}

				setInterval(() => {
					if(gameEnded === false) return update();
				}, 2000);

				game.on('collect', async (button) => {
					if(randomized !== 0) {
						data -= 3;
						update(button);
					}
					else {
						data++;
						update(button);
					}
				});
			} catch (err) {
				console.log('Error detected in catchfish command')
			}
		}
		if (!language || language === "en") { // EN
			try {
				const positions = {
					safe: '_ _                          :fish:\n            _ _              :hand_splayed:\n            _ _              :cat:',
					danger: '_ _                          :bomb:\n            _ _              :hand_splayed:\n            _ _              :cat:',
					win: '_ _           :crown:**You won.**:crown:\n_ _                      :hand_splayed:\n_ _                      :cat:',
					lose: '_ _           :skull:**You lost.**:skull:             \n_ _                      :hand_splayed:\n_ _                      :cat:',
				};

				let randomized = Math.floor(Math.random() * 2);
				let gameEnded = false;
				let randomPos = positions[Object.keys(positions)[randomized]];
				let data = 0;

				const componentsArray = [
					{
						type: 1,
						components: [
							{
								type: 2,
								style: 'SECONDARY',
								custom_id: 'e',
								label: '\u200b',
								disabled: true,
							},
							{
								type: 2,
								style: 'PRIMARY',
								custom_id: String(Math.random()),
								emoji: { id: '890611575227023391' },
							},
							{
								type: 2,
								style: 'SECONDARY',
								custom_id: 'ee',
								label: '\u200b',
								disabled: true,
							},
						],
					},
				];

				const msg = await message.channel.send({
					content: `Catch 3 fishes to win!\n\n${randomPos}`,
					components: componentsArray,
				});

				const filter = (button => { return button.user.id === message.author.id; });
				const game = await message.channel.createMessageComponentCollector({
					filter,
					componentType: 'BUTTON',
				});

				function update(button) {
					randomized = Math.floor(Math.random() * 2);
					randomPos = positions[Object.keys(positions)[randomized]];

					if(data === 3) {
						gameEnded = true;
						game.stop();
						componentsArray[0].components[1].disabled = true;

						msg.delete()
						button.reply({ content: '**GG! You caught 3 fishes!**' });
					}
					else if (data <= -9) {
						gameEnded = true;
						game.stop();
						componentsArray[0].components[1].disabled = true;

						msg.delete()
						button.reply({ content: '**GG... You lost! XD**' });
					}
					else {
						if(button) return button.deferUpdate();
						msg.edit({
							content: randomPos + `           **${data}**`,
							components: componentsArray,
						});
					}
				}

				setInterval(() => {
					if(gameEnded === false) return update();
				}, 2000);

				game.on('collect', async (button) => {
					if(randomized !== 0) {
						data -= 3;
						update(button);
					}
					else {
						data++;
						update(button);
					}
				});
			} catch (err) {
				console.log('Error detected in catchfish command')
			}
		}
	},
};