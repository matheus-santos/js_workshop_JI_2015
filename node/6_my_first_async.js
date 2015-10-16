// 6_my_first_async.js
// Learnyounode "MY FIRST ASYNC I/O"
// Write a program that uses a single asynchronous filesystem operation 
// to read a file and print the number of newlines it contains to the 
// console (stdout), similar to running cat file | wc -l.

// Requiring filesystem
var fs = require('fs')

// Arguments from command line
var file = process.argv[2]

// Reading file
// Alternative call can be fs.readFile(file, 'utf8', callback)
fs.readFile(file, function (err, contents) {

    // Converting content to string and counting newlines ("\n")
    var lines = contents.toString().split('\n').length - 1
    console.log(lines)
})