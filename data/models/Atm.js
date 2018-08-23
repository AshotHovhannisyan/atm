'use strict';
const Bank = require('./Bank');

class Atm {
    
    actionLogin(cardId, password){

        let inf  = Bank.checkUser(cardId, password)

        if(inf.action){
           let info = Bank.getCardInfo(cardId);
            console.log('hello ', info.name );
            console.log('money :', info.money + '$');
        }
        else {
            console.log(inf.message)
        }

    }

}

module.exports = Atm;