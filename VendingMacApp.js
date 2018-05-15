const beverageData = [
  {
    "drinkName": "콜라",
    "drinkPrice": 1000,
    "drinkStock": 2
  },
  {
    "drinkName": "사이다",
    "drinkPrice": 1000,
    "drinkStock": 10
  },
  {
    "drinkName": "포도쥬스",
    "drinkPrice": 700,
    "drinkStock": 2
  },
  {
    "drinkName": "딸기우유",
    "drinkPrice": 500,
    "drinkStock": 4
  },
  {
    "drinkName": "미에로화이바",
    "drinkPrice": 900,
    "drinkStock": 9
  },
  {
    "drinkName": "물",
    "drinkPrice": 500,
    "drinkStock": 10
  },
  {
    "drinkName": "파워에이드",
    "drinkPrice": 1200,
    "drinkStock": 0
  }
]

//금액을 인자로 받고, 사용 가능한 음료의 목록(음료 명, 가격, 재고 수량)을 반환해주는 함수
function insertCoin(coin, vendingMacData) {
  const availableDrinks = vendingMacData.map((currentVal, index) => {
    if (coin >= currentVal["drinkPrice"]) {
      return currentVal
    }

    return [];
  })
  return availableDrinks;
}

//음료를 인자로 받아, 나온 음료에대한 메시지를 노출하고, 현재 잔액과, 잔액에 대한 음료 목록을 반환한다.
function selectItem(drink, vendingMacData) {
  for (let i = 0; i < vendingMacData.length; i++) {
    if (vendingMacData[i]["drinkName"] === drink && vendingMacData[i]["drinkStock"] === 0) {
      const message = "재고 없음";
      return message;
    }
  }
}

console.log(insertCoin(1000, beverageData));
console.log(selectItem("파워에이드", beverageData));