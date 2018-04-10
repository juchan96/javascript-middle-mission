/* 

*/
var itemList = require("./drinkItem.js");

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
    sellItem: [], // 구매 가능한 물품명만
    sellItemStock: [], // 상품+물량 결과
    sellItemPrice: [] // 상품+가격 결과
  };
  for (let i = 0; i < itemList.length; i++) {
    if (coin >= itemList[i].price) {
      shoppingItem.sellItem.push(itemList[i].item);
      shoppingItem.sellItemStock.push(itemList[i].item + "/" + itemList[i].stock);
      shoppingItem.sellItemPrice.push(itemList[i].item + "$" + itemList[i].price);
    }
  }
  let print = "사용가능한 음료수 목록 => " + shoppingItem.sellItem + "\n" + noticeWord.whatChoice;
  console.log(print);
  return shoppingItem;
}


function getChooseItem(wantItem, resultData) {
  let sellItem = [];
  let noneItem = [];

  resultData.sellItemStock.filter(value => {
    let splitData = value.split("/");
    if (splitData[0] === wantItem) {
      (splitData[1] === "재고없음") ? noneItem.push(splitData[0]): sellItem.push(splitData[0]);
    }
  });

  if (noneItem.length === 1) {
    let dontBuyItem = noneItem + " 상품의 재고가 없습니다." + coin + "을 반환합니다.";
    return dontBuyItem;
  } else if(sellItem.length === 1) {
    let giveItem = sellItem + " 상품을 드립니다."
    console.log(giveItem);
  }
  return sellItem;
}

function getRestMoney(coin, sellItem, addBuyItem) {
  let restCoin = 0;
  itemList.forEach(value => {
    if(value.item === sellItem[0]){
      restCoin = coin - value.price;
      return restCoin;
    }
  });

  if(addBuyItem){
    let rebuying = getSellingItem(restCoin);
    rebuying.sellItemPrice.filter(value => {
      let sliceValue = value.split("$");
      // (recoin >= sliceValue[1]) ? rebuying : false; 
    });
    let rechoose = getChooseItem(addBuyItem, rebuying);
  } else {
    let restCoinPrint = "더이상 구매하실수 없습니다 금액을 반환합니다." + "\n" + "남은 금액은 " + restCoin + " 입니다.";
    console.log(restCoinPrint);
    return restCoin;
  }
}

// var result = getChooseItem("파워에이드", getSellingItem(coin));
// console.log(result + "\n");

// getRestMoney(coin, getChooseItem("딸기우유", getSellingItem(coin)), "미에로화이바");

// var result2 = getRestMoney(result, getChooseItem("파워에이드", getSellingItem(result)));

var chooseItem = getChooseItem("콜라", getSellingItem(coin));
getRestMoney(coin, chooseItem, "딸기우유");