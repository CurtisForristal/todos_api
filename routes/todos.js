var express = require("express");
var router = express.Router();
// code for the todo model is stored in the db variable
// only need to require the models dir because it will automatically look for index.js there
var db = require("../models")
var helpers = require("../helpers/todos");


// ROUTES

// INDEX and CREATE ROUTES
router.route("/")
    .get(helpers.getTodos)
    .post(helpers.createTodo)


// SHOW, UPDATE, and DELETE ROUTES
router.route("/:todoId")
    .get(helpers.getTodo)
    .put(helpers.updateTodo)
    .delete(helpers.deleteTodo)

// EXPORT
module.exports = router;