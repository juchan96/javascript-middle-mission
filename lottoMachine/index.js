// ### 요구사항을 바탕으로 디자인
// 0.  이번 LuckyNumber 를 설정한다.
// 0.1 입력 값이 없으면 럭키 넘버 설정
// 0.2 입력 값이 있으면 해당 값이 1~6 사이인지/ 플러스 넘버인지/
// 0,3 해당 값들을 넣는다.
// 1.  돈을 입력 받는다.
// 1.  돈에 맞게 로또를 생성한다. 로또 한 장 가격은 1000 원이다 ex) 1000 원 1 개 2500 2 개 500 원 반환
// 1.  럭키 넘버랑 몇 개 일치 하는지 체크한다
// 1.  채크 수에 따라서 당첨금을 알려준다.
// 1.  최종 수익률도 계산하여 출력해 준다.
// 1.  당첨금에 해당되는 사항이 있으면 당첨금을 반환하여 준다.
//[...Array(10).keys()].map(x => x++); Array.keys index들을 array로 만들어줌
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
// 넘버 정렬할 때 a,b => a-b;이런식으로 해줘야 하는데 뭘까? 기본이 unicodeOrder String에 맞게 되어 있는데
// ??  ... 1,2,3,4,5

const winningPrice = {
  0: 0,
  1: 0,
  2: 0,
  3: 5000,
  4: 50000,
  5: 1500000,
  6: 200000000,
};

class LottoMachine {
  constructor() {
    this.money = 0;
    this.numberList = [...Array(45).keys()].map(x => x + 1);
    this.luckyNumber = [];
    this.winningMoney = 0;
    this.winningPrice = winningPrice;
    this.spendMoney = 0;
  }
  setLuckyNumber() {
    if (arguments.length === 0) {
      this.luckyNumber = this.suffleLottos();
    }
    this.luckyNumber = [...arguments];
  }
  insertMoney(money) {
    if (typeof money !== "number") throw new Error("돈을 넣어주세요");
    if (this.luckyNumber.length === 0) throw new Error("Lucky Number 설정해주세요");
    this.money = money;
    console.log(`${this.money}원이 입력되었습니다`);
    this.buyLottos();
  }
  buyLottos() {
    let counts = parseInt(this.money / 1000);
    this.spendMoney += counts * 1000;
    this.money -= this.spendMoney;
    this.returnMoney();
    this.makeLottos(counts);
  }
  returnMoney() {
    console.log(`잔액을 반환합니다. ${this.money}`);
    this.money = 0;
  }
  suffleLottos(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array.slice(0, 6).sort((a, b) => a - b);
  }
  makeLottos(counts) {
    const lottos = [];
    for (let i = 0; i < counts; i++) {
      lottos.push(this.suffleLottos(this.numberList));
    }
    this.printLottos(lottos);
    return lottos;
  }
  printLottos(lottos) {
    console.log(`로또 ${lottos.length} 개를 발행했습니다`);
    console.log(lottos);
    this.getResult(lottos);
  }
  countSameNumbers(lotto) {
    return lotto.concat(this.luckyNumber).filter((item, i, ar) => {
      return ar.indexOf(item) !== i;
    });
  }
  getResult(lottos) {
    const sameNumbers = lottos.map(lotto => {
      return this.countSameNumbers(lotto);
    });
    sameNumbers.map(item => {
      let matchNumbers = item.length;
      return this.resultReport(matchNumbers);
    });
    this.printRate();
  }
  resultReport(matchNumbers) {
    this.winningMoney += winningPrice[matchNumbers];
    return console.log(`일치 한 갯수 ${matchNumbers} 상금은 ${winningPrice[matchNumbers]}원 입니다.`);
  }
  printRate() {
    let rate = (this.winningMoney / this.spendMoney).toFixed(2) * 100;
    console.log(`나의 수익률은  ${rate} % 입니다`);
  }
}

const lottoMachine = new LottoMachine();
lottoMachine.setLuckyNumber(1, 2, 3, 4, 5, 6);
lottoMachine.insertMoney(2500);
