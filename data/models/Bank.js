'use strict';

const _find = require('lodash/find');
const _map = require('lodash/map');
const _isEmpty = require('lodash/isEmpty');
const users = require('../users.json');
const updateJsonFile = require('update-json-file');
const path = require("path");

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
                };
            }
            return {
                action:false,
                message:'wrong password'
            };
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

    reduceMoney(cardId, money){
        let user = this.findUserByCardId(cardId);
        if(money <= user.maximum_change){
            if(user.money < money){
                return {
                    action:false,
                    message:' aydqan gumar chka  '
                }
            }
        }else return {
            action:false,
            message:'tuylatrvac gumary petq e lini ' + user.maximum_change + ' chapov'
        };

        user.money -= money;
        //save to json
        this.changeJSON(user, cardId);
        return {
            action:true,
            message: 'file successfully changed'
        }
    }

    addSum(card_id, money){
        let user = this.findUserByCardId(card_id);
        user.money = Number(user.money) + Number(money);
        //save to json
        this.changeJSON(user, card_id);
        return {
            action:true,
            message: 'file successfully changed'
        }
    }

    changeJSON(user, cardId){
        const options = { defaultValue: () => users };
        const fjson = path.join(__dirname, '../', 'users.json');
        updateJsonFile(fjson, items => {
            return _map(items, item => {
                return item.card_id === cardId ? user : item;
            });
        }, options);
    }
}
module.exports = new Bank;