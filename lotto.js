// 로또 생성기

// 1. 원하는 개수만큼 돈 넣기
// 2. 한 개에 6개의 번호가 적혀진 로또를 구입한 개수만큼 발행하고 출력
// 3. 6개의 수를 임의로 입력해서 내가 구입한 로또들과 비교
// 4. 비교해서 일치한 개수를 3개부터 6개까지 출력하고 수익률도 계산해서 출력

let obj = {};

const PRIZE_MONEY = {
  THREE: 5000,
  FOUR: 50000,
  FIVE: 1500000,
  SIX: 2000000000
};
let myTotalPrize = 0;
let myInvest = 0;

function buyLottos(money) {
  const PRICE = 1000;
  let number = Math.floor(money / PRICE);
  myInvest = number * 1000;
  let lottoArray = [];
  for (var i = 0; i < number; i++) {
    lottoArray.push(publishNumber());
  }
  console.log(`로또 ${number}개를 발행했습니다`);
  obj.myLottos = lottoArray;
  for (var i = 0; i < number; i++) {
    console.log(lottoArray[i]);
  }
}

function publishNumber() {
  let lottoArray = [];
  for (let i = 0; i < 6; i++) {
    lottoArray.push(Math.floor(Math.random() * 45) + 1);
  }
  return lottoArray;
}

let setLuckyNumber = array => {
  let foundThree = 0,
    foundFour = 0,
    foundFive = 0,
    foundSix = 0;
  let len = obj.myLottos.length;
  for (var i = 0; i < len; i++) {
    let found = obj.myLottos[i].filter(function (v) {
      return array.indexOf(v) !== -1;
    })
    switch (found.length) {
      case 3:
        foundThree++;
        break;
      case 4:
        foundFour++;
        break;
      case 5:
        foundFive++;
        break;
      case 6:
        foundSix++;
        break;
    }
  }
  let total = foundThree * PRIZE_MONEY.THREE + foundFour * PRIZE_MONEY.FOUR +
    foundFive * PRIZE_MONEY.FIVE + foundSix * PRIZE_MONEY.SIX;
  myTotalPrize = total;
  printResult(foundThree, foundFour, foundFive, foundSix);
}

function calculateEarningRate(totalPrizeMoney, investMoney) {
  console.log(totalPrizeMoney, investMoney);
  let result = (totalPrizeMoney / investMoney) * 100;
  return result;
}

function printResult(three, four, five, six) {
  let myEarningRate = calculateEarningRate(myTotalPrize, myInvest);
  console.log(`당첨 통계
  ---------
  3개 일치 (5,000원) - ${three}개
  4개 일치 (50,000원) - ${four}개
  5개 일치 (1,500,000원 - ${five}개
  6개 일치 (2,000,000,000원) - ${six}개
  나의 수익률은 ${myEarningRate}%입니다`);
}
buyLottos(6000000);

setLuckyNumber([1, 4, 52, 3, 10, 6]);