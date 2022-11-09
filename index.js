import * as readline from "node:readline/promises";
import { stdin as input, stdout as output } from "node:process";
import { log } from "node:console";

// Check whether `fn` is a function
function isFunction(fn) {
    return typeof fn === 'function';
}

// Before the current process exits, 
// - shift cursor to the next line
process.on('beforeExit', () => log());

// REPL model
class Rl {
    // defaults
    #options = {
        // prompt prefix in the output
        prompt: '> ',
        // a function to evaluate user's input
        eval (cmd) {
            // by default, evaluate the message
            try {
                // log the evaluation 
                log(eval(cmd));
            } catch (error) {
                // log the error
                log(error);
                // and exit the session
                process.exit(0);
            }
        }
    }
    // Rl instance
    #rl = null;
    #running = false;

    constructor () {
        // set instance
        this.#rl = readline.createInterface({ input, output });
        this.#running = true;
    }

    start (options = {}) {
        // customization...
        // set user's defined options
        // the prompt
        if (options?.prompt && typeof options?.prompt === 'string')
            this.#options.prompt = options.prompt;
        // the evaluator function
        if (options?.eval && isFunction(options?.eval)) 
            this.#options.eval = options.eval;
        // start the system
        this.#run();
        // reference this instance
        return this;
    }

    // method to prompt user and obtain response 
    async #ask (qn) {
        let ans = await this.#rl.question(qn);
        this.#options.eval(ans);
        return ans;
    }

    // method to close session
    close () {
        // only if the instance exists
        if (this.#rl) {
            this.#rl.close();
            this.#running = false;
        }
    }

    // method to continue prompting user
    // until they exit the session
    async #run () {
        while (true) {
            // check if instance is still active/runnig
            if (!this.#running) break;
            // print cursor and prompt
            let ans = await this.#ask(this.#options.prompt);
            // check the answer for command
            // ...
            if (ans.startsWith('.exit')) {
                // user wants to exit
                try {
                    // gracefully close instance
                    this.close();
                } catch (error) {
                    // show error
                    log(error);
                    // terminate the whole process
                    process.exit(0);
                } 
                // end loop
                break;
            }
        }
    }
}

// Ready for use...
export default Rl;