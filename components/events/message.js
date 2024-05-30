/*
    Just BOT

    @author: DeMoNeK_
    @file: components/event/message.js
*/

function stworzDolarki() {
	return Math.floor(Math.random() * 20) + 1;
}

function stworzExp() {
    return Math.floor(Math.random() * (10 - 5 + 1))+ 5;
}

module.exports = async (client, message) => {
    if (message.author.bot) return;

    if (message.channel.type == 'dm') {
        message.author.send({
            embed: {
                color: `#00d4ff`,
                description: `Nie odpowiadam na **prywatne wiadomości**.`,
            },
        });
        return;
    }
    // zmien sobie id kanalow
    const boty = client.channels.cache.get(`971793224454799410`);
    const ogloszenia = client.channels.cache.get(`953721025424683088`);
    const changelog = client.channels.cache.get(`953721192471199764`);
    const ankiety = client.channels.cache.get(`953721738678657054`);
    const frakcje = client.channels.cache.get(`953720962841456640`);
    const adm = client.channels.cache.get(`953724624691134535`);

    const propozycje = client.channels.cache.get(`953723272002961448`);

    let lvl = 0;

    client.con.query(`SELECT * FROM dolarki WHERE memberID = '${message.author.id}'`, (err, rows) => {
    	if (err) throw err;

    	let sql;

    	if (rows.length < 1) {
    		sql = `INSERT INTO dolarki (memberID, value) VALUES ('${message.author.id}', ${stworzDolarki()})`;
    	} else {
    		let dolarki = rows[0].value;

    		sql = `UPDATE dolarki SET value = ${dolarki + stworzDolarki()} WHERE memberID = '${message.author.id}'`;
    	}

    	client.con.query(sql);
    });

    client.con.query(`SELECT * FROM poziomy WHERE memberID = '${message.author.id}'`, (err, rows) => {
        if(rows.length < 1) { 
            sql = `INSERT INTO poziomy (memberID, xp, level) VALUES ('${message.author.id}', '${stworzExp()}', '${lvl}')`
        } else {
            let xp = rows[0].xp; 

            sql = `UPDATE poziomy SET xp = ${xp + stworzExp()} WHERE memberID = '${message.author.id}'`;

            let nxtLvl = rows[0].level * 1000;  

            if(nxtLvl <= rows[0].xp){ 
                client.con.query(`UPDATE poziomy SET level = ${rows[0].level + 1} WHERE memberID = '${message.author.id}'`)
            }

            if(nxtLvl <= rows[0].xp){
                boty.send({
                    embed: {
                        color: `#00d4ff`,
                        description: `Gratulację **${message.author.username}**, awansowałeś na poziom **${rows[0].level + 1}**.`,
                    },
                });
            }
        }

        client.con.query(sql);
    });

    if (message.channel == boty || message.channel == ogloszenia || message.channel == changelog || message.channel == ankiety || message.channel == frakcje || message.channel == adm) { 
        const prefix = client.config.main.prefix;

        if (message.content.indexOf(prefix) !== 0) return;

        const args = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = args.shift().toLowerCase();

        const cmd = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command));

        try {
            if (cmd) cmd.execute(client, message, args);
        } catch (err) {
            console.log(err);
        }

        return;
    }
};