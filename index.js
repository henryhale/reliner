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
class Reliner {
    // defaults
    #options = {
        // prompt prefix in the output
        prompt: '> ',
        // a function to evaluate user's input
        eval (cmd) {
            // by default, log the command
            log(cmd);
        }
    }
    // Reliner instance
    #rl = null;
    #running = false;

    constructor (options) {
        // customization...
        // set user's defined options
        
        // the prompt
        if (options?.prompt && typeof options?.prompt === 'string')
            this.#options.prompt = options.prompt;
        
        // the evaluator function
        if (options?.eval && isFunction(options?.eval)) 
            this.#options.eval = options.eval;

        // set instance
        this.#rl = readline.createInterface({ input, output });

        // instance is running
        this.#running = true;
    }

    start () {
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
export default Reliner;
