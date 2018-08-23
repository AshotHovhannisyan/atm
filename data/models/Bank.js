'use strict';

//npm install lodash
const _find = require('lodash/find');
const _isEmpty = require('lodash/isEmpty');

const users = require('../users.json')

// let user = _find(users, (item)=>{
//     return item.card_id === 123456
// });
// console.log(user);
class Bank {

    findUserByCardId(cardId){
       return  _find(users, (item)=>{
           return item.card_id === cardId;
       });
    }

    checkUser(cardId, password){
        
        const user = this.findUserByCardId(cardId);

        if(!_isEmpty(user)){
            if(user.password === password){
                return {
                    action:true,
                    message:'ok'
                }
            }
    
            return {
                action:false,
                message:'wrong password'
            }
        }

        return {
            action:false,
            message:'invalid credentials'
        };


    }

    getCardInfo(cardId){

        const user = this.findUserByCardId(cardId);
        if(!_isEmpty(user)){
            return {
                name:user.name,
                money:user.money
            }
        }
        return 'error';    
    }

}
module.exports = new Bank;