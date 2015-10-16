// 8_make_it_modular.js
// MAKE IT MODULAR
// This problem is the same as the previous but introduces the concept of modules. 
// Create a program that prints a list of files in a given directory, 
// filtered by the extension of the files. 
// The first argument is the directory name and the second argument is the 
// extension filter. 
// Print the list of files (one file per line) to the console. 
// Here we use asynchronous I/O.

var filterFn = require('./extras/solution_filter.js')
var dir = process.argv[2]
var filterStr = process.argv[3]

// Using modules from `./extras/solution_filter.js`
filterFn(dir, filterStr, function (err, list) {
    
    // Dealing with error
    if (err) {
        return console.error('There was an error:', err)
    }

    // Listing files from list
    list.forEach(function (file) {
        console.log(file)
    })
})