// Requiring file system module (https://nodejs.org/api/fs.html)
fs = require('fs');

// Reading file and converting into utf8 enconding
fs.readFile('extras/twenty.txt', 'utf8', function (err, data) {
    
    // Good practice
    if (err) {
        return console.log(err);
    }

    // Displaying data
    console.log(data);
});