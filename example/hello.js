import Reliner from "../index.js";

// initialize instance
const r = new Reliner({

    // my custom prompt
    promt: '$ ',

    // my evaluator
    eval (name) {
        // log data recieved from user
        console.log(`Hello, ${name}! Nice to meet you.`);
        // close the interface
        close();
    }
    
});

// Close the interface
function close() {
    r.close();
}

// Usage
console.log('What is your name? ');

// run...
r.start();

