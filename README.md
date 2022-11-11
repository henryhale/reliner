To <h1 align="center">reliner</h1>


A basic and customizable implementation of a REPL system based on NodeJS readline interface to power simple command line applications in javascript.

> **NB:** _Dependencies free_, only utilizes inbuilt functions of the NodeJs runtime features; `node:process` and `node:console`. 

## Architecture & Design

> The sourcecode is commented to take you through what is happening where and why.

Below are some of the notable features;

- `Rl` class

This provides an instance to work with the _standard input/output_ that is contained in the `node:process` i.e `input` and `output`.

To create a new instance

```js
 // include the read.liner package
 import Rl from '../index.js'; 

 const r = new Rl()
```

By default, the instance constructor can take an `options` argument to configure the _prompt_ style and also the _evaluator_ method.

```js
    const r = new Rl ({
        // prompt style
        prompt: '$ ',
        // evaluator
        eval(cmd) {
            console.log(cmd);
        }
    });
```

The `prompt` style is output before the cursor also as the interface is still active or running.

The `evaluator` takes one argument `cmd` which is the user's input obtained from the terminal. Any operation in any accessible scope can be fire within this method e.g. data fetch, continous prompts, data storage, file operation... just like the normal terminal.

> NB: Inbuilt terminal commands like `mkdir` or `clear` won't run not until you specify what runs on a specific user input.


## Examples

1. [Hello](./examples/hello.js)

This is a super simple command line application that greets you with your name as input. The interface closes thereafter.

2. [Math](./example/math.js)

Just like the default interface of NodeJS obtained by running `node` in the terminal, this helps you to compute simple math operations using the native `eval` function in Javascript.

## Applicatons

Any kind of applcation that is best for command line interface can be made.

## Thoughts

Thanks you very much. Any info or issue, kindly open an issue here or message me.

