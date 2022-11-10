import Repl from "../index.js";

const r = new Repl({
    prompt: '$ math: ',
    eval (cmd) {
        cmd = `${cmd}`;
        if (cmd.startsWith('.exit')) {
            close();
            return;
        }
        try {
            // log the evaluation 
            console.log(eval(cmd));
        } catch (error) {
            // log the error
            console.log(error);
            // and exit the session
            process.exit(0);
        }
    }
});

function close() {
    r.close();
}

console.log('\nMaths\n\nEnter a computaion\n\n[hint] type .exit to quit\n');

r.start();