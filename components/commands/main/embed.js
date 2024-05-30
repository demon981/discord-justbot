module.exports = {
    name: 'embed',
    aliases: [],
    category: 'Inne',
    utilisation: '{prefix}embed',

    execute(client, message, args) {

        const prefix = 'v!embed';
        let args2 = message.content.slice(prefix.length).split('|');

    	let title = args2[0];
    	let desc = args2.slice(1).join(" ");

        const avatar = message.author.displayAvatarURL({ format: 'png' });

    	if (!message.member.permissions.has("MANAGE_MESSAGES")) {
      		message.channel.send({
            	embed: {
                	color: `#00d4ff`,
                	description: `❌ Brak uprawnień!`,
            	},
        	});
      		return;
    	}
  
    	if (!message.guild.me.permissions.has("MANAGE_MESSAGES")) {
      		message.channel.send({
            	embed: {
                	color: `#00d4ff`,
                	description: `❌ Brak uprawnień!`,
            	},
        	});
      		return;
    	}

    	if (!title || !desc) {
    		message.channel.send({
            	embed: {
                	color: `#00d4ff`,
                    description: `❌ Wpisz \`!embed <tytuł> <treść>\``,
            	},
        	});
        	return;
    	}

        message.channel.bulkDelete(1, true);

        message.channel.send({
            embed: {
                color: `#00d4ff`,
                //author: { name: `${title}` },
                author: { name: `${message.author.username}`, icon_url: `${avatar}`, },
                description: `${title}\n\n${desc}`,
            },
        });
    },
};