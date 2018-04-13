// var drinks = [
//   { name: "물", price: 500, num: 10 },
//   { name: "콜라", price: 1000, num: 10 },
//   { name: "사이다", price: 1000, num: 10 },
//   { name: "포도쥬스", price: 1200, num: 10 },
//   { name: "딸기우유", price: 1200, num: 10 },
//   { name: "미에로화이바", price: 1500, num: 10 },
//   { name: "파워에이드", price: 1500, num: 0 }
// ];

var currentMoney = 0;

function insertCoin(drinks, money) {
  currentMoney += money;
  log(" " + money + " 원이 투입되었습니다.");
  log(" 사용 가능한 금액 : " + currentMoney);
  printAvailableDrinkList(drinks);
}

function printAvailableDrinkList(drinks) {

  var name;
  var price;
  var num;

  var lowestPrice = findLowestPrice(drinks);

  log("사용 가능한 음료수 목록 => ");

  if (currentMoney < lowestPrice) {
    log("없음");
    return;
  }



  for (var i=0; i<Object.keys(drinks).length; i++) {
      name = drinks[i].name;
      price = drinks[i].price;
      num = drinks[i].price;

      if (!num) {
          price = 0;
      }

      if (price <= currentMoney) {
          price = (!price) ? "재고없음" : price;
          log(name + "(" + price + ")");
      }
  }

}

function findLowestPrice(drinks) {
  var initTempData = 10000;
  var lowestPrice = initTempData;
  var drinkPrice;

  log("함수 시작");

  console.log(drinks);

  for (var i=0; i<Object.keys(drinks).length; i++) {
      drinkPrice = drinks[i].price;
      lowestPrice = (drinkPrice < lowestPrice) ? drinkPrice : lowestPrice;
      log("음료가격 : " + drinkPrice + " 가장낮은 음료가격 : " + lowestPrice);
  }

  log("함수 끝");

  return lowestPrice;
}

function selectItem(drinks, drinkName) {

  var name = "";
  var price = 0;
  var num = 0;

  for (var index in drinks) {
    name = drinks[index].name;

    if (name === drinkName) {
      price = drinks[index].price;
      num = drinks[index].num;
      break;
    }
  }

  if (!num) {
    log(" 해당 음료는 재고가 없습니다.");
    return;
  }

  currentMoney -= price;

  log(" " + drinkName + "(이/가) 나왔습니다.");
  log(" 현재 잔돈 : " + currentMoney);
  printAvailableDrinkList(drinks);
}

function returnMoney() {
  log(" 잔돈 " + currentMoney + " 원이 반환됐습니다.");
}

function log(data) {
  console.log(data);
}

var run = function() {
    var drinks = [
        { name: "파워에이드", price: 1500, num: 0 },
        { name: "딸기우유", price: 1200, num: 10 },
        { name: "콜라", price: 1000, num: 10 },
        { name: "포도쥬스", price: 1200, num: 10 },
        { name: "미에로화이바", price: 1500, num: 10 },
        { name: "물", price: 500, num: 10 },
        { name: "사이다", price: 1000, num: 10 }
    ];

    insertCoin(drinks, 1000);
    selectItem(drinks, "파워에이드");
    selectItem(drinks, "물");
    insertCoin(drinks, 1500);
    returnMoney();
};

run();
