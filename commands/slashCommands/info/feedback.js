const Discord = require("discord.js")
const db = require("quick.db")

module.exports =  {
    name: "feedback",
    description: "〘INFO〙》 Send a feedback for me",
    type: "CHAT_INPUT",
    options: [
        {
            name: 'feedback',
            description: 'What you feedback?',
            type: 'STRING',
            required: true
        }
    ],
    
    run: async (client, interaction, args) => {
        let language = db.get(`language_${interaction.guild.id}`);
        let prefix = db.get(`prefix_${interaction.guild.id}`) || "-";

        const feedback = interaction.options.getString("feedback");

        if (language === "pt-BR") {
            let sugerirENVIAR = client.channels.cache.get("979890461101686785")

            if (feedback.length > 512) {
                let embed_error = new Discord.MessageEmbed()
                .setDescription('**<:no:930170194494636152> O seu feedback ultrapassou 512 characteres!**')
                .setColor("WHITE")
                return interaction.reply({ embeds: [embed_error] }) 
            }

            let sugerirEMBED = new Discord.MessageEmbed()
            .setTitle(`🥰 **-** Novo Feedback!`)
            .setThumbnail(interaction.user.displayAvatarURL())
            .setDescription(`**${interaction.user.tag} me deu um feedback! veja abaixo:**\n**\`${feedback}\`**`)
            .setColor("WHITE")
            .setFooter({ text: `${interaction.guild.name} ©️ All rights reserved` })

            let embed_sucess = new Discord.MessageEmbed()
            .setDescription(`**<:yes:930170194784043048> Obrigado, por me ajudar e me apoiar! Foi enviado para o suporte!**`)
            .setColor("WHITE")

            interaction.reply({ embeds: [embed_sucess] })
            sugerirENVIAR.send({ embeds: [sugerirEMBED] }).then(msg => {})
        } else if (language === "en" || !language) {
            let sugerirENVIAR = client.channels.cache.get("979890461101686785")

            if (feedback.length > 512) {
                let embed_error = new Discord.MessageEmbed()
                .setDescription('**<:no:930170194494636152> The feedback cannot exceed 512 characters!**')
                .setColor("WHITE")
                return interaction.reply({ embeds: [embed_error] }) 
            }

            let sugerirEMBED = new Discord.MessageEmbed()
            .setTitle(`🥰 **-** New Feedback!`)
            .setThumbnail(interaction.user.displayAvatarURL())
            .setDescription(`**${interaction.user.tag} gave me feedback! see below::**\n**\`${feedback}\`**`)
            .setColor("WHITE")
            .setFooter({ text: `${interaction.guild.name} ©️ All rights reserved` })

            let embed_sucess = new Discord.MessageEmbed()
            .setDescription(`**<:yes:930170194784043048> Thanks, for helping and supporting me! It was sent to my support!**`)
            .setColor("WHITE")

            interaction.reply({ embeds: [embed_sucess] })
            sugerirENVIAR.send({ embeds: [sugerirEMBED] }).then(msg => {})
        }
    }
}