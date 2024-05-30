const Discord = require("discord.js");
const spam = new Set();

module.exports= {
  name: 'warn',
  category: 'moderacja',
  description: 'ostrzeganie użytkowników',
  utilisation: '{prefix}warn',
  execute(client,message,args,guild)  {
    let banned = message.mentions.users.first() || client.users.resolve(args[0]);
    let reason = args.slice(1).join(" ");

      let colors = ['#bbfca9','#fcfca9','#fcc2a9','#fca9a9','#a9b3fc', '#dfa9fc', '#fca9e6'];
    let color = Math.floor((Math.random() * colors.length));
    // `#00d4ff`
  
    // MESSAGES
  	if (spam.has(message.author.id)) {
  		message.channel.send({
            embed: {
                color: `#00d4ff`,
                author: { name: 'Anty Spam' },
                footer: { text: 'Just Play' },
                fields: [],
                timestamp: new Date(),
                description: `» Musisz odczekać 5 sekund przed ponownym wpisaniem tej komendy.`,
            },
        });
  	} else {

  		spam.add(message.author.id);

  		setTimeout(() => {
          spam.delete(message.author.id);
        }, 5000);

     if (!message.member.permissions.has("BAN_MEMBERS")) {
      message.channel.send({
            embed: {
                color: `#00d4ff`,
                author: { name: 'Nadawanie ostrzeżenia' },
                footer: { text: 'Just Play' },
                fields: [],
                timestamp: new Date(),
                description: `» Nie masz uprawnień do nadania ostrzeżenia`,
            },
        });
  
      return;
    }
  
    if (!message.guild.me.permissions.has("BAN_MEMBERS")) {
      message.channel.send({
            embed: {
                color: `#00d4ff`,
                author: { name: 'Nadawanie ostrzeżenia' },
                footer: { text: 'Just Play' },
                fields: [],
                timestamp: new Date(),
                description: `» Nie masz uprawnień do nadania ostrzeżenia.`,
            },
        });
  
      return;
    }

    if (!banned) {
      message.channel.send({
            embed: {
                color: `#00d4ff`,
                author: { name: 'Nadawanie ostrzeżenia' },
                footer: { text: 'Just Play' },
                fields: [],
                timestamp: new Date(),
                description: `» Poprawne użycie: !warn [@użytkownik] [powód]`,
            },
        });
  
      return;
    }
  
  	
    if (message.author === banned) {
      message.channel.send({
            embed: {
                color: `#00d4ff`,
                author: { name: 'Nadawanie ostrzeżenia' },
                footer: { text: 'Just Play' },
                fields: [],
                timestamp: new Date(),
                description: `» Nie możesz nadać ostrzeżenia samemu sobie.`,
            },
        });
  
      return;
    }
    
  	
    if (!reason) {
      message.channel.send({
            embed: {
                color: `#00d4ff`,
                author: { name: 'Nadawanie ostrzeżenia' },
                footer: { text: 'Just Play' },
                fields: [],
                timestamp: new Date(),
                description: `» Należy wprowadzić powód ostrzeżenia.`,
            },
        });
  
      return;
    }
  

  
    //message.guild.members.ban(banned, { reason: reason });

    //client.fetchUser(banned.id, false).then((user) => {
 	//	user.send('chuj');
 	//}

 	banned.send({
            embed: {
                color: `#00d4ff`,
                author: { name: 'Otrzymałeś ostrzeżenie!' },
                footer: { text: 'Just Play' },
                fields: [],
                timestamp: new Date(),
                description: `» Otrzymałeś ostrzeżenie! \n» Powód: **${reason}**`,
            },
        });
  
    message.channel.send({
            embed: {
                color: `#00d4ff`,
                author: { name: 'Nadawanie ostrzeżenia' },
                footer: { text: 'Just Play' },
                fields: [],
                timestamp: new Date(),
                description: `» Użytkownik **${banned.tag}** otrzymał ostrzeżenie.\n» Powód: **${reason}**`,
            },
        });
  
    }
  },
}