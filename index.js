'use strict';
//npm install nodemon 

//Dependencies
const ATM = require('./data/models/Atm');

//app config
const Terminal = new ATM;

Terminal.actionLogin(98765, 'ruben1234');