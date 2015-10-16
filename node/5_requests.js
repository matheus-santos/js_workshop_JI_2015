// node/5_requests.js
// Example: http://localhost:3000/api_v1/todos

// Core Module http (https://nodejs.org/api/http.html)
var http = require('http');

// Getting url from arguments
var url = process.argv[2];

console.log("Sending request to", url,"...");

// Performing request
http.get(url, function (response) {

    // Defining enconding type
    response.setEncoding('utf8');

    // When data is processed, execute this callback
    response.on('data', function (data) {
        console.log(data);
    });
});