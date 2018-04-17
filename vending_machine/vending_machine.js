/* 
## 변수명 
- itemList: 전체 물품 데이터 객체 (item: 물품명, price: 물품가격, stock: 물품수량)
- noticeWord: 안내 문구 객체
- coin2, coin3: 투입 금액
- notCoin: 문자형(테스트)
- shoppintItem: 구매가능한 물건의 탐색 값들

## 함수 기능
- insertCoin 함수 (투입금액)
돈을 넣었을때 그 돈만큼 살수 있는 물건 탐색 / 저장
> 반환값: 탐색한 물건들 객체안 []로 전달

- selectItem 함수 (원하는물품명, 탐색물건의 배열)
구매할 수 있는 목록 중 재고의 유무를 탐색 해주는 기능
> 반환값: 재고가 있는 제품이라면 제품의 가격 / 없다면 재고가 없다는 걸 출력

- returnMoney 함수 (재고있는 물품명, 투입금액)
현재 투입한 돈에서 제고가 있는 구매 할 수 있는 제품의 가격값을 뺀 나머지 값 반환
> 반환값: 나머지 가격

- rebuyItem 함수 (나머지 금액, 추가로 구매하고싶은 제품명)
구매하고 싶은 제품명이 있다면 나머지 값에 다시 구매할 수 있는 제품이 있는지 탐색
> 반환값: 제품명이 있다면 다시 제품목록을 출력 / 없다면 돈을 반환해 준다.
*/

let itemList = require("./drinkItem.js");

const noticeWord = {
  "usefulDrink": "사용 가능한 음료수 목록 => ",
  "outputDrink": " 상품이 나왔습니다. ",
  "dontBuyDrink": "제품의 구매 금액이 부족합니다. ",
  "noneStock": " 제품은 제고가 없습니다. ",
  "returnCoin": " 원이 반환 되었습니다. ",
  "notNumber": "숫자형태를 기입해 주십시요. "
};

function vendingMachine(coin, wantItem) {
  // insertCoin()
  const checkType = Object.prototype.toString.call(coin);
  let INPUT_NUMBER_ERROR_MSG = "[object Number]";
  if (checkType !== INPUT_NUMBER_ERROR_MSG) return noticeWord.notNumber;
  
  if (coin < 500) {
    console.log(noticeWord.dontBuyDrink);
    return coin + noticeWord.returnCoin;
  }
  
  let productArr = [];
  let tableArr = [];
  let items = {
    buyItem: [],
    dontBuyItem: []
  };
  
  for (sell in itemList) {
    let product = itemList[sell].item + "$" + itemList[sell].price + "$" + itemList[sell].stock;
    let restCoin = coin - itemList[sell].price;
    
    if (coin >= itemList[sell].price) {
      tableArr.push(itemList[sell].item + "(" + itemList[sell].price + ")");
      productArr.push(product + "$" + restCoin);
    }
  }
  console.log(noticeWord.usefulDrink + tableArr);

  // selectItem()
  productArr.forEach(value => {
    let splitData = value.split("$");
    let itemData = splitData[0];
    let priceData = splitData[1];
    let stockData = splitData[2];
    let restCoinData = splitData[3];

    let stock = itemData === wantItem && stockData === "재고없음";
    let noneStock = itemData === wantItem && stockData !== "재고없음"; 

    if(stock){
      items.dontBuyItem.push(itemData + "/" + coin);
    } else if (noneStock){
      items.buyItem.push(itemData + "/" + restCoinData);
    }
  });
  console.log(wantItem + noticeWord.outputDrink);


  // returnCoin()
  items.buyItem.forEach(value => {
    let splitValue = value.split("/");
    let itemValue = splitValue[0];
    let restCoinValue = splitValue[1];

    if(restCoinValue === 0 || restCoinValue < 500){
      console.log(noticeWord.dontBuyDrink + restCoinValue + noticeWord.returnCoin);
      return restCoinValue;
    } else {
      // 제품탐색실행
    }
  });
}

console.log(vendingMachine(400, "파워에이드"));
console.log(vendingMachine(1000, "파워에이드"));
console.log(vendingMachine(1000, "콜라"));



