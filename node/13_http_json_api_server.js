// node/13_http_json_api_server.js
// HTTP JSON API SERVER
// Write an HTTP server that serves JSON data when it receives a GET request 
// to the path '/api/parsetime'. Expect the request to contain a query string 
// with a key 'iso' and an ISO-format time as the value.

// Http module (https://nodejs.org/api/http.html)
// To use the HTTP server and client
var http = require('http'),

// URL module (https://nodejs.org/api/url.html)
// This module has utilities for URL resolution and parsing
    url = require('url'),

// Port to listen
    port = Number(process.argv[2]);

//
// Functions
//

// Parsing UNIXTIME to time (hour, minutes and seconds)
function parsetime (time) {
    return {
        hour: time.getHours(),
        minute: time.getMinutes(),
        second: time.getSeconds()
    }
}

// Returning object with UNIXTIME
function unixtime (time) {
    return { unixtime : time.getTime() }
}

//
// Server
//

// Creating HTTP server to listen
var server = http.createServer(function (req, res) {

    // Handling parameters
    // GET/ parameters
    var parsedUrl = url.parse(req.url, true)
    
    // Getting `iso` parameter
    // Converting ISO time to Date object
    var time = new Date(parsedUrl.query.iso)
    
    // Results
    var result

    // Routing
    // Checking if route is /api/unixtime or /api/parsetime
    // RegExp.prototype.test() executes a search for a match between a 
    // regular expression and a specified string.
    if (/^\/api\/parsetime/.test(req.url)) {
        result = parsetime(time)
    } else if (/^\/api\/unixtime/.test(req.url)) {
        result = unixtime(time)
    }

    // Building response
    if (result) {

        // Header
        res.writeHead(200, { 'Content-Type': 'application/json' })
        
        // Sending body
        res.end(JSON.stringify(result))

    } else {

        // 404 stands for not found
        res.writeHead(404)
        res.end()
    }
})

server.listen(port);
console.log("Magic happens in port ", port);