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

    isEnoughMoney : function () {

    },
    inputMoney : function () {
        
    },
    showMoney : function () {
        
    },
    selectDrink : function () {
        
    },
    disposeMoney : function () {

    },
    returnDrink : function () {

    },
    returnMoney : function () {
        
    }
};

