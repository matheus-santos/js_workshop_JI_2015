// TodosList_javascript.js

var todosList = (function(endpoints, undefined) {

    "use strict"

    // Issue an HTTP GET request for the contents of the specified URL.
    // When the response arrives successfully, verify that it is plain text
    // and if so, pass it to the specified callback function
    function _getRequest(url, callback) {

        // console.log("Sending request to", url);

        var request = new XMLHttpRequest();  // Create new request
        request.open("GET", url);  // Specify URL to fetch
        
        request.onreadystatechange = function() {  // Define event listener

            // If the request is compete and was successful
            if (request.readyState === 4 && request.status === 200) {
        
                var type = request.getResponseHeader("Content-Type");
        
                if (type.match(/json/)) // Make sure response is text
                    callback(request.responseText); // Pass it to callback
            }
        };
    
        request.send(null); // Send the request now
    }

    // Writing into DOM
    function setState(todos) {

        // Variables
        var content = "", todo;

        // Converting to json
        todos = JSON.parse(todos);

        // For each todo, create html template
        for (var i = 0; i < todos.length; i++) {
            
            // Alias
            todo = todos[i];

            // Append element to content
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
        };

        // Appending into DOM
        var todosList = document.getElementsByClassName("todos-list")[0];
        todosList.innerHTML = content;
    }

    // Loading data from API
    function loadCommentsFromServer() {
        // console.log("loadCommentsFromServer");
        // Make XMLHttp request
        _getRequest(endpoints.props.url, setState);
    }

    //
    function init() {
        // console.log("Loading todo list..");
        // Loading data from API
        loadCommentsFromServer();

        // Updating state every 1000 ms
        setInterval(loadCommentsFromServer, 1000);
    }

    return {
        init: init
    }

}) (endpoints);

// Executing
todosList.init();