
<p align="center">
<img width="65%" src="https://cdn.discordapp.com/attachments/948985394962260009/965688651168231524/beta_github01.png">
<br>

<h1 align="center">Beta™</h1>

<p align="center">
<a href="https://discordbots.org/bot/883010250226143313?utm_source=widget">
<img src="https://discordbots.org/api/widget/883010250226143313.png?test=123456" alt="Discord Bots" />
</a>
</p>

<hr>

All Discord servers have the same problems. Members want entertainment, moderators want automation... and you just want to rest.

Your life is too precious to spend your time with useless junk, let me take care of the boring parts while you have fun on your server!

With features to entertain and engage your members, moderation features to keep your server always safe and enjoyable, and with an easy way to set up but with an unmatched power of customization...

And everything thanks to a 16 year old girl trying to make the world a better place!

_Making your server unique and extraordinary has never been easier!_

## 🤔 How can I add her?

If you want to use Loritta on your server, you can add our public instance by [clicking here](https://loritta.website/dashboard)! We recommend using the public instance, after all, more than 400k guilds already use, trust and love her, so why not try it out?

You can also host Loritta yourself, however we won't give support for people that are trying to selfhost her, we don't want to spend hours trying to troubleshoot other people issues that only happens on selfhosted instances, so you should at least know how to troubleshoot issues, if you find any.

## 📁 Project Structure
* 📜 **Loritta's API** [`loritta-api`]

> Multiplatform Loritta API, commands and features that only depend on the Loritta's API can be ported to other platforms, as long as they implement Loritta's API.
* 🍃 **Loritta's Serializable Commons** [`loritta-serializable-commons`]

> Serializable classes that are shared between `loritta-discord`, `spicy-morenitta` and other modules. The main purpose of it is to share data between the backend and the frontend in a easy way without messing around with different libraries.They aren't in the `loritta-api` module to avoid filling the `loritta-api` with module-specific classes that aren't needed to implement Loritta!
* 🎀 **Loritta (Discord/JDA)** [`loritta-discord` ]

> Discord implementation of Loritta's API, this is the public bot you all know and love so much! If you are planning to help Loritta's development, this is where to start!
* 🔌**Loritta's Plugins** [`loritta-plugins`]

> Sometimes restarting Loritta just to fix a small bug in a command can be a pain, that's why plugins exist! Plugins can be loaded/unloaded/updated during runtime, so you don't need to restart just to add a new cool command.
* * 🥩 **Rosbife** [`rosbife`]
>> Commands related to image edits.
* * 🎨 **Profile Designs** [`profile-designs`]

>> Defines the profiles users can buy for their `+profile`.
* * 🤑 **Donators Ostentation** [`donators-ostentation`]

>> Handles Nitro Boost features, premium slots channels automation, auto sonhos payout and other miscellaneous features.
* * 🖼️ **Auto Banner Changer** [`auto-banner-changer`]

>> Automatically changes the banner in the offical Loritta support servers... yup, that's it.
* * 👩‍💻 **Parallax Routes** [`parallax-routes`]

>> Creates endpoints for the Parallax Code Server.
* * And many others!

* 🔗 **Loritta Website** [`loritta-website`]
* * 🌶️ **Spicy Morenitta** [`spicy-morenitta`]

>> Spicying up Loritta's frontend! This is the code that gets executed in the browser.
* 🐶 **Loritta Watchdog (Discord/JDA)** [`loritta-watchdog-bot`]

> bark bark! Used to track Loritta's cluster statuses and other miscellaneous stuff.
* 🐱‍💻 **Parallax Code Server** [`parallax-code-server`]

> Executes custom JavaScript commands with GraalJS. Runs in a separate JVM to avoid malicious users crashing Loritta or breaking out of the sandbox, also because it is easier to update the code server with new features!
* 💫 **Shard Controller** [`shard-controller`]

> Large bots with the "Sharding for very large bots" feature requires something to synchronize their shard login status to avoid getting ratelimited during login. The shard controller (named [Tsuki](https://fortnite.fandom.com/wiki/Tsuki)) is a very small http server that controls what shards can login at any given time.
* 💸 **Loritta Premium** [`loritta-premium`]

> Does absolutely nothing! No, really, this is just a bot for premium users to show off that they bought premium features. All premium features are in the main bot.
* 🚧 **Loritta (Discord/Eris)** [`loritta-eris`]

> *Very* experimental (proof of concept) implementation of Loritta's API on a node.js environment using Kotlin/JS. This is just a "Hey look at this! *Code sharing* between modules! Sooooo cool!" project.
* 🐱 **Temmie Discord Auth** [`temmie-discord-auth`]

> Discord OAuth2 Client, named after [Temmie](https://youtu.be/_BD140nCDps). Why Temmie? Why *not* Temmie!
## 👨‍💻 Compiling Loritta

### [](https://emojipedia.org/construction-worker/)

### `0.` 👷 Prerequisites

* PowerShell (Windows) or Terminal (Linux).
> ⚠️ While Windows' command prompt may work, it is better to use PowerShell!
* You need to have the [Java Development Kit](https://adoptopenjdk.net/) installed on your machine. The minimum required version to compile and run Loritta is JDK 14.
* You need to have Git installed on your machine.
* Check if your machine has the `JAVA_HOME` property set correctly, newer JDK versions downloaded from AdoptOpenJDK may already have the variable set correctly. You can check if the variable is set by using `echo $env:JAVA_HOME` in PowerShell.
* If you want to help to develop Loritta, or if you only want a good Kotlin IDE, then download [JetBrains IntelliJ IDEA](https://www.jetbrains.com/pt-br/idea/)! The community edition is enough, so you don't need to be like "oh my god I need to *pay* for it". 😉
* 
Need's help?
[Support Server](https://dsc.gg/byte)
*
### `1.` 🧹 Preparing the environment
* Create a empty folder somewhere in your OS!

### `2.` 🧹 Preparing the environment²
* Install current `NodeJS` : [Install NodeJS](https://nodejs.org/en/download/current)
* Install `git` to clone the repository: [Install GIT](https://git-scm.com/downloads)

### `3.` 🧹 Preparing the environment³
* Run the terminal inside the empty folder and use: `git clone https://github.com/BetaOfficial/Beta`
* Now run: `npm install` and wait for the terminal to download all dependencies!

#### ⚠️ Values that you *need* to change before starting the Beta!
```ascii
📁 Database
└── config.json
    ├── 
    │   * token: <Your Token>
    │   * prefix: <Your Prefix>
    │   * botId: <Your bot ID>
    │   * botSecret: <Your bot Secret ID>
    │   * key: <Beta API key> (Ask the bot creator for access and explain your reason to him! "Roycy#6768 (758662985568092180) or Roycy#8742 (916007798326841346)")
    └──
📁 Database
└── lavalink.json
    ├── 
    │   * node01: <Adress lavalink>
    │   * password01: <Password lavalink>
    │   * port01: <Port lavalink>
    │   * secure01: <True or False>
    |   * ...
    └──
📁 Database
└── spotify.json
    ├── 
    │   * clientID: <Your id for Spotify Developer>
    │   * clientSecret: <Your client secret for Spotify Developer>
    └──
```

### `5.` 🤖 Starting Beta
* Run using `node index.js`
* Check the console to see if there are any errors... Well, we hope that there are none!

<p align="center">
<img src="https://cdn.discordapp.com/attachments/708017680677863505/709834156145770534/lori_deitada.png">
</p>
