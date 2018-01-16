const READLINE = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});


const BEVERAGE_LIST = [{
  'name': '콜라',
  'price': 1000,
  'stock': 2
}, {
  'name': '사이다',
  'price': 1000,
  'stock': 3
}, {
  'name': '포도쥬스',
  'price': 700,
  'stock': 3
}, {
  'name': '딸기우유',
  'price': 500,
  'stock': 3
}, {
  'name': '미에로화이바',
  'price': 900,
  'stock': 3
}, {
  'name': '물',
  'price': 500,
  'stock': 3
}, {
  'name': '파워에이드',
  'price': 900,
  'stock': 0
}]


// 돈을 투입하는 함수
const insertCoin = (coin, change) => {
  READLINE.question('동전을 넣으세요: ', (coin) => {
    coin *= 1;
    if (Number.isInteger(coin) && !isNaN(coin)) {
      checkChange(coin, change)
    } else {
      console.log('숫자만 입력하세요');
      insertCoin()
    }
  })
};


// 잔액이 부족해 돈을 더 넣을 때 거스름돈을 반영하는 함수
const checkChange = (coin, change) => {
  if (!change) {
    console.log('투입 금액:', coin + "원");
    availableBeverages(coin);
  } else if (!!change) {
    let changes = coin + change
    console.log('현재 금액:', changes + "원");
    availableBeverages(changes);
  }
}

// 현재 이용가능한 음료가 무엇인지 확인하는 함수
const availableBeverages = (coin) => {
  beverages = [];
  for (let key in BEVERAGE_LIST) {
    let availables = BEVERAGE_LIST[key];
    beverages.push(availables)
  }
  console.log("선택 가능 음료:", beverages);
  selectBeverages(coin, beverages)
};


// 이용가능한 음료 중 마실 음료를 선택하는 함수
const selectBeverages = (coin, bev_lists) => {
  READLINE.question('음료를 선택하세요: ', (name) => {
    for (let elem in bev_lists) {
      let bev = bev_lists[elem]
      let change = coin - bev.price;
      if (name === bev.name) {
        statusOfBeverage(name, bev, coin, bev_lists)
      }
    }
  })
};


// 선택한 음료의 재고가 남아있는지,
// 동전이 충분히 투입되었는지 확인하는 함수
const statusOfBeverage = (name, bev, coin, bev_lists) => {
  let change = coin - bev.price;
  if (bev.stock === 0) {
    console.log("재고가 없습니다.");
    selectBeverages(coin, bev_lists)
  } else if (coin < bev.price || change < 0) {
    console.log("투입 금액이 부족합니다");
    change = coin
    insertCoin(coin, change);
  } else {
    console.log(name + "을 구입했습니다. 잔액은 " + change + "원 입니다.");
    --bev.stock;
    purchaseAnother(change)
  }
};


// 다른 음료를 구입할지 반환할지 선택하는 함수
const purchaseAnother = (beverage, bev_lists) => {
  READLINE.question('다른 음료를 구매할까요 반환할까요?: (구매 / 반환) ', (answer) => {
    if (answer === '구매') {
      availableBeverages(beverage) && selectBeverages(beverage, bev_lists)
    } else if (answer === '반환') {
      READLINE.close()
    } else {
      purchaseAnother(beverage, bev_lists)
    }
  })
};


insertCoin();