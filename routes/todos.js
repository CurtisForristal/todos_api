var express = require("express");
var router = express.Router();
// code for the todo model is store in the db variable
var db = require("../models")


router.get("/", function(req, res) {
    // Send all the todos in the db

    // Instead of putting a callback in fin(),
    // can do it with Promises
    db.Todo.find()
    .then(function(todos) {
        res.json(todos);
    })
    .catch(function(err) {
        res.send(err);
    })
});



module.exports = router;