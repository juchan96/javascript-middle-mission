let vendingMachine = {
  'money' : 0
}

let drinks = {
  콜라 : {cost: 1500, number: 1},
  커피 : {cost: 1000, number: 1},
  식혜 : {cost: 900, number: 5}
}

function insertCoin(money){
  vendingMachine['money'] += money;
  printAvailableDrinks();
}
  
function selectItem(drinkName){
  if(drinks[drinkName]['cost'] > vendingMachine['money']){
    console.log('금액이 부족합니다');
  }else if(drinks[drinkName]['number'] === 0){
    console.log('선택하신 음료의 재고가 없습니다');
  }else{
    drinks[drinkName]['number'] -= 1;
    vendingMachine['money'] -= drinks[drinkName]['cost'];
  console.log(`${drinkName}가 나왔습니다. 현재 잔돈 : ${vendingMachine['money']}`);
  }
  printAvailableDrinks();
}
  
function returnMoney(){
  console.log(`잔돈 ${vendingMachine['money']}원이 나왔습니다`);
  vendingMachine['money'] = 0;
}

function printAvailableDrinks(){
  let result = [];
  Object.keys(drinks).forEach(function(key){
    if(drinks[key]["cost"] <= vendingMachine['money']){
      if(drinks[key]['number'] === 0){
        result.push(key + '(재고없음)');
      }else{
        result.push(key + '(' + drinks[key]['cost'] + ')');
      }
    }
  });
  console.log('사용가능한 음료수 목록 => ' + result.join());
}

insertCoin(1000);
selectItem("커피");
insertCoin(1000);
selectItem("콜라");
returnMoney();