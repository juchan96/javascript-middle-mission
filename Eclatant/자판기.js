// 유저는 처음 왔을 때 돈을 투입하도록 안내를 받는다 (충전)
// - 투입한 금액이 음수 || 숫자일 경우 재안내한다 (충전)
// - 구매의사를 취소할 수 있다 (반환)
// - 금액을 충전하면, 구매가능한 음료를 안내받는다 (음료재고안내)
//     - 모든 음료의 재고가 떨어졌을 경우, 안내 후 투입금액을 반환한다 (반환)
//     - 음료의 재고는 있으나, 투입한 금액으로 구매가능한 음료가 없을 경우, 충전의사를 확인한다 (충전의사)
//         - 충전의사가 없을 경우, 안내 후 투입금액을 반환한다 (반환)
//         - 충전의사가 있을 경우, 금액을 투입할 수 있도록 맨 처음으로 돌아간다 (충전)
//     - 현재 잔액으로 구매가능한 재고가 있는 음료가 있을 경우, 음료를 선택할 수 있도록 한다 (음료선택)
//         - 선택한 음료가 메뉴에 없는 제품일 경우 || 재고가 없는 제품일 경우, 음료를 재선택할 수 있도록 한다 (음료선택)
//         - 구매의사를 취소할 경우 안내 후 투입금액을 반환한다 (반환)
//         - 구매가능한 제품을 선택했을 경우 재고와 투입금액을 차감하고, 배출안내를 한다 (구매)
//                 - 음료재고안내로 돌아간다 (음료재고안내)

var readline = require("readline");

var rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// 콜라(1000), 사이다(1000), 포도쥬스(700), 딸기우유(500), 미에로화이바(900), 물(500), 파워에이드(재고없음)
var data = {
  account: 0,
  map: {
    콜라: 0,
    사이다: 1,
    포도주스: 2,
    딸기우유: 3,
    미에로화이바: 4,
    물: 5,
    파워에이드: 6
  },
  drinks: [
    {
      name: "콜라",
      price: 1000,
      stock: 1
    },
    {
      name: "사이다",
      price: 1000,
      stock: 1
    },
    {
      name: "포도주스",
      price: 700,
      stock: 1
    },
    {
      name: "딸기우유",
      price: 500,
      stock: 1
    },
    {
      name: "미에로화이바",
      price: 900,
      stock: 1
    },
    {
      name: "물",
      price: 500,
      stock: 1
    },
    {
      name: "파워에이드",
      price: 1200,
      stock: 0
    }
  ]
};

function log(message) {
  console.log(message);
}

function warn(message) {
  console.warn(message);
}

var admin = {
  messages: {
    transaction(productName) {
      return `${productName} 나왔습니다.\n`;
    },
    exit() {
      return `반환된 잔액은 ${data.account}원입니다.`;
    },
    outOfStockEverything: "현재 구매 가능한 음료가 없습니다.",
    nonExist: "없는 제품입니다. 다시 입력해주십시오.\n",
    outOfStock: "현재 재고가 없는 상품입니다. 다른 상품을 선택해주십시오.\n",
    chargeError: "적절한 투입이 아닙니다. 다시 투입해주십시오.\n",
    chargeWhether:
      '현재 잔액으로 구매할 수 있는 음료가 없습니다. 충전하시려면 "충전", 종료하시려면 "반환"을 입력해주십시오.\n',
    expensive: "현재 잔액에 비해 비싼 제품입니다. 다시 골라주십시오.\n",
    insertCoin: "금액을 투입해주십시오.\n",
    retry: "다시 입력해주십시오.\n",
    soldOut: "재고없음",
    soldOutAll: "현재 재고가 남아있는 제품이 하나도 없습니다. 돈을 반환해드리겠습니다.\n"
  },
  cmd: {
    charge: "충전",
    refund: "반환"
  }
};

var helper = {
  response: "",
  isOutOfStock() {
    return (
      data.drinks.filter(function(drink) {
        return drink.stock > 0;
      }).length === 0
    );
  },
  transaction(productName) {
    var targetDrink = data.drinks[data.map[productName]];

    data.account -= targetDrink.price;
    targetDrink.stock -= 1;

    log(admin.messages.transaction(productName));

    this.controller();
  },
  controller() {
    var smallerThanAccount = data.drinks.filter(function(drink) {
      return drink.price <= data.account;
    });
    var responseArray = smallerThanAccount.map(function(drink) {
      return `${drink.name}(${drink.price}원/${drink.stock > 0
        ? drink.stock + "개"
        : admin.messages.soldOut})`;
    });

    if (this.isOutOfStock()) IO.outOfStock();
    else if (smallerThanAccount.length === 0) IO.chargeWhether();
    else {
      helper.response =
        responseArray.join(", ") + ` 현재 잔액 ${data.account}원` + "\n";

      IO.getAnswer(helper.response, IO.selectDrink);
    }
  }
};

var IO = {
  getAnswer(question, method) {
    console.log(question);
    console.log("method", method);
    rl.prompt();

    rl.on("line", function(answer) {
      method(answer);
    });
  },
  exit() {
    log(admin.messages.exit());
    rl.close();
  },
  outOfStock() {
    warn(admin.messages.soldOutAll);
    this.exit();
  },
  chargeAccount(input) {
    var inputNumber = parseInt(input);

    if (input === admin.cmd.refund) IO.exit();
    else if (isNaN(inputNumber) || inputNumber < 0) {
      warn(admin.messages.chargeError);

      IO.getAnswer(admin.messages.insertCoin, this.chargeAccount);
    } else {
      data.account += inputNumber;

      helper.controller();
    }
  },
  chargeWhether(cmd) {
    if (cmd === admin.cmd.charge)
      IO.getAnswer(admin.messages.insertCoin, this.chargeAccount);
    else if (cmd === admin.cmd.refund) IO.exit();
    else {
      warn(admin.messages.retry);

      IO.getAnswer(admin.messages.chargeWhether, this.chargeWhether);
    }
  },
  selectDrink(input) {
    var targetDrink = data.drinks[data.map[input]];

    if (input === admin.cmd.refund) {
      admin.eventHandler.exit();
    } else if (!targetDrink) {
      warn(admin.messages.nonExist);

      IO.getAnswer(helper.repsonse, this.selectDrink);
    } else if (targetDrink.stock === 0) {
      warn(admin.messages.outOfStock);

      IO.getAnswer(helper.repsonse, this.selectDrink);
    } else if (data.account < targetDrink.price) {
      warn(admin.messages.expensive);

      IO.getAnswer(helper.repsonse, this.selectDrink);
    } else {
      helper.transaction(input);
    }
  }
};

IO.getAnswer(admin.messages.insertCoin, IO.chargeAccount);
