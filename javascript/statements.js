var a = 1, b = 1, c = false, d = "1";

if(a == b) {
    console.log("a and b are equal!");
}

if(!c) {
    console.log("c is false!");
} else {
    console.log("c is true!");
}

if (a == d) {
    console.log("a and d are equals!");
}

if (a === d) {
    console.log("a and d are strictly equals!");
}

// For loop
for (var i = 0; i < 5; i++) {
    console.log("Running through", i)
};

// While
var i = 0;
while(i < 10) {
    console.log("Running through", i)
    i++;
}

// Switch
var i = 2;
switch(i) {
    case 1: 
        console.log("i is 1");
        break;

    case 2:
        console.log("i is 2");
        break;

    default:
        console.log("I dont know what i is ;-(");
}




