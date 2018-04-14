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

let itemList = require("./drinkItem.js");

const noticeWord = {
  "usefulDrink": "사용 가능한 음료수 목록 => ",
  "outputDrink": " 상품이 나왔습니다.",
  "choiceDrink": "어떤 상품을 선택하시겠습니까?",
  "dontBuyDrink": "제품의 구매 금액이 부족합니다.",
  "noneStock": "해당 제품은 제고가 없습니다",
  "returnCoin": "원이 반환 되었습니다.",
  "notNumber": "숫자형태를 기입해 주십시요."
};

let coin = 1000;
let notCoin = "1000";


function insertCoin(coin) {
  const checkType = Object.prototype.toString.call(coin);
  
  let items = {
    tableData: [],
    product: [],
    stock: [],
    price: []
  };
  
  let INPUT_NUMBER_ERROR_MSG = "[object Number]";
  if(checkType !== INPUT_NUMBER_ERROR_MSG) return noticeWord.notNumber; 
  
  for(selling in itemList){
    if(coin >= itemList[selling].price){
      items.tableData.push(itemList[selling].item + "(" + itemList[selling].price + ")");
      items.product.push(itemList[selling].item + "$" + itemList[selling].price + "$" + itemList[selling].stock);
    } else {
      items.tableData.push( itemList[selling].item + "(" + "구매불가" + ")");
      let dontBuy = noticeWord.usefulDrink + "없음";
      return dontBuy; 
    }
  }
  
  let sellItem = noticeWord.usefulDrink + items.tableData + "\n" + noticeWord.choiceDrink;
  console.log(sellItem);

  return items;
}

function selectItem(inputItem, sellItem) {
  if(!sellItem) return "잔돈" + coin + "이 반환했습니다.";
  
  let sale = sellItem.product;
  let selectResult = []; 

  sale.forEach(value => {
    let splitData = value.split("$");
    let nameData = splitData[0]; 
    let priceData = splitData[1];
    
    if(nameData === inputItem && splitData[2] === "재고없음"){
      console.log("\n" + noticeWord.noneStock);
      return noticeWord.noneStock; 
    } else if(nameData === inputItem) {
      let calculateCoin = coin - priceData; 
      selectResult.push(nameData, calculateCoin);
    }
  });

  let setItem = selectResult[0] + noticeWord.outputDrink; 
  let setRestCoin = " 현재잔돈: " + selectResult[1] + "원"; 
  let reSelect = insertCoin(selectResult[1]);
  console.log(setItem + setRestCoin);
  return selectResult;
}

function returnMoney(returnCoin, selectResult) {
  let result = selectResult;
  if(!result){
    let backChange = "잔돈 "+ returnCoin[1] + "이 반환했습니다.";
    console.log(backChange);
    return backChange;
  }
}

const sell_item = insertCoin(coin); // 사용 가능한 음료수 목록 => ....

// selectItem("파워에이드", sell_item); // 해당 제품은 제고가 없습니다.
const select = selectItem("미에로화이바", sell_item); // ...가 나왔습니다. ...
returnMoney(select);


const sellingItem = insertCoin(900);
selectItem(sellingItem);
// returnMoney();
