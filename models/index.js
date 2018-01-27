// CONNECT TO MONGOOSE
var mongoose = require("mongoose");

// Set debog mode to true in order to see what is happening at any given point
// when things are being sent to a db and failing
mongoose.set("debug", true);

// Connect to db server
mongoose.connect("mongodb://localhost/todo-api");
// mongoose.connect(process.env.DATABASEURL, {useMongoClient: true});

// To allow you to use the Promise syntax
mongoose.Promise = Promise;

//Require the todo.js file and export it out 
module.exports.Todo = require("./todo");





