import Repl from "../index.js";

console.log('What is your name? ');

const r = new Repl().start({
    promt: '$ ',
    eval (name) {
        console.log(`Hello, ${name}! Nice to meet you.`);
        close();
    }
});

function close() {
    r.close();
}