/* 
## 변수명 
- itemList: 전체 물품 데이터 객체 (item: 물품명, price: 물품가격, stock: 물품수량)
- noticeWord: 안내 문구 객체
- coin2, coin3: 투입 금액
- notCoin: 문자형(테스트)
- shoppintItem: 구매가능한 물건의 탐색 값들

## 함수 기능
- getSellingItem 함수 (투입금액)
돈을 넣었을때 그 돈만큼 살수 있는 물건 탐색 / 저장 
=> 반환값: 탐색한 물건들 객체안 []로 전달

- getChooseItem 함수 (원하는물품명, 탐색물건의 배열)
구매할 수 있는 목록 중 재고의 유무를 탐색 해주는 기능 
=> 반환값: 재고가 있는 제품이라면 제품의 가격 / 없다면 재고가 없다는 걸 출력

- getRestMoney 함수 (재고있는 물품명, 투입금액)
현재 투입한 돈에서 제고가 있는 구매 할 수 있는 제품의 가격값을 뺀 나머지 값 반환 
=> 반환값: 나머지 가격 

- getReSellingItem 함수 (나머지 금액, 추가로 구매하고싶은 제품명)
구매하고 싶은 제품명이 있다면 나머지 값에 다시 구매할 수 있는 제품이 있는지 탐색
=> 반환값: 제품명이 있다면 다시 제품목록을 출력 / 없다면 돈을 반환해 준다.
*/

var itemList = require("./drinkItem.js");

var noticeWord = {
  "usefulDrink": "사용 가능한 음료수 목록 => ",
  "choiceDrink": "어떤 상품을 선택하시겠습니까?",
  "dontBuyDrink": "제품의 구매 금액이 부족합니다.",
  "noneStock": "해당 제품은 제고가 없습니다",
  "returnCoin": "원이 반환 되었습니다."
};

// var coin = 3500;
var coin2 = 2000;
var coin3 = 500;
var notCoin = "1000";

function getSellingItem(coin) {
  let items = {
    product: [],
    stock: [],
    price: []
  };

  let checkType = Object.prototype.toString.call(coin);

  if (checkType !== "[object Number]") {
    let notCoinPrint = "숫자만 입력하십시오.";
    console.log(notCoinPrint);
    return notCoinPrint;
  }

  for (let i = 0; i < itemList.length; i++) {
    if (coin >= itemList[i].price) {
      items.product.push(itemList[i].item + "(" + itemList[i].stock + ")");
      items.stock.push(itemList[i].item + "/" + itemList[i].stock);
      items.price.push(itemList[i].item + "$" + itemList[i].price);
    } else {
      let dontBuy = noticeWord.dontBuyDrink + "\n";
      console.log(dontBuy);
      return false;
    }
  }
  let sellingMSG = noticeWord.usefulDrink + items.product + "\n" + noticeWord.choiceDrink + "\n";
  console.log(sellingMSG);
  return items;
}

function getChooseItem(wantItem, sellItem) {
  if (sellItem === false) {
    return sellItem;
  } else {
    let result = [];
    sellItem.stock.forEach(value => {
      let splitStock = value.split("/");
      if (splitStock[0] === wantItem && splitStock[1] >= 1) {
        result.push(wantItem);
        console.log(wantItem + "가 나왔습니다.");
      } else if (splitStock[0] === wantItem && splitStock[1] === "재고없음") {
        result.push("재고없음");
        console.log(noticeWord.noneStock + "\n");
      }
    });
    return result;
  }
}

function getRestMoney(stockItem, coin) {
  if (stockItem[0] !== "재고없음") {
    let restCoin = 0;
    sellItem.price.forEach(value => {
      let splitPrice = value.split("$");
      if (splitPrice[0] === stockItem[0]) {
        restCoin = coin - splitPrice[1];
      }
    });
    let restMSG = "현재잔돈: " + restCoin + "원 " + "\n";
    console.log(restMSG);
    return restCoin;
  } else {
    return stockItem;
  }
}

function getReSellingItem(coin, wantMoreItem) {
  var reSelling = getSellingItem(coin);
  if (wantMoreItem) {
    let reChoose = getChooseItem(wantMoreItem, reSelling);
    let returnCoin = getRestMoney(reChoose, coin);
    console.log(returnCoin);
  } else {
    let returnCoin = "잔돈 " + coin + noticeWord.returnCoin;
    console.log(returnCoin);
    return coin;
  }
}

getSellingItem(notCoin); // 숫자만 입력하십시오.
getSellingItem(coin3); // 제품의 구매 금액이 부족합니다.

var sellItem = getSellingItem(coin2);
var chooseItem = getChooseItem("콜라", sellItem);
var restCoin = getRestMoney(chooseItem, coin2);
var resultAction = getReSellingItem(restCoin);