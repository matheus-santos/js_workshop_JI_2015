//
// Objects
//

var object_1 = { x: 1, y: 2};
var object_2 = new Object({ x:1, y: 2});
console.log(object_1, object_2);  // They are the same!

// Prototypes (inheritance)
// Every JavaScript object has a second JavaScript object (or null, but this is rare)
// associated with it. This second object is known as a prototype, and the
// first object inherits properties from the prototype.
// http://stackoverflow.com/a/8433493/3147039
function Pet(name, species) {
    this.name = name;
    this.species = species;
}

function view() {
    return this.name + " is a " + this.species + "!";
}

Pet.prototype.view = view;
var pet1 = new Pet('Gabriella', 'Dog');
alert(pet1.view()); //Outputs "Gabriella is a Dog!"
pet1.name = "Joe";
alert(pet1.view()); //Outputs "Gabriella is a Dog!"

// Deleting properties
o = {x:1};  // o has own property x and inherits property toString
delete o.x;  // Delete x, and return true
delete o.x;  // Do nothing (x doesn't exist), and return true
delete o.toString;  // Do nothing (toString isn't an own property), return true

// Testing properties
var o = { x: 1 }
"x" in o; // true: o has an own property "x"
"y" in o; // false: o doesn't have a property "y"
"toString" in o; // true: o inherits a toString property

var o = { x: 1 }
o.hasOwnProperty("x"); // true: o has an own property x
o.hasOwnProperty("y"); // false: o doesn't have a property y
o.hasOwnProperty("toString"); // false: toString is an inherited property

// Getters and Setters
var o = {
    // An ordinary data property
    data_prop: "Data property",
    
    // An accessor property defined as a pair of functions
    get accessor_prop() { return "GET = " + this.data_prop },
    set accessor_prop(value) { this.data_prop = value }
};

console.log(o);
console.log(o.accessor_prop);
console.log(o.accessor_prop = "New Data property");
console.log(o.accessor_prop);

// Serializing objects
o = {x:1, y:{z:[false,null,""]}}; // Define a test object
s = JSON.stringify(o); // s is '{"x":1,"y":{"z":[false,null,""]}}'
p = JSON.parse(s); // p is a deep copy of o

console.log(o);
console.log(s);
console.log(p);

//
// Arrays
//

// Array and multdimensional array
var arr = [1, 2, 3],
    multi_dim_arr = [[1, 1], [2, 2], [3, 3]];

// Reading and writing

// Sparse arrays

// Reading and writing 

// Array length

// Adding and deleting elements
a = [1,2,3];
delete a[1]; // a now has no element at index 1
1 in a // => false: no array index 1 is defined
a.length // => 3: delete does not affect array length

//
// Classes, functions and methods
//

// Functions
function hello_world() {
    return "Hello world!"
}
console.log(hello_world());

// Closures
// Closures are easy to understand if you simply accept the lexical scoping rule:
// functions are executed using the scope chain that was in effect when they
// were defined

var scope = "global scope";  // A global variable
function checkscope() {
    var scope = "local scope";  // A local variable
    function f() { return scope; }  // Return the value in scope here
    return f();
}
checkscope()  // => "local scope"

// The Function() Constructor
// The Function() constructor allows JavaScript functions to be dynamically created
// and compiled at runtime. 
// The Function() constructor expects any number of string arguments. The last argument
// is the text of the function body; it can contain arbitrary JavaScript statements, separated
// from each other by semicolons

var f = new Function("x", "y", "return x*y;");
var f = function(x, y) { return x*y; }

// Functional programming
// Map() and reduce()
// Map actually means to compute things with the original array without 
// doing structural changes to the output. For example, when map receives an array,
// you can make sure the output will be another array, and the only difference 
// is that the elements inside it may be transformed from the original value/type 
// to another value/type

// On the other hand, the reducing operation means we may change the structure 
// of the input data type to a new one.