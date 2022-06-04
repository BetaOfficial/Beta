const db = require("quick.db")
module.exports = async (client, member, message, inviter, invite, error) => {
    try {
        let language = db.get(`language_${member.guild.id}`);
        if (language === "pt-BR") { // PT-BR

            let canal_invite_pt = db.get(`beta_invite_logger_${member.guild.id}`);
            if (!canal_invite_pt) {
                return
            }
            if(error) return console.error(error);
            Msg = `> **Bem vindo <@${member.id}>!**\n> **convidado por: <@${inviter.id}>**\n> **Agora <@${inviter.id}> tem \`${invite.count}\` convite(s)**`;
            if (member.user.bot) {
                Msg = `**Bem vindo <@${member.id}>! convidado por: <@${inviter.id}>**`;
            }
            client.channels.cache.get(canal_invite_pt).send({ content: Msg })
        }
        if (!language || language === "en") { // EN

            let canal_invite_en = db.get(`beta_invite_logger_${member.guild.id}`);
            if (!canal_invite_en) {
                return
            }
            if(error) return console.error(error);
            Msg = `> **Welcome <@${member.id}>!**\n> **Invited by: <@${inviter.id}>**\n> **Now <@${inviter.id}> has \`${invite.count}\` invite(s)**`;
            if (member.user.bot) {
                Msg = `**Welcome <@${member.id}>! invited by <@${inviter.id}>**`;
            }
            client.channels.cache.get(canal_invite_en).send({ content: Msg })
        }
    } catch {

    }
}