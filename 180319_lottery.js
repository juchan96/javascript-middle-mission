let myLottos = [];

let statisticsLottos = {
    '0' : 0,
    '1' : 0,
    '2' : 0,
    '3' : 0,
    '4' : 0,
    '5' : 0,
    '6' : 0
}

function buyLottos(money){
  while(money >= 1000){
    myLottos.push(createLotto());
    money -= 1000;    
  }
  console.log(`로또 ${myLottos.length}개를 발행했습니다.`)
  for(let aLotto of myLottos){
      console.log(aLotto);
  }
}

function createLotto(){
  let result = [];

  function isIn(searchValue, arr){
    for(let i = 0; i < arr.length; i++){
      if(arr[i] === searchValue) return true;
    }
    return false;
  }
  
  while(result.length !== 6){
    let randomNumber = Math.ceil(Math.random() * 45);
    if(!isIn(randomNumber, result)) result.push(randomNumber);
  }
  return result;
}

function setLuckyNumber(winningNummbers){
  for(let aLotto of myLottos){
    recordScore(checkTwoArrays(aLotto, winningNummbers));
  }
  printStatisticsLottos();
  console.log(`나의 수익률은 ${calculateYield()}% 입니다`);
  initializeEverything();
}

function checkTwoArrays(arr1, arr2){
  //두 배열을 비교해 일치하는 숫자들의 갯수를 리턴
  let result = 0;
  for(let e1 of arr1){
    for(let e2 of arr2){
        if(e1 === e2) result +=1;
    }
  }
  return result;  
}

function recordScore(number){
  statisticsLottos[number] += 1;
}

function printStatisticsLottos(){
  console.log('당첨 통계\n------------');
  console.log('3개 일치(5000원) - ' + statisticsLottos[3] + '개');
  console.log('4개 일치(50000원) - ' + statisticsLottos[4] + '개');
  console.log('5개 일치(1500000원) - ' + statisticsLottos[5] + '개');
  console.log('6개 일치(2000000000원) - ' + statisticsLottos[6] + '개');
}

function calculateYield(){
  //수익률 계산
  let spend = myLottos.length * 1000;
  let income = 0;
  income += statisticsLottos[3] * 5000;
  income += statisticsLottos[4] * 50000;
  income += statisticsLottos[5] * 1500000;
  income += statisticsLottos[6] * 2000000000;
  return Math.floor(income/spend);
}

function initializeEverything(){
  myLottos = [];
  for(let key in statisticsLottos){
    statisticsLottos[key] = 0;
  }
}

buyLottos(7800);
setLuckyNumber([1,2,3,4,5,6]);