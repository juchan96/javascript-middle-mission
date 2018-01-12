const READLINE = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

const DATA = [{
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


const insertCoin = () => {
  READLINE.question('동전을 넣으세요: ', (coin) => {
    coin *= 1;
    if (typeof (coin) === 'number' && !isNaN(coin)) {
      console.log('투입금액:', coin + "원");
      availableBeverages(coin);
    } else {
      console.log('숫자만 입력하세요');
      insertCoin()
    }
  })
}


const availableBeverages = (obj) => {
  beverages = [];
  for (let key in DATA) {
    let availables = DATA[key];
    beverages.push(availables)
  }
  console.log("선택 가능 음료:", beverages);
  selectBeverages(obj, beverages)
}


const selectBeverages = (obj, arr) => {
  READLINE.question('음료를 선택하세요: ', (name) => {
    for (let elem in arr) {
      let bev = arr[elem]
      let change = obj - bev.price;
      if (name === bev.name) {
        statusOfBeverage(name, bev, obj, change, arr)
      }
    }
  })
}


const statusOfBeverage = (name, bev, obj, change, arr) => {
  if (bev.stock === 0) {
    console.log("재고가 없습니다.");
    selectBeverages(obj, arr)
  } else if (obj < bev.price || change < 0) {
    console.log("투입 금액이 부족합니다");
    insertCoin(obj);
  } else {
    console.log(name + "을 구입했습니다. 잔액은 " + change + "원 입니다.");
    --bev.stock;
    purchaseAnother(change)
  }
}


const purchaseAnother = (obj, arr) => {
  READLINE.question('다른 음료를 구매할까요 반환할까요?: (구매 / 반환) ', (answer) => {
    (answer === '구매') ? availableBeverages(obj) && selectBeverages(obj, arr):
      (answer === '반환') ? READLINE.close() : purchaseAnother(obj, arr)
  })
}


insertCoin();