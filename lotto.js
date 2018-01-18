// pick을 모아서 하나의 픽스에 담아둔다.
// 픽스:[[],[],[],,,]
// 픽스와 당첨번호를 인자로 받는 함수를 만들어서,
// 그 함수에서는 이중배열을 처리할 수 있게 반복문을 구현한다.
// 반복을 하면서 당첨번호와 일치하는 번호가 있는지 확인한다
// 일치하면 일치하는 갯수를 추가한다.

let INIT_OBJECTS = {
  PRIZEMONEY: 0,
  PICKS: [],
  RESULT: [],
  LOTTO: []
}

for (let i = 1; i <= 45; i++) {
  INIT_OBJECTS.LOTTO.push(i);
}


const READLINE = require('readline').createInterface({
  input: process.stdin,
  output: process.stdout
});



const purchaseTickets = (money) => {
  READLINE.question('구입금액을 1000원 단위로 입력해 주세요: ', (cash) => {
    let reg = /^\d{0,9}000$/
    let tickets = cash / 1000;
    const thousands = (num) => {
      return num;
    }
    if (reg.test(cash)) {
      console.log(tickets + "개를 구매했습니다.");
      for (var i = 0; i < tickets; i++) {
        INIT_OBJECTS.PICKS.push(insertNum());
      }
      console.log(INIT_OBJECTS.PICKS);
      checkResult(cash);
    } else {
      console.log("다시 입력해 주세요.");
      purchaseTickets();
    }
  });
}


const insertNum = () => {
  let temp;
  let random;
  for (let i = 0; i < INIT_OBJECTS.LOTTO.length; i++) {
    random = Math.floor(Math.random() * 45);
    temp = INIT_OBJECTS.LOTTO[i];
    INIT_OBJECTS.LOTTO[i] = INIT_OBJECTS.LOTTO[random];
    INIT_OBJECTS.LOTTO[random] = temp;
  }
  let pick = INIT_OBJECTS.LOTTO.slice(0, 6).sort(ascSorting);
  return pick;
}


const checkResult = (money) => {
  READLINE.question('지난 주 당첨번호를 입력해 주세요: ', (lottoNum) => {
    let lottoArray = lottoNum.split(',') || lottoNum.split(', ');
    for (var i = 0; i < lottoArray.length; i++) {
      INIT_OBJECTS.RESULT.push(Number(lottoArray[i]));
    }
    compareResult(money)
    READLINE.close();
  });
}


const compareResult = (money) => {
  let arr = [];
  let result = {};
  let threeCount = 0;
  let fourCount = 0;
  let fiveCount = 0;
  let sixCount = 0;
  for (let i = 0; i < INIT_OBJECTS.RESULT.length; i++) {
    for (let j = 0; j < INIT_OBJECTS.PICKS.length; j++) {
      if (INIT_OBJECTS.PICKS[j].indexOf(INIT_OBJECTS.RESULT[i]) !== -1) {
        arr.push(j);
        arr.sort(ascSorting)
      }
    }
  }

  for (let i = 0; i < arr.length; i++) {
    let idx = arr[i];
    result[idx] = result[idx] === undefined ? 1 : result[idx] += 1;
  }


  for (let val in result) {
    if (result[val] === 3) {
      threeCount++;
      INIT_OBJECTS.PRIZEMONEY += 5000;
    } else if (result[val] === 4) {
      fourCount++;
      INIT_OBJECTS.PRIZEMONEY += 50000;
    } else if (result[val] === 5) {
      fiveCount++;
      INIT_OBJECTS.PRIZEMONEY += 1500000;
    } else if (result[val] === 6) {
      sixCount++;
      INIT_OBJECTS.PRIZEMONEY += 2000000000;
    }
  }


  console.log("당첨 통계");
  console.log("---------")
  console.log("3개 일치 (5000원) : " + threeCount + "개");
  console.log("4개 일치 (50000원) : " + fourCount + "개");
  console.log("5개 일치 (1500000원) : " + fiveCount + "개");
  console.log("6개 일치 (2000000000원) : " + sixCount + "개");

  console.log("나의 수익률은 ", (((INIT_OBJECTS.PRIZEMONEY / money) * 100) - 100).toFixed(0) + "% 입니다.");
}



const ascSorting = (a, b) => {
  return a - b;
}


purchaseTickets();