//당첨번호 랜덤으로 만드는 함수
function SetRandomNum() {
  const LottoNumRange = 45 + 1;
  const luckyLottoNum = [""];
  const lottoLength = 7;

  for(let i =1; i < lottoLength; i++) {
    const randomNum = Math.floor(Math.random() * LottoNumRange);
    luckyLottoNum.push(randomNum);
  }

  luckyLottoNum.shift();
  console.log(luckyLottoNum);
  return luckyLottoNum
}

//당첨 번호와 구매한 로또의 번호를 비교하여, 당첨 통계를 반환.
function setLuckyNumber(winningNum, coin) {
  const lottoA = buyLottos(coin);
  const winningNumSum = getWinningNumSum(lottoA, winningNum);
  const WinningStatistics = showWinStats(winningNumSum, coin);
  return WinningStatistics;
}

//금액을 투입하여 금액 만큼 로또를 구입하는 함수.
function buyLottos(coin) {
  const lottoAmount = coin / 1000;
  const lottoStorage = [];
  for (let i = 0; i < lottoAmount; i++) {
    lottoStorage.push(setLottoNum());
  }
  console.log(lottoStorage)
  return lottoStorage;
}

// 로또 번호를 무작위로 설정해주는 함수.
function setLottoNum() {
  const LottoNumRange = 45 + 1;
  const lottoNum = [""];
  const lottoLength = 7;
  while (lottoNum.length !== lottoLength) {
    const randomNum = Math.floor(Math.random() * LottoNumRange);
    const setLottoNum = lottoNum.includes(randomNum);
    if (!setLottoNum) lottoNum.push(randomNum);
  }

  lottoNum.shift();
  return lottoNum
}

//몇 개가 당첨되었는지, 그 개수를 반환해주는 함수.
function getWinningNumSum(lottoA, winningNum) {
  let winningNumSum = [];
  let arr = [];
  const lottoLength = 6;
  for (let lottoNum in lottoA) {
    for (let i = 0; i < lottoLength; i++) {
      if (winningNum.includes(lottoA[lottoNum][i])) {
        arr.push(lottoA[lottoNum][i]);
      }
    }

    winningNumSum.push(arr.length);
    arr = [];
  }
  console.log(winningNumSum)
  return winningNumSum;
}

//setLuckyNumber의 반환값을 인자로 받아, 당첨통계를 반환하는 함수.
function showWinStats(winningNumSum, coin) {
  const count = showMatchNum(winningNumSum);
  let profit = 0;
  let returnRate = 0;

  profit = count[3] * 5000 + count[4] * 50000 + count[5] * 150000 + count[6] * 2000000000;
  returnRate = (profit - coin) / coin * 100;
  let message = `
    3개 일치 (5,000원)- ${count[3]}개
    4개 일치 (50,000원)- ${count[4]}개
    5개 일치 (150,000원)- ${count[5]}개
    6개 일치 (2,000,000,000원)- ${count[6]}개
    나의 총 수익은 ${profit}원 입니다.
    나의 수익률은 ${returnRate}%입니다.`

  return message;
}

//몇 개 일치하는지 계산하여, 일치하는 개수를 객체로 반환해주는 함수.
function showMatchNum(winningNumSum) {
  const count = { "3": 0, "4": 0, "5": 0, "6": 0 };
  for (let matchNum in count) {
    winningNumSum.forEach((current) => {
      if (String(current) === matchNum) {
        count[matchNum]++;
      }
    })
  }

  return count;
}

console.log(setLuckyNumber(SetRandomNum(), 10000));
// console.log(setLuckyNumber([1, 2, 3, 4, 5, 6], 10000));