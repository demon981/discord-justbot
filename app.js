/*
    Just BOT

    @author: DeMoNeK_
    @file: app.js
*/

const fs = require('fs');
const discord = require('discord.js');
const { createConnection } = require('mysql');
const database = require('./components/config.json');
const client = new discord.Client({ disableMentions: 'everyone', ws: { properties: {} }});

client.config = require('./components/config.json');
client.emotes = client.config.emojis;
client.filters = client.config.filters;
client.commands = new discord.Collection();

client.con = createConnection(database.mysql);

client.con.connect(err => {
	if (err) return console.log(`DB Error: ${err}`);
	console.log(`Just BOT > Loaded, logs bellow`);
});

fs.readdirSync('./components/commands').forEach(dirs => {
    const commands = fs.readdirSync(`./components/commands/${dirs}`).filter(files => files.endsWith('.js'));

    for (const file of commands) {
        const command = require(`./components/commands/${dirs}/${file}`);
        client.commands.set(command.name.toLowerCase(), command);
    };
});

const events = fs.readdirSync('./components/events').filter(file => file.endsWith('.js'));

for (const file of events) {
    const event = require(`./components/events/${file}`);
    client.on(file.split(".")[0], event.bind(null, client));
};

client.on('guildMemberAdd', member => {
	const guild = member.guild;
    const channel = guild.channels.cache.find(channel => channel.name === "🛫┃przyloty")
    if (!channel) return;
    const vcMembers = client.channels.cache.get(`id`); // kanal glosowy
    const avatar = member.user.displayAvatarURL({ format: 'png' });

    if (vcMembers) {
        vcMembers.setName(`• Użytkowników: ${guild.memberCount.toLocaleString()}`);
    }

    channel.send({
        embed: {
            color: `#36bc2c`,
            author: { name: `• ${member.user.username}`, icon_url: `${avatar}`, },
            description: `• Witaj na projekcie **Just Play**. Bardzo nam miło, że postanowiłeś do nas wpaść.`,
        },
    });
});

client.on('guildMemberRemove', member => {
    const guild = member.guild;
    const channel = guild.channels.cache.find(channel => channel.name === "🛫┃wyloty")
    if (!channel) return;
    
    const vcMembers = client.channels.cache.get(`id`); // kanal glosowy
    const avatar = member.user.displayAvatarURL({ format: 'png' });

    if (vcMembers) {
        vcMembers.setName(`• Użytkowników: ${guild.memberCount.toLocaleString()}`);
    }

    channel.send({
        embed: {
            color: `#00d4ff`,
            author: { name: `• ${member.user.username}`, icon_url: `${avatar}`, },
            description: `• Już wychodzisz? Mamy nadzieję, że jeszcze do nas wrócisz.`,
        },
    });
});


client.login(client.config.main.token);