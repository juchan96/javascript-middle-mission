var itemData = require("./drinkItem.js");

var coin = 2000;
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
  let resultData = {
    sellItem: [], // 구매 가능한 물품명
    printWord: [] // 탐색 결과 출력
  };
  for (let i = 0; i < itemData.length; i++) {
    if (coin >= itemData[i].price) {
      resultData.sellItem.push(itemData[i].item);
      resultData.printWord.push(itemData[i].item + "/" + itemData[i].stock);
    }
  }
  let print = "사용가능한 음료수 목록 => " + resultData.sellItem + "\n" + noticeWord.whatChoice;
  console.log(print);
  return resultData;
}


function getChooseItem(inputData, resultData) {
  let sellItem = [];
  let noneItem = [];
  
  resultData.printWord.filter(value => {
    let splitData = value.split("/");
    if (splitData[0] === inputData) {
      (splitData[1] === "재고없음") ? noneItem.push(splitData[0]) : sellItem.push(splitData[0]);
    } 
  });

  if(noneItem.length === 1){
    return noneItem + " 상품의 재고가 없습니다.";
  } else {
    console.log(sellItem + " 상품을 드립니다.");
  }
  return sellItem;
}

function returnMoney(coin, sellItem) {
  let restCoin = coin
  return (restCoin > itemData.price) ? restCoin + "가 반환 되었습니다." : "남은 금액은 " + restCoin + " 입니다.";
}

// function vendingMachine(coin) {
//   if (typeof coin !== "number") {
//     console.log(noticeWordnotNumber);
//   } else {
//     return insertCoin(coin);
//     // returnMoney(coin);
//   }
// }

// vendingMachine(coin); // 동전을 넣어 주세요.

// var result = getChooseItem("파워에이드", getSellingItem(coin));
// console.log(result);

var result = getChooseItem("딸기우유", getSellingItem(coin));

