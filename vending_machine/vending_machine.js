/* 
  1. 음료목록을 객체로 담아둔다 { 콜라: 1000, 사이다: 1000, 포도주스: 700, ....}
  2. 코인을 인자로 넣을 시 insertCoin() 함수에 사용가능한 음료 목록을 출력한다.
  3. selectItem()함수에 2초 이후 선택품목이 있다면 선택품목이 나왔다고 출력
  4. returnMoney()함수에서 잔돈이 있다면, 사용가능한 음료수와 함께 출력한다. 없다면 사용가능한 음료수가 없다고 출력.
*/
/*
 * 추가사항: 
 * 안내 및 경고문을 객체로 별도로 만들어 출력하도록 하기
 * 
 */
var coin = 1000;
var fallCoin = "1000";

var noticeWord = {
  "emptyDrink": "현재 판매하는 물건이 없습니다.",
  "emptyCoin": "동전을 넣어주세요.",
  "balanceCoin": "잔액이 부족합니다.",
  "chooseDrink": "상품을 선택 하였습니다.",
  "backMoney": "해당 잔액이 남았습니다."
}; 

var drinkItem = [
  {
    "item": "콜라",
    "price": 1000,
    "재고": 35
  },
  {
    "item": "사이다",
    "price": 1000,
    "재고": 132
  },
  {
    "item": "포도주스",
    "price": 700,
    "재고": 5
  },
  {
    "item": "딸기우유",
    "price": 1000,
    "재고": 25
  },
  {
    "item": "미에로화이바",
    "price": 900,
    "재고": 44
  },
  {
    "item": "물",
    "price": 250,
    "재고": 44
  },
  {
    "item": "파워에이드",
    "price": 1300,
    "재고": "재고없음"
  }
];

// 코인을 넣었을 시 객체에 있는 음료값과 비교 구매가능 유무를 출력
  // yes) 객체에 있는 음료 값과 비교해 구매가능한 음료 메세지 출력
  // no) 객체에 음료 값과 비교해 잔액 부족 메세지 출력
// 위에 기능을 사용하면 selectItem() 함수로 넘기기
function insertCoin(coin) {
  let sellItem = [];
  let noneItem = "";
  for(let i = 0; i < drinkItem.length; i++){
    if(drinkItem[i].price <= coin){  
      sellItem.push(drinkItem[i].item + "("+ drinkItem[i].재고 + ")");
    } else {
      noneItem = " " + drinkItem[i].item + "(" + drinkItem[i].재고 + ")";
    }
  }
  console.log("사용가능한 음료수 목록 =>" +  sellItem + noneItem);
}

function selectItem(coin) {
  // 사용가능한 음료중 무엇을 선택할지 안내문 출력
  // 선택한 물품이 있으면 코인-해당물품 가격을 계산한다.
  // returnMoney()로 계산된 가격을 전달
}

function returnMoney(coin) {
  // 나머지 값이 있는가 없는가?
  // yes) 나머지 가격을 보여주고 반환
  // no) 나머지 값이 없음을 보여줌
}

function vendingMachine(coin){
  if(typeof coin === "number"){
    insertCoin(coin);
    selectItem(coin);
    returnMoney(coin);
  } else {
    console.log("동전을 넣으셔야 합니다.");
  }

}

vendingMachine(coin);