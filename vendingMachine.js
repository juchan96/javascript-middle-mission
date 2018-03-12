var drinks = [
  { name: "물", price: 500, num: 10 },
  { name: "콜라", price: 1000, num: 10 },
  { name: "사이다", price: 1000, num: 10 },
  { name: "포도쥬스", price: 1200, num: 10 },
  { name: "딸기우유", price: 1200, num: 10 },
  { name: "미에로화이바", price: 1500, num: 10 },
  { name: "파워에이드", price: 1500, num: 0 }
];

var currentMoney = 0;


function insertCoin(money) {
  currentMoney += money;
  console.log(" " + money + " 원이 투입되었습니다.");
  console.log(" 사용 가능한 금액 : " + currentMoney);
  newLine();
  printAvailableDrinkList();
}

function printAvailableDrinkList() {

  console.log("사용 가능한 음료수 목록 => ");

  if (currentMoney < 500) {
    console.log("없음");
    return;
  }

  for (var index in drinks) {
    var _name = drinks[index].name;
    var _price = drinks[index].price;
    var _num = drinks[index].num;

    if (!_num) {
      _price = 0;
    }

    if (_price <= currentMoney) {
      var _price = (!_price) ? _price = "재고없음" : _price;
      console.log(_name + "(" + _price + ")");
    }
  }
  newLine();
}

function selectItem(drinkName) {
  for (var index in drinks) {
    var _drinkName = drinks[index].name;

    if (drinkName === _drinkName) {
      var _price = drinks[index].price;
      var _num = drinks[index].num;
      break;
    }
  }

  if (!_num) {
    console.log(" 해당 음료는 재고가 없습니다.");
    newLine();
    return;
  }

  currentMoney -= _price;

  console.log(" " + drinkName + "(이/가) 나왔습니다.");
  console.log(" 현재 잔돈 : " + currentMoney);
  newLine();
  printAvailableDrinkList();
}

function returnMoney() {
  console.log(" 잔돈 " + currentMoney + " 원이 반환됐습니다.");
  newLine();
}

function newLine() {
  console.log("");
}

insertCoin(1000);
selectItem("물");
selectItem("파워에이드");
insertCoin(1500);
returnMoney();