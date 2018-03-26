# 학습키워드
### 비트연산자와 보수
보수표현
* 컴퓨터에서는 음수를 어떻게 표현할까? 부호비트법(signed magnitude)과 2의 보수법(two complement)
* 보수란? 보충해주는 수
* 각 진법마다 같은수의 보수와 같은수 -1의 보수가 있다

   10진수에서 8의 10의 보수는 2, 8의 9의 보수는 1
* 2진수를 사용하는 컴퓨터에서는 2의보수와 1의보수가 존재
* 10진수에서 10의 보수가 자리올림을 해주는 것 처럼 2진수에서 2의 보수도 같은 역할을 한다.

   2진수 1001의 2의 보수는 0111(1의 보수는 0110)
* 컴퓨터에선 0이 두 개(-0 +0)나 존재하는 부호비트법보다 2의 보수법이 잘 쓰임
* 2진수에서 2의 보수는 두 수의 합을 0으로 만드므로(정확히는 최상위 비트가 올려진 0) 음수 표현을 위해 2의 보수가 잘 쓰인다

   9의 2진수 0000 1001의 2의 보수는 1111 0111  
   0000 1001 + 1111 0111 = 1 0000 0000(캐리아웃된 값은 무시)  
   즉, 1111 0111은 -9로 표현될 수 있다

* 2의 보수를 쉽게 구하려면 반전시킨 값(1의 보수) +1을 하면 된다

   0000 1001의 1의 보수 = 1111 0110  
   1111 0110 + 1 = 1111 0111(0000 1001의 보수)

* [참고자료](http://www.ecogwiki.com/2%EC%9D%98_%EB%B3%B4%EC%88%98%EB%B2%95%EC%9C%BC%EB%A1%9C_%EC%9D%8C%EC%88%98_%ED%91%9C%ED%98%84%ED%95%98%EA%B8%B0)

비트연산자
* & : 비트단위 AND연산

   10001 & 11000 = 10000

* | : 비트단위 OR연산

   10001 | 11000 = 11001

* ^ : XOR연산(다르면 1)

   10001 ^ 11000 = 01001

* ~ : NOT연산

   ~10001 = 01110

* a << b : 비트단위 a를 좌측으로 b만큼 이동(a * 2**b)

   9 << 2 = 1001 << 2 = 100100 = 36(9 * 2**2)

* a >> b : 비트단위 a를 우측으로 b만큼 이동 **(가장좌측값이 자동으로 채워짐)**

* a >>> b : 우측으로 b만큼 이동(0으로 채워짐)

### hoisting
* hoist : (밧줄이나 장비를 이용해) 끌어올리다

호이스팅이란 모든 선언문을 위로 끌어올려주는 자바스크립트의 특징 중 하나이다.

호이스팅은 코드상 아직 선언되지 않은 변수를 사용 가능하게 한다

```
x = 5; // 코드 실행단계 상 아직 선언되지 않았지만 사용 가능하다.
console.log(x) // 5
var x; // 호이스팅 된다
```
호이스팅 시 할당된 값은 호이스팅 되지 않는다는 점을 주의하자.

따라서 함수표현식으로 정의된 함수는 함수선언식과 다르게 호이스팅해서 쓸 수 없다.
```
f1(); // 호이스팅가능
f2(); // 에러

function f1(){
    console.log('호이스팅가능');
}

let f2 = function(){
    console.log('호이스팅불가');
}
```

### !!의 사용
자바스크립트에서 모든 값들은 true 혹은 false의 값을 가진다

* false, null, undefined, 0, -0, NaN, ''(empty string)은 기본적으로 false의 값을 가진다(falsy value)

* 나머지는 truthy value

* 예외적으로 '0'은 비교값에 따라 boolean값이 달라짐(하단 참조)

```
''        ==   '0'           // false
0         ==   ''            // true
0         ==   '0'           // true
false     ==   'false'       // false
false     ==   '0'           // true
false     ==   undefined     // false
false     ==   null          // false
null      ==   undefined     // true
" \t\r\n" ==   0             // true
NaN   ===  NaN     //false
!!NaN === !!NaN    //true
```

!(not operator)를 붙이면 어느값이던 boolean값으로 변환된다.  
하지만 기존의 boolean 속성과 반대대는 값은 가지게 된다.  
따라서 boolean으로 변환하면서 기존의 Truthy 혹은 Falsy속성을 그대로 가져오고 싶다면 !!을 사용한다.

### 3개 이상의 switch문을 어떻게 3항 연산자로 대체할까?
```
function f(a){
    switch(a){
        case 1: return 'a';
        case 2: return 'b';
        case 3: return 'c';
        default: return 'd';
    }
}

function f2(a){
  let result = a === 1? 'a' : a === 2? 'b': a === 3? 'c' : 'd';
  return result;
}
```

### ==와 ===의 차이점
자바스크립트는 auto type conversion기능을 제공한다.

```
console.log(8 * null)
// → 0
console.log("5" - 1)
// → 4
console.log("5" + 1)
// → 51(string)
console.log("5" * 2)
// → 10
console.log("five" * 2)
// → NaN
console.log(false == 0)
// → true
```
위처럼 잘못된 타입이 들어왔을 때 타입강제변환(type coercion)을 시켜 연산을 처리하도록 한다.

따라서 == 연산자는 type을 적당히 변환해 equal연산을 한다.
```
1         ==    2            // false
''        ==   '0'           // false
0         ==   ''            // true
0         ==   '0'           // true
false     ==   'false'       // false
false     ==   '0'           // true
false     ==   undefined     // false
false     ==   null          // false
null      ==   undefined     // true
" \t\r\n" ==   0             // true
NaN == NaN         //false
NaN   ===  NaN     //false
!!NaN === !!NaN    //true
```
만약 type까지 정확히 체크하고 싶다면 === 연산자를 사용하자(***NaN 연산에 주의하자***)

### const value = a || b 의 의미는?
변수에 값을 할당할 때 비교연산자 || 를 사용할 수 있다.
```
const v1 = 1 || 2;
// v1 = 1
const v2 = undefined || 2;
// v2 = 2
```
이때 a의 값이 Truthy value 라면 a를 할당하고 Falsy value라면 b의 값을 할당한다.

* 대표적인 Falsy value : false, null, undefined, 0, -0, NaN, ''(empty string)

이를 이용하여 default 값을 넣어줄 수 있다.

### eval은 무엇일까?
eval()은 스트링으로 표현된 코드를 계산해주는 함수이다.

```
console.log(eval('2 + 2'));
// expected output: 4

console.log(eval(new String('2 + 2')));
// expected output: 2 + 2

console.log(eval('2 + 2') === eval('4'));
// expected output: true
```

eval()함수 사용을 지양하자

1. 다른 코드에 안좋은 영향을 준다
2. JS엔진대신 JS인터프리터를 호출하기 때문에 느리다
3. eval()대신 Function()함수를 쓰자

### 출력시 null과 undefined와 is not defined의 차이점

null : 값이 없다는 것을 나타내는 할당이 가능한 값이다
```
var TestVar = null;
alert(TestVar); //shows null
alert(typeof TestVar); //shows object
```
undefined : 선언이 됐지만 할당이 되지 않을 값을 호출했을때 나타난다  
not defined : 선언조차 되지 않은 값을 호출했을 때의 에러이다
```
let a;
console.log(a);
// undefined
console.log(b);
// ReferenceError : b is not defined
```
* 참고 : null과 undefined의 비교
```
null === undefined // false
null == undefined // true
```
### Function.prototype.bind란?

(모든 함수는 Function객체이므로 bind메소드를 사용할 수 있다.)  
bind메소드는 해당되는 함수와 똑같은 body와 scope를 가진 함수를 리턴한다.  
대신 인자로 들어온 객체에 바인드 되어 this로 바인딩 된 객체를 불러올 수 있다.
```
function f() {
  return this.a;
}

var g = f.bind({a: 'azerty'});
console.log(g()); // azerty

var h = g.bind({a: 'yoo'}); // bind only works once!
console.log(h()); // azerty

var o = {a: 37, f: f, g: g, h: h};
console.log(o.f(),o.f(), o.g(), o.h()); // 37,37, azerty, azerty
```

### this가 가리키는건 언제 결정되는가?
this가 호출 된 시점의 객체를 가리킨다(실행타이밍)
```
this.x = 9;    // this는 window 객체를 가리킴
var module = {
  x: 81,
  getX: function() { return this.x; }
};

module.getX(); //this는 module 객체를 가리킴
// returns 81

var retrieveX = module.getX;
retrieveX();  //this는 window 객체를 가리킴
// returns 9
```
### call과 apply의 차이점은?
두 함수 모두 함수(메소드)를 실행시키는 함수이다.
```
function f(){
    console.log('wow');
}
f.call(); // print wow
f.apply(); // print wow
```
call과 apply를 이용해 context를 이동시킬 수 있다.
```
var obj = {a: 'Custom'};

// This property is set on the global object
var a = 'Global';

function whatsThis() {
  return this.a;  // The value of this is dependent on how the function is called
}

whatsThis();          // 'Global'
whatsThis.call(obj);  // 'Custom'
whatsThis.apply(obj); // 'Custom'
```
apply와 call의 차이점은 두번째 인자로 다른 것을 받는다는 점이다.

* apply는 배열을 받는다  
* call은 인자의 리스트를 받는다.
```
Math.max.apply(null,[1,2,3]); //3
Math.max.call(null,1,2,3); //3
```


**A for array, C for comma**

### add(10)(2) // 12가 되도록 구현하라
```
function add(a){
  return function(b){
      return a + b;
  }
}
console.log(add(10)(2)); //shows 12
```

### 함수의 인자갯수와 파라미터가 일치하지 않으면 어떤일이 일어나는가?
파라미터보다 인자갯수가 많아도 에러가 나지 않는다.  
초과된 인자를 arguments로 불러올 수 있다.
```
function f(a,b){
    console.log(arguments[2]);
}

f(1, 'gg', 100);
// 100
```

파라미터보다 인자갯수가 적으면 undefined를 넣어준다.
```
function f(a,b){
    console.log(a, b);
}

f(1);
// 1 undefined
```

### 함수의 반환값이 없을 때 어떻게 되는가?
undefined가 출력된다
```
function f(){}
console.log(f());
// undefined
```
### 익명함수(Anonymous function)는 무엇인가?
함수리터럴이라고도 하며 식별자(identifier, 사용자가 지어주는 고유한 이름)에 바인딩되지 않는 함수이다. 즉, 이름을 갖지 않는다.

주로, 고차함수(higher-order function, 함수를 인자로 받거나 함수를 리턴하는 함수)의 1. 인자로 쓰이거나 2. 리턴값에 쓰인다

리터럴 : 소스코드에서 고정된 값을 나타내는 표기법 <-> variable, constant  
불변하는 값이기 때문에 객체도 리터럴이 될 수 있다(객체리터럴 object literal)  
인스턴스는 리터럴이 될 수 없다.
* 문자열도 작은의미의 객체리터럴
```
let a = 1; // 1 is literal
let b = 'cat' // 'cat' is literal
``` 