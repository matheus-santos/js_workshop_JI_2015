// node/2_closure.js
// Closures are very important in asynchronous programming because JavaScript
// functions are first-class objects that can be passed as arguments to other functions.
// This means that you can create a callback function and pass it as an argument to an
// event handler. When the event will be emitted, the function will be invoked, and it
// will be able to manipulate any variable that existed when the callback function was
// created even if its parent function was already executed. This means that using the
// closure pattern will help you utilize event-driven programming without the need to
// pass the scope state to the event handler.


// Parent object
parent = function() {

    function child() {
        return "Data from child function"
    }

    return child;
}

// Referencing
var child = parent();
console.log(child());



