'use strict';

// Assigning services
angular.module("TodosListApp.services", []).

    // When declaring factoryName as an injectable argument 
    // you will be provided with the value that is returned 
    // by invoking the function reference passed to module.factory
    factory("todosAPIservice", function todosAPIserviceFacory($http) {

        var todosAPI = {};

        // GET/
        todosAPI.getTodos = function() {
            return $http({
                method: "GET", 
                url: endpoints.props.url
            });
        }

        // POST/
        todosAPI.addTodo = function(data) {
            return $http.post(endpoints.props.url, data);
        }

        // DELETE/
        todosAPI.finishTodo = function(id) {
            return $http.delete([endpoints.props.url, id].join("/"));
        }

        return todosAPI;
    });

    // Services
    // The Service recipe produces a service just like the Value or Factory recipes,
    // but it does so by invoking a constructor with the new operator.
    // The constructor can take zero or more arguments,
    // which represent dependencies needed by the instance of this type.
    
    // Providers
    // Is the core recipe type and all the other recipe types are just 
    // syntactic sugar on top of it. The Provider recipe is syntactically 
    // defined as a custom type that implements a $get method.
    // This method is a factory function just like the one we use in the Factory recipe.
    // In fact, if you define a Factory recipe, an empty Provider type 
    // with the $get method set to your factory function is automatically 
    // created under the hood.
    // Providers have the advantage that they can be configured during the 
    // module configuration phase.

// Controllers
angular.module("TodosListApp.controllers", [])
.controller("todosController", [
    "$scope", 
    "todosAPIservice",
    function($scope, todosAPIservice) {

        // Initializing data
        $scope.todosList = {};
        $scope.author_name = "Matheus S.";  // Form
        $scope.text = "";  // Form

        //
        // Actions
        //
        
        // Adding new todo into form submit
        $scope.addTodo = function() {

            // Post request to add new todo
            var res = todosAPIservice.addTodo({
                author_name: $scope.author_name,
                text: $scope.text
            });

            // On success
            res.success(function(data) {
                console.log(data);
            });

            // On Failed
            res.error(function(data, status, headers, config) {
                alert( "failure message: " + JSON.stringify({data: data}));
            });
        }

        // Finishing todo
        $scope.finishTodo = function(id) {

            // Optimistically removing todo
            var todo_item = document.getElementById(id);
            todo_item.parentNode.removeChild(todo_item);

            // Delete request to finish todo
            var res = todosAPIservice.finishTodo(id);

            // On success
            res.success(function(data) {
                console.log(data);
            });

            // On Failed
            res.error(function(data, status, headers, config) {
                alert( "failure message: " + JSON.stringify({data: data}));
            });
        };

        //
        // Init
        //

        // Calling service and fetching its response 
        // using a technique called promise, which consists in
        // asynchronous use of callbacks chained by our object
        todosAPIservice.getTodos().success(function (todosList) {
            $scope.todosList = todosList;
        });

        // Callign service every 2 seconds
        setInterval(function() {
            // Calling service and fetching its response 
            // using a technique called promise, which consists in
            // asynchronous use of callbacks chained by our object
            todosAPIservice.getTodos().success(function (todosList) {
                $scope.todosList = todosList;
            });
        }, 1000);
    }
]);

// Assigning directives
angular.module("TodosListApp.directives", [])
.directive("todoItem", function() {
    return {
        templateUrl: "static/partials/todo-item.html"
    };
});

// Initializing App
var app = angular.module("TodosListApp", [
    "TodosListApp.services",
    "TodosListApp.controllers",
    "TodosListApp.directives"
]);