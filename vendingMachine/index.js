// 설계를 바탕으로 디자인

// 1.  insertCoin
// 2.  insertCoin -> 음료수 주기
//     2.1 받은 돈 으로 선택할 수 있는 음료수의 선택지를 보여줍니다. 음료수 값 < 받은 돈의 목록
//     2.2 음료수 선택을 받는다.
//     2.2.1 음료수 선택 재고가 있는 경우
//     2.2.1.1 해당되는 음료수의 가격 만큼 (받은 돈 - 선택 된음료수 값) 을 하고 음료수 와 잔 돈 반환
//     2.2.2 음료수 선택 재고가 없는 경우 -> 선택할 수 없다는 메시지 출력
// 3.  사용자가 돈 반환을 누를 경우 입력 받은 돈 반환
// 4.  음료수 값 만큼 뺀 잔 돈 주기

class VendingMachine {
  constructor(money) {
    this.money = money;
  }
  printMoney() {
    console.log(`현재 금액은 ${this.money}`);
  }
  insertCoin(money) {
    this.money = money;
  }
}
const vendingMachine = new VendingMachine(0);

vendingMachine.insertCoin(1000);
vendingMachine.printMoney();
