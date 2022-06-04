const { MessageEmbed } = require('discord.js')
const Discord = require("discord.js")
const { MessageSelectMenu, MessageActionRow } = require("discord.js")
const db = require("quick.db")
const News = require("../../../database/news")
const config = require("../../../database/config")

module.exports = {

    name: "help",
    aliases: ["ajuda"],

    run: async(client, message, args) => {

        let prefix = db.get(`prefix_${message.guild.id}`) || "-"

        let language = db.get(`language_${message.guild.id}`);
        if (language === "pt-BR") { // PT-BR
            try {

                let embed_home = new Discord.MessageEmbed()
                .setColor("WHITE")
                .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                .setDescription('**Olá meu nome é <@!883010250226143313>! Um bot focado em moderação e musica para seu servidor! Contendo um sistema de segurança para manter-lo seguro, Veja meu menu de ajuda abaixo!**')
                .setImage('https://i.imgur.com/IiiDqvH.jpg')
                .addField('<:ext:918508631350214717> | Duvidas?', '**Entre no meu servidor de suporte clicando [aqui](https://discord.gg/wmG3ca3fua)**', false)
                .addField('<:ext:918508631350214717> | Me adicione!', '**Me adicione em seu servidor clicando [aqui](https://discord.com/api/oauth2/authorize?client_id=883010250226143313&permissions=8&scope=bot%20applications.commands)**', false)
                .addField('<:ext:918508631350214717> | Vote em mim!', '**[Top.gg](https://top.gg/bot/883010250226143313), [DBL](https://discordbotlist.com/bots/beta-6702), [Best List](https://bestlist.online/bots/883010250226143313)**', false)

                let painel = new MessageActionRow().addComponents( new MessageSelectMenu()
                .setCustomId('menu')
                .setPlaceholder('Veja meus comandos:') // Mensagem estampada
                .addOptions([
                    {
                            label: 'Inicio',
                            description: 'Apenas a pagina inicial',
                            emoji: '🏠',
                            value: 'painel_inicial',
                    },
                    {
                        label: 'Config [ 14 ]',
                        description: 'Veja meus comandos de config!',
                        emoji: '<:config:926841750725738556',
                        value: 'config',
                    },
                    {
                        label: 'Economy [ 12 ]',
                        description: 'Veja meus comandos de economia!',
                        emoji: '<:money:937001292256145410',
                        value: 'economy',
                    },
                    {
                        label: 'Fun [ 12 ]',
                        description: 'Veja meus comandos de fun!',
                        emoji: '<:fun:918998751983575120',
                        value: 'fun',
                    },         
                    {
                        label: 'Info [ 08 ]',
                        description: 'Veja meus comandos de info!',
                        emoji: '<:info:926841374333083669',
                        value: 'info',
                    },
                    {
                        label: 'Invite Tracker [ 02 ]',
                        description: 'Veja meus comandos de invites!',
                        emoji: '<:invitelogger:950088738497757245',
                        value: 'invitelogger',
                    },
                    {
                        label: 'Moderação [ 13 ]',
                        description: 'Veja meus comandos de moderação!',
                        emoji: '<:mod:918998856228823040',
                        value: 'moderation',
                    },   
                    {
                        label: 'Musica [ 11 ]',
                        description: 'Veja meus comandos de musica!',
                        emoji: '<:music:923630448679211039',
                        value: 'music',
                    },
                    {
                        label: 'Dono [ 08 ]',
                        description: 'Comandos de donos!',
                        emoji: '<:owner:926842976301367327',
                        value: 'owner',
                    },
                    {
                        label: 'Util [ 13 ]',
                        description: 'Veja meus comandos util!',
                        emoji: '<:util:918998777174560838>',
                        value: 'util',
                    }, 
                    {
                        label: `Novidades [ ${config.bot.version} ]`,
                        description: 'Veja minhas novidades!',
                        emoji: '📰',
                        value: 'news',
                    },      
                ])

                );

                message.reply({ content: `${message.author}`, embeds: [embed_home], components: [painel] }).then(msg => {

                    const filter = (interaction) => {
                        if(interaction.user.id == message.author.id) return true; 
                        else {
                            interaction.reply({ content: `**${config.emoji.no} Apenas ${message.author} pode usar esse painel! Caso queira usar o menu de ajuda use:**\n**\`${prefix}help\`**!`, ephemeral: true })
                        }
                    }

                    const collector = message.createReactionCollector({ filter, time: 15000 });

                    const coletor = msg.createMessageComponentCollector({
                        filter
                    });
                
                    coletor.on('collect', async (collected) => {

                        let valor = collected.values[0]
                        collected.deferUpdate()

                        if (valor === 'painel_inicial') {

                            msg.edit({ content: `${message.author}`, embeds: [embed_home], components: [painel] }).catch(() => {
                                message.channel.send('<:no:930170194494636152 **Sorry, but I\'m not allowed to upload images!**')
                            })
            
                        };

                        if (valor === 'config') { // Config

                            let embed_config = new Discord.MessageEmbed()
                            .setColor("WHITE")
                            .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                            .setImage('https://i.imgur.com/B02jX48.jpg')
                            .addField('**`Comandos de Config:`**', `**${prefix}antilink ( Bloqueie links nesse servidor )**\n**${prefix}antimention ( Evite que membros marquem everyone )**\n**${prefix}resetdb ( Resete as configurações do servidor )**\n**${prefix}setcommands ( Defina o canal de comandos )**\n**${prefix}setinvitelog ( Ative o sistema de gerenciador de convites )**\n**${prefix}setlanguage ( Defina a linguagem do servidor )**\n**${prefix}setleave ( Defina o canal de saida )**\n**${prefix}setlogs ( Defina o canal de logs )**\n**${prefix}setmute ( Defina o cargo de mute )**\n**${prefix}setprefix ( Defina o prefix deste servidor )**\n**${prefix}setsuggest ( Defina o canal de sugestões do servidor )**\n**${prefix}setticket ( Defina o canal de tickets )**\n**${prefix}setwelcome ( Defina o canal de bem-vindos )**\n**${prefix}autorole ( Defina um cargo automático para todos que entrarem )**`)

                            msg.edit({ content: `${message.author}`, embeds: [embed_config], components: [painel] }).catch(() => {
                                message.channel.send('<:no:930170194494636152 **Sorry, but I\'m not allowed to upload images!**')
                            })

                        };
                        if (valor === 'economy') { // Economy

                            let embed_economy = new Discord.MessageEmbed()
                            .setColor("WHITE")
                            .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                            .setImage('https://i.imgur.com/tkEEzUD.jpg')
                            .addField('**`Comandos de Economia:`**', `**${prefix}balance ( Veja o balanço da sua conta )**\n**${prefix}box ( Pegue sua caixa diaria )**\n**${prefix}daily ( Pegue suas moedas diarias )**\n**${prefix}deposit ( Deposite dinheiro no banco )**\n**${prefix}openbox ( Abra suas caixas )**\n**${prefix}withdraw ( Saque dinheiro do banco )**\n**${prefix}work ( Trabalhe para receber seu dinheiro )**\n**${prefix}rob ( Roube alguem )**\n**${prefix}profile ( Veja seu perfil )**\n**${prefix}aboutme ( Mude seu sobre-mim do seu perfil )**\n**${prefix}banner ( Coloque uma imagem ou gif no seu perfil )**\n**${prefix}topmoney ( Veja a minha lista de top usuários com mais moedas )**`)

                            msg.edit({ content: `${message.author}`, embeds: [embed_economy], components: [painel] }).catch(() => {
                                message.channel.send('<:no:930170194494636152 **Sorry, but I\'m not allowed to upload images!**')
                            })

                        };
                        if (valor === 'fun') { // Fun

                            let embed_fun = new Discord.MessageEmbed()
                            .setColor("WHITE")
                            .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                            .setImage('https://i.imgur.com/8CXvPwX.jpg')
                            .addField('**`Comandos de Fun`**', `**${prefix}8ball ( Faça uma pergunta para a bola 8 )**\n**${prefix}achievement ( Faça uma conquista no minecraft )**\n**${prefix}catchfish ( Ajude o gato pegar seu peixe )**\n**${prefix}football ( Jogue futebol )**\n**${prefix}memelist ( Veja a lista de memes disponiveis )**\n**${prefix}newmeme ( Crie um novo meme )**\n**${prefix}nitro ( "Ganhe um nitro" )**\n**${prefix}slap ( De um tapa em alguem )**\n**${prefix}hug ( Abraçe alguem )**\n**${prefix}punch ( De um soco em alguem )**\n**${prefix}jail ( Coloque alguém atrás das grades )**\n**${prefix}ship ( Descubra novos casais )**`)

                            msg.edit({ content: `${message.author}`, embeds: [embed_fun], components: [painel] }).catch(() => {
                                message.channel.send('<:no:930170194494636152 **Sorry, but I\'m not allowed to upload images!**')
                            })

                        };
                        if (valor === 'info') { // Info

                            let embed_info = new Discord.MessageEmbed()
                            .setColor("WHITE")
                            .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                            .setImage('https://i.imgur.com/agTHR6n.jpg')
                            .addField('**`Comandos de Info`**', `**${prefix}botinfo ( Veja minhas informações )**\n**${prefix}bug ( Reporte meus bugs )**\n**${prefix}feedback ( Faça um feedback para mim )**\n**${prefix}help ( Veja meu comando de help )**\n**${prefix}ping ( Veja minha latência )**\n**${prefix}premium ( Veja seus status em meu sistema premium )**\n**${prefix}stats ( Veja minhas informações avançadas )**\n**${prefix}uptime ( Veja meu tempo online )**`)

                            msg.edit({ content: `${message.author}`, embeds: [embed_info], components: [painel] }).catch(() => {
                                message.channel.send('<:no:930170194494636152 **Sorry, but I\'m not allowed to upload images!**')
                            })

                        };
                        if (valor === 'invitelogger') { // Invite Logger

                            let embed_invitelogger = new Discord.MessageEmbed()
                            .setColor("WHITE")
                            .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                            .setImage('https://i.imgur.com/cu7uQHC.jpg')
                            .addField('**`Comandos do Inviter-Logger`**', `**${prefix}invites ( Veja quantos invites você tem )**\n**${prefix}top ( Veja a lista de maiores inviters )**`)

                            msg.edit({ content: `${message.author}`, embeds: [embed_invitelogger], components: [painel] }).catch(() => {
                                message.channel.send('<:no:930170194494636152 **Sorry, but I\'m not allowed to upload images!**')
                            })

                        };
                        if (valor === 'moderation') { // Moderation

                            let embed_moderation = new Discord.MessageEmbed()
                            .setColor("WHITE")
                            .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                            .setImage('https://i.imgur.com/pydetuf.jpg')
                            .addField('**`Comandos de Mod`**', `**${prefix}ban ( Banir uma pessoa do servidor )**\n**${prefix}clear ( Apague mensagens de um chat )**\n**${prefix}kick ( Expulse alguem do servidor )**\n**${prefix}lock ( Bloqueie o canal )**\n**${prefix}mute ( Mute alguem )**\n**${prefix}say ( Fale usando o bot )**\n**${prefix}tempmute ( Mute alguem temporariamente )**\n**${prefix}unban ( Desbanir alguem do server )**\n**${prefix}unlock ( Desbloqueie um canal )**\n**${prefix}unmute ( Desmute alguem )**\n**${prefix}slowmode ( Ative o modo lento de um canal )**\n**${prefix}addrole ( Adicione um cargo em um usuário )**\n**${prefix}removerole ( Remova um cargo de um usuário )**`)

                            msg.edit({ content: `${message.author}`, embeds: [embed_moderation], components: [painel] }).catch(() => {
                                message.channel.send('<:no:930170194494636152 **Sorry, but I\'m not allowed to upload images!**')
                            })

                        };
                        if (valor === 'music') { // Music

                            let embed_music = new Discord.MessageEmbed()
                            .setColor("WHITE")
                            .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                            .setImage('https://i.imgur.com/9LeKrDm.jpg')
                            .addField('**`Comandos de Musica:`**', `**${prefix}loop ( Crie um loop em sua musica ou em sua queue )**\n**${prefix}lyrics ( Veja a letra de uma musica )**\n**${prefix}nowplaying ( Veja oque está tocando agora )**\n**${prefix}pause ( Pause sua musica )**\n**${prefix}play ( Toque sua musica )**\n**${prefix}queue ( Veja a queue do servidor )**\n**${prefix}resume ( Retome sua musica )**\n**${prefix}skip ( Pule uma musica )**\n**${prefix}stop ( Para a musica )**\n**${prefix}volume ( Defina o volume )**\n**${prefix}seek (  Ir para um momento específico em uma música )**`)

                            msg.edit({ content: `${message.author}`, embeds: [embed_music], components: [painel] }).catch(() => {
                                message.channel.send('<:no:930170194494636152 **Sorry, but I\'m not allowed to upload images!**')
                            })

                        };
                        if (valor === 'owner') { // Owner

                            let embed_owner = new Discord.MessageEmbed()
                            .setColor("WHITE")
                            .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                            .setImage('https://i.imgur.com/r5jPz1G.jpg')
                            .addField('**`Comandos do Dono:`**', `**${prefix}addcoins ( Adicione moedas para alguem )**\n**${prefix}addpremium ( Adicione premium em alguem )**\n**${prefix}eval ( Execute um codigo em mim )**\n**${prefix}removecoins ( Remova moedas de alguem )**\n**${prefix}removepremium ( Remova o premium de alguem )**\n**${prefix}reload ( Recarregue um comando )**\n**${prefix}addblacklist ( Adicione um usuário na minha blacklist )**\n**${prefix}removeblacklist ( Remova um usuário da minha blacklist )**`)

                            msg.edit({ content: `${message.author}`, embeds: [embed_owner], components: [painel] }).catch(() => {
                                message.channel.send('<:no:930170194494636152 **Sorry, but I\'m not allowed to upload images!**')
                            })

                        };
                        if (valor === 'util') { // Util

                            let embed_util = new Discord.MessageEmbed()
                            .setColor("WHITE")
                            .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                            .setImage('https://i.imgur.com/S4PdL1s.jpg')
                            .addField('**`Comandos de Util:`**', `**${prefix}afk ( Fique afk )**\n**${prefix}avatar ( Veja o avatar de alguem )**\n**${prefix}calculator ( Calcule uma expressão )**\n**${prefix}giveaway ( Faça um sorteio no servidor )**\n**${prefix}qrcode ( Faça seu QRCODE )**\n**${prefix}serverinfo ( Veja informações sobre o servidor atual )**\n**${prefix}suggest ( Faça uma sugestão para o servidor )**\n**${prefix}translate ( Traduza algo )**\n**${prefix}userinfo ( Veja informações de um usuario )**\n**${prefix}weather ( Veja o clima em sua cidade ou estado )**\n**${prefix}servericon ( Veja o icone de um servidor )**\n**${prefix}emoji ( Veja emojis como imagens )**\n**${prefix}poll ( Faça uma enquete )**`, false)

                            msg.edit({ content: `${message.author}`, embeds: [embed_util], components: [painel] }).catch(() => {
                                message.channel.send('<:no:930170194494636152 **Sorry, but I\'m not allowed to upload images!**')
                            })

                        };

                        if (valor === 'news') { // News

                            let embed_util = new Discord.MessageEmbed()
                            .setColor("WHITE")
                            .setTitle(`**${News.pt.title}**`)
                            .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                            .setImage('https://i.imgur.com/1RTq5U6.jpg')
                            .setDescription(`**${News.pt.description}**`)
                            .setFooter({ text: `${News.pt.footer}` })

                            msg.edit({ content: `${message.author}`, embeds: [embed_util], components: [painel] }).catch(() => {
                                message.channel.send('<:no:930170194494636152 **Sorry, but I\'m not allowed to upload images!**')
                            })

                        };
                
                    })

                })

            } catch (err) {
                console.log('Error detected in help command')
            }

        }
        if (!language || language === "en") { // EN
            try {

                let embed_home = new Discord.MessageEmbed()
                .setColor("WHITE")
                .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                .setDescription('**Hello my name is <@!883010250226143313>! A bot focused on moderation and music for your discord server! With built-in security system to keep you safe! See my help menu below!**')
                .setImage('https://i.imgur.com/UWhcM0w.jpg')
                .addField('<:ext:918508631350214717> | Questions?', '**Enter my support server by clicking [here](https://discord.gg/wmG3ca3fua)**', false)
                .addField('<:ext:918508631350214717> | Add Me!', '**Add me to your server by clicking [here](https://discord.com/api/oauth2/authorize?client_id=883010250226143313&permissions=8&scope=bot%20applications.commands)**', false)
                .addField('<:ext:918508631350214717> | Vote Me!', '**[Top.gg](https://top.gg/bot/883010250226143313), [DBL](https://discordbotlist.com/bots/beta-6702), [Best List](https://bestlist.online/bots/883010250226143313)**', false)

                let painel = new MessageActionRow().addComponents( new MessageSelectMenu()
                .setCustomId('menu')
                .setPlaceholder('See my commands:') // Mensagem estampada
                .addOptions([
                    {
                            label: 'Home Panel',
                            description: 'Just the initial message panel',
                            emoji: '🏠',
                            value: 'painel_inicial',
                    },
                    {
                        label: 'Config [ 14 ]',
                        description: 'See my config commands!',
                        emoji: '<:config:926841750725738556',
                        value: 'config',
                    },
                    {
                        label: 'Economy [ 12 ]',
                        description: 'See my economy commands!',
                        emoji: '<:money:937001292256145410',
                        value: 'economy',
                    },
                    {
                        label: 'Fun [ 12 ]',
                        description: 'See my fun commands!',
                        emoji: '<:fun:918998751983575120',
                        value: 'fun',
                    },         
                    {
                        label: 'Info [ 08 ]',
                        description: 'See my info commands!',
                        emoji: '<:info:926841374333083669',
                        value: 'info',
                    },
                    {
                        label: 'Invite Tracker [ 02 ]',
                        description: 'See my Invite-Tracker commands!',
                        emoji: '<:invitelogger:950088738497757245',
                        value: 'invitelogger',
                    },
                    {
                        label: 'Moderation [ 13 ]',
                        description: 'See my moderation commands!',
                        emoji: '<:mod:918998856228823040',
                        value: 'moderation',
                    },   
                    {
                        label: 'Music [ 11 ]',
                        description: 'See my music commands!',
                        emoji: '<:music:923630448679211039',
                        value: 'music',
                    },
                    {
                        label: 'Owner [ 08 ]',
                        description: 'See my owner commands!',
                        emoji: '<:owner:926842976301367327',
                        value: 'owner',
                    },
                    {
                        label: 'Util [ 13 ]',
                        description: 'See my utils commands!',
                        emoji: '<:util:918998777174560838>',
                        value: 'util',
                    }, 
                    {
                        label: `News [ ${config.bot.version} ]`,
                        description: 'See my news!',
                        emoji: '📰',
                        value: 'news',
                    },      
                ])

                );

                message.reply({ content: `${message.author}`, embeds: [embed_home], components: [painel] }).then(msg => {

                    const filter = (interaction) => {
                        if(interaction.user.id == message.author.id) return true; 
                        else {
                            interaction.reply({ content: `**${config.emoji.no} Only ${message.author} you can use this panel! If you want to use the help menu use:**\n**\`${prefix}help\`**!`, ephemeral: true })
                        }
                    }

                    const collector = message.createReactionCollector({ filter, time: 15000 });

                    const coletor = msg.createMessageComponentCollector({
                        filter
                    });
                
                    coletor.on('collect', async (collected) => {

                        let valor = collected.values[0]
                        collected.deferUpdate()

                        if (valor === 'painel_inicial') {

                            msg.edit({ content: `${message.author}`, embeds: [embed_home], components: [painel] }).catch(() => {
                                message.channel.send('<:no:930170194494636152 **Sorry, but I\'m not allowed to upload images!**')
                            })
            
                        };

                        if (valor === 'config') { // Config

                            let embed_config = new Discord.MessageEmbed()
                            .setColor("WHITE")
                            .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                            .setImage('https://i.imgur.com/B02jX48.jpg')
                            .addField('**`Config Commands:`**', `**${prefix}antilink ( Avoid link's on the server )**\n**${prefix}antimention ( Avoid mentions everyone on the server )**\n**${prefix}resetdb ( Reset server database )**\n**${prefix}setcommands ( Set the commands channel )**\n**${prefix}setinvitelog ( Active the syteam on Invite-Tracker )**\n**${prefix}setlanguage ( Set default language on server )**\n**${prefix}setleave ( Set the leave channel )**\n**${prefix}setlogs ( Set the logs channel )**\n**${prefix}setmute ( Set muted role )**\n**${prefix}setprefix ( Set default prefix on the server )**\n**${prefix}setsuggest ( Set the suggest channel )**\n**${prefix}setticket ( Set the ticket channel )**\n**${prefix}setwelcome ( Set the welcome channel )**\n**${prefix}autorole ( Set an automatic role for everyone who joins )**`)

                            msg.edit({ content: `${message.author}`, embeds: [embed_config], components: [painel] }).catch(() => {
                                message.channel.send('<:no:930170194494636152 **Sorry, but I\'m not allowed to upload images!**')
                            })

                        };
                        if (valor === 'economy') { // Economy

                            let embed_economy = new Discord.MessageEmbed()
                            .setColor("WHITE")
                            .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                            .setImage('https://i.imgur.com/3c5vXwK.jpg')
                            .addField('**`Economy Commands:`**', `**${prefix}bal ( View your balance )**\n**${prefix}box ( Take your daily box )**\n**${prefix}daily ( Take your daily coins )**\n**${prefix}deposit ( Deposit your money in the bank )**\n**${prefix}openbox ( Open your boxes )**\n**${prefix}withdraw ( Remove your coins for the bank )**\n**${prefix}work ( Work to win coins )**\n**${prefix}rob ( Steal someone )**\n**${prefix}profile ( See your profile )**\n**${prefix}aboutme ( Change your about me from your profile )**\n**${prefix}banner ( Put an image or gif on your profile )**\n**${prefix}topmoney ( See my list of top users with the most coins )**`)

                            msg.edit({ content: `${message.author}`, embeds: [embed_economy], components: [painel] }).catch(() => {
                                message.channel.send('<:no:930170194494636152 **Sorry, but I\'m not allowed to upload images!**')
                            })

                        };
                        if (valor === 'fun') { // Fun

                            let embed_fun = new Discord.MessageEmbed()
                            .setColor("WHITE")
                            .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                            .setImage('https://i.imgur.com/8CXvPwX.jpg')
                            .addField('**`Fun Commands:`**', `**${prefix}8ball ( Make a question for the ball 8 )**\n**${prefix}achievement ( Make a achievement in the minecraft )**\n**${prefix}catchfish ( Play the game to help the kitten catch the fish )**\n**${prefix}football ( Play football game )**\n**${prefix}memelist ( View the list of the memes )**\n**${prefix}newmeme ( Create memes for fun )**\n**${prefix}nitro ( "Win the nitro" )**\n**${prefix}slap ( Slap someone )**\n**${prefix}hug ( Hug someone )**\n**${prefix}punch ( Punch someone )**\n**${prefix}jail ( Put someone behind bars )**\n**${prefix}ship ( Discover new couples )**`)

                            msg.edit({ content: `${message.author}`, embeds: [embed_fun], components: [painel] }).catch(() => {
                                message.channel.send('<:no:930170194494636152 **Sorry, but I\'m not allowed to upload images!**')
                            })

                        };
                        if (valor === 'info') { // Info

                            let embed_info = new Discord.MessageEmbed()
                            .setColor("WHITE")
                            .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                            .setImage('https://i.imgur.com/agTHR6n.jpg')
                            .addField('**`Info Commands:`**', `**${prefix}botinfo ( View my info's )**\n**${prefix}bug ( Report bugs for me )**\n**${prefix}feedback ( Make a feedback for me )**\n**${prefix}help ( View my help command )**\n**${prefix}ping ( View my latency )**\n**${prefix}premium ( View your state in my premium )**\n**${prefix}stats ( My infos advanced )**\n**${prefix}uptime ( See my time online )**`)

                            msg.edit({ content: `${message.author}`, embeds: [embed_info], components: [painel] }).catch(() => {
                                message.channel.send('<:no:930170194494636152 **Sorry, but I\'m not allowed to upload images!**')
                            })

                        };
                        if (valor === 'invitelogger') { // Invite Logger

                            let embed_invitelogger = new Discord.MessageEmbed()
                            .setColor("WHITE")
                            .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                            .setImage('https://i.imgur.com/cu7uQHC.jpg')
                            .addField('**`Invite-Tracker Commands:`**', `**${prefix}invites ( View your invite count )**\n**${prefix}top ( View top invites counts )**`)

                            msg.edit({ content: `${message.author}`, embeds: [embed_invitelogger], components: [painel] }).catch(() => {
                                message.channel.send('<:no:930170194494636152 **Sorry, but I\'m not allowed to upload images!**')
                            })

                        };
                        if (valor === 'moderation') { // Moderation

                            let embed_moderation = new Discord.MessageEmbed()
                            .setColor("WHITE")
                            .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                            .setImage('https://i.imgur.com/pydetuf.jpg')
                            .addField('**`Moderation Commands:`**', `**${prefix}ban ( Ban user for your server )**\n**${prefix}clear ( Clear the messages in the chat )**\n**${prefix}kick ( Kick the user for your server )**\n**${prefix}lock ( Lock the channel )**\n**${prefix}mute ( Mute the user )**\n**${prefix}say ( Speak something through the bot )**\n**${prefix}tempmute ( Mute someone temporarily )**\n**${prefix}unban ( Unban user from your server )**\n**${prefix}unlock ( Unlock the channel locked )**\n**${prefix}unmute ( Unmute the user )**\n**${prefix}slowmode ( Activate a channel's slow mode )**\n**${prefix}addrole ( Add a role to a user )**\n**${prefix}removerole ( Remove a role from a user )**`)

                            msg.edit({ content: `${message.author}`, embeds: [embed_moderation], components: [painel] }).catch(() => {
                                message.channel.send('<:no:930170194494636152 **Sorry, but I\'m not allowed to upload images!**')
                            })

                        };
                        if (valor === 'music') { // Music

                            let embed_music = new Discord.MessageEmbed()
                            .setColor("WHITE")
                            .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                            .setImage('https://i.imgur.com/fA55Oot.jpg')
                            .addField('**`Music Commands:`**', `**${prefix}loop ( Set the loop in the track or queue )**\n**${prefix}lyrics ( See lyrics of the music )**\n**${prefix}nowplaying ( See what's playing right now )**\n**${prefix}pause ( Pause the music )**\n**${prefix}play ( Play the music )**\n**${prefix}queue ( View the queue of the server )**\n**${prefix}resume ( Resume your music )**\n**${prefix}skip ( Skip the music )**\n**${prefix}stop ( Stop the music )**\n**${prefix}volume ( Set the music volume )**\n**${prefix}seek ( Jump to a specific moment in a song )`)

                            msg.edit({ content: `${message.author}`, embeds: [embed_music], components: [painel] }).catch(() => {
                                message.channel.send('<:no:930170194494636152 **Sorry, but I\'m not allowed to upload images!**')
                            })

                        };
                        if (valor === 'owner') { // Owner

                            let embed_owner = new Discord.MessageEmbed()
                            .setColor("WHITE")
                            .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                            .setImage('https://i.imgur.com/dFrsfeZ.jpg')
                            .addField('**`Owner Commands:`**', `**${prefix}addcoins ( Add coins for the user )**\n**${prefix}addpremium ( Add premium for the user )**\n**${prefix}eval ( Run the code for the bot )**\n**${prefix}removecoins ( Remove coins for the user )**\n**${prefix}removepremium ( Remove premium for the user )**\n**${prefix}reload ( Reload the command )**\n**${prefix}addblacklist ( Add a user to my blacklist )**\n**${prefix}removeblacklist ( Remove a user from my blacklist )**`)

                            msg.edit({ content: `${message.author}`, embeds: [embed_owner], components: [painel] }).catch(() => {
                                message.channel.send('<:no:930170194494636152 **Sorry, but I\'m not allowed to upload images!**')
                            })

                        };
                        if (valor === 'util') { // Util

                            let embed_util = new Discord.MessageEmbed()
                            .setColor("WHITE")
                            .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                            .setImage('https://i.imgur.com/S4PdL1s.jpg')
                            .addField('**`Util Commands:`**', `**${prefix}afk ( Set your afk )**\n**${prefix}avatar ( View avatar from the user )**\n**${prefix}calculator ( Calculate the expression )**\n**${prefix}giveaway ( Make giveaway on the server )**\n**${prefix}qrcode ( Make you QRCode )**\n**${prefix}serverinfo ( View info from the server )**\n**${prefix}suggest ( Make a suggestion from server )**\n**${prefix}translate ( Translate the words )**\n**${prefix}userinfo ( View the user infos )**\n**${prefix}weather ( View the weather in your city or state )**\n**${prefix}servericon ( See a server icon )**\n**${prefix}emoji ( See emojis as images )**\n**${prefix}poll ( Make a poll )**`, false)

                            msg.edit({ content: `${message.author}`, embeds: [embed_util], components: [painel] }).catch(() => {
                                message.channel.send('<:no:930170194494636152 **Sorry, but I\'m not allowed to upload images!**')
                            })

                        };

                        if (valor === 'news') { // News

                            let embed_util = new Discord.MessageEmbed()
                            .setColor("WHITE")
                            .setTitle(`**${News.en.title}**`)
                            .setAuthor(client.user.username, client.user.displayAvatarURL({ dynamic: true }))
                            .setImage('https://i.imgur.com/1RTq5U6.jpg')
                            .setDescription(`**${News.en.description}**`)
                            .setFooter({ text: `${News.en.footer}` })

                            msg.edit({ content: `${message.author}`, embeds: [embed_util], components: [painel] }).catch(() => {
                                message.channel.send('<:no:930170194494636152 **Sorry, but I\'m not allowed to upload images!**')
                            })

                        };
                
                    })

                })

            } catch (err) {
                console.log('Error detected in help command')
            }
        }
    }
}