const Discord = require("discord.js");
const spam = new Set();

module.exports= {
  name: 'kick',
  category: 'moderacja',
  description: 'banowanie użytkowników',
  utilisation: '{prefix}kick',
  execute(client,message,args,guild)  {
    let banned = message.mentions.users.first() || client.users.resolve(args[0]);
    let reason = args.slice(1).join(" ");

    let colors = ['#bbfca9','#fcfca9','#fcc2a9','#fca9a9','#a9b3fc', '#dfa9fc', '#fca9e6'];
    let color = Math.floor((Math.random() * colors.length));
    // `#2f0000`
  
    // MESSAGES
    if (spam.has(message.author.id)) {
        message.channel.send({
            embed: {
                author: `!kick`,
                color: `#00d4ff`,
                description: `Poczekaj chwile!`,
            },
        });
    } else {

        spam.add(message.author.id);

        setTimeout(() => {
          spam.delete(message.author.id);
        }, 5000);

        if (!message.member.permissions.has("KICK_MEMBERS")) {
      message.channel.send({
            embed: {
                author: `!kick`,
                color: `#00d4ff`,
                description: `Brak uprawnień!`,
            },
        });
  
      return;
    }
  
    if (!message.guild.me.permissions.has("KICK_MEMBERS")) {
      message.channel.send({
            embed: {
                author: `!kick`,
                color: `#00d4ff`,
                description: `Brak uprawnień!`,
            },
        });
  
      return;
    }

    if (!banned) {
      message.channel.send({
            embed: {
                author: `!kick`,
                color: `#00d4ff`,
                description: `Wpisz **!kick <użytkownik> <powód>**`,
            },
        });
  
      return;
    }
  
    if (message.author === banned) {
      message.channel.send({
            embed: {
                author: `!kick`,
                color: `#00d4ff`,
                description: `Co ty samego siebie chcesz wyrzucić?`,
            },
        });
  
      return;
    }
  
    if (!reason) {
      message.channel.send({
            embed: {
                author: `!kick`,
                color: `#00d4ff`,
                description: `Wpisz **!kick <użytkownik> <powód>**`,
            },
        });
  
      return;
    }
  
    message.guild.member(banned).kick(reason);

    banned.send({
            embed: {
                author: `Zostałeś wyrzucony!`,
                color: `#00d4ff`,
                description: `Za: **${reason}**`,
            },
        });
  
    message.channel.send({
            embed: {
                author: `Użytkownik wyrzucony!`,
                color: `#00d4ff`,
                description: `Użytkownik **${banned.tag}** został wyrzucony za **${reason}**.`,
            },
        });
  
    }
  },
}