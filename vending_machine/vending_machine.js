/* 

getRestMoney(choose2, "딸기우유");
getRestMoney(choose2, "딸기우유");
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
var coin2 = 3000;
var coin3 = 500;
var notCoin = "1000";

// 돈을 넣었을때 그 돈만큼 살수 있는 물건 탐색 / 저장 => 반환값: 탐색한 물건들 객체안 []로 전달
function getSellingItem(coin) {
  let shoppingItem = {
    sellPrintItem: [],
    sellItemStock: [],
    sellItemPrice: []
  };

  for (let i = 0; i < itemList.length; i++) {
    if (coin >= itemList[i].price) {
      shoppingItem.sellPrintItem.push(itemList[i].item + "(" + itemList[i].stock + ")");
      shoppingItem.sellItemStock.push(itemList[i].item + "/" + itemList[i].stock);
      shoppingItem.sellItemPrice.push(itemList[i].item + "$" + itemList[i].price);
    } else {
      let dontBuy = noticeWord.dontBuyDrink + "\n";
      console.log(dontBuy);
      return false;
    }
  }
  let print = noticeWord.usefulDrink + shoppingItem.sellPrintItem + "\n" + noticeWord.choiceDrink + "\n";
  console.log(print);
  return shoppingItem;
}

// 구매할 수 있는 목록 중 재고의 유무를 탐색 해주는 기능 => 반환값: 재고가 있는 제품이라면 제품의 가격 / 없다면 재고가 없다는 걸 출력
function getChooseItem(wantItem, sellItem) {
  if (sellItem === false) {
    return sellItem;
  } else {
    let result = [];
    sellItem.sellItemStock.filter(value => {
      let splitData = value.split("/");
      if (splitData[0] === wantItem && splitData[1] >= 1) {
        result.push(wantItem);
        console.log(wantItem + "가 나왔습니다.");
      } else if (splitData[0] === wantItem && splitData[1] === "재고없음") {
        result.push("재고없음");
        console.log(noticeWord.noneStock + "\n");
      }
    });
    return result;
  }
}

// 현재 투입한 돈에서 제고가 있는 구매 할 수 있는 제품의 가격값을 뺀 나머지 값 반환 => 반환값: 나머지 가격 
function getRestMoney(stockItem, coin) {
  if (stockItem[0] !== "재고없음") {
    let restCoin = 0;
    sellItem.sellItemPrice.forEach(value => {
      let splitDataStock = value.split("$");
      if (splitDataStock[0] === stockItem[0]) {
        restCoin = coin - splitDataStock[1];
      }
    });
    let print = "현재잔돈: " + restCoin + "원 " + "\n";
    console.log(print);
    return restCoin;
  } else {
    return stockItem;
  }
}


// 현 나머지 값에서 다시 탐색해 구매할 수 있는 제품이 있는지 확인하는 함수 => 반환값: 있다면 다시 제품목록을 반환 / 없다면 돈을 반환해 준다.
function getReSellingItem(coin, wantMoreItem) {
  var reSelling = getSellingItem(coin);
  if(wantMoreItem){
    let reChoose = getChooseItem(wantMoreItem, reSelling);
    let returnCoin = getRestMoney(reChoose, coin);
    console.log(returnCoin);
  } else {
    let finalPrint ="잔돈 " + coin +  noticeWord.returnCoin;
    console.log(finalPrint);
    return coin;
  }
}

var sellItem = getSellingItem(coin3); // 제품의 구매 금액이 부족합니다.

var sellItem = getSellingItem(coin2);
var chooseItem = getChooseItem("콜라", sellItem);
var restCoin = getRestMoney(chooseItem, coin2);
var resultAction = getReSellingItem(restCoin);