// CONNECT TO MONGOOSE
var mongoose = require("mongoose");

// Set debog mode to true in order to see what is happening at any given point
// when things are being sent to a db and failing
mongoose.set("debug", true);

// Connect to db server
// MY NOTE: for some reason when I used "localhost" instead of "127.0.0.1"
// I kept getting a MongoNetworkError
mongoose.connect("mongodb://127.0.0.1/todo-api", function(err) {
    if (err) {
        console.log("CONNETION ERROR");
    }
});
// mongoose.connect(process.env.DATABASEURL, {useMongoClient: true});

// To allow you to use the Promise syntax
mongoose.Promise = Promise;

//Require the todo.js file and export it out 
module.exports.Todo = require("./todo");





