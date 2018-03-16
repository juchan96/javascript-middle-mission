let vendingMachine = {
  money : 0,
  drinks : [
    {name: '콜라', cost: 1500, number: 3},
    {name: '커피', cost: 1000, number: 1},
    {name: '식혜', cost: 900, number: 5}
  ]
}
  
function insertCoin(money){
  vendingMachine['money'] += money;
  printAvailableDrinks();
}
  
function selectItem(drink){
  //배열 메소드 찾아보기
  let selectedDrink;
  for(let i = 0; i < vendingMachine['drinks'].length; i++){
    if(vendingMachine['drinks'][i]['name'] === drink){
        selectedDrink = vendingMachine['drinks'][i];
    }
  }
  if(selectedDrink['number'] === '재고없음'){
      console.log('선택하신 음료의 재고가 없습니다');
  }else{//재고가 있는 걸 선택했을 시
    for(let i = 0; i < vendingMachine['drinks'].length; i++){
      if(vendingMachine['drinks'][i]['name'] === drink){
        vendingMachine['drinks'][i]['number'] -= 1; //재고 감소
        vendingMachine['money'] -= vendingMachine['drinks'][i]['cost'] //돈 감소
        //재고가 0이 됐을 경우
        if(vendingMachine['drinks'][i]['number'] === 0){
            vendingMachine['drinks'][i]['cost'] = '재고없음';//cost가 재고없음이 됨을 주의!
        }
      }
    }
   console.log(`${drink}가 나왔습니다`);
  }
  printAvailableDrinks();
}
  
function returnMoney(){
  console.log(`잔돈 ${vendingMachine['money']}원이 나왔습니다`);
  vendingMachine['money'] = 0;
}

function printAvailableDrinks(){
  let result = [];
  for(let i = 0; i < vendingMachine['drinks'].length; i++){
    if(vendingMachine['drinks'][i]['number'] <= vendingMachine['money']){
        let nameDrink = vendingMachine['drinks'][i]['name'];
        let numberDrink = vendingMachine['drinks'][i]['cost'];
        result.push(`${nameDrink}(${numberDrink})`);
    }
  }
  console.log(result.join());
}

insertCoin(1500);
selectItem("커피");
returnMoney();