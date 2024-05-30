module.exports = 
{
	name: 'question',
	category: 'user',
	description: 'system ankiet',
	utilisation: '{prefix}question',

	execute (client, message, args, guild)
	{
		let text = args.slice(0).join(" ");
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

        if (!text) {
            message.channel.send({
                embed: {
                    color: `#00d4ff`,
                    description: `❌ Wpisz \`!question <treść>\``,
                },
            });
            return;
        }

        message.channel.send({
            embed: {
                color: `#00d4ff`,
                author: { name: `${message.author.username}`, icon_url: `${avatar}`, },
                description: `**Ankieta**\n\n${text}`,
            },
        }).then(function (message){
            message.react("👍");
            message.react("👎");
        }).catch(function() {});
            
    	message.channel.bulkDelete(1, true);
	}
};