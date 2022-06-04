const db = require("quick.db")
const Discord = require("discord.js")
const discordModals = require('discord-modals')
module.exports = async (client, interaction) => {
    let language = db.get(`language_${interaction.guild.id}`);

    if (!interaction.isCommand()) {

    } else {
        
        const command = client.slash.get(interaction.commandName);
        if (!command) return interaction.reply({ content: 'an Error check console' });
        
        if (command.ownerOnly) {
            if (interaction.user.id !== client.config.ownerID) {
                return interaction.reply({ content: "This command only for Bot Owner!", ephemeral: true });
            }
        }
        
        const args = [];
        
        for (let option of interaction.options.data) {
            if (option.type === 'SUB_COMMAND') {
                if (option.name) args.push(option.name);
                option.options?.forEach(x => {
                    if (x.value) args.push(x.value);
                });
            } else if (option.value) args.push(option.value);
        }
        
        try {
            command.run(client, interaction, args)
            const NOW = Date.now()
            let log = client.channels.cache.get("965376451702583317")
            let logsEMBED = new Discord.MessageEmbed()
            .setTitle(`Log - Command Slash Executed`)
            .setColor("WHITE")
            .setThumbnail(interaction.user.displayAvatarURL())
            .setDescription(`**See information on who executed this command:**`)
            .addFields(
                { name: 'User:', value: `\`${interaction.user.username}#${interaction.user.discriminator}\` (\`${interaction.user.id}\`)`, inline: false },
                { name: 'Executed:', value: `\`/${command} ${args}\``, inline: false },
                { name: 'Server:', value: `\`${interaction.guild.name}\` (\`${interaction.guild.id}\`)`, inline: false },
            )
            .setTimestamp(Date.now())
            log.send({ embeds: [logsEMBED] })
        } catch (e) {
            interaction.reply({ content: e.message });
        }
    }
        
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
                    .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({dynamic:true}) })
                    .setDescription(`**${interaction.user}.\n> Seu ticket está aberto!\n> Feche usando o botão logo abaixo!**`)
                    .setColor("WHITE")
                    .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL({dynamic:true}) })

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
                    .setAuthor({ name: interaction.guild.name, iconURL: interaction.guild.iconURL({dynamic:true}) })
                    .setDescription(`**${interaction.user}.\n> Your ticket is open!\n> Close your ticket with the button below.**`)
                    .setColor("WHITE")
                    .setFooter({ text: interaction.guild.name, iconURL: interaction.guild.iconURL({dynamic:true}) })

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
}