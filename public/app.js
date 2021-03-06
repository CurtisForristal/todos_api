

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
    
    // Listen if the X is clicked
    // Would be nice to attach the listener to the span, but this won't work because 
    // it is not on the page when it loads
    // The "list" is there when it loads though
    // But to limit it to only register on spans with the "list",
    // the span tag is added after "click"
    $(".list").on("click", "span", function(e) {
        // Prevent the click listener for the li (below) from triggering when X is clicked
        e.stopPropagation();
        // "this" refers to the span, ".parent" refers to the li
        removeTodo($(this).parent());
    });

    // Listen if an li is completed
    // As with the X, the li's aren't there when the page loads
    $(".list").on("click", "li", function() {
        updateTodo($(this));
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
    // The "X" is also added to act as the delete button
    var newTodo = $("<li class='task'>" + todo.name + " <span>X</span></li>");
    // Store the newTodo's id in jQuery's data so it can be retrived later when you click the X to delete it
    newTodo.data("id", todo._id);
    // Store the newTodo's completed property for when you click the todo to mark it as done or not done
    newTodo.data("completed", todo.completed);
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


// Remove a todo from the db and the DOM
function removeTodo(todo) {
    // Remove the todo from the db
    // Retrieve the id of the clicked todo from jQuery's data (which we stored in addTodo())
    var clickedId = todo.data("id");
    // Build the url to set the delete request to
    var deleteUrl = "/api/todos/" + clickedId;
    $.ajax({
        method: "DELETE",
        url: deleteUrl
    })
    .then(function(data) {
        // Remove the todo from the DOM
        todo.remove();
    })
    .catch(function(err) {
        console.log(err);
    })
}


// Upgate a todo by toggling its "completed" property
function updateTodo (todo) {
    // Send put request to update entry in the db
   
    // build the url for where the PUT request should go
    var updateUrl = "/api/todos/" + todo.data("id");
    
    // build the String for the data that should be updated
    var isDone = !todo.data("completed"); // we want to flip isDone when it is clicked
    var updateData = {completed: isDone};  

    $.ajax({
        method: "PUT",
        url: updateUrl,
        // data must be a String, which was built above
        data: updateData
    })
    .then(function(updatedTodo) {
        // Update the view
        todo.toggleClass("done");
        // Toggle completed
        todo.data("completed", isDone);
    })
    .catch(function(err) {
        console.log(err);
    });
}