/* 
- itemList: 전체 물품 데이터 객체 (item: 물품명, price: 물품가격, stock: 물품수량)
- noticeWord: 안내 문구 객체

## 함수 기능
- insertCoin 함수 (투입금액)
돈을 넣었을때 그 돈만큼 살수 있는 물건 탐색 / 저장
숫자형태의 데이터값이 아닐시 안내문 출력(예외처리)

> 반환값: 탐색한 물건들 객체안 []로 전달,

- selectItem 함수 (원하는물품명, 탐색물건의 배열)
구매할 수 있는 목록 중 재고의 유무를 탐색 해주는 기능
> 반환값: 재고가 있는 제품이라면 제품의 가격 / 없다면 재고가 없다는 걸 출력

- returnMoney 함수 (재고있는 물품명, 투입금액)
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


function insertCoin(coin) {
  const checkType = Object.prototype.toString.call(coin);
  let INPUT_NUMBER_ERROR_MSG = "[object Number]";
  if (checkType !== INPUT_NUMBER_ERROR_MSG) return noticeWord.notNumber;

  if (coin < 500) {
    console.log(noticeWord.dontBuyDrink + "\n" + coin + noticeWord.returnCoin);
    return coin;
  }

  let productArr = []; // 자판기 내부 활용 배열 데이터 (아이템명 / 가격 / 제고 / 나머지값) 
  let tableArr = []; // 출력용 배열 데이터 ( 아이템명 / 가격 )

  for (sell in itemList) {
    let product = itemList[sell].item + "$" + itemList[sell].price + "$" + itemList[sell].stock;
    let restCoin = coin - itemList[sell].price;
    
    if (coin >= itemList[sell].price) {
      tableArr.push(itemList[sell].item + "(" + itemList[sell].price + ")");
      productArr.push(product + "$" + restCoin + "$" + coin);
    }
  }
  console.log(noticeWord.usefulDrink + tableArr);
  return productArr;
}
// testData1
insertCoin(400); // 제품의 구매 금액이 부족합니다. / ...원이 반환 되었습니다
insertCoin(1600); // 사용가능한 음료수 목록 => ..... / ... 제품은 제고가 업습니다.
