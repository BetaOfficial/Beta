
<p align="center">
<img width="65%" src="https://cdn.discordapp.com/attachments/948985394962260009/965688651168231524/beta_github01.png">
<br>

<h1 align="center">Beta™</h1>

<p align="center">
<a href="https://discordbots.org/bot/883010250226143313?utm_source=widget">
    <img src="https://discordbots.org/api/widget/883010250226143313.png?test=123456" alt="Discord Bots" />
</a>
</p>

<p align="center">
  <a href="https://www.youtube.com/channel/UCCsAce_V0D2lqjKgALVU9KQ" target="_blank"><img src="https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white" target="_blank"></a>
  <a href="https://www.twitch.tv/roycye" target="_blank"><img src="https://img.shields.io/badge/Twitch-9146FF?style=for-the-badge&logo=twitch&logoColor=white" target="_blank"></a>
 <a href="https://discord.gg/5UhUYvW4Ka" target="_blank"><img src="https://img.shields.io/badge/Discord-7289DA?style=for-the-badge&logo=discord&logoColor=white" target="_blank"></a> 
</p>

<hr>

All Discord servers have the same problems. Members want entertainment, moderators want automation... and you just want to rest.

Your life is too precious to spend your time with useless junk, let me take care of the boring parts while you have fun on your server!

With features to entertain and engage your members, moderation features to keep your server always safe and enjoyable, and with an easy way to set up but with an unmatched power of customization...

A bot to try to make the world a better place!

_Adding the Beta makes your server more perfect than it already is!_

## 📜 Terms of use
* You can't speak in a "**we did it**" way!
* You cannot sell it!
* We will not accept identical copies of Beta™!

## 🤔 How can I add it?
* That's simple! Just click on this [link](https://discord.com/api/oauth2/authorize?client_id=883010250226143313&permissions=8&scope=bot%20applications.commands) accept the bot's permissions and be part of this family of more than 60k users!

## 👨‍💻 Turning on the beta

### `1.` 🧹 Preparing the environment
* Create a empty folder somewhere in your OS!

### `2.` 🧹 Preparing the environment²
* Install current `NodeJS` : [Install NodeJS](https://nodejs.org/en/download/current)
* Install `git` to clone the repository: [Install GIT](https://git-scm.com/downloads)

### `3.` 🧹 Preparing the environment³
* Run the terminal inside the empty folder and use: `git clone https://github.com/BetaOfficial/Beta`
* Now run: `npm install` and wait for the terminal to download all dependencies!

#### ⚠️ Values that you *need* to change before starting the Beta!
#### database/config.js:
```js
module.exports = {
    emoji: {
        yes: '<:yes:930170194784043048>',
        no: '<:no:930170194494636152>',
        load: '<a:loading:972914112193495130>',
    },
    bot: {
        token: 'YOUR BOT TOKEN',
        prefix: 'YOUR BOT PREFIX',
        id: 'YOUR BOT ID',
        secret: 'YOUR BOT SECRET',
        version: 'YOUR BOT VERSION'
    },
    nodes: {
        node1: 'local.host', // NODE 01
        password1: 'YOUR PASSWORD',
        port1: 80,
        secure1: false,
    },
    owners: {
        ID1: 'OWNER ID1',
        ID2: 'OWNER ID2',
    },
    spotify: {
        clientID: 'CLIENT ID',
        clientSecret: 'CLIENT SECRET'
    },
};
```

### `5.` 🤖 Starting Beta
* Run using `node index.js`
* Check the console to see if there are any errors... Well, we hope that there are none!

<hr>

<p align="center">
<img src="https://cdn.discordapp.com/attachments/948985394962260009/965704384891748452/beta_github02.png">
</p>
