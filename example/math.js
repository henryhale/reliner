import Reliner from "../index.js";

// initialize instance
const r = new Reliner({

    // prompt style 
    prompt: '$ math: ',

    // evaluator method
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
        } finally {
            // move cursor to next line
            console.log('');
        }
    }
});

function close() {
    r.close();
}

// Usage 
console.log('\nMaths\n\nEnter a computaion\n\n[hint] type .exit to quit\n');

// run...
r.start();