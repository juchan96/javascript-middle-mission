// 러닝 자바스크립트 P. 156

// 비트연산자 |,&,^,~ 순서대로  or and Xor ~not
// << 왼쪽 시프트 >> 부호가 따라가는 오른쪽 시프트  >>> 0으로 채우는 오른쪽 시프트

var apple = 1; //0001
var orange = 2; //0010
var banana = 4; //0100

function selectFavoriteFruits(fruits) {
  if ((fruits & apple) != 0) {
    console.log("사과를 좋아합니다");
  }
  if ((fruits & orange) != 0) {
    console.log("오렌지를 좋아합니다");
  }
  if ((fruits & banana) != 0) {
    console.log("바나나를 좋아합니다");
  }
}
//0001 + 0100 = 0101
selectFavoriteFruits(apple | banana);

var add = function(a, b) {
  return a + b;
};
add(10)(2);

function test(example = 1) {
  switch (example) {
    case 1:
      return example * 10;
    case 2:
      return example * 20;
    case 3:
      return example * 30;
  }
}

// 요걸 3항 연산자로 고쳐보면
function test2(example = 2) {
  if (example === 1) {
    return example * 10;
  } else if (example === 2) {
    return example * 20;
  } else {
    return example * 30;
  }
}

function test3(example = 2) {
  return example === 1 ? example * 10 : example === 2 ? example * 20 : example * 30;
}
console.log(test());
console.log(test2());
console.log(test3());
