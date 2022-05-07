const { MessageEmbed } = require('discord.js')
const Discord = require("discord.js")
const db = require("quick.db")

module.exports = {
    name: "setticket",
    aliases: ["st"],
    cooldown: 1000 * 2,

    run: async(client, message, args) => {

      let prefix = db.get(`prefix_${message.guild.id}`) || "-"

      let language = db.get(`language_${message.guild.id}`);
        
      if (language === "pt-BR") { // PT-BR

        if (!message.member.permissions.has("MANAGE_GUILD")) {
                let embed = new Discord.MessageEmbed()
                .setDescription('**<:no:930170194494636152> Você não tem permissão para `Gerenciar o Servidor`**')
                .setColor("WHITE")
                return message.reply({ embeds: [embed] });
        }

        try {

          if (!message.guild.me.permissions.has("ADMINISTRADOR")) return message.reply(`\❌ ${message.author} Eu não tenho permissão para isso!`);

          let channel =  message.mentions.channels.first() || client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]);

          if (!channel) {
            let embed = new Discord.MessageEmbed()
            .setDescription(`**<:no:930170194494636152> Para usar esse comando use \`${prefix}setticket <marque o canal>\`**`)
            .setColor("WHITE")
            return message.reply({ embeds: [embed] });
          }

          let criar = new Discord.MessageButton().setCustomId("c").setLabel("Abrir Ticket").setStyle("PRIMARY")

          let embed = new Discord.MessageEmbed()
          .setDescription('**<:yes:930170194784043048> O sistema de ticket foi configurado!**')
          .setColor("WHITE")
          message.reply({ embeds: [embed] });
      
          let row = new Discord.MessageActionRow().addComponents(criar)

          let embed1 = new Discord.MessageEmbed()
          .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({dynamic:true}) })
          .setDescription(`**Sistema de Ticket!\n> Abra um ticket clicando no botão!.**`)
          .setColor("WHITE")
          .setFooter({ text: message.guild.name, iconURL: message.guild.iconURL({dynamic:true}) })

          channel.send({embeds: [embed1], components: [row]})


        } catch (err) {
          console.log('Error detected in setticket command')
        }
      }
      if (!language || language === "en") { // EN

        if (!message.member.permissions.has("MANAGE_GUILD")) {
                 let embed = new Discord.MessageEmbed()
                 .setDescription('**<:no:930170194494636152> You do not have the permission to `Manager Server`**')
                 .setColor("WHITE")
                 return message.reply({ embeds: [embed] });
             }
 
         try {
 
           if (!message.guild.me.permissions.has("ADMINISTRADOR")) return message.reply(`\❌ ${message.author} I don't have permission for this!`);
 
           let channel =  message.mentions.channels.first() || client.guilds.cache.get(message.guild.id).channels.cache.get(args[0]);
 
           if (!channel) {
             let embed = new Discord.MessageEmbed()
             .setDescription(`**<:no:930170194494636152> To use this command use \`${prefix}setticket <mark channel>\`**`)
             .setColor("WHITE")
             return message.reply({ embeds: [embed] });
           }
 
           let criar = new Discord.MessageButton().setCustomId("c").setLabel("Open ticket").setStyle("PRIMARY")
 
           let embed = new Discord.MessageEmbed()
           .setDescription('**<:yes:930170194784043048> Ticket system has been configured successfully!**')
           .setColor("WHITE")
           message.reply({ embeds: [embed] });
       
           let row = new Discord.MessageActionRow().addComponents(criar)
 
           let embed1 = new Discord.MessageEmbed()
           .setAuthor({ name: message.guild.name, iconURL: message.guild.iconURL({dynamic:true}) })
           .setDescription(`**Ticket System!\n> Open a ticket by clicking the button.**`)
           .setColor("WHITE")
           .setFooter({ text : message.guild.name, iconURL : message.guild.iconURL({dynamic:true}) })
 
           channel.send({embeds: [embed1], components: [row]})
 
 
         } catch (err) {
           console.log('Error detected in setticket command')
         }
       }
    }
  }