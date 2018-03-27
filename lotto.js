// 로또 생성기

// 1. 사고싶은 만큼 돈 넣기
// 2. 한 개에 6개의 번호가 적혀진 로또를 구입한만큼 발행하고 출력
// 3. 6개의 수를 임의로 입력해서 내가 구입한 로또들과 비교
// 4. 비교해서 일치한 개수를 3개부터 6개까지 각각 출력하고 수익률도 계산해서 출력

// 구매한 로또를 배열로 받아주는 객체
let myLottos = [];

// 맞춘 개수별 담청금액 객체
const PRIZE_MONEY = {
  THREE: 5000,
  FOUR: 50000,
  FIVE: 1500000,
  SIX: 2000000000
};

let myTotalPrize = 0; // 총 수익
let myInvest = 0; //총 투자액

// 로또를 넣은 돈만큼 구매
function buyLottos(money) {
  const PRICE = 1000;
  let number = Math.floor(money / PRICE);
  myInvest += number * 1000;
  for (var i = 0; i < number; i++) {
    myLottos.push(publishNumber());
  }
  console.log(`로또 ${number}개를 발행했습니다`);
  console.log(myLottos);
  console.log();
}

// 로또 자동 생성기
function publishNumber(num = 6) {
  let lottoArray = [];
  for (let i = 0; i < num; i++) {
    lottoArray.push(Math.floor(Math.random() * 45) + 1);
  }
  return lottoArray;
}

// 임의로 여섯 개 숫자의 배열을 넣고 실행하면 배열값과 내가 산 로또들과 비교해서 당첨을 결정한다
let setLuckyNumber = array => {
  let countArr = {
    3: 0,
    4: 0,
    5: 0,
    6: 0
  };
  let len = myLottos.length;
  // 숫자를 비교하여 맞춘 개수대로 선언한 변수에 저장
  for (var i = 0; i < len; i++) {
    let found = myLottos[i].filter(function (v) {
      return array.indexOf(v) !== -1;
    })
    if (found.length > 2) countArr[found.length] += 1;
  }
  // 나의 총 당첨금액을 저장
  myTotalPrize += countArr[3] * PRIZE_MONEY.THREE + countArr[4] * PRIZE_MONEY.FOUR +
    countArr[5] * PRIZE_MONEY.FIVE + countArr[6] * PRIZE_MONEY.SIX;
  printResult(countArr[3], countArr[4], countArr[5], countArr[6]);
}

// 수익률을 계산
function calculateEarningRate(totalPrizeMoney, investMoney) {
  let result = (totalPrizeMoney / investMoney) * 100;
  return result;
}

// 당첨통계를 출력
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

buyLottos(10000);
buyLottos(10000);
setLuckyNumber([1, 4, 40, 3, 10, 6]);