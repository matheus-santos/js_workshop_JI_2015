/**
 * Primitive types
 */

// Strings (16-bit)
var string1 = "Hello world!",
    string2 = 'Hello world';

console.log(string1, string2);
console.log("Concating strings = " + string1 + string2);

// Numbers (64-bit long)
var a = 1, b = 2.3, c = a + b;
console.log(a, b, c);

var hexa = 0xCAFE911;
console.log(hexa);

var floating = 1.7e4;  // [digits][.digits][(E|e)[(+|-)]digits]
console.log(floating);

// Boolean
var is_true = true, is_false = false;
console.log(is_true, is_false);

// Special cases
var is_null = null, is_undefined = undefined;
console.log(is_null, is_undefined);
console.log("is_undefined is undefined?", typeof is_undefined === "undefined");

/**
 * Object types
 * An ordinary JavaScript object is an unordered collection of named values
 */

var simple_list = [1, 2, 3],
    complex_list = { item1: 1, item2: 2}
    super_complex_list = { 
        item1: 1, 
        function1: function() {
            return "Hello world!"
        }
    };

var obj = new Object(), other_obj = {};
console.log("Are obj and other_obj equals?", obj == other_obj);
console.log("And strictly equals?", obj === other_obj);
console.log("But both derive from Object?", obj instanceof Object && other_obj instanceof Object);

console.log(simple_list);
console.log(complex_list);
console.log(super_complex_list);
console.log(super_complex_list.function1());

/**
 * Arithmetic
 */

Math.pow(2,53);  // => 9007199254740992: 2 to the power 53
Math.round(.6);  // => 1.0: round to the nearest integer
Math.ceil(.6);  // => 1.0: round up to an integer
Math.floor(.6);  // => 0.0: round down to an integer
Math.abs(-5);  // => 5: absolute value
Math.max(x,y,z);  // Return the largest argument
Math.min(x,y,z);  // Return the smallest argument
Math.random();  // Pseudo-random number x where 0 <= x < 1.0
Math.PI;  // π: circumference of a circle / diameter
Math.E;  // e: The base of the natural logarithm
Math.sqrt(3);  // The square root of 3
Math.pow(3, 1/3);  // The cube root of 3
Math.sin(0);  // Trigonometry: also Math.cos, Math.atan, etc.
Math.log(10);  // Natural logarithm of 10
Math.log(100)/Math.LN10;  // Base 10 logarithm of 100
Math.log(512)/Math.LN2;  // Base 2 logarithm of 512
Math.exp(3);  // Math.E cubed

/**
 * Dates and Time
 */

var then = new Date(2010, 0, 1);  // The 1st day of the 1st month of 2010
var later = new Date(2010, 0, 1, 17, 10, 30);  // Same day, at 5:10:30pm, local time
var now = new Date();  // The current date and time
var elapsed = now - then;  // Date subtraction: interval in milliseconds
later.getFullYear();  // => 2010
later.getMonth();  // => 0: zero-based months
later.getDate();  // => 1: one-based days
later.getDay();  // => 5: day of week. 0 is Sunday 5 is Friday.
later.getHours();  // => 17: 5pm, local time
later.getUTCHours();  // hours in UTC time; depends on timezone

/**
 * Working with texts
 */

var s = "hello, world";  // Start with some text.
console.log(s.charAt(0));  // => "h": the first character.
console.log(s.charAt(s.length-1));  // => "d": the last character.
console.log(s.substring(1,4));  // => "ell": the 2nd, 3rd and 4th characters.
console.log(s.slice(1,4));  // => "ell": same thing
console.log(s.slice(-3)); // => "rld": last 3 characters
console.log(s.indexOf("l"));  // => 2: position of first letter l.
console.log(s.lastIndexOf("l"));  // => 10: position of last letter l.
console.log(s.indexOf("l", 3));  // => 3: position of first "l" at or after 3
console.log(s.split(", "));  // => ["hello", "world"] split into substrings
console.log(s.replace("h", "H"));  // => "Hello, world": replaces all instances
console.log(s.toUpperCase()); // => "HELLO, WORLD"

/**
 * Regex
 */

var text = "testing: 1, 2, 3"; // Sample text
var pattern = /\d+/g // Matches all instances of one or more digits

console.log(pattern.test(text));  // => true: a match exists
console.log(text.search(pattern));  // => 9: position of first match
console.log(text.match(pattern));  // => ["1", "2", "3"]: array of all matches
console.log(text.replace(pattern, "#"));  // => "testing: #, #, #"
console.log(text.split(/\D+/));  // => ["","1","2","3"]: split on non-digits
