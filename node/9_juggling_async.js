// 9_juggling_async.js
// JUGGLING ASYNC
// You need to use http.get(), however, this time will be provided with 
// three URLs as the first three command-line arguments.

// HTTP module (https://nodejs.org/api/http.html)
// The HTTP interfaces in Node.js are designed to support many features of 
// the protocol which have been traditionally difficult to use. 
// In particular, large, possibly chunk-encoded, messages. 
// The interface is careful to never buffer entire requests or responses --
// the user is able to stream data.
var http = require('http')

// Buffer list module (https://github.com/rvagg/bl)
// `npm install bl`
// BL is a storage object for collections of Node Buffers, 
// exposing them with the main Buffer readable API. 
// Also works as a duplex stream so you can collect buffers from a stream 
// that emits them and emit buffers to a stream that consumes them!
var bl = require('bl')

// Global variables
var results = []
var count = 0

//
// Functions
//

// Printing results
function printResults () {
    for (var i = 0; i < 3; i++) {
        console.log(results[i])
    }
}

// HTTP requests
function httpGet(index) {

    // Requesting data from arguments
    http.get(process.argv[2 + index], function (response) {
        
        // Stream of data
        response.pipe(

            // Buffer list
            bl(function (err, data) {
        
                // Err
                if (err) {
                    return console.error(err)
                }

                // Caching results
                results[index] = data.toString();
                count++;  // Increasing results counter

                // When all 3 responses are fetched, 
                if (count == 3) {
                    printResults();
                }
            })
        )
    })
}

//
// Program
//

for (var i = 0; i < 3; i++) {
    httpGet(i)
}
