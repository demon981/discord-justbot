/*
    Just BOT

    @author: DeMoNeK_
    @file: components/event/ready.js
*/

//const players = require('gamedig');

module.exports = async (client, message) => {
    /*
    function getOnlinePlayers() {
        players.query({
            type: `mtasa`,
            host: `21.83.182.35`,
            port: `20172`
        }).then((data) => {
            client.user.setActivity(`Just Play > ${data.raw.numplayers}/200 graczy`)
        }).catch((error) => {
            client.user.setActivity(`Just Play > przerwa techniczna`)
        });
    }

    getOnlinePlayers();
    setInterval(function(){
        getOnlinePlayers();
    }, 10000);
    */

    client.user.setActivity(`Pracujemy nad serwerem!`);
};