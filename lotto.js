/*
  로또 생성기
  로또 1장의 가격은 1000원이다.
  돈을 넣으면 살 수 있는 만큼 로또를 구매할 수 있다. (buyLottos 함수)
  각 로또 번호는 6개다.
*/

const lottos = [];
let winCountCheckArray;
const prizeMoney = {three: 5000, four: 50000, five: 1500000, six: 2000000000};

// Magic Number
const three = 0;
const four = 1;
const five = 2;
const six = 3;

function buyLottos(money) {
  let lottoNum = money / 1000;
  let lotto;

  // 몇개를 발행했습니다
  // 1000으로 나누면 됨
  log("로또 " + lottoNum + "개를 발행했습니다.");

  for (var i=0; i<lottoNum; i++) {
    lotto = createLottosNumbers();
    lottos.push(lotto);
    log(lotto);
  }

  // winCountCheckArray = new Array(0, 0, 0, 0, 0, 0, 0,
  //                               0, 0, 0, 0, 0, 0, 0);

  // 배열 초기화 첫번째 방법
  winCountCheckArray = Array.apply(null, new Array(14)).map(Number.prototype.valueOf, 0);

  // 배열 초기화 두번째 방법
  // winCountCheckArray = new Array(14);
  // for (var i=0; i<winCountCheckArray.length; i++) {
  //     winCountCheckArray[i] = 0;
  // }
}

function createLottosNumbers() {

  let randNum;
  const lotto = [];

  // 인자만큼 반복문 수행
  while (lotto.length !== 6) {

    // 로또 랜덤값 생성
    randNum = Math.floor((Math.random() * 45) + 1);

    // 중복된 값을 제거해야함
    // 일단 indexOf를 사용
    if (lotto.indexOf(randNum) === -1) {
      lotto.push(randNum);
    }
  }

  // 나중에 직접 sort를 구현해볼 것
  lotto.sort(function(a, b) {
    return a > b;
  });

  // 배열에 담긴 6개의 숫자 리턴
  return lotto;
}

function increaseWinNumberCount(num) {

  // 인자로 받아온 숫자를
  // 다른 카운트 배열을 만들어놓고
  // 해당 배열의 index를 똑같이 맞춰서
  // 만약 해당 숫자가 로또 배열에 있다면
  // 카운트 해주는 것임
  // 나중에 출력할 때 

  const lottoNum = lottos.length;
  for (let i=0; i<lottoNum; i++) {
    if (lottos[i].indexOf(num) !== -1) {
      winCountCheckArray[i]++;
    }
  }

}

function setLuckyNumber(array) {
  // 6개의 값을 각각 하나씩 찾아야함
  // 생각이 잘 안남

  // 일단 한개의 데이터(숫자1개~6개까지)를 넘겨줌

  for (let i=0; i<array.length; i++) {
    increaseWinNumberCount(array[i]);
  }

  printWinningStatistics(winCountCheckArray);
}

function printWinningStatistics(array) {
  // 당첨통계 출력
  // switch-case 문을 이용해서
  // 아까 setLuckyNumber 에서 

  let yieldData;
  
  const matchedNumbers = checkWinNubmer(array);

  log(winCountCheckArray);

  log("당첨 통계");
  log("---------");
  log("3개 일치 (5000원) - " + matchedNumbers[three]);
  log("4개 일치 (50000원) - " + matchedNumbers[four]);
  log("5개 일치 (1500000원) - " + matchedNumbers[five]);
  log("6개 일치 (2000000000원) - " + matchedNumbers[six]);

  yieldData = calRateOfReturnToInvestment(matchedNumbers);

  
  // 수익률을 설계할 때 빠트림
  log("나의 수익률은 " + yieldData + "% 입니다.");
  
}

function checkWinNubmer(array) {

  const matchedNumber = [0, 0, 0, 0];

  for (let i=0; i<lottos.length; i++) {
    let index = tempFunction(array[i]);
    if (index === undefined) {
      continue;
    }
    matchedNumber[index]++;
  }

  return matchedNumber;
}

function tempFunction(data) {
  return {
    3 : 0,
    4 : 1,
    5 : 2,
    6 : 3
  }[data];
}

function calRateOfReturnToInvestment(matchedNumbers) {

  const money = lottos.length * 1000;
  const totalPrizeMoney = (matchedNumbers[three] * prizeMoney.three) +
                        (matchedNumbers[four] * prizeMoney.four) +
                        (matchedNumbers[five] * prizeMoney.five) +
                        (matchedNumbers[six] * prizeMoney.six);

  return (((totalPrizeMoney - money) / money) * 100).toFixed(0);
}

function log(data) {
  console.log(data);
}

buyLottos(14000);

setLuckyNumber([1, 2, 3, 4, 5, 6]);
