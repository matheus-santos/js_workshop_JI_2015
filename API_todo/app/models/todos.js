// app/models/todos.js
// @author: Matheus Cesario <mts.cesario@gmail.com>
// @desc: Mongoose abstraction from MongoDB "Todos" collection

// Loading Mongoose module
var mongoose = require("mongoose");

// Loading the Schema module.
// Since MongoDB do not require data consistency,
// this can be very dangerous and hard to track bugs.
// Fortunately Mongoose comes with a schema module
// that let us create some rules for our data.
// Beyond that, we can create triggers, pre and pos fetches
// for our data and virtual and non virtual functions
var Schema = mongoose.Schema;

// Defining our Schema
var TodosSchema = new Schema({
    text: {
        type: String,
        required: true  // Requiring some text
    },
    created: {
        type: Date,
        default: Date.now  // Default value for created
    },
    author_name: {
        type: String,
        required: true  // Requiring author name
    },
});

// The global variable `module.exports` let us
// expose methods and variables that will be
// used trough our project.
// Here we are exporting the `Todos` schema, that
// will be used to access the data into MongoDB
module.exports = mongoose.model("Todos", TodosSchema);