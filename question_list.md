## 비트연산자 보수이해하기
#### 보수란? 
컴퓨터의 최소 저장공간비트단위는 0과 1로 이뤄져 있다. 컴퓨터에서 음수를 표현하기란 쉽지 않았는데 그래서 생긴것이 1의 보수에 의한 표현이다.
```
 4: 0000 0100
-4: 1111 1011
```
음수의 경우 위 예시처럼 8비트를 사용하면 음수값과 구별이 안 되기 때문에 실제로 사용하는 것은 7비트만을 사용하게 되고 </br>
이때 숫자 값으로 사용되지 않는 맨 앞비트를 부호로 표현하게 되는데. 이를 `사인비트`라고 한다.

그런데 1의 보수를 사용하다 보면 0이 2개가 생기게 되는 치명적인 문제가 발생하게 된다.
```
+0 : 0000 0000
-0 : 1111 1111
```
0은 매우 중요한 숫자이므로 이러한 문제가 발생이 되면 안되기 때문에 `2의 보수`를 만들게 되었다. </br>
2의 보수는 1의 보수의 +1 이다. 위에서 아래로 2의 보수를 계산하자면 다음과 같다.
```
0000 0001 
1111 1110 
---------
1111 1111 // 0(x) -1(o) 
```
다른 예(응용해본 예)
```
0000 1010 // 양의 10의 값(1의 보수)
1111 0101 // 1의 보수를 반대로 전환
---------
1111 1010 // 1을 더한다. 0이 나올때까지
---------
1111 0101 // -10 
``` 
> 궁금증: 2의 보수는 1의 보수인 양의 수를 반대로 전환한뒤 1을 더하고(0이 없을때까지 오른쪽에서 왼쪽으로 1씩) 나온 값이 `음의 2의 보수`인가?

#### 10을 2진표현으로 변경하려면 어떤 순서로 계산해야 하는지 설명하기.
- 설명
  - 10을 2로 나누고 나온 몫을 저장 하고  나머지(0 혹은 1)를 결과 값 배열에 저장 한다.
  - 2로 나눈 저장된 몫을 다시 0이 될 때까지 나누고 나온 나머지 값을 이전에 저장한 배열값 앞에 저장한다.
  - 나눈 몫이 0이 될 때 배열에 저장된 나머지 배열의 값을 보여준다.
```
  2 / 10 -- 0
  2 / 05 -- 1
  2 / 02 -- 0
  2 / 01 -- 1
  2 / 00
```

참고자료 </br>
[http://sessionk.tistory.com/126](http://sessionk.tistory.com/126) </br>
[http://egloos.zum.com/shue177/v/335162](http://egloos.zum.com/shue177/v/335162)

## hoisting 에 대해서 설명하기
변수나 함수가 어디서 선언되든지 해당 스코프 최상단에 위치되어 동일 스코프 어디서든 참조할 수 있는 것을 말한다.</br> 
호이스팅시 선언은 되지만 할당은 되지 않으며 참조도 불가능하다.

## !! 은 무엇을 의미하는가? 어떻게 활용할 수 있을까?
`!`의 경우 boolean 타입의 부정을 의미한다 
```
!true = false, !false = true
```
그렇지만 `!!`의 경우 부정 of 부정을 나타낸다. 
```
!!true = true, !!false = false
```
- 활용법 </br>
  솔직히 생각이 나지 않는다... 
  무언가 원하는 정의의 값을 강조해서 얻고 싶을 때 *(난! 순수한 값을 정말정말 원해!)* </br> 
  그런 조건을 세우고 싶을 때 쓸 수 있지... 않을까..????(그래도.. 모르겠다..)  

## 3개이상의 switch 문을 어떻게 3항연산자로 대체할 수 있을까? 코드로 예시를 들라.
- switch의 경우
```
switch(a) {
  case 1: return 1;
  case 2: return 2;
  case 3: return 3;
  default: return 0;
}
```
- 3항 연산자
```
function test(a) {
  a = a === 1 ? 1 : a === 2 ? 2 : a === 3 ? 3 : 0;
  console.log(a);
}
test(1); // 1
test(2); // 2
test(3); // 3
test(0); // 0

```

## ==와 ===의 차이는 정확히 무엇인가?
데이터 문법(type별)을 확인하는 방법에서 차이가 있다 `===`가 더 엄격하게 판단한다.
  - `==` 경우 
  > 데이터 피연산자가 다르면 같게 변환해 준다. 
  ```
  3 == '3' // true
  1 == '1' // true
  ```
  - `===` 경우
  > 데이터 피연산자가 다르면 변환 없이 엄격한 일치(strictly equal)를 확인한다.
  ```
  3 === '3' // false
  1 === '1' // false
  ``` 

## const value = a || b; 코드의 의미는 무엇인가?
a와 b의 값 중에 true인 값을 변수 value에 담는다.[a가 true면 a를 value에 b가 true면 b를 value에 담는다.]

## eval 은 무엇인가?
> string을 합쳐 반환하는 함수이다. 
- `eval()`를 사용시 문제점이 있는데 그 문제점은 다음과 같다고 한다.
  - eval 코드에 명시된 모든 변수는 어휘 범위를 오염시킬 수 있다. 글로벌 변수를 생성하고 범위 지정 모델을 오염시킨다.
  - 코드를 디버깅 하기 어렵다 </br> 
  > (어떻게 왜 어려워 지는지는 찾아봐도 이해되지 않아서 솔직히 잘모르겠다... 추측으로 문자열이 합쳐지면서 컴파일할 때 문자가 뒤죽박죽 되어 알수없는 코드로 해석되어서...? 라는 생각이다.)
  - 코드가 느려진다. 자바 스크립트 컴파일러는 코드를 실행하기 전에 처음에 컴파일을 실행 하지만 eval의 경우에는 실행 시간 안에서만 컴파일되어 실행된다.
  - 보안에 문제가 있다. 
  > 문자열로 eval ()을 실행하면 웹 페이지 / 확장 프로그램의 권한으로 사용자 컴퓨터에서 악성 코드가 실행될 수 있고, </br>
  > 더 중요한 것은 제 3 자 코드가 eval ()이 호출 된 범위를 볼 수 있기 때문에 유사한 함수가 영향을 받지 않는 방식으로 가능한 공격을 할 수 있다.

- eval()을 대신 사용 할 때 보완 할 방법.
  - new Function()으로 감싸서 사용한다. 
  - eval() 함수를 즉시 실행 함수로 감싸서 사용한다.
  - 그냥 JSON.parse를 사용한다... (사용법은 아직 모르겠다.. 차근차근 배워가야겠다..)

## 변수값을 출력할때 null, undefined, is not defined으로 출력되는 차이점은 무엇인가?
> 변수값이 선언되거나 할당될 때의 차이점을 각각 가지고 있다.
  - `null`은 그 값 자체가 리터럴 값이다. 선언되어 존재는 하지만 그 안에 값이 없음을 의미하며 undifined는 할당이 가능하지만 `null`은 할당할 수 없다 또한 null은 `객체` 타입이다..
  - `undifined`는 변수가 선언되었지만 그 안에 값이 할당되지 않고 있음을 말한다.
  - `is not defined`는 변수가 선언 조차 되지 않았음을 말한다.

MDN 참조 </br> 
[https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/null](https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/null) </br>
[https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefine](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/undefined1)

## add(10)(2) //12 가 되도록 구현해보기
```
function add(a){
  return function(b){
    return a+b;
  }
}
```

## 함수의 인자갯수와 파라미터가 일치하지 않으면 어떤일이 생기는가 설명하기
  - 인자 갯수가 많으면
  > 인자갯수가 많아도 arguments에 들어간다. </br>
  > 별도로 에러가 나오지도 않아서 원치 않을시 불필요한 해당 값이 들어와 메모리 낭비가 될 요인이 있다고 생각이 든다.. 
  ```
  function name(params1, params2) {
    console.log(params1, params2, arguments);
  }
  name("what", "is", "this?!"); 
  // 출력값: what is { '0': 'what', '1': 'is', '2': 'this?!' }
  ```

  - 인자 갯수가 적으면
  > 매개변수 설정된 개수(3개)와 다르게 인자의 개수(2개)가 적으면 undifined로 들어온다.
  ```
  function name2(params1, params2, params3) {
    console.log(params1, params2, params3, arguments);
  }
  name2("action1", "action2");
  // 출력값: action1 action2 undefined { '0': 'action1', '1': 'action3' }

  ```

## 함수의 반환값이 없을때 어떻게 되는가?
> `undifined`가 출력된다.
```
function test(params) {
  var result = [];
  result = params+params;
  // return result; // return을 넣었다면 params+params의 값이 반환되어 할당 되겠지만
}

console.log(test(2)); // 'undifined'가 출력된다 반환되지 않아서
```

## 익명함수는 무엇인가?
> 이름없는 함수를 말한다.
> 선언적 함수는 `function name()`에 예시처럼 함수이름에 `name`을 넣지만, </br>
> 익명함수는 이름이 없는 상태로 `var name = function ()` 처럼 된다. </br>
> 익명 함수의 경우 한 줄, 한 줄 실행되면서 익명 함수가 정의된 부분을 만날 때 정의된다. </br>
