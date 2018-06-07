//당첨 번호와 구매한 로또의 번호를 비교하여, 당첨 통계를 반환.
function setLuckyNumber(winningNum, coin) {
  const lottoA = buyLottos(coin);
  const winningNumSum = getWinningNumSum(lottoA, winningNum);
  const WinningStatistics = showWinStats(winningNumSum, coin);
  return WinningStatistics;
}

//금액을 투입하여 금액 만큼 로또를 구입하는 함수.
function buyLottos(coin) {
  const lottoAmount = coin / 1000
  const lottoStorage = [];
  for (let i = 0; i < lottoAmount; i++) {
    lottoStorage.push(setLottoNum());
  }
  return lottoStorage;
}

// 로또 번호를 무작위로 설정해주는 함수.
function setLottoNum() {
  const lottoNum = [""];
  while (lottoNum.length !== 7) {
    const randomNum = Math.floor(Math.random() * 10 + 1);
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
  for (let lottoNum in lottoA) {
    for (let i = 0; i < 6; i++) {
      if (winningNum.includes(lottoA[lottoNum][i])) {
        arr.push(lottoA[lottoNum][i]);
      }
    }

    winningNumSum.push(arr.length);
    arr = [];
  }

  return winningNumSum;
}

//setLuckyNumber의 반환값을 인자로 받아, 당첨통계를 반환하는 함수.
function showWinStats(winningNumSum, coin) {
  let profit = 0;
  let returnRate = 0;
  let count3 = 0;
  let count4 = 0;
  let count5 = 0;
  let count6 = 0;
  winningNumSum.forEach((current) => {
    if (current === 3) count3++;
    if (current === 4) count4++;
    if (current === 5) count5++;
    if (current === 6) count6++;
  })
  profit = count3 * 5000 + count4 * 50000 + count5 * 150000 + count6 * 2000000000;
  returnRate = (profit / coin) * 100;
  let message =
    "3개 일치 (5,000원)- " + count3 + "개" +
    "\n4개 일치 (50,000원)- " + count4 + "개" +
    "\n5개 일치 (150,000원)- " + count5 + "개" +
    "\n6개 일치 (2,000,000,000원)- " + count6 + "개" +
    "\n나의 총 수익은 " + profit + "원 입니다." +
    "\n나의 수익률은 " + returnRate + "%입니다."
  return message;
}

// console.log(buyLottos(10000));
console.log(setLuckyNumber([1, 2, 3, 4, 5, 6], 10000));
