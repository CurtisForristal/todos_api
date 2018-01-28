var db = require("../models");


// FUNCTION: INDEX ROUTE
exports.getTodos = function(req, res) {
    // Send all the todos in the db

    // Instead of putting a callback in find(),
    // can do it with Promises
    db.Todo.find()
    .then(function(todos) {
        res.json(todos);
    })
    .catch(function(err) {
        res.send(err);
    });
}


// FUNCTION: CREATE ROUTE
exports.createTodo = function(req, res) {
    db.Todo.create(req.body)
    .then(function(newTodo) {
        // Respond with status code 201, which is the code for created
        // Also respond with the newTodo in json
        res.status(201).json(newTodo);
    })
    .catch(function(err) {
        res.send(err);
    });
}


// FUNCTION: SHOW ROUTE
exports.getTodo = function(req, res) {
    db.Todo.findById(req.params.todoId)
    .then(function(foundTodo) {
        res.json(foundTodo);
    })
    .catch(function(err) {
        res.send(err);
    });
}


// FUNCTION: UPDATE ROUTE
exports.updateTodo = function(req, res) {
    // NOTE: {new: true} will make findByIdAndUpdate respond with the updated object instead of the old one
    db.Todo.findByIdAndUpdate({_id: req.params.todoId}, req.body, {new: true})
    .then(function(todo) {
        res.json(todo)
    })
    .catch(function(err) {
        res.send(err);
    });
}


// FUNCTION: DELETE ROUTE
exports.deleteTodo = function(req, res) {
    db.Todo.remove({_id: req.params.todoId})
    .then(function() {
        res.json({message: "We deleted it!"});
    })
    .catch(function(err) {
        res.send(err);
    });
}


// EXPORT
module.exports = exports;