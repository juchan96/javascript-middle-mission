// 설계를 바탕으로 디자인

// 1.  insertCoin
// 1.1 입력 받은 돈을 벤딩 머신에 저장한다.
// 2.  insertCoin -> 음료수 주기
//     2.1 받은 돈 으로 선택할 수 있는 음료수의 선택지를 보여줍니다. 음료수 값 < 받은 돈의 목록
//     2.2 음료수 선택을 받는다.
//     2.2.1 음료수 선택 재고가 있는 경우
//     2.2.1.1 해당되는 음료수의 가격 만큼 (받은 돈 - 선택 된음료수 값) 을 하고 음료수 와 잔 돈 반환
//     2.2.2 음료수 선택 재고가 없는 경우 -> 선택할 수 없다는 메시지 출력
// 3.  사용자가 돈 반환을 누를 경우 입력 받은 돈 반환
// 4.  음료수 값 만큼 뺀 잔 돈 주기

// > 사용가능한 음료수 목록 => 콜라(1000), 사이다(1000), 포도쥬스(700), 딸기우유(500), 미에로화이바(900), 물(500), 파워에이드(재고없음)
const drinks = [
  {
    name: "coke",
    price: 1000,
    stock: 50,
  },
  {
    name: "sprite",
    price: 1000,
    stock: 50,
  },
  {
    name: "grapeJuice",
    price: 700,
    stock: 50,
  },
  {
    name: "strawberryMilk",
    price: 500,
    stock: 50,
  },
  {
    name: "mieroFiber",
    price: 900,
    stock: 50,
  },
  {
    name: "water",
    price: 500,
    stock: 50,
  },
  {
    name: "powerAde",
    price: 1000,
    stock: 50,
  },
];

class VendingMachine {
  constructor(money) {
    this.money = money;
    this.drinks = drinks;
  }
  printMoney() {
    console.log(`현재 금액은 ${this.money}`);
  }
  insertCoin(money) {
    this.money = money;
  }
  displayDrink() {
    const displays = this.drinks.filter(drink => {
      return drink.price >= this.money;
    });
    console.log("마실 음료를 골라주세요");
    console.log(displays);
  }
}
const vendingMachine = new VendingMachine(0);

vendingMachine.insertCoin(1000);
vendingMachine.printMoney();
vendingMachine.displayDrink();
//2.1
