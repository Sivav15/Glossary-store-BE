const delivery = require("./delivery");
const Timer = require("./timerFunction");




const timer = new Timer(function() {
    console.log("interver start");
    delivery()
}, 10000);

module.exports = timer;