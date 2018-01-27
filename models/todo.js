// TODO SCHEMA

var mongoose = require("mongoose");

var todoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: "Name cannont be black!"
    },
    completed: {
        type: Boolean,
        default: false
    },
    created_date: {
        type: Date,
        default: Date.now
    }
});

// Compile it into a model
var Todo = mongoose.model("Todo", todoSchema);
// Export
module.exports = Todo;