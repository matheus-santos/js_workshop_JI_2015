// 7_filtered_ls.js
// FILTERED LS
// program that prints a list of files in a given directory, 
// filtered by the extension of the files. A directory 
// name is provided as the first argument to your program (e.g. '/path/to/dir/') 
// and a file extension to filter by as the second argument.

// Filesystem module (https://nodejs.org/api/fs.html)
// File I/O is provided by simple wrappers around standard POSIX functions. 
// All the methods have asynchronous and synchronous forms.
var fs = require('fs')

// Path module (https://nodejs.org/api/path.html)
// This module contains utilities for handling and transforming file paths. 
// Almost all these methods perform only string transformations.
// The file system is not consulted to check whether paths are valid.
var path = require('path')

// Reading process.argv[2] path
fs.readdir(process.argv[2], function (err, list) {
    
    // For each file found in the path
    list.forEach(function (file) {
        
        // If file has extension, display it
        if (path.extname(file) === '.' + process.argv[3]) {
            console.log(file)
        }
    })
})