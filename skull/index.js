const { Client } = require('discord.js-selfbot-v13');
const fs = require('fs');
const client = new Client();
let config = JSON.parse(fs.readFileSync('config.json', 'utf8'));

let current = config.emoji;

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', msg => {
    if (msg.author.id === client.user.id) {
        msg.react(current)
            .catch(console.error);

        if (msg.content.startsWith('!emoji ')) {
            const newEmoji = msg.content.split(' ')[1];
            if (newEmoji) {
                current = newEmoji;
                msg.channel.send(`${newEmoji}`)
                    .catch(console.error);
            }
        }

        if (msg.content.startsWith('!av ')) {
            const user = msg.mentions.users.first();
            if (user) {
                const avatar = user.displayAvatarURL({ format: 'png', size: 1024 });
                msg.channel.send(avatar)
                    .catch(console.error);
            }
        }

        if (msg.content.startsWith('!help')) {
            msg.channel.send('!emoji [emoji] - Change the emoji\n!av [user] - Get the avatar of a user\n!stop - Stop the bot')
                .catch(console.error);
        }


        if (msg.content === '!stop') {
            msg.channel.send('Stopped.')
                .catch(console.error);
            client.destroy();
            process.exit();
        }
    }
});

client.login(config.token);