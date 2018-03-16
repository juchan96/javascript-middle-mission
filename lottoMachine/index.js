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
const accuracyNumber = 4;

class LottoMachine {
  constructor() {
    this.money = 0;
    this.luckyNumber = [];
    this.spendMoney = 0;
  }
  setLuckyNumber() {
    if (arguments.length === 0) {
      return (this.luckyNumber = this.shuffleLottos([...Array(45).keys()].map(x => x + 1)));
    }
    return (this.luckyNumber = [...arguments]);
  }
  insertMoney(money) {
    if (typeof money !== "number") throw new Error("돈을 넣어주세요");
    if (this.luckyNumber.length === 0) throw new Error("Lucky Number 설정해주세요");
    this.money = money;
  }
  printMoney() {
    console.log(`현재 있는 돈은 ${this.money} 입니다`);
  }
  buyLottos(howMany) {
    if (this.money < howMany * 1000) {
      throw newError("받은 돈으로는 그만큼 살 수 없어요 다시 입력해주세요");
    }
    this.money -= howMany * 1000;
    this.spendMoney += howMany * 1000;
    return this.getLottos(howMany);
  }
  returnMoney() {
    console.log(`잔액을 반환합니다. ${this.money}`);
    this.money = 0;
  }
  shuffleLottos(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array.slice(0, 6).sort((a, b) => a - b);
  }
  shuffleLottosOtherway() {
    const numberList = [...Array(45).keys()].map(x => x + 1);
    const lotto = [];
    const randomIdxList = [];
    let isUnique = randomIdx => randomIdxList.every(item => item !== randomIdx);
    while (randomIdxList.length < 6) {
      let randomIdx = Math.floor(Math.random() * 44);
      if (isUnique(randomIdx)) {
        randomIdxList.push(randomIdx);
      }
    }
    // randomIdxList가 idx이므로 이 경우에는 이렇게 적용해도 될 것 같다.
    // const lotto = randomIdxList.sort((a, b) => a - b).map(x => x+1)
    randomIdxList.sort((a, b) => a - b).forEach(item => {
      lotto.push(numberList[item]);
    });
    return lotto;
  }
  getLottos(counts) {
    const publishLottos = [];
    for (let i = 0; i < counts; i++) {
      publishLottos.push(this.shuffleLottosOtherway());
    }
    return this.printLottos(publishLottos);
  }
  printLottos(publishLottos) {
    publishLottos.forEach((item, index) => {
      console.log(`${index + 1} 번 로또를 발행 합니다 ${item}`);
    });
    return this.checkSameNumberPublished(publishLottos);
  }
  checkSameNumbers(lotto, luckyNumber) {
    return lotto.concat(luckyNumber).filter((item, i, ar) => {
      return ar.indexOf(item) !== i;
    });
  }
  checkSameNumberPublished(publishLottos) {
    const sameNumbers = publishLottos.map(lotto => {
      return this.checkSameNumbers(lotto, this.luckyNumber);
    });
    return this.getResultReport(sameNumbers);
  }
  getResultReport(sameNumbers) {
    let winningMoney = 0;
    sameNumbers.map(item => {
      winningMoney += winningPrice[item.length];
      console.log(`일치 한 갯수 ${item.length} 상금은 ${winningPrice[item.length]}원 입니다.`);
    });
    this.money += winningMoney;
    return this.printRate(winningMoney, accuracyNumber);
  }
  printRate(winningMoney, accuracy = accuracyNumber) {
    let rate = (winningMoney / this.spendMoney).toFixed(accuracy) * 100;
    console.log(`나의 수익률은  ${rate} % 입니다`);
  }
}

const lottoMachine = new LottoMachine();
lottoMachine.setLuckyNumber();
lottoMachine.setLuckyNumber(1, 2, 3, 4, 5, 6);
lottoMachine.insertMoney(10000);
lottoMachine.printMoney();
// lottoMachine.buyLottos(4); 돈을 넘는 장수 입력해서 에러!
lottoMachine.buyLottos(10);
lottoMachine.returnMoney();
