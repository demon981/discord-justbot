const spam = new Map();

function stworzDolarki() {
    return Math.floor(Math.random() * 250) + 1;
}

module.exports = {
    name: 'work',
    aliases: [],
    category: 'Inne',
    utilisation: '{prefix}work',
    execute(client, message, args) {
        if (!spam.has(message.author.id)) {
            spam.set(message.author.id);
        }

        const current_time = Date.now();
        const cooldown_amount = 60 * 1000;

        if(spam.has(message.author.id)){
        const expiration_time = spam.get(message.author.id) + cooldown_amount;

        if(current_time < expiration_time){
            const time_left = (expiration_time - current_time) / 1000;

            return message.channel.send({
                embed: {
                    color: `##00d4ff`,
                    description: `Zaczekaj jeszcze **${time_left.toFixed(0)}** sekund, przed ponownym wpisaniem komendy!`,
                },
            }); 
            }
        }   

        spam.set(message.author.id, current_time);
        setTimeout(() => spam.delete(message.author.id), cooldown_amount);

        let jobs = ['Programista','Budowniczy','Taksówkarz','Kierowca autobusu','Kucharz','Menel spod biedronki', 'Magazynier', 'Strażak', 'Ochroniarz w Carrefourze', 'Szef w korpo']

        let job = Math.floor((Math.random() * jobs.length));
        let money = Math.floor(Math.random() * 250) + 2;

        message.channel.send({
            embed: {
                color: `#00d4ff`,
                 description: `Pracując jako **${jobs[job]}** zarobiłeś(aś) **${money}** dolarków.`,
            },
        });

        // zabezpieczenie:
        client.con.query(`SELECT * FROM dolarki WHERE memberID = '${message.author.id}'`, (err, rows) => {
            if (err) throw err;

            let sql;

            if (rows.length < 1) {
                sql = `INSERT INTO dolarki (memberID, value) VALUES ('${message.author.id}', ${stworzDolarki()})`;
            } else {
                let dolarki2 = rows[0].value;
                sql = `UPDATE dolarki SET value = ${dolarki2 + money} WHERE memberID = '${message.author.id}'`;
            }
            client.con.query(sql);
        });
    },
};