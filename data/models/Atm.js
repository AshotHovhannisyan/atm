'use strict';
const Bank = require('./Bank');

class Atm {
    actionLogin(cardId, password){
        let inf  = Bank.checkUser(cardId, password);
        if(inf.action){
            let info = Bank.getCardInfo(cardId);
            return 'hello ' + info.name +
                '\nmoney :' + info.money + '$';
        }
        else {
            return inf.message;
        }
    }

    actionReduce(card_id, money){
        let result = Bank.reduceMoney(card_id, money);
        if(result.action){
            console.log(result.message);
            return
        }
        console.log(result.message);
    }
}

module.exports = Atm;