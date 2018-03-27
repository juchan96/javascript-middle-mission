  // 자판기 애플리케이션

  // 음료수 목록 객체
  let beverageData = {
    '콜라': {
      price: 1000,
      stock: 10
    },
    '사이다': {
      price: 1000,
      stock: 8
    },
    '포도쥬스': {
      price: 700,
      stock: 7
    },
    '딸기우유': {
      price: 500,
      stock: 4
    },
    '미에로화이바': {
      price: 900,
      stock: 10
    },
    '물': {
      price: 500,
      stock: 21
    },
    '파워에이드': {
      price: 1200,
      stock: 0
    },
  }
  // 투입된 돈을 누적하는 변수
  let accumCoin = 0;

  // 메세지 객체
  let message = {
    returnSoldout: function () {
      return '사용가능한 음료수 없음'
    },
    returnShortOfMoney: function () {
      return '금액이 모자랍니다'
    },
    returnNoStock: function (item) {
      return `${item}는 재고가 없습니다`
    },
    returnChange: function (change) {
      return `잔돈 ${change}이 반환됐습니다`
    },
    returnSelectedItem: function (item, accumCoin) {
      return `${item}가 나왔습니다  현재잔돈 : ${accumCoin},  ${getBuyableItem(accumCoin)}`;
    },
    returnGetBuyableItem: function (itemArray) {
      return `사용가능한 음료수 목록 => ${itemArray.join(', ')}`;
    }
  };

  // 돈을 넣으면 accumCoin에 돈이 누적되고 accumCoin으로 살 수 있는 음료 종류 반환하는 함수
  let insertCoin = function (coin) {
    accumCoin += coin;
    let result = getBuyableItem(accumCoin);
    return result;
  };

  // 투입된 돈으로 살 수 있는 품목을 리턴하는 함수
  function getBuyableItem(coin) {
    if (coin < 500) return message.returnSoldout();
    let itemArray = [];
    for (key in beverageData) {
      let item;
      beverageData[key].stock > 0 ? item = `${key}(${beverageData[key].price})` :
        item = `${key}(재고없음)`;
      if (coin >= beverageData[key].price) {
        itemArray.push(item);
      }
    }
    let result = message.returnGetBuyableItem(itemArray);
    return result;
  }

  // 음료를 고르는 함수
  function selectedItem(item) {
    if (beverageData[item].stock <= 0) return message.returnNoStock(item);
    if (beverageData[item].price > accumCoin) return message.returnShortOfMoney();
    accumCoin -= beverageData[item].price;
    let result = message.returnSelectedItem(item, accumCoin);
    return result;
  }

  // 잔돈을 반환하는 함수
  function returnMoney() {
    let change = accumCoin;
    accumCoin = 0;
    let result = message.returnChange(change);
    return result;
  }

  console.log(insertCoin(2000));
  console.log(selectedItem('콜라'));
  console.log(selectedItem('포도쥬스'));
  console.log(insertCoin(1000));
  console.log(returnMoney());
  console.log(insertCoin(600));
  console.log(selectedItem('파워에이드'));
  console.log(returnMoney());
  console.log(insertCoin(200));