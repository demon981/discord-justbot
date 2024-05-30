module.exports = 
{
	name: 'propozycja',
	category: 'user',
	description: 'pisanie propozycji',
	utilisation: '{prefix}propozycja',

	execute (client, message, args, guild)
	{
		let text = args.slice(0).join(" ");

		if (!text)
    	{
    		message.channel.send(
    		{
    			embed:
    			{
    				color: `#00d4ff`,
    				author: { name: 'System propozycji' },
    				footer: { text: 'Just Play' },
    				timestamp: new Date(),
    				description: `• Podczas pisania propozycji musisz ją opisać!`
    			},
    		});
    		message.channel.bulkDelete(1, true);
    		return;
    	}

    	let propChannel = client.channels.cache.get('928723395523248170');
    	if (propChannel)
    	{
    		propChannel.send(
    		{
    			embed:
    			{
    				color: `#00d4ff`,
    				author: { name: 'Nowa propozycja!' },
    				footer: { text: 'Just Play' },
    				fields: [],
    				timestamp: new Date(),
    				description: `• **${message.author}** napisał nową propozycję.\n\n• Treść: **${text}**.`
    			},
    		}).then(function (message){
                message.react("👍");
                message.react("👎");
            }).catch(function() {}); 
    	}

    	message.channel.bulkDelete(1, true);
	}
};