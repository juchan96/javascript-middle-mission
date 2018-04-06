// 로또 생성기

// 1. 사고싶은 만큼 돈 넣기
// 2. 한 개에 6개의 번호가 적혀진 로또를 구입한만큼 발행하고 출력
// 3. 6개의 수를 임의로 입력해서 내가 구입한 로또들과 비교
// 4. 비교해서 일치한 개수를 3개부터 6개까지 각각 출력하고 수익률도 계산해서 출력


// 맞춘 개수별 담청금액 객체
const PRIZE_MONEY = {
  1: 100,
  2: 500,
  3: 5000,
  4: 50000,
  5: 1500000,
  6: 2000000000
};


// 로또를 넣은 돈만큼 구매
const buyLottos = money => {
  const PRICE = 1000;
  let number = Math.floor(money / PRICE);
  let myInvest = number * PRICE;
  let myLottos = [...Array(number)].reduce((prev, curr) => (prev.push(publishNumber(6, 45)), prev), []);
  console.log(`로또 ${number}개를 발행했습니다`);
  return {
    myLottos: myLottos,
    myInvest: myInvest
  };
}

// 로또 자동 생성기
const publishNumber = (num = 6, max = 45) => {
  return [...Array(num)].reduce((prev, curr) => (prev.push(Math.floor(Math.random() * max) + 1), prev), []);
}
// 당첨 총 금액 계산 (최소당첨개수 아래는 계산하지 않는다)
let calTotalPrize = (obj, min) => {
  return Object.keys(obj).reduce(((prev, curr, idx) => {
    if (curr >= min) return prev + obj[curr] * PRIZE_MONEY[curr]
    return 0;
  }), 0);
}

// 맞춘 개수대로 선언한 객체에 저장
const savaCorrectedNumber = (computerNumber, myLottos) => {
  let countedNumber = {};
  for (let i = 0, len = myLottos.length; i < len; i++) {
    let compeleted = checkNumber(computerNumber, myLottos[i]);
    countedNumber[compeleted] = countedNumber[compeleted] || 0;
    countedNumber[compeleted] += 1;
  }
  return countedNumber;
};
// 당첨 범위 배열 반환
const prizeRange = (computerNumber, prizeMin) => [...Array(computerNumber.length - prizeMin + 1).keys()].map(v => v + prizeMin);

// 임의로 여섯 개 숫자의 배열을 넣고 실행하면 배열값과 내가 산 로또들과 비교해서 당첨을 결정한다
const setLuckyNumber = (lottos, computerNumber, prizeMin = 3) => {
  let countedNumber = savaCorrectedNumber(computerNumber, lottos.myLottos);
  // 나의 총 당첨금액을 저장
  let totalPrize = calTotalPrize(countedNumber, prizeMin);

  // 당첨결과를 출력
  let prize = prizeRange(computerNumber, prizeMin);
  printResult(countedNumber, prize, lottos.myInvest, totalPrize);
}

// 로또 체크 함수
const checkNumber = (computerNumber, myNum) => {
  return myNum.reduce((ac, cv) => {
    if (computerNumber.indexOf(cv) !== -1) return ac + 1;
    return ac;
  }, 0)

}
// 수익률을 계산
const calculateEarningRate = (totalPrizeMoney, investMoney) => {
  let result = (totalPrizeMoney / investMoney) * 100;
  return result;
}

// 당첨통계를 출력
const printResult = (countedNumber, printNumber = [3, 4, 5, 6], myInvest, totalPrize) => {
  let myEarningRate = calculateEarningRate(totalPrize, myInvest); // 수익률 계산
  let prizeMsg = printNumber.map(v => `${v}개 일치 (${PRIZE_MONEY[v]}원) - ${countedNumber[v]||0}개`);
  console.log(`당첨 통계
-----------------`);
  console.log(prizeMsg.join('\n'));
  console.log(`나의 수익률 : ${myEarningRate}%`);
}
let myLottos = buyLottos(10000);
setLuckyNumber(myLottos, [1, 4, 40, 3, 10, 6], 3);