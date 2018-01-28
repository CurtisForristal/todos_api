

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
        // jQuery to create a new li tag, and add the "task" class to the todo for styling
        var newTodo = $("<li class='task'>" + todo.name + "</li>");
        // If the todo is "completed", add class "done" so it displays with the strikethrough styling
        if (todo.completed) {
            newTodo.addClass("done");
        }
        // Append it to the ul with class "list"
        $(".list").append(newTodo);
    });
}