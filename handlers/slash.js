const fs = require("fs");

/**
 * Load SlashCommands
 */
const loadSlashCommands = async function (client) {
    let slash = []

    const commandFolders = fs.readdirSync("./commands/slashCommands");
    for (const folder of commandFolders) {
        const commandFiles = fs
        .readdirSync(`./commands/slashCommands/${folder}`)
        .filter((file) => file.endsWith(".js"));
        
        for (const file of commandFiles) {
            const command = require(`../commands/slashCommands/${folder}/${file}`);
            
            if (command.name) {
                client.slash.set(command.name, command);
                slash.push(command)
                console.log(`[ SlashCommand Loaded ] => ${file}`);
            } else {
                console.log(`[ SlashCommand Error ] => ${file}`);
                continue;
            }
        }
    }

    client.on("ready", async() => {
        // Register Slash Commands for a single guild
        // await client.guilds.cache.get("917457690324770836").commands.set(slash);

        await client.application.commands.set(slash)
    })
}

module.exports = {
    loadSlashCommands
}
