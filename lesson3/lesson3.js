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

var drinks = [
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
];

var vendingMachine = {
    coin: 0,
    existPurchasableItem: function () {
        var availableDrinks = drinks.filter(function (item) {
            return item.price <= coin;
        });

        return availableDrinks.length > 0;
    },
    displayPurchasableItems: function () {
        var message = '사용가능한 음료수: ';
        var lastIndex = drinks.length - 1;

        var availableDrinks = drinks.filter(function (item) {
            return item.price > coin;
        });

        availableDrinks.forEach(function (item, index) {
            message += item.name;

            if (item.stock === 0) {
                message += '(재고없음)';
            } else {
                message += '(' + item.price + ')';
            }

            if (index !== lastIndex) {
                message += ', ';
            }
        });

        if (availableDrinks.length === 0) {
            message += '없음';
        }

        console.log(message);
    },
    inputCoin: function (input) {
        if (!isPositiveInteger(input)) {
            console.log('올바른 금액을 입력해 주세요.');

            //입력 다시 받기
            this.requireCoin();
            return ;
        }

        this.coin += Number(input);
        this.displayPurchasableItems();

        if (this.existPurchasableItem()) {
            this.requireDrink();
        } else {
            this.requireContinueToUse();
        }
    },
    requireCoin: function () {
        var rl = getReadLine();
        rl.question('동전을 입력하세요 : ', this.inputCoin);
    },
    inputDrink: function (drinkName) {
        var thisDrink = drinks
            .filter(function (item) {
                return drinkName === item.name;
            });

        //예외 처리
        if (!thisDrink) {
            console.log('잘못 입력하셨습니다.');
            this.requireDrink();
            return ;
        } else if (thisDrink.stock === 0) {
            console.log('재고가 없습니다.');
            this.requireDrink();
            return ;
        }

        this.coin -= thisDrink.price;
        thisDrink.stock--;

        console.log(thisDrink.name + ' 나왔음. (잔액: ' + this.coin + ')');

        this.displayPurchasableItems();
        this.requireContinueToUse();
    },
    requireDrink: function () {
        var rl = getReadLine();
        rl.question('음료수를 선택해 주세요: ', this.inputDrink);
    },
    inputContinueToUse: function (answer) {
        if (answer === '반환') {
            console.log('잔액은 ' + this.coin + '원입니다.');
            rl.close();
            return ;
        }

        if (this.existPurchasableItem()) {
            this.requireDrink();
        } else {
            this.requireCoin();
        }
    },
    requireContinueToUse: function () {
        var rl = getReadLine();
        rl.question('다른걸 구매할까요? 반환할까요? ', this.inputContinueToUse);
    }
};

(function main() {
    vendingMachine.requireCoin();
})();

function isPositiveInteger(input) {
    return /^\d+$/.test(input);
}
