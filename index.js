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

    requireMoney : function () {
        var rl = getReadLine();
        rl.question('동전을 넣으세요: ',this.inputMoney.bind(this))
    },

    inputMoney : function(input){
        this.coin += parseInt(input);

        if(!this.existEnoughMoney()){
            console.log('돈을 더 투입해주세요');
            this.requireMoney();
            return;
        }

        this.showDrinks();
    },

    existEnoughMoney : function () {
        var result = false;
        result = this.drinks.some(function(element){
            var crong = this.coin >= element.price;
            return crong;
        }.bind(this));
        return result;
    },

    showDrinks : function () {
        var message = '사용가능한 음료수 : ';

        this.drinks.forEach(function (curr) {
            if(curr.stock>0){
                message += curr.name;
                message += '(' + curr.price + '), ';
            }
            else {
                message += curr.name;
                message += '(재고없음), ';
            }
        }.bind(this));
        console.log(message);

        this.requireDrink();
    },

    /**
     *  TIL
     *  rl.question 메소드는 콜백의 첫번째 인자로 입력받은 값을 넘겨준다.
     *  (mdn에선 익명함수로 즉시실행하기 때문에 인자를 명시적으로 콜백에 넘겨줌)
     *  콜백인 inputMoney의 첫번째인자, 즉 drinkName으로 입력받은 값이 넘어간다.
     *  bind는 inputDrink 함수의 this가 전역을 가리키므로 requireDrink로 바인딩 하기 위함이다.
     *  (inputDrink가 콜백으로 실행되기 떄문에 this는 전역을 가리킴)
     * **/

    requireDrink : function () {
        var rl = getReadLine();
        rl.question('음료를 선택해 주세요',this.inputDrink.bind(this));
    },

    inputDrink : function (drinkName) {
        var thisDrink = this.drinks.filter(function (item) {
            return item.name === drinkName;
        });

        thisDrink = thisDrink[0];

        this.disposeMoney(thisDrink);
        this.disposeStock(thisDrink);
        this.returnDrink(thisDrink);
    },
    disposeMoney : function (thisDrink) {
        this.coin -= parseInt(thisDrink.price);
        },
    disposeStock : function (thisDrink) {
        thisDrink.stock--;
    },
    returnDrink : function (thisDrink) {
        if(thisDrink.stock>=0) {
            console.log(thisDrink.name + '나왔습니다');
        }
        else{
            console.log('선택할 수 없습니다');
        }

        this.requireReorderDrink();
    },
    returnMoney : function () {
        console.log('남은 돈은 '+this.coin+'입니다');
        getReadLine().close();
    },
    reorderDrink : function (answer) {
        if (answer === '반환') {
            this.returnMoney();
            getReadLine().close();
            return;
        }

        /**
         * TIL
         * 인수가 number로 오기를 기대했지만 string 으로 들어온다다
        * **/
        if(typeof parseInt(answer) === 'number'){
            if(this.existEnoughMoney()){
                this.showDrinks();
            }
            else{
                this.requireMoney();
            }
        }
    },
    requireReorderDrink : function () {
        var rl = getReadLine();
        rl.question('다른 음료를 원하면 숫자입력 아니면 반환입력',this.reorderDrink.bind(this));
    }
};

vendingMachine.requireMoney();
