// node/14_http_json_api_server.js
// EMITTING EVENTS
console.log("14. EMITING EVENTS");

var CountEven = require('./extras/CountEven');
var countEven = new CountEven(1);

// Creating listener
countEven.on('even', function(data) { 
    console.log('Even number detected! counter=', this.count);
});

countEven.on('odd', function(data) {
    console.log('Odd number detected!');
    console.log('Data = ', data);
});

// Dispatching events
// countEven.dispatchEvent('even');  // Dispatching simple event
// countEven.increment();  // Emitting multiple events
// countEven.dispatchEvent('odd', '23 is a odd number');  // Sending message