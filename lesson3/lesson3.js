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
    coin: 0,
    items: [
        {
            name: '포카리스웨트',
            price: 1200,
            stock: 3
        },
        {
            name: '핫식스',
            price: 1000,
            stock: 3
        },
        {
            name: '레쓰비',
            price: 600,
            stock: 3
        },
        {
            name: '코코팜',
            price: 700,
            stock: 3
        },
        {
            name: '쌕쌕감귤쥬스',
            price: 600,
            stock: 3
        }
    ],
    isAvailable: function () {
        var that = this;
        var availableDrinks = this.items.filter(function (item) {
            return item.price <= that.coin;
        });

        return availableDrinks.length > 0;
    },
    displayPurchasableItems: function () {
        var message = '사용가능한 음료수: ';
        var count = 0;
        var lastIndex = this.items.length - 1;
        var that = this;

        this.items.forEach(function (item, index) {
            if (item.price > that.coin) {
                return ;
            }

            message += item.name;
            count++;

            if (item.stock === 0) {
                message += '(재고없음)';
            } else {
                message += '(' + item.price + ')';
            }

            if (index !== lastIndex) {
                message += ', ';
            }
        });

        if (count === 0) {
            message += '없음';
        }

        console.log(message);
    },
    inputCoin: function () {
        var rl = getReadLine();
        var that = this;

        rl.question('동전을 입력하세요 : ', function (input) {
            if (isPositiveInteger(input)) {
                that.coin += Number(input);

                // 구매가능한 음료수 보여주기
                that.displayPurchasableItems();

                // 구매할 음료수 선택
                if (that.isAvailable()) {
                    that.selectDrink();
                } else {
                    that.purchaseAnotherOrNot();
                }
            } else {
                console.log('올바른 금액을 입력해 주세요.');

                //입력 다시 받기
                that.inputCoin();
                return ;
            }
        });
    },
    selectDrink: function () {
        var rl = getReadLine();
        var that = this;

        rl.question('음료수를 선택해 주세요: ', function (drinkName) {
            var thisDrink = that.items.find(function (item) {
                return drinkName === item.name;
            });

            //예외 처리
            if (!thisDrink) {
                console.log('잘못 입력하셨습니다.');
                that.selectDrink();
                return ;
            } else if (thisDrink.stock === 0) {
                console.log('재고가 없습니다.');
                that.selectDrink();
                return ;
            }

            that.coin -= thisDrink.price;
            thisDrink.stock--;

            console.log(thisDrink.name + ' 나왔음. (잔액: ' + that.coin + ')');
            that.displayPurchasableItems();
            that.purchaseAnotherOrNot();
        });
    },
    purchaseAnotherOrNot: function () {
        var rl = getReadLine();
        var that = this;

        rl.question('다른걸 구매할까요? 반환할까요? ', function (answer) {
            if (answer === '반환') {
                that.giveBackChange();

                rl.close();
                return ;
            }

            if (that.isAvailable()) {
                that.selectDrink();
            } else {
                that.inputCoin();
            }
        });
    },
    giveBackChange: function () {
        console.log('잔액은 ' + this.coin + '원입니다.');
    }
};

(function main() {
    vendingMachine.inputCoin();
})();

function isPositiveInteger(input) {
    return /^\d+$/.test(input);
}
