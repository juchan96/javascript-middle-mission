// pick을 모아서 하나의 픽스에 담아둔다.
// 픽스:[[],[],[],,,]
// 픽스와 당첨번호를 인자로 받는 함수를 만들어서,
// 그 함수에서는 이중배열을 처리할 수 있게 반복문을 구현한다.
// 반복을 하면서 당첨번호와 일치하는 번호가 있는지 확인한다
// 일치하면 일치하는 갯수를 추가한다.

let INIT = {
  picks: [],
  result: [],
  lotto: []
}

let MSG = {
  request: "구입금액을 1000 원 단위로 입력해 주세요: ",
  success: "개를 구매했습니다.",
  error: "금액은 1000원 단위로 입력해야 합니다. 다시 입력해 주세요.",
  requestNum: "지난 주 당첨번호를 입력해 주세요: "
}


for (let i = 1; i <= 45; i++) {
  INIT.lotto.push(i);
}


const READLINE = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});


const purchaseTickets = (money) => {
  READLINE.question(MSG.request, (cash) => {
    let reg = /^\d+000$/
    let tickets = cash / 1000;

    if (reg.test(cash)) {
      console.log(tickets + MSG.success);
      for (var i = 0; i < tickets; i++) {
        INIT.picks.push(insertNum());
      }
      console.log(INIT.picks);
      checkResult(cash);
    } else {
      console.log(MSG.error);
      purchaseTickets();
    }
  });
}


const insertNum = () => {
  let temp;
  let random;
  for (let i = 0; i < INIT.lotto.length; i++) {
    random = Math.floor(Math.random() * 45);
    temp = INIT.lotto[i];
    INIT.lotto[i] = INIT.lotto[random];
    INIT.lotto[random] = temp;
  }
  let pick = INIT.lotto.slice(0, 6).sort(ascSorting);
  return pick;
}


const checkResult = (money) => {
  READLINE.question(MSG.requestNum, (lottoNum) => {
    let lottoArray = lottoNum.split(',') || lottoNum.split(', ');
    lottoArray.forEach(elem => {
      INIT.result.push(Number(elem));
    });
    compareResult(money)
    READLINE.close();
  });
}


let prizeData = {
  0: 0,
  1: 0,
  2: 0,
  3: 5000,
  4: 50000,
  5: 1500000,
  6: 200000000
}


const compareResult = (money) => {
  let arr = [];
  let prizes = [];
  let result = {};
  let prizeResult = {};
  let totalPrize = 0;

  INIT.result.map(element => {
    INIT.picks.forEach(elem => {
      if (elem.indexOf(element) !== -1) {
        arr.push(elem);
        arr.sort(ascSorting)
      }
    });
  });

  arr.forEach(elem => {
    let idx = elem;
    result[idx] = result[idx] === undefined ? 1 : result[idx] += 1;
  });

  for (let val in result) {
    prizes.push(result[val]);
  }

  prizes.forEach(elem => {
    totalPrize += prizeData[elem];
    let idx = elem;
    prizeResult[idx] = prizeResult[idx] === undefined ? 1 : prizeResult[idx] += 1;
  });

  for (var key in prizeResult) {
    console.log(key + "개 일치: " + prizeResult[key] + "개");
  }
  console.log("나의 수익률은 ", (((totalPrize / money) * 100) - 100).toFixed(0) + "% 입니다.");
}


const ascSorting = (a, b) => {
  return a - b;
}


purchaseTickets();