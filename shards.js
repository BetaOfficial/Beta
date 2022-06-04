const { ShardingManager } = require("discord.js")
const config =  require('./database/config')

let manager = new ShardingManager('./index.js', {
    token: config.bot.token,
    totalShards: 0,
});

manager.on('shardCreate', shard => {
    console.log(`[ SHARDS LOADED ] Shard ${shard.id}`)
});

manager.spawn();