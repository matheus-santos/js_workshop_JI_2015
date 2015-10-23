// node/extras/CountEvent.js
// Couting even numbers and emitting events
// 14_emitting_events.js
// http://yehudakatz.com/2011/08/12/understanding-prototypes-in-javascript/

// Events (https://nodejs.org/api/events.html)
var events = require('events');

//
// Class
//

// In order to facilitate object oriented programming, 
// JavaScript allows us to use a Function object as a combination 
// of a prototype to use for the new object and a constructor function to invoke.

var CountEven = function(initial_no) { 
    this.count = initial_no; 
};

// Inheriting from Events
CountEven.prototype = new events.EventEmitter;

//
// Methods
//

CountEven.prototype.increment = function() {
    var self = this;

    setInterval(function() {
        
        if(self.count % 2 === 0) {
            self.emit('even');
        }
        
        self.count++;
    }, 300);
};

CountEven.prototype.dispatchEvent = function(event_name, data) {
    this.emit(event_name, data);  // Emitting event
}

// Exporting module
// Here, we have a single Function object that is both a constructor function
// and an object to use as the prototype of new objects. 
module.exports = CountEven;