/* 

*/
var itemData = require("./drinkItem.js");

var coin = 1900;
var notCoin = "1000";

var noticeWord = {
  "notNumber": "숫자를 입력 하십시요.",
  "noCoin": "동전을 넣어주세요.",
  "pickedDrink": "상품을 선택 하였습니다.",
  "whatChoice": "어떤 상품을 선택하시겠습니까?",
  "noDrink": "해당 상품이 없습니다.",
  "balanceCoin": "잔액이 부족합니다.",
  "leftMoney": "잔액이 남았습니다.",
  "emptyMoney": "반환할 금액이 없습니다."
};

function getSellingItem(coin) {
  let shoppingItem = {
    sellItem: [], // 구매 가능한 물품명
    printWord: [] // 탐색 결과 출력
  };
  for (let i = 0; i < itemData.length; i++) {
    if (coin >= itemData[i].price) {
      shoppingItem.sellItem.push(itemData[i].item);
      shoppingItem.printWord.push(itemData[i].item + "/" + itemData[i].stock);
    }
  }
  let print = "사용가능한 음료수 목록 => " + shoppingItem.sellItem + "\n" + noticeWord.whatChoice;
  console.log(print);
  return shoppingItem;
}


function getChooseItem(wantItem, resultData) {
  let sellItem = [];
  let noneItem = [];

  resultData.printWord.filter(value => {
    let splitData = value.split("/");
    if (splitData[0] === wantItem) {
      (splitData[1] === "재고없음") ? noneItem.push(splitData[0]): sellItem.push(splitData[0]);
    }
  });

  if (noneItem.length === 1 && noneItem) {
    let dontBuyItem = noneItem + " 상품의 재고가 없습니다." + coin + "을 반환합니다.";
    return dontBuyItem;
  } else {
    let giveItem = sellItem + " 상품을 드립니다."
    console.log(giveItem);
  }
  return sellItem;
}

function getRestMoney(coin, sellItem, addBuyItem) {
  let restCoin = 0;

  let result = itemData.forEach(value => {
    if (sellItem[0] === value.item) {
      restCoin = coin - value.price; // 현재 코인 - 재고가 있는 상품의 가격 = 나머지값 구하기
      return restCoin;
    }
  });

  if (restCoin >= itemData.price && addBuyItem) {
    return getSellingItem(restCoin);
  } else {
    let restCoinPrint = "더이상 구매하실수 없습니다 금액을 반환합니다." + "\n" + "남은 금액은 " + restCoin + " 입니다.";
    console.log(restCoinPrint);
    return restCoin;
  }
}

// function vendingMachine(coin) {
//   if (typeof coin !== "number") {
//     let reBuyItem = itemData.forEach(value => {
//       let result = (restCoin >= value.price) ? getSellingItem(restCoin) : restCoinPrint;
//       return result;
//     });
//     console.log(reBuyItem);
//     (restCoin >= itemData.price) ? getSellingItem(restCoin): restCoinPrint;
//     console.log(noticeWordnotNumber);
//   } else {
//     return insertCoin(coin);
//     // returnMoney(coin);
//   }
// }

// vendingMachine(coin); // 동전을 넣어 주세요.

// var result = getChooseItem("파워에이드", getSellingItem(coin));
// console.log(result + "\n");

getRestMoney(coin, getChooseItem("딸기우유", getSellingItem(coin)), "미에로화이바");

// var result2 = getRestMoney(result, getChooseItem("파워에이드", getSellingItem(result)));