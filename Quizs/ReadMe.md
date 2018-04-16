### 다음 질문에 대한 대답을 markdown 으로 정리해서 PR

> 질문리스트

1.비트연산자 보수이해하기

비트 연산자 ... 보수

비트 연산자 and , or, xor, not 시프트가 있으며
and 는 다 1 일 때 1 아니면 0
or 은 하나라도 1 이면 1 아니면 0
xor 은 다를 떄 1 아니면 0
not 은 반대 값 반환시프트는 왼쪽 오른쪽으로 이동

보수는음수를 표현하기 위한 수 ? 더 큰 이진수에서 빼서 얻은 수( or 반전 +1) 가 보수 대부분의 산술 연산에서 음수처럼 취급

1.10 을 2 진표현으로 변경하려면 어떤 순서로 계산해야 하는지 설명하기.

Quiz 로 했었는데 다시 정리하면

수학 시간 때 2 로 계속 나누며 나머지를 정리했을 때 처음 나온 나머지부터 2^0 , 2^1 자리수를 결정한다.
그러므로 10 진수 숫자를 2 로 나눈 나머지를 앞으로 넣는다(최종적으로 첫번쨰 나온 값이 마지막으로 갈 수 있도록)
몫을 2 로 나눈 나머지를 앞으로 넣는다 ... 이 과정을 몫이 0 이 될 때까지 반복한다.
다시 정리하면

* 10 진법 숫자를 2 로 나눈다 몫을 다시 2 로 나눈다. 몫이 0 이 될 때까지 반복한다.
* 2 로 나눈 나머지를 순차적으로 앞에서 부터 저장한다.

  1.hoisting 에 대해서 설명하기

호이스팅이란

->호이스팅이란 자바스크립트에서 끌어올려지는 것을 의미하는데 변수 선언 문 함수 선언 문들이 할당과 동시에 끌어 올려진다.
함수 선언 변수 선언
example var a = 5;
function b(){
console.log('호이스팅');  
}
var c = function(){
console.log('호이스팅');  
}
////
var a;
function b(){
console.log('호이스팅)
}
var c;
먼저 끌어 올려짐 !!!

1.!! 은 무엇을 의미하는가? 어떻게 활용할 수 있을까?

-> 참 거짓 판별할 때 주로 사용된다 !!를 거치면 모두 불린 값으로 true or false 로 변환된다.

1.3 개이상의 switch 문을 어떻게 3 항연산자로 대체할 수 있을까? 코드로 예시를 들라.

```
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
        return example * 30
    }
}

function test3(example = 2) {
    return example === 1 ? example * 10 : example === 2 ? example * 20 : example * 30
}
```

ex) 3 =='3' 은 true 가 반환된다.
javascript 에서는 형까지 체크 하는 것이 === 이다 ===로 체크해야 완전히 같기 때문에 ===을 많이 쓴다.

1.const value = a || b; 코드의 의미는 무엇인가?

or 연산을 하기 때문에 앞의 값이 투르이면 앞의 값을 넣어주고 아니면 b 를 넣어준다.

1.eval 은 무엇인가?

eval???
`eval(string)`

JavaScript 표현식, 문장(statement), 연속적인 문장들을 나타내는 문자열이다. 표현식은 존재하는 객체들의 프로퍼티들과 변수들을 포함할 수 있다.

-> 문자열 안에서도 변수 동적으로 실행 가능 !

1.변수값을 출력할때 null, undefined, is not defined 으로 출력되는 차이점은 무엇인가?

null 은 존재 자체가 없을 떄자바스크립트에서는 따로 지정하지 않는 한 출력 되는 일은 없다고 봐도 무관기존에서는 할당되고 값이 없을 때 undefined
정의가 안 되어 있을 때는 (할당도 안 되어 있을 때 범위 내에서) is not defined 로 출력된다.

1.Function.prototype.bind 에 대해서 설명하기

함수에서 this binding 을 해주는 메소드 call, apply, bind 가 있는데모두 메소드를 쓰는데 this 는 얘야 이런 식으로 할당해서 다른 데에 있는 메소드를 가져와서 쓸 수 있게 해주는 유용한 메소드들이다.
call (thisArgs, arg1, arg2 ...)
apply (thisArgs, [argsArray])
bind (thisArgs, arg1, arg2 ...)
call 과 apply 의 차이는 인자를 하나씩 받느냐 배열로 받느냐의 차이고
call 과 apply 는 즉시 호출 / 실행이 되고
bind 는 묵어주기만 하고(새로운 함수 생성 ) 실행을 다시 했을 떄 실행 된다 주로 컬백에서 자주 쓰인다 .

1.this 가 가리키는 건 언제 결정되는가?

함수가 실행될 때 !

1.call 과 apply 의 차이점은?

arguments 를 하나씩 받느냐 배열러 받는냐의 차이

1.add(10)(2) //12 가 되도록 구현해보기

```
var add = function(a){
    var sum = function(b){
        return a+b;
    }
    return sum;
}
```

> 즉시 실행함수

감싸져서 바로 실행하는 함수로만 알고 있는데 다시 공부할 것 ! (function sayhello(){

})();
아이디어 즉시 실행함수?

1.함수의 인자갯수와 파라미터가 일치하지 않으면 어떤일이 생기는가 설명하기 +함수의 반환값이 없을때 어떻게 되는가?

에러처리를 하지 않으면 매개변수의 값들은 undefined 로 들어가서 실행이 된다.
반환 값이 없으면 반환값이 없는 채로 실행문을 다 돌면 종료한다.

1.익명함수는 무엇인가?

익명함수는 말 그대로 이름 없는 함수로써 네이밍을 거쳐서 공간을 두고 할당을 하지 않고 메모리 낭비 없이 바로 실행할 때 주로 쓰는 함수이다.
function(){

}
(function(){

})();
즉시 실행할 때나 arrow 를 통해서 바로 실행하는 경우 주로 쓴다.
