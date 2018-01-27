var express = require("express");
var router = express.Router();
// code for the todo model is stored in the db variable
// only need to require the models dir because it will automatically look for index.js there
var db = require("../models")

// ROUTES

// INDEX ROUTE
router.get("/", function(req, res) {
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
});


// CREATE ROUTE
router.post("/", function(req, res) {
    db.Todo.create(req.body)
    .then(function(newTodo) {
        // Respond with status code 201, which is the code for created
        // Also respond with the newTodo in json
        res.status(201).json(newTodo);
    })
    .catch(function(err) {
        res.send(err);
    });
});


// SHOW ROUTE
router.get("/:todoId", function(req, res) {
    db.Todo.findById(req.params.todoId)
    .then(function(foundTodo) {
        res.json(foundTodo);
    })
    .catch(function(err) {
        res.send(err);
    });
});


// UPDATE ROUTE
router.put("/:todoId", function(req, res) {
    // NOTE: {new: true} will make findByIdAndUpdate respond with the updated object instead of the old one
    db.Todo.findByIdAndUpdate({_id: req.params.todoId}, req.body, {new: true})
    .then(function(todo) {
        res.json(todo)
    })
    .catch(function(err) {
        res.send(err);
    });
});


module.exports = router;