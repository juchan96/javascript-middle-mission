/* 
- itemList: 전체 물품 데이터 객체 (item: 물품명, price: 물품가격, stock: 물품수량)
- noticeWord: 안내 문구 객체

## 함수 기능
- searchItems 함수 (투입금액) [insertCoin에서 분리]
돈을 넣었을때 그 돈만큼 살수 있는 물건 탐색 / 저장 => 탐색된 데이터 객체 반환

- insertCoin 함수 (투입금액) [분리진행]
숫자형태의 데이터값이 아닐시 안내문 출력(예외처리)

> 반환값: 탐색한 물건들 객체안 []로 전달,

- checkStock 함수 (원하는물품명, 탐색물건의 배열)
구매할 수 있는 목록 중 재고의 유무를 탐색 해주는 기능
> 반환값: 재고가 있는 제품이라면 제품의 가격 / 없다면 재고가 없다는 걸 출력

- returnCoin 함수 (재고있는 물품명, 투입금액)
현재 투입한 돈에서 제고가 있는 구매 할 수 있는 제품의 가격값을 뺀 나머지 값 반환
> 반환값: 나머지 가격, 나머지 금액으로 구매 가능한 제품 목록 출력

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


// 동전확인 
function insertCoin(coin) {
  let checkType = Object.prototype.toString.call(coin);
  let INPUT_NUMBER_ERROR_MSG = "[object Number]";
  if (checkType !== INPUT_NUMBER_ERROR_MSG) return noticeWord.notNumber;

  if (coin < 500) {
    console.log(noticeWord.dontBuyDrink + "\n" + coin + noticeWord.returnCoin);
    return coin;
  }
  let actingMachine = searchItem(coin);

  console.log(noticeWord.usefulDrink + actingMachine.tableArr);
  return actingMachine;
}


// 구매가능 물품 탐색
function searchItem(coin) {
  let sellingItems = {
    productArr: [], // 자판기 내부 활용 배열 데이터 (아이템명 / 가격 / 제고 / 나머지값) 
    tableArr: [], // 출력용 배열 데이터 ( 아이템명 / 가격 )
    insertCoin: []
  };

  // for & in, for & of, filter, forEach, map메서드의 차이점과 실험 해보기
  for (let sell of itemList) {
    if (coin >= sell.price) {
      sellingItems.productArr.push(sell);
      sellingItems.tableArr.push(sell.item + "(" + sell.price + ")");
    }
  }

  sellingItems.insertCoin.push(coin);
  return sellingItems;
}


// 선택된 아이템이 재고가 있는 지 없는지 확인 하는 함수 
function checkStock(productName, sellingItems) {
  let buyItem = [];

  sellingItems.productArr.filter(product => {
      return productName === product.item;
    })
    .forEach(filterProduct => {
      if (filterProduct.stock === "재고없음") {
        console.log(filterProduct.item + noticeWord.noneStock);
      } else {
        let restCoin = sellingItems.insertCoin - filterProduct.price;
        buyItem.push(filterProduct.item, restCoin);
        console.log(filterProduct.item + noticeWord.outputDrink + "현재잔돈 : " + restCoin);
      }
    }
  );
  return buyItem;
}


// 나머지 값을 반환만 해주는 함수
function returnCoin(buyItem, wantReturnCoin) {
  let restCoin = buyItem[1];

  if (restCoin < 500 || wantReturnCoin === "반환") {
    console.log(restCoin + noticeWord.returnCoin);
  } else {
    insertCoin(restCoin);
  }
}

insertCoin(400); // 제품의 구매 금액이 부족합니다. / ...원이 반환 되었습니다
const sellingItem = insertCoin(1500); // 사용가능한 음료수 목록 => ..... 

checkStock("파워에이드", sellingItem); // ... 제품은 제고가 업습니다.
let isRestCoin = checkStock("콜라", sellingItem); // 콜라 상품이 나왔습니다. 현재잔돈 : 500

returnCoin(isRestCoin); // 나머지돈이 구매 불가능: 반환메세지  \ 나머지돈이 구매가능: 사용 가능한 음료수 목록 => 딸기우유(500),물(500)
returnCoin(isRestCoin, "반환"); // ... 원이 반환 되었습니다.