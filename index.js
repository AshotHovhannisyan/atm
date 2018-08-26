'use strict';
//npm install nodemon 

//Dependencies
const ATM = require('./data/models/Atm');
const prompt = require('prompt');

//app config
const Terminal = new ATM;


function callprompt(count){
    prompt.start();
    let schema = {
        properties: {
            card_id: {
                description: 'Enter your card id',
                pattern: /^[1-9]+$/,
                message: 'card id must be only number',
                required: true
            },
            password: {
                description: 'Enter your password',
                hidden: true,
                replace: '*'
            }
        }
    };

    prompt.get(schema, function (err, result) {
        let id = Number(result.card_id);
        let pass = result.password;
        let terms = Terminal.actionLogin(id, pass);
        if (terms === 'wrong password'){
            if (count === 3){
                console.log('Unfortunately, your card has been burned');
                return;
            }
            console.log('Wrong password try again');
            return callprompt(++count);
        }
        return terms;
    });
}
let count = 0;
callprompt(count);

