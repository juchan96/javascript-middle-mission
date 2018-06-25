# 학습키워드 정리



### 비트연산자 보수이해하기

: **비트**(bit, binary digit)는 하나의 비트는 0이나 1의 값을 가질 수 있고, 각각은 참, 거짓 혹은 서로 배타적인 상태를 나타낸다. **비트 연산**(Bitwise operation)은 한 개 혹은 두 개의 [이진수](https://ko.wikipedia.org/wiki/%EC%9D%B4%EC%A7%84%EB%B2%95)에 대해 [비트](https://ko.wikipedia.org/wiki/%EB%B9%84%ED%8A%B8) 단위로 적용되는 연산이다.

: **보수**란 '두 수의 합이 진법의 밑수(N)가 되게 하는 수'를 말한. 즉, 보충을 해주는 수를 의미한다. 이를테면 1에 대한 10의 보수는 9, 4에 대한 15의 보수는 11의 개념이다. 2에 대한 1의 보수는 1이다. 

```
ex) 
	1의 보수는 0은 1로 1은 0으로 변환하는 것입니다.

	따라서 숫자 7의 1의 보수는 7은 2진수로 0111(4비트인경우)입니다.

	이것의 1의 보수는 1000 입니다.

	2의 보수는 1의 보수에 1을 더한것입니다.

	1000 + 1 = 1001 이 되지요.
```


####**그렇다면, 보수를 사용하는 이유는 무엇일까?**

: 그것은 표시하는 수의 개수에 있다.
```
ex)
	0을 표현하는데 1의 보수는 0000, 1111 둘다 0입니다. 2의 보수에는 0000만 0이고요.

	이렇게 된 표시할 수 있는 한 바이트(8비트)당 수의 크기는

	1의 보수인 경우 : -127 ~127 => 총 255개

	2의 보수인 경우 : -128~127 => 총 256개

	2의 보수를 취하므로 인해서 1개의 수를 더 표시할 수 있는 것입니다.

	당연히 2의 보수가 더 효율적이지요.
```


**비트단위 연산자**

![비트단위 연산자](/Users/hwangjuchan/Documents/github/codesquad/javascript-review/javascript-middle-mission/스크린샷 2018-06-21 오후 7.50.35.png)




#### 느낀점

- 비트연산자가 실무에서 어떻게 사용될지는 아직 잘 모르겠다. 
- 비트가 뭔지, 비트연선자가 무엇인지, 연산자의 기능이 무엇인지, 그리고 2진수에 대해서 전보다는 명확히 알게 되었다.

  (출처: [안경잡이개발자](http://ndb796.tistory.com/4), [위키백과](https://ko.wikipedia.org/wiki/%EB%B3%B4%EC%88%98_), [MDN](https://developer.mozilla.org/ko/docs/Web/JavaScript/Guide/Expressions_and_Operators#%EB%B9%84%ED%8A%B8%EB%8B%A8%EC%9C%84_%EC%97%B0%EC%82%B0%EC%9E%90))



####10을 2진표현으로 변경하려면 어떤 순서로 계산해야 하는지 설명하기.
1. 10을 2로 나눈다 // 값: 5, 나머지: 0
2. 5를 2로 나눈다  // 값: 2, 나머지: 1
3. 2를 2로 나눈다 // 값: 1, 나머지: 0
4. 1을 2로 나눈다 // 값: 0, 나머지 1
5. 나머지 값들을 나열하면 --> 1010 (최종 나머지 값부터 나열) 





### hoisting 에 대해서 설명하기

호이스팅(hoisting)이란?

: 호이스팅이란 변수를 선언하고 초기화했을 때 선언 부분이 최상단으로 끌어올려지는 현상을 의미합니다. (초기화 또는 대입 부분은 그대로 남아있습니다) 아래처럼 sayWow처럼 **함수 표현식**이 아니라 **함수 선언식**일 때는 식 자체가 통째로 끌어올려집니다.


```
ex) 변수 선언 호이스팅
	
	console.log(name);
	var name = "solomon";

	// 실행 결과 => undefined
```

```
ex) 함수 선언식 호이스팅
	
	showName();
	
	function showName() {
	  var name = "solomon"
	  console.log(name);
	}
	
	// 실행 결과 => solomon
```


Q-호이스팅은 왜 필요한 것일까? 왜 만들어진 것일까?

- 호이스팅이라는 기능이 왜 있는지 잘 모르겠다. 차라리 오류를 내는 것이 코드를 작성할때, 개발자 입장에서 더 편할 거 같다는 생각이 들었다.
- 함수같은 경우에 호이스팅이 된다고 해도, 어디서나 호출을 해도 오류가 나지 않고 실행이 된다는 장점이 있지만, 가독성이 떨어질 것 같다는 생각이 들었고, 엄청 긴 코드에 경우에는 찾기도 어려울 거 같다는 생각이 들었다.
- let과 const는 유효범위 때문에 호이스팅이 되지 않는다(?). 바뀐 이유는 무엇일까...

**Temporal Dead Zone**(TDZ)는 무엇일까?

: 어휘적 바인딩이 실행되기 전까지 액세스할 수 없는 현상을 `TDZ`라고 한다.



### !! 은 무엇을 의미하는가? 어떻게 활용할 수 있을까? 

논리 NOT연산자는 느낌표(!) 로 표시하며, 데이터 타입에 관계 없이 항상 불리언 값을 반환한다.

- 피연산자가 객체이면 false를 반환한다
- 피연산자가 빈 문자열이면 true를 반환한다
- 피연산자가 비어 있지 않은 문자열이면 false를 반환한다
- 피연산자가 숫자 0이면 true를 반환한다
- 피연산자가 0이 아닌 숫자(infinity)라면 false를 반환한다
- 피연산자가 null이면 true를 반환한다
- 피연산자가 NaN이면 true를 반환한다
- 피연산자가 undefined면 true를 반환한다


```
ex) 
	console.log(!false); //true
			
	console.log(!"blue"); // false

	console.log(!0); // true

	console.log(!""); // true

	console.log(!NaN); // true

	console.log(!12345); // false
```


NOT 연산자를 연달아 두 개 쓰면 **Boolean()** 함수를 쓴 것과 마찬가지 효과가 있다.

```
new Boolean([value])
```

: 첫 번재 전달인자로 전달되는 값은 필요하다면 boolean 값으로 변환된다. 값이 없거나 `0`, `-0`, `null`, `false`, `NaN`, `undefined`, 빈 문자열 ("")이라면 객체는 false로 초기화된다. 문자열 "false"를 비롯한 그 외의 다른 값이라면 객체는 true로 초기화된다.

Boolean 객체의 true와 false 값을 원래 Boolean 값인 true, false와 혼동하지 않길 바란다.

false 값을 가진 Boolean 객체를 비롯한 undefined나 null이 아닌 값을 가진 모든 객체는 조건문에서 true로 간주된다. 예를 들어 다음에서는 조건이 true다.

```
ex)
	console.log(!!"blue"); // true

	console.log(!!0); // false

 	console.log(!!""); // false

	console.log(!!NaN); // false

	console.log(!!12345); // true
```


**Q.** 

- Boolean()을 쓰는 용도와, 이유는 무엇일까? //true인지 false인지 판별하기 위해..?



### 3개이상의 switch 문을 어떻게 3항 연산자로 대체할 수 있을까? 코드로 예시를 들라.

```
let tf = "hi";

typeof tf === "number" ? console.log("type is number")
: typeof tf === "string" ? console.log("type is string")
: typeof tf === "object" ? console.log("type is object")
:                          console.log("else")
```


```
let expr = "hi";

switch (typeof expr) { 
  case "number":
    console.log("type is number");
    break;
    
  case "string":
  console.log("type is string");
    break;
    
  case "object":
    console.log("type is object");
    break;

  default:
    console.log("else");
} 
```



### ==와 ===의 차이는 정확히 무엇인가?

**1) ''=='' 동일 연산자**

- 비교하려는 값에 맞춰 강제 타입변환을 시켜준다. 

- null과 undefined는 동일합니다

  - null == undefined // true

- 동일 여부를 평가할 때는 null과 undefined를 결코 다른 값으로 변환하지 않습니다.

- 피연산자 중 하나가 *NaN(not a number)이라면 동일 연산자는 false를 반환합니다. NaN은 NaN과 같지 않습니다.

  - "NaN" == NaN // false

  - 5 == NaN // false

  - NaN != NaN // true

    *(`NaN`은 다른 NaN 값을 포함하여 다른 어떤 값과 같지 않음(`==`, `!=`, `===` 및 `!==`를 통해)을 비교합니다.)

- 두 피연산자가 모두 객체라면 같은 객체인지 비교합니다. 두 피연산자가 모두 같은 객체를 가리킨다면 동일 연산자는 true를 반환합니다. 그렇지 않다면 false를 반환합니다.

  - false == 0 // true
  - true == 1 // true
  - true == 2 // false
  - undefined == 0 // false

**2) "===" 일치 연산자**

'=='연산자는 타입과 관계없이 값만을 비교하며, '==='연산자는 값과 타입 모두를 비교한다.

```
ex)
	"2" == 2 // true
	"2" === 2 // false
	null === undefined // false
	(null == undefined // true)
```




### const value = a || b; 코드의 의미는 무엇인가?

`a`을 `true`로 변환할 수 있으면 `a`를 반환하고, 그렇지 않으면 `b`를 반환합니다. 따라서 부울 값과 함께 사용할 경우, `a, b 둘 중 하나가` `true`인 경우 `true`를 반환합니다.

 ```
o1 = true  || true       // t || t returns true
o2 = false || true       // f || t returns true
o3 = true  || false      // t || f returns true
o4 = false || (3 == 4)   // f || f returns false
o5 = "Cat" || "Dog"      // t || t returns "Cat"
o6 = false || "Cat"      // f || t returns "Cat"
o7 = "Cat" || false      // t || f returns "Cat"
 ```



### eval() 은 무엇인가?

: 문자를로 기술된 표현식의 결과를 리턴하거나, 구문을 실행한다. 

```
let a = 1;
let b = 2;
eval()
let c = 3;
// eval 함수는 전역객체에 선언된 변수를 기억한다.

eval("let a = 1, b = 2; a + b")
eval() 함수 안에 변수를 선언하면 
```

  

 

### 변수값을 출력할때 null, undefined, is not defined으로 출력되는 차이점은 무엇인가?

null은 선언된 변수안에 null값을 직접 넣어줄 때,

undefined는 변수가 선언 되었지만, 변수안의 값이 없을 때

is not defined는 선언 되지 않은 변수를 호출할때 출력된다. 

 

### add(10)(2) //12 가 되도록 구현해보기

```
function add(a) {
  return ((b) => {return a + b});
}

console.log(add(10)(2));

```



###함수의 인자갯수와 파라미터가 일치하지 않으면 어떤일이 생기는가 설명하기

매개변수에 인자값을 할당하지 않을 때(매개변수 개수 > 인자 개수), 할당되지 않은 매개변수 값에는 undefined가 저장된다.

반대로, 매개변수에 인자값이 초과로 할당 되었을 때(매개변수 개수 < 인자 개수), 주어진 매개변수의 개수 의외의 인자값들은 무시된다.

하지만, 매개변수를 restparameter로 설정하고 값을 주지 않으면 빈배열을 반환한다. 또 매개변수를 restparameter로 설정하면, 인자에 더 많은 값을 설정해줘도 배열로 반환이 된다.

**Q.**

매개변수를 설정하는 기준은 무엇일까?

왜 매개변수를 사용할까?

언제 매개변수를 사용하는 것이 적절한 것일까? => 외부에서 다른 값을 받아올때??

 



### 함수의 반환값이 없을때 어떻게 되는가?

return이 호출되는 시점에서 함수의 실행을 중단하고 return에 할당된 값을 반환한다. 만약에 반환 값이 없을 때, undefined를 반환한다.

**Q.**

반환 없이 함수를 사용하는 경우가 있을까?

 

 ### 익명함수는 무엇인가?

이름이 없는 함수이다. 예를들어

let f = function () {something} 

익명함수를 왜 사용하는가? -> 일회성 함수이기 때문이다. 다시 사용할 목적이 아니라면 이름을 줄 이유가 없음.