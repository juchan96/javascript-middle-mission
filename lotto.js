//당첨 번호와 로또를 랜덤으로 생성하는 함수를 담은 객체
const getRandomNum = {
  LottoNumRange : 45 + 1,
  luckyLottoNum : [""],
  lottoNum : [""],
  lottoLength : 7,
  //당첨 번호를 무작위로 설정해주는 함수 
  getLuckyLottoNum() {
    for (let i = 1; i < this.lottoLength; i++) {
      const randomNum = Math.floor(Math.random() * this.LottoNumRange);
      this.luckyLottoNum.push(randomNum);
    }
    this.luckyLottoNum.shift();
    console.log(this.luckyLottoNum)
    return this.luckyLottoNum;
  },
  //구매한 로또의 번호를 무작위로 설정해주는 함수
  getLottoRandomNum() {
    this.lottoNum = [""];
    while (this.lottoNum.length !== this.lottoLength) {
      const randomNum = Math.floor(Math.random() * this.LottoNumRange);
      const setLottoNum = this.lottoNum.includes(randomNum);
      if (!setLottoNum) this.lottoNum.push(randomNum);
    }
    this.lottoNum.shift();
    return this.lottoNum;
  }
}

//당첨 번호와 구매한 로또의 번호를 비교하여, 당첨 통계를 반환.
function setLuckyNumber(winningNum, coin) {
  const lottoPrice = 1000;
  const lottoAmount = coin / lottoPrice;
  const lottoLength = 6;
  const lottoA = buyLottos(coin, lottoAmount);
  const winningNumSum = getWinningNumSum(lottoA, winningNum, lottoLength);
  const WinningStatistics = showWinStats(winningNumSum, coin);
  return WinningStatistics;
}

//금액을 투입하여 금액 만큼 로또를 구입하는 함수.
function buyLottos(coin, lottoAmount) {
  const lottoStorage = [];
  for (let i = 0; i < lottoAmount; i++) {
    lottoStorage.push(getRandomNum.getLottoRandomNum());
  }
  console.log(lottoStorage)
  return lottoStorage;
}

//몇 개가 당첨되었는지, 그 개수를 반환해주는 함수.
function getWinningNumSum(lottoA, winningNum, lottoLength) {
  let winningNumSum = [];
  let arr = [];
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

console.log(setLuckyNumber(getRandomNum.getLuckyLottoNum(), 10000));
// console.log(setLuckyNumber([1, 2, 3, 4, 5, 6], 10000));