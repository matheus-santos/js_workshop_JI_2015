// server.js
// @author: Matheus Cesário <mts.cesario@gmail.com>
// @desc: Building simple API using Node, Express and MongoDB

// Defining modules
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var allowCrossDomain = function(req, res, next) {

    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");

    next();
}

// Configuring our app to use bodyParser.
// This will let us parse the data coming from POST
// request into json (js object)
app.use(bodyParser.urlencoded({ extend: true }));
app.use(bodyParser.json());
app.use(allowCrossDomain);

// Connecting with our MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/test");

// Loading our Mongoose models (Mongo collection)
var Todos = require("./app/models/todos");

// Defining access port where our API will comunicate
var port = process.env.PORT || 3000;

/**
 *
 * Defining routes
 * 
 */

var router = express.Router();  // Our router

// Middleware for all requests.
// This middleware will be executed in every request.
// Here we could make some data validation, re-routing,
// logging and everything else.
router.use(function(req, res, next) {
    console.log("Request made..");
    
    // The `next()` function call the next middleware
    // in the list. We are passing to the next module
    // that will evaluate our request.
    next();
});

// Root call
// Testing our api to make sure it is working
// (acessed at GET/ http://localhost:3000/api_v1/)
router.get("/", function(req, res) {

    // The variable `req` represents the objects 
    // that carries the information from client. 
    // In a POST request, we would read the `req`
    // in order to get the data to store in our
    // collection.

    // The variable `res` represents the callback 
    // that will store our response back to client.
    // When we have the results from our db, we use 
    // the `res` object to retrieve the data

    // Retrieving data back to client
    res.json({ message: "Welcome to API 1.0"});
});

// Accessing our collection "Todos"
// Creating new route "/api_v1/todos"
router.route("/todos")
    
    // POST/ Creatig new todo
    .post(function(req, res) {

        // New todo
        var todo = new Todos();

        // Here we save the data that comes from POST req
        todo.text = req.body.text;
        todo.author_name = req.body.author_name;

        // Saving new todo
        todo.save(function(err) {
            
            // Something went wrong
            if (err) {
                req.send(err);
            };

            // If todo was saved, retrieve results
            res.json({ message: "Todo created!"});
        });
    })
    
    // GET/ Retrieving all todos
    .get(function(req, res) {

        // Making request to Mongo through Mongoose
        // object `Todos`
        Todos.find(function(err, todos) {
            
            // It is a good practice to always declare
            // the first callback variable as `err`. 
            // Usually, Node or any of its modules will
            // return the error message in the first
            // variable if something goes wrong.
            if (err) {
                res.send(err);
            }

            // Retrieving response as json file
            res.json(todos);  // All todos from collection
        })
    });

// Express let us define some special terms into
// our url to denote dinamic variables. In this case
// ":id" will be transformed into id variable that can
// be validate for some middleware.
router.route("/todos/:id")
    // DELETE/ deleting todo
    .delete(function(req, res) {

        // Todo id
        var todo_id = req.params.id;

        // The built-in method `remove`
        // will search by items that matches with
        // given id and will remove it.
        Todos.remove({
            _id: todo_id
        }, function (err, todo) {

            // Something went wrong
            if (err) {
                res.send(err);
            }

            // Retrieving data
            res.json({
                _id: todo_id,
                message: "Todo deleted"
            })

        });

    })

    // GET/ get specific todo
    .get(function(req, res) {

        // Todo id
        var todo_id = req.params.id;

        // Built-in method `findById` will search
        // into our collection by the auto-generated
        // id.
        Todos.findById(todo_id, function(err, todo) {

            // Something went wrong
            if (err) {
                res.send(err);
            }

            // Nothing found!
            if (todo === null) {
                return res.json({
                    message: "Message does not exists!"
                });
            };

            // Retrieving todo info
            res.json(todo)
        });
    })

    // PUT/ Updating todo
    .put(function(req, res) {

        // Searching by todo
        Todos.findById(req.params.id, function(err, todo) {

            if (err) {
                res.send(err);
            }

            // Nothing found!
            if (todo === null) {
                return res.json({
                    message: "Message does not exists!"
                });
            };

            var old_text = todo.text;

            // Updating its text
            todo.text = req.body.text;

            // Saving the new todo
            todo.save(function(err) {
                
                if (err) {
                    res.send(err);
                }

                res.json({ 
                    _id: todo._id,
                    message: "Todo updated!",
                    old_text: old_text,
                    new_text: todo.text
                })
            })

        });

    });

// Registering our routes to app
app.use("/api_v1/", router);

// Starting our Express app
app.listen(port);
console.log("Magic happens on port", port);