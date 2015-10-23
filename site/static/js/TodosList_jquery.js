// TodosList.js

var todosList = (function ($, endpoints, undefined) {

    "use strict"

    // Writing into DOM
    var setState = function(todos) {

        var content = "";  // HTML content

        // Listing todos
        $.each(todos, function(key, todo) {
            content += [
                "<li class='todo'>",
                    "<div class='todo-header'>",
                        "<span class='todo-author'>",
                            todo.author_name,
                        "</span> added",
                    "</div>",
                    "<div class='todo-content'>",
                        "<input type='checkbox' name='todo-checkbox' ",
                            "value='", todo._id, "' class='todo-checkbox' />",
                        "<span class='todo-text'>",
                            todo.text, 
                        "</span>",
                    "</div>",
                "</li>"].join("");
        });

        // After gather all todos, append it into DOM
        // This is a good practice, since call $.append() can be
        // very exhaustive and slow the page
        $(".todos-list").html(content);
    };

    // Loading data from API
    function loadCommentsFromServer() {
        $.ajax({
            url: endpoints.props.url,
            type: "GET",
            cache: false,
            dataType: "json",
            crossDomain: true,
            success: function(data) {
                setState(data);
            },
            error: function(xhr, status, err) {
                console.error(endpoints.props.url, status, err.toString());
            }
        });
    }

    function init() {
        console.log("Loading todo list..");

        // Loading data from API
        loadCommentsFromServer();

        // Updating state every 2000 ms
        setInterval(loadCommentsFromServer, 2000);
    }

    return {
        init: init
    }

})(jQuery, endpoints);

// Executing
todosList.init();

// Listeners
// When clicking in checkbox
$(".todos-list").on({
    click: function(event) {
        console.log("Todo finished!");

        var element = $(this),  // Elements
            todo = element.parents(".todo");  // Getting todo element

        todo.fadeOut();  // Optimistically removing todo

        // DELETE request
        $.ajax({
            url: [endpoints.props.url, element.val()].join("/"),
            type: "DELETE",
            cache: false,
            dataType: "json",
            crossDomain: true
        })
        .done(function(data) {
            console.log(data);
        })
        .fail(function() {
            alert("Error!");
        })
        .always(function() {
            console.log("complete");
        });
    }
}, ".todo .todo-checkbox");

// When clicking into "add todo"
$(".js-todo-add-btn").on({click: function() {
    console.log("New todo!");

    var element = $(this),
        author_name = element.siblings(".todo-add-author-name").val(),
        text = element.siblings(".todo-add-text").val();

    // Optimistcally inserting item
    // @todo

    // Adding new todo
    $.ajax({
        url: endpoints.props.url,
        type: "POST",
        dataType: "json",
        data: {
            author_name: author_name,
            text: text
        }
    })
    .done(function(data) {
        console.log(data);
    })
    .fail(function() {
        alert("error");
    })
    .always(function() {
        console.log("complete");
    });
}});

