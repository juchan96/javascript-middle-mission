var getReadLine = (function () {
    var readline = require('readline');

    var rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    return function () {
        return rl;
    }
})();

var vendingMachine = {
    coin : 0,
    drinks : [
        {
            name: '데자와',
            price: 1200,
            stock: 3
        },
        {
            name: '쿠우',
            price: 1000,
            stock: 3
        },
        {
            name: '오이오녹차',
            price: 2000,
            stock: 3
        },
        {
            name: '오후의홍차',
            price: 1300,
            stock: 3
        },
        {
            name: '제티',
            price: 600,
            stock: 3
        }
    ],

    showDrinks : function () {
        var message = '음료 목록 : ';
        this.drinks.forEach(function (curr) {
            message += curr.name;
            message += '(' + curr.price + '), ';

        });
        console.log(message);
    },

    inputMoney : function () {
        var rl = getReadLine();
        rl.question('금액을 입력하세요: ', function (input) {
            this.coin = input;
        });
    },

    showMoney : function () {
        debugger;
        console.log('현재' + this.coin +'원이 들어있습니다.')
    },
    existEnoughMoney : function () {
        this.drinks.some(function(element){
            return this.coin >= element.price;
        }.bind(this));
    },
    existPurchasableDrinks: function () {
        this.drinks.some(function (element) {
            return element.stock>0;
        });
    },

    selectDrink : function () {
        var enoughMoney = existEnoughMoney();
        var purchasableDrinks = existPurchasableDrinks();
        if(enoughMoney&&purchasableDrinks){


        }
        
    },
    disposeMoney : function () {

    },
    returnDrink : function () {

    },
    returnMoney : function () {
        
    }
};
debugger;
vendingMachine.inputMoney();
vendingMachine.showMoney();
vendingMachine.existEnoughMoney();