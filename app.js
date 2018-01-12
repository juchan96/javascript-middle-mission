const READLINE = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});

let MONEY = 0;
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


const insertCoin = (obj) => {
  READLINE.question('동전을 넣으세요: ', (coin) => {
    coin = Number(coin);
    if (typeof (coin) === 'number') {
      obj += coin;
      console.log('투입금액:', obj + "원");
      availableBeverages(obj);
    } else {
      console.log('금액은 숫자만 입력해 주세요');
      insertCoin(obj)
    }
  })
}



const availableBeverages = (obj) => {
  beverages = [];
  for (let key in DATA) {
    let availables = DATA[key];
    if (availables.stock > 0) {
      beverages.push(availables)
    }
  }
  console.log("선택 가능 음료:", beverages);
  selectBeverages(obj, beverages)
}




const selectBeverages = (obj, arr) => {
  READLINE.question('음료를 선택하세요, 반환하시려면 <반환>이라고 입력해주세요: ', (name) => {
    for (let elem in arr) {
      if (arr[elem].name === name) {
        console.log(name + "을 선택했습니다.");
        if (obj >= arr[elem].price || obj !== 0) {
          arr[elem].stock--;
          let change = obj - arr[elem].price
          if (arr[elem].stock < 1) {
            READLINE.question('음료를 구입했습니다. 다른 음료를 구입하시겠습니까?: (Y/N)', (answer) => {
              if (answer === 'Y') {
                availableBeverages(change)
                selectBeverages(change, arr)
              } else {
                console.log("이용해주셔서 감사합니다.");
                READLINE.close()
              }
            })
          } else {
            console.log("거스름돈:", change + "원");
            READLINE.question('음료를 구입했습니다. 다른 음료를 구입하시겠습니까?: (Y/N) ', (answer) => {
              if (answer === 'Y' || answer ===  'y') {
                availableBeverages(change)
                selectBeverages(change, arr)
              } else {
                console.log("이용해주셔서 감사합니다.");
                READLINE.close()
              }
            })
          }
        } else {
          console.log("투입 금액이 부족합니다");
          insertCoin(obj);
        }
      }
    }
    if (name === '반환') {
      console.log("반환금액은" + obj + "원입니다. 이용해주셔서 감사합니다.");

      READLINE.close()
    }
  })
}

insertCoin(MONEY);