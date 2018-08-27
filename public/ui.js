'use strict';
const prompt = require('prompt');
const ATM = require('../data/models/Atm');
const Terminal = new ATM;
const Bank = require('../data/models/Bank');

function userInterface(count = 0, session_id = 0){
    prompt.start();
    let schema = {};

    if (session_id === 0){
        schema = {
            properties: {
                card_id: {
                    description: 'Enter your card id',
                    pattern: /^[0-9]+$/,
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
    } else {
        schema = {
            properties: {
                password: {
                    description: 'Enter your password',
                    hidden: true,
                    replace: '*'
                }
            }
        };
    }

    prompt.get(schema, function (err, result) {
        let id = 0;
        if (session_id === 0) {
            id = Number(result.card_id);
        }else{
            id = session_id;
        }

        let pass = result.password;
        let terms = Terminal.actionLogin(id , pass);
        if (terms === 'wrong password'){
            if (count === 3){
                console.log('Unfortunately, your card has been burned');
                return;
            }
            console.log('Wrong password try again');
            if (count === 0) session_id = id;
            return userInterface(++count, session_id);
        }
        console.log(terms);

        /* action reduce, addSum and exit*/
        console.log('select any action! reduce, addSum OR exit');

        let action = {
            properties: {
                attr: {
                    description: 'Enter action',
                    pattern: /^(reduce|addSum|exit)$/,
                    message: 'action must be only reduce, addSum OR exit and required',
                    required: true
                }
            }
        };
        prompt.get(action, function (err, result) {
            if (result.attr === 'exit'){
                process.exit();
                return;
            }

            let sum = {
                properties: {
                    money: {
                        description: 'Enter sum',
                        pattern: /^([0-9]+|exit)$/,
                        message: 'action must be only number OR exit and required',
                        required: true
                    }
                }
            };


            if (result.attr === 'reduce') {
                prompt.get(sum, function (err, result) {
                    if (result.money === 'exit'){
                        process.exit();
                        return;
                    }
                    Terminal.actionReduce(id, result.money);
                });
            }

            if (result.attr === 'addSum') {
                prompt.get(sum, function (err, result) {
                    if (result.money === 'exit'){
                        process.exit();
                        return;
                    }
                    console.log(Bank.addSum(id, result.money));
                });
            }



        });

    });
}

module.exports.userInterface  = userInterface;