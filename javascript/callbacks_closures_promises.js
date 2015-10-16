// javascript/callbacks_closures_promises.js

// Callback functions are derived from a programming paradigm known as functional 
// programming. At a fundamental level, functional programming specifies the use 
// of functions as arguments.
function usingCallback(callback) {

    setTimeout(function() { 
        callback("Data from Server");
    }, 3000);
}

usingCallback(function(data){
    console.log(data);
})


// Closures
// A closure is a special kind of object that combines two things: a function, 
// and the environment in which that function was created. 
// The environment consists of any local variables that were in-scope at 
// the time that the closure was created.
var name = "Outside closure";

function makeFunc() {
    var name = "My first closure!";
    
    function displayName() {
        alert(name);
    }
    
    return displayName;
};

var myFunc = makeFunc();
myFunc();


// Promises
// A Promise represents a proxy for a value not necessarily 
// known when the promise is created
// new Promise(executor);
// new Promise(function(resolve, reject) { ... });
// https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise

'use strict';
var promiseCount = 0;

function testPromise() {
    var thisPromiseCount = ++promiseCount;

    console.log('beforeend', thisPromiseCount + ') Started (Sync code started)')

    // We make a new promise: we promise the string 'result' (after waiting 3s)
    var p1 = new Promise(

        // The resolver function is called with the ability to resolve or
        // reject the promise
        function(resolve, reject) 
        {
            console.log('beforeend', thisPromiseCount + ') Promise started (Async code started)');
            
            // This is only an example to create asynchronism
            window.setTimeout(
                function() {
                    // We fulfill the promise !
                    resolve(thisPromiseCount);
                }, 3000);
        });

    // We define what to do when the promise is fulfilled
    // but we only call this if the promise is resolved/fulfilled
    p1.then(
        // Just log the message and a value
        function(val) {
            console.log('beforeend', val + ') Promise fulfilled (Async code terminated)');
        })
    .catch(
        // Rejected promises are passed on by Promise.prototype.then(onFulfilled)
        function(reason) {
            console.log('Handle rejected promise ('+reason+') here.');
        });

    console.log('beforeend', thisPromiseCount + ') Promise made (Sync code terminated)');
}