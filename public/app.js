

// Any code inside here will not run until the DOM has loaded
$(document).ready(function() {
    // Get all the data from the db
    $.getJSON("/api/todos")
    .then(addTodos)
    
    // listen if the Enter key (key code 13) is pressed
    $("#todoInput").keypress(function(event) {
        // "which" contains the key code value
        if (event.which === 13) {
            createTodo();
        }
    });
    // We are not handling errors in this app, but you SHOULD!
});



// ****************
// HELPER FUNCTIONS
// ****************

// Adds all todos to the page
function addTodos(todos) {
    // Loop through each todo
    todos.forEach(function(todo) {
        addTodo(todo);
    });
}


// Add single todo to the page by appending the name of each todo to the page as an li
function addTodo(todo) {
    // jQuery to create a new li tag, and add the "task" class to the todo for styling
    var newTodo = $("<li class='task'>" + todo.name + "</li>");
    // If the todo is "completed", add class "done" so it displays with the strikethrough styling
    if (todo.completed) {
        newTodo.addClass("done");
    }
    // Append it to the ul with class "list"
    $(".list").append(newTodo);
}


// Create a new todo
function createTodo() {
    // jQuery .val() holds the data that the user inputs
    var userInput = $("#todoInput").val();
    // Make a jQuery Post request
    // Also need to pass in the data you want to send
    $.post("/api/todos", {name: userInput})
    .then(function(newTodo) {
        // clear the text input by setting the value to an empty string
        $("#todoInput").val("");
        addTodo(newTodo);
    })
    .catch(function(err) {
        console.log(err);
    })
}