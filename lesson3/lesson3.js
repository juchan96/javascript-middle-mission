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

    inputCoin: function () {
        var rl = getReadLine();
        var that = this;

        rl.question('동전을 입력하세요 : ', function (input) {
            if (isPositiveInteger(input)) {
                that.coin += Number(input);

                // 구매가능한 음료수 보여주기
                // 구매할 음료수 선택
            } else {
                console.log('올바른 금액을 입력해 주세요.');

                //입력 다시 받기
                that.inputCoin();
                return ;
            }
        });
    }
};

(function main() {
    vendingMachine.inputCoin();
})();
