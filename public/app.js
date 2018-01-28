

// Any code inside here will not run until the DOM has loaded
$(document).ready(function() {
    // Get all the data from the db
    $.getJSON("/api/todos")
    .then(addTodos)
    // We are not handling errors in this app, but you SHOULD!
});


// Adds all todos to the page
function addTodos(todos) {
    // Loop through each todo
    // Append the name of each todo to the page as an li
    todos.forEach(function(todo) {
        // jQuery to create a new li tag
        var newTodo = $("<li>" + todo.name + "</li>");
        // Add the "task" class to the todo for styling
        newTodo.addClass("task");
        // Append it to the ul with class "list"
        $(".list").append(newTodo);
    });
}