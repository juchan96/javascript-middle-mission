// var drinks = [
//   { name: "물", price: 500, num: 10 },
//   { name: "콜라", price: 1000, num: 10 },
//   { name: "사이다", price: 1000, num: 10 },
//   { name: "포도쥬스", price: 1200, num: 10 },
//   { name: "딸기우유", price: 1200, num: 10 },
//   { name: "미에로화이바", price: 1500, num: 10 },
//   { name: "파워에이드", price: 1500, num: 0 }
// ];

var drinks = [
  { name: "파워에이드", price: 1500, num: 0 },
  { name: "딸기우유", price: 1200, num: 10 },
  { name: "콜라", price: 1000, num: 10 },
  { name: "포도쥬스", price: 1200, num: 10 },
  { name: "미에로화이바", price: 1500, num: 10 },
  { name: "물", price: 500, num: 10 },
  { name: "사이다", price: 1000, num: 10 }
];

var currentMoney = 0;


function insertCoin(money) {
  currentMoney += money;
  log(" " + money + " 원이 투입되었습니다.");
  log(" 사용 가능한 금액 : " + currentMoney);
  printAvailableDrinkList();
}

function printAvailableDrinkList() {

  var name;
  var price;
  var num;

  var lowestPrice = findLowestPrice();

  log("사용 가능한 음료수 목록 => ");

  if (currentMoney < lowestPrice) {
    log("없음");
    return;
  }

  drinks.forEach(function (element, index, array) {
    name = array[index].name;
    price = array[index].price;
    num = array[index].price;

    if (!num) {
      price = 0;
    }

    if (price <= currentMoney) {
      price = (!price) ? "재고없음" : price;
      log(name + "(" + price + ")");
    }
  });
}

function findLowestPrice() {
  var initTempData = 10000;
  var lowestPrice = initTempData;
  var drinkPrice;

  log("함수 시작");

  drinks.forEach(function (element, index, array) {
    drinkPrice = array[index].price;
    lowestPrice = (drinkPrice < lowestPrice) ? drinkPrice : lowestPrice;
    log("음료가격 : " + drinkPrice + " 가장낮은 음료가격 : " + lowestPrice);
  });

  log("함수 끝");
}

function selectItem(drinkName) {

  var name;
  var price;
  var num;

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
  printAvailableDrinkList();
}

function returnMoney() {
  log(" 잔돈 " + currentMoney + " 원이 반환됐습니다.");
}

function log(data) {
  console.log(data);
}

insertCoin(1000);
selectItem("파워에이드");
selectItem("물");
insertCoin(1500);
returnMoney();