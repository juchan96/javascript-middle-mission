# javascript-middle-mission
- ### 자판기 애플리케이션

  - #### 요구사항

    자판기는 시중에 흔히 볼 수 있는 음료자판기와 동일하다고 보면 된다. 이렇게 동작하도록 코드를 설계하자.

    단, 음료수 목록, 음료수가격, 음료수 갯수는 임의 설정하고, 값을 객체형태로 소스코드에 넣어둔다.

    ```
    > insertCoin(1000);
    > 사용가능한 음료수 목록 =>  콜라(1000), 사이다(1000), 포도쥬스(700), 딸기우유(500), 미에로화이바(900), 물(500), 파워에이드(재고없음)
    > selectItem("미에로화이바")  //만약, 파워에이드를 선택하면 선택할수 없다는 메시지 노출. 
    > 미에로화이바가 나왔습니다.   현재잔돈 : 100원,  사용가능한 음료수 : 없음
    > insertCoin(900);
    > 사용가능한 음료수 목록 =>  콜라(1000), 사이다(1000), 포도쥬스(700), 딸기우유(500), 미에로화이바(900), 물(500), 파워에이드(재고없음)
    > returnMoney();
    > 잔돈 1000원이 반환됐습니다.
    ```

    PR을 보낼때 코드설계한 내용을 꼭 같이 보낸다.

  - #### 설계

    - 함수부터 무엇이 필요할지

      - insertCoin(value) : 돈을 넣는 함수

        - 현재 가지고 있는 돈 추가
        - printAvailableDrinkList() : 메뉴를 출력해주는 함수
          - [x] 재고없음에 대한 예외처리 추가하기

      - selectItem(drinkName) : 음료수를 선택

        - 재고 갯수 계산
        - 현재 잔돈 계산

        - [x] 재고없는 음료를 선택할 경우 예외처리

        - 현재 잔돈을 기준으로 뽑을 수 있는 음료수가 있는지 체크
        - 각 재고에 대한 체크문이 필요할 듯 함

      - returnMoney() : 돈을 반환하는 함수

        - 현재 가지고 있는 돈 출력

  - #### 피드백

    - [Javascript for in 문](http://webclub.tistory.com/243)
      - 객체 `obj`
      - 키를 연산하는 `k`나 `key`
      - 또는 프로퍼티명을 상기시키는 `p`나 `n(=name)` 이란 변수명을 사용
      - 프로퍼티값을 표시할 때는 `obj[k]` 와 같이 대괄호연산을 사용
      - 배열요소를 나열할 때는 `for in`문의 사용을 권장하지 않음
      - **주의할 사항 3가지**
        - **프로퍼티를 열거하는 순서**
          - 배열의 경우는 순서를 의식하는 데이터 타입
          - `for in` 문은 순서를 보장하지 않기 때문에
          - 이 같은 동작방식에 지나치게 의존해서는 안됨
        - **열거할 수 없는 프로퍼티의 존재**
          - 배열 객체에는 `length` 프로퍼티가 존재
          - `for in` 문에서는 열거할 수 없음
          - `length` 프로퍼티는 **열거할 수 없는 속성**의 프로퍼티
        - **프로토타입 상속한 프로퍼티**
          - 프로토타입에서 상속한 프로퍼티도 나열함
    - [for문의 `var in` 형에 대한 분석](http://programmingsummaries.tistory.com/187)
      - IE8의 경우 `for in` 문이 정상적으로 동작하지 않음
      - array 갯수를 정확하게 가져오지 못함
      - IE를 고려하는 경우 **for문의 형태를 지양**하는것이 바람직함
      - `객체`를 돌릴때와 `배열`을 돌릴 때
      - **for in 문에서 출력되는 내용이 다름**

- ### 로또 생성기

  - #### 요구사항

    - 로또 1장의 가격은 1000원이다.
    - 돈을 넣으면 살 수 있는 만큼 로또를 구매할 수 있다. (buyLottos 함수)
    - 각 로또 번호는 6개다.

    ```
    > buyLottos(14000); 
    > 로또 14개를 발행했습니다.
    [8, 21, 23, 41, 42, 43]
    [3, 5, 11, 16, 32, 38]
    [7, 11, 16, 35, 36, 44]
    [1, 8, 11, 31, 41, 42]
    [13, 14, 16, 38, 42, 45]
    [7, 11, 30, 40, 42, 43]
    [2, 13, 22, 32, 38, 45]
    [23, 25, 33, 36, 39, 41]
    [1, 3, 5, 14, 22, 45]
    [5, 9, 38, 41, 43, 44]
    [2, 8, 9, 18, 19, 21]
    [13, 14, 18, 21, 23, 35]
    [17, 21, 29, 37, 42, 45]
    [3, 8, 27, 30, 35, 44]

    > setLuckyNumber([1, 2, 3, 4, 5, 6]);

    > 당첨 통계
    ---------
    3개 일치 (5000원)- 1개
    4개 일치 (50000원)- 0개
    5개 일치 (1500000원)- 0개
    6개 일치 (2000000000원)- 0개
    나의 수익률은 OO%입니다.
    ```

  - #### 설계

    - 클래스 기준

      - buyLottos()

        - [x] 0 을 삭제해야함
          - 1000 으로 나누면 됨 (천단위니까)
        - createLottosNumbers()
      - setLuckyNumber([1, 2, 3, 4, 5, 6]);
        - findWinNumber(num)
        - printWinningStatistics(array) : 
          - matchWinNumber
      - calRateOfReturnToInvestment : 수익률 계산 기능
      - log

- ### 학습키워드(일단 아는대로)

  - **비트연산자 보수이해하기**
    - 10을 2진표현으로 변경하려면 어떤 순서로 계산해야 하는지 설명하기.
      1. 10을 2로 몫이 1이 될 때까지 나눈다
      2. 나눌 때 마다 나머지 값을 적어놓는다
      3. 최근에 나온 나머지 값부터 차례대로 적는다
      4. 2진표현 완성

  - **hoisting 에 대해서 설명하기**

    - 변수가 위로 올라간다 (?)
    - 함수같은 경우 자바스크립트 파서(?)가 미리 훑고 최상단으로 올린다 (?)
    - 함수 안에서 변수를 선언할 경우, 호이스팅이 발생할 수 있으므로
      - 모든 변수는 함수 최상단에 선언한다 (?)

  - **!! 은 무엇을 의미하는가? 어떻게 활용할 수 있을까?**

    - 음.. 이건 모르겠네요

  - **3개이상의 switch 문을 어떻게 3항연산자로 대체할 수 있을까? 코드로 예시를 들라.**

    ```javascript
    switch(data) {
        case 1:
            retrun 1;
        case 2:
        	return 2;
      	case 3:
      		return 3;
    }

    var test = (data === 1) ? 1 : ((data === 2) ? 2 : 3));
    ```

    - 직접 테스트를 해보지는 않았지만, 이정도로 돌아갈 것 같습니다 :)

  - **==와 ===의 차이는 정확히 무엇인가?**

    - `==` 는 타입상관 없이 값만 비교한다 (?)
      - `"111" == 111` - **TRUE**
    - `===` 는 타입과 값을 비교한다 (정확)
      - `"111" === 111` - **FALSE**

  - **const value = a || b; 코드의 의미는 무엇인가?**

    - 음.. a OR b ?
    - a의 값이 있으면 value를 a로 초기화하고
    - a의 값이 없으면 value를 b로 초기화하고 ?

  - **eval 은 무엇인가?**

    - 코드스쿼드 프론트엔드 채널에서 **쓰지말라**는 것을 본 기억 뿐..

  - **변수값을 출력할때 null, undefined, is not defined으로 출력되는 차이점은 무엇인가?**

    - `null` 은 값이 없는 것?
    - `undefined` 는 정의조차 되지 않은 것
    - `is not defined` 는 정의를 할 수 없는 것?

  - **Function.prototype.bind 에 대해서 설명하기**

    - 음.. 모르겠습니다.

  - **this가 가리키는 건 언제 결정되는가?**

    - this가 무엇을 가리키는?.. 가리키는것에 대한 결정?
    - 모르겠습니다 :(

  - **call과 apply의 차이점은?**

    - ..헉 모르겠습니다
    - 부르다, 적용한다 ?? 덜덜

  - **add(10)(2) //12 가 되도록 구현해보기**

    - 인자가 두개가 들어가는 것인가..요 ?

      ```
      function add(a)(b) ????
      ```

      - 처음보는 문법입니다. 검색 후 알아오도록 하겠습니다 !

  - **함수의 인자갯수와 파라미터가 일치하지 않으면 어떤일이 생기는가 설명하기**

    - 아무일도 생기지 않습니다.
    - 코드작성자는 argument 를 이용해서 파라미터를 받을 수 있습니다.

  - **함수의 반환값이 없을때 어떻게 되는가?**

    - 함수동작을 수행하고 끝나겠..죠? 아닌가?
    - 잘 모르겠습니다.

  - **익명함수는 무엇인가?**

    - 네이밍이 없는 함수!

    ```javascript
    function() {
        console.log("Hello Crong!");
    }
    ```

    ​





- ### 학습키워드(검색을 통해보자)

  - **비트연산자 보수이해하기**

    - 10을 2진표현으로 변경하려면 어떤 순서로 계산해야 하는지 설명하기.
      1. 10을 2로 몫이 1이 될 때까지 나눈다
      2. 나눌 때 마다 나머지 값을 적어놓는다
      3. 최근에 나온 나머지 값부터 차례대로 적는다
      4. 2진표현 완성

  - **hoisting 에 대해서 설명하기**

    - ~~변수가 위로 올라간다 (?)~~

    - ~~함수같은 경우 자바스크립트 파서(?)가 미리 훑고 최상단으로 올린다 (?)~~

    - ~~함수 안에서 변수를 선언할 경우, 호이스팅이 발생할 수 있으므로~~

      - ~~모든 변수는 함수 최상단에 선언한다 (?)~~

    - 코드스쿼드 내용

      - 자바스크립트 함수는 실행되기 전에 **함수안에 필요한 변수값들을 미리 다 모아서 선언**한다
      - 함수 안에 있는 **변수들을 모두 끌어올려서 선언**한다고해서, `hoisting`이라고 한다

    - [자바스크립트의 변수범위와 호이스팅](http://chanlee.github.io/2013/12/10/javascript-variable-scope-and-hoisting/)

      - 자바스크립트는 블럭-수준(block-level) 의 범위가 아님

      - **함수-수준(function-level) 의 범위**임

        ```javascript
        var name = "Richard";
        function showName() {
             var name = "Jack"; // 지역 변수; showName()함수에서만 접근가능.
             console.log(name); // Jack
        }
        console.log(name); // Richard : 전역 변수
        ```

        ```javascript
        // bad
        var name = "Richard";
        // 아래의 if문은 name변수에 대한 지역-범위를 생성하지 않습니다.
        if (name) {
             name = "Jack";
             console.log(name); // Jack : 전역 변수
        }
        // name은 여전히 전역변수이며 if문에서 변경되었습니다.
        console.log(name); // Jack

        ```

      - 함수의 외부에서 선언된 모든 변수는 전역 범위(global scope)를 가집니다. 브라우저에서, 전역 컨텍스트(또는 scope)는 window 객체를 가리킵니다.

        ```javascript
        console.log(window.myName); // Richard
        // 또는
        console.log("myName" in window); // true
        console.log("firstName" in window); // true
        ```

      - 아래의 firtName은 둘다 전역 범위입니다. 두번째, firstName은 {} 블럭으로 쌓여있지만, **자바 스크립트는 블럭단위 범위를 지원하지 않는다는 것**을 기억하기 바랍니다.

        ```javascript
        var firstName = "Richard";
        {
             var firstName = "Bob";
        }
        console.log(firstName); // Bob
        ```

      - **자바스크립트 전문가가 되려면, 가급적 전역 범위에 변수를 생성하는것을 피하도록 해야 합니다.**

      - 모든 변수선언은 호이스트 됩니다. 호이스트란, `변수의 정의가 그 범위에 따라 선언과 할당으로 분리되는 것`을 의미합니다. 즉, 변수가 **함수내**에서 정의되었을 경우 **선언이 함수의 최상위**로, **함수 바깥**에서 정의되었을 경우는 **전역 컨텍스트의 최상위로 변경**됩니다.

        ```javascript
        // 호이스팅 되기 전
        function showName() {
             console.log("First Name : " + name);
             var name = "Ford";
             console.log("Last Name : " + name);
        }
        showName();
        // First Name : undefined
        // Last Name : Ford
        // First Name이 undefined인 이유는 지역변수 name이 호이스트 되었기 때문입니다.


        // 호이스팅 된 후
        function showName() {
             var name; // name 변수는 호이스트 되었습니다. 할당은 이후에 발생하기 때문에, 이 시점에 name의 값은 undefined 입니다.
             console.log("First name : " + name); // First Name : undefined
             name = "Ford"; // name에 값이 할당 되었습니다.
             console.log("Last Name : " + name); // Last Name : Ford
        }
        ```

      - 호이스트 되었을때, **함수 선언은 변수선언을 덮어 씁니다.**

        ```javascript
        // 다음 두 변수와 함수는 myName으로 이름이 같습니다.
        var myName; // string
        function myName() {
             console.log("Rich");
        }
        // 함수 선언은 변수명을 덮어 씁니다.
        console.log(typeof myName); // function
        ```

      - 하지만, 변수에 값이 할당될 경우에는 반대로 변수가 함수선언을 덮어 씁니다.

        ```javascript
        var myName = "Richard";
        function myName() {
             console.log("Rich");
        }
        console.log(typeof myName); //string
        ```

      - “strict mode”에서 최초의 선언없이 변수에 값을 할당하려 한다면 오류가 발생합니다. **변수에 값을 할당 하려 할때는 항상 미리 선언하는 습관을 들이는것이 좋습니다.**

  - **!! 은 무엇을 의미하는가? 어떻게 활용할 수 있을까?**

    - ~~음.. 이건 모르겠네요~~

    - 정리하자면 느낌표 두개(!!) 연산자는 **확실한 논리결과**를 가지기 위해 사용합니다.

    - 예를 들어 정의되지 않은 변수 `undefined` 값을 가진 내용의 **논리 연산 시에도 확실한 true / false를 가지도록 하는게 목적**입니다

      ```javascript
      let a = 0;
      console.log(a);   // 0
      console.log(!a);  // true
      console.log(!!a); // false
       
      let b = null;
      console.log(b);   // null
      console.log(!b);  // true
      console.log(!!b); // false
       
      let c = undefined;
      console.log(c);   // undefined
      console.log(!c);  // true
      console.log(!!c); // false


      출처: http://nopanic.tistory.com/5 [당황하지않고_프로그래밍]
      ```

      ```javascript
      !!false === false
      !!true === true
       
      !!0 === false
      !!parseInt("foo") === false // NaN은 false
      !!1 === true
      !!-1 === true  // -1 는 true
       
      !!"" === false // 빈 문자열은 false
      !!"foo" === true  // 일반 문자열은 true
      !!"false" === true  // false라는 문자열도 true
       
      !!window.foo === false // 정의 되지 않은 변수는 false
      !!null === false // null은 false
       
      !!{} === true  // 빈 객체는 true
      !![] === true  // 빈 배열은 true


      출처: http://nopanic.tistory.com/5 [당황하지않고_프로그래밍]
      ```

      - 값이 있는지 없는지 확인할 때 유용하게 사용할 수 있을 것 같습니다.

  - **3개이상의 switch 문을 어떻게 3항연산자로 대체할 수 있을까? 코드로 예시를 들라.**

    ```javascript
    switch(data) {
        case 1:
            retrun 1;
        case 2:
        	return 2;
      	case 3:
      		return 3;
    }

    var test = (data === 1) ? 1 : ((data === 2) ? 2 : 3));
    ```

    - 직접 테스트를 해보지는 않았지만, 이정도로 돌아갈 것 같습니다 :)

  - **==와 ===의 차이는 정확히 무엇인가?**

    - `==` 는 타입상관 없이 값만 비교한다 (?)
      - `"111" == 111` - **TRUE**
      - Equal Operator
    - `===` 는 타입과 값을 비교한다 (정확)
      - `"111" === 111` - **FALSE**
      - Strict Equal Operator

  - **const value = a || b; 코드의 의미는 무엇인가?**

    - 음.. a OR b ?

    - a의 값이 있으면 value를 a로 초기화하고

    - a의 값이 없으면 value를 b로 초기화하고 ?

    - **Logical OR**

      ```javascript
      o1 = true  || true       // t || t returns true
      o2 = false || true       // f || t returns true
      o3 = true  || false      // t || f returns true
      o4 = false || (3 == 4)   // f || f returns false
      o5 = "Cat" || "Dog"      // t || t returns "Cat"
      o6 = false || "Cat"      // f || t returns "Cat"
      o7 = "Cat" || false      // t || f returns "Cat"
      ```

    - [블로그](http://4urdev.tistory.com/13)

      ```javascript
      function documentTitle(theTitle) {
          if (!theTitle) {
              theTitle = "Untitled Document"; 
          } else {
              theTitle = theTitle; 
          } 
      }

      출처: http://4urdev.tistory.com/13 [Simplify]
      ```

      - 보통은 위와 같은 형태로 처리해서, parameter로 넘어온 theTitle 값이 있는지 여부에 따라서 (undefined 역시 체크함), 있으면 그 값을 전역 변수에 넣고, 그렇지 않으면 문자열 "Untitled Document" 를 전역 변수에 넣는다. 실제 별거 아닌 작업이 이렇게 여러 라인을 보여주면서 불필요한 공간을 차지하게 된다. 이를 아래와 같이 처리하면 아주 간단한 방법으로 고급스러운 javascript를 구현할 수 있다.

      ```javascript
      function documentTitle(theTitle) { theTitle = theTitle || "Untitled Document"; }

      출처: http://4urdev.tistory.com/13 [Simplify]
      ```

      - 반대로 `&&` 는 둘다 체크
        - 한쪽이라도 false가 뜨는순간 다음 변수에 대한 판단은 진행하지 않으며
        - 바로 `return false`
        - 꼭 2개뿐만 아니더라도 여러개를 사용할 수 있음 `&&` `&&` `&&`

  - **eval 은 무엇인가?**

    - ~~코드스쿼드 프론트엔드 채널에서 **쓰지말라**는 것을 본 기억 뿐..~~

    - [JavaScript eval](http://programmingsummaries.tistory.com/179)

      - eval 함수를 사용하면 String 형태의 JavaScript 소스 코드를 동적으로 실행할 수 있다.

      - eval(string) 은 **문자열로 넘어온 자바스크립트 구문을 실행**하는데, 호출하는 위치와 방식에 따라 eval의 실행 컨텍스트와 범위(scope)가 달라진다.

      - eval 은 실행 시점의 **함수 범위(scope)에서 실행**되며, eval()의 실행 컨텍스트(this) 또한 실행 시점의 함수의 것과 동일

      - eval을 직접 호출하지 않는 경우, eval은 전역 범위(global scope)에서 실행

        ```javascript
        var foo = 'global_foo';

        function directEval() {
        var foo = 'local_foo';
        return eval('foo');
        }

        function indirectEval() {
        var foo = 'local_foo';
        var f = eval; // 직접 eval을 호출하지 않고 eval의 참조를 호출한다.
        return f('foo');
        }

        directEval(); //--> 'local_foo'
        indirectEval(); //--> 'global_foo'
        ```

      - 최근의 자바스크립트 컴파일러는 성능 향상을 위해 미리 코드를 컴파일하는데, **eval()과 같이 동적으로 실행 범위가 결정되는 코드는 미리 컴파일할 수 없다**

      - 그렇기 때문에, 함수 내에서 실행되는 **eval()이 반드시 함수의 실행 범위를 가져야 하는 것이 아니라면, eval의 참조를 이용해(indirect call) 명시적으로 전역 범위에서 실행되도록 하는 것이 좋다.**

        ```javascript
        (0, eval)(string);

        // 컴마연산자
        var x, y, z;
        z = (x = 1, y = 2, x + y);
        //--> x = 1, y = 2, z = 3
        ```

        - 컴마연산자를 이용
        - 컴마 연산자는, 위와 같이 **표현식을 순서대로 실행**하고 **마지막 표현식의 값 또는 참조를 리턴**한다.
        - 위 코드의 (0, eval)의 경우, 아무 의미 없는 0 이후, eval의 참조를 리턴하기 때문에 **indirect call** 이 된다.

        ````javascript
        var global = function () {
            return this || (0, eval)('this');
        };
        ````

        - 왜 this 를 리턴할 수 있는데 굳이 eval()을 실행하려고 하는지 궁금할 것 같다.
        - 위 코드는 ECMAScript5 환경에서 전역 객체를 가져오기 위한 코드인데,
        - ECMAScript5  환경에서는, **전역 범위에서 this가 undefined를 리턴**하기 때문이다.
        - 위 함수는 먼저 this를 확인하고, 없다면 indirect call로 전역 범위에서 코드를 실행해 객체를 가져온다.

        ```javascript
        (function () {
            'use strict'; // ES5 환경에서 실행한다.
            console.log( this ); //--> undefined
            console.log( eval('this') ); //--> undefined, direct call로 함수 범위에서 실행된다.
            console.log( (0,eval)('this') ); //--> window, indirect call로 전역 범위에서 실행된다.
            console.log( window ); //--> window, 명시적으로 전역 객체를 가져올 수 있다.
        }());
        ```

        - `use strict` 구문은 **함수 범위 내에서만 유효**하다.
        - (0,eval)('this')를 이용해 indirect call로 전역 범위에서 실행하면,
        - 'use strict'가 적용된 ES5 환경에서 벗어나기 때문에 this로 전역 객체에 접근할 수 있다.
        - 약간 벗어난 주제이지만, ES5 환경에서 전역을 가져올 수 있는 방법은,
        - 위의 4번째처럼 전역 객체의 이름(window)을 명시하거나,
        - 함수의 파라미터로 전달하는 방법이 있다.
        - 라이브러리 코드를 보면,
        - **전체 코드를 익명함수**로 감싸고 **전역 변수를 파라미터로 전달하는 패턴**이 많은데,
        - 이런 이유 때문이기도 하다.

        ```javascript
        (function (global) {
          'use strict';
           console.log(this); //--> undefined
           console.log(global); //--> 전역 객체에 접근할 수 있다.
        }(this));
        ```

        - 사실 `eval` 자체가 **보안에 취약한 코드**이기 때문에 아예 사용하지 말라고도 하지만, (심지어 MDN의 eval API에서도)
        - 가끔은 필요한 경우도 있다.
        - 아예 쓰지 않는 것보다는, 개발자가 잘 판단해서 결정할 부분이라 생각한다.

  - **변수값을 출력할때 null, undefined, is not defined으로 출력되는 차이점은 무엇인가?**

    - `null` ~~은 값이 없는 것?~~
      - **변수를 선언**하고
      - `null` 이라는 **빈 값을 할당**한 경우
    - `undefined` ~~는 정의조차 되지 않은 것~~
      - 변수를 선언만 하고 **값을 할당 하지 않음**
      - 즉 자료형이 결정되지 않은 상태
      - undefined 라는 값을 가지는 것이 아님
    - `is not defined` ~~는 정의를 할 수 없는 것?~~
      - 변수를 어디에도 선언하지 않은 것

  - **Function.prototype.bind 에 대해서 설명하기**

    - ~~음.. 모르겠습니다.~~
    - 함수객체는 **실행 시점**에서 **execution context 를 생성**하며 현재의 실행 코드 범위를 뜻하는 `this` **를 할당**하게 된다.
    - 하지만 **this 를 동적으로 할당해야 하는 경우**가 있다.
    - 특히 다양한 객체에서 **동적으로 특정 액션을 할당**하여 사용되는 함수의 경우 `this` **에 할당되는 객체를 예측하기가 힘들다.**
    - 이럴때 `bind` 를 이용하여 **실행 시점에서 context의 this 를 임의로 할당 해 주어 동적인 호출시에도 오류 없이 코드가 동작**하게 할수 있다.

    ```javascript
    if (!Function.prototype.bind) {
        Function.prototype.bind = function() {
            var funcObj = this;
            var original = funcObj;
            var extraArgs = Array.prototype.slice.call(arguments);
            var thisObj = extraArgs.shift();
            var func = function() {
                var thatObj = thisObj;
                return original.apply(thatObj, extraArgs.concat(
                    Array.prototype.slice.call(
                        arguments, extraArgs.length
                    )
                ));
            };
            func.bind = function() {
                var args = Array.prototype.slice.call(arguments);
                return Function.prototype.bind.apply(funcObj, args);
            }
            return func;
        };
    }
    ```

    ---

    ```javascript
    var obj = {
      string: 'zero',
      yell: function() {
        alert(this.string);
      }
    };
    var obj2 = {
      string: 'what?'
    };
    var yell2 = obj.yell.bind(obj2);
    yell2(); // 'what?'
    ```

    - `obj.yell.bind(obj2)` 했더니 yell 함수의 this가 obj2로 바뀌었습니다. 
    - 즉 call이나 apply와 비슷하지만 **호출은 하지 않지 않고 함수만 반환**하는 겁니다.
    -  `call(this, 1, 2, 3)`은 `bind(this)(1, 2, 3)`과 같죠.

  - **call과 apply의 차이점은?**

    - ~~..헉 모르겠습니다~~
    - ~~부르다, 적용한다 ?? 덜덜~~
    - `Function.prototype` 이 소유한 **method** 들이다. 이들은 함수와 메서드가 실행될 때 바인딩할 객체를 지정하여 함수가 실행될때의 context 의 유효범위를 직접 지정하며 this 를 할당 할수 있다.
    - 이들은 호출의 동적인 변화에 따라 각각 다르게 되는데 **정적인 호출**인 경우 `call` 을 **동적인 호출**에서는 `apply`를 사용하게 된다. 
    - 즉, 호출시 **동적인 인자전달**등이 필요할 경우 `apply` 를 **정적으로 고정된 함수를 호출**할 경우 `call` 사용하면 된다.
    - bind() 메소드나 동적 callback 을 구현할때 apply가 사용되는 이유이기도 한다.

    ---

    - 함수를 호출하는 방법으로

      - 함수뒤에 `()` 를 붙이거나
      - `call` , `apply` 하는 방법이 있음

      ```javascript
      var example = function (a, b, c) {
        return a + b + c;
      };
      example(1, 2, 3);
      example.call(null, 1, 2, 3);
      example.apply(null, [1, 2, 3]);
      ```

      - call과 apply가 공통적으로 가진 null 인자의 역할은?
      - `this`를 대체하는 것

      ```javascript
      var obj = {
        string: 'zero',
        yell: function() {
          alert(this.string);
        }
      };
      var obj2 = {
        string: 'what?'
      };
      obj.yell(); // 'zero';
      obj.yell.call(obj2); // 'what?'
      ```

      - 마지막 줄에서 `obj.yell.call(obj2)`로 this가 가리키는 것을 obj에서 obj2로 바꾸었습니다. yell은 obj의 메소드인데도 **zero 대신에 what?이 alert되었습니다.** 
      - 즉 다른 객체의 함수를 자기 것 마냥 사용할 수 있는 겁니다.
      - [실행 컨텍스트 강좌](https://www.zerocho.com/category/Javascript/post/5741d96d094da4986bc950a0)에서 this는 기본적으로 window라고 했었죠.
      - 몇 가지 방법으로 window를 다른 것으로 바꿀 수 있는데요. 
      - call, apply, bind에서 첫 번째 인자로 다른 것을 넣어주는 게 this를 바꾸는 방법 중 하나입니다.
      - 위 메소드들을 쓰는 예로, 함수의 **arguments**를 조작할 때 사용합니다. 

      ```javascript
      function example() {
        console.log(arguments);
      }
      example(1, 'string', true); // [1, 'string', true]
      ```

      - 생긴 건 배열이지만, 배열이 아니라 유사 배열이기 때문에, 배열의 메소드는 쓸 수 없습니다.

      ```javascript
      function example2() {
        console.log(arguments.join());
      }
      example2(1, 'string', true); // Uncaught TypeError: arguments.join is not a function
      ```

      - 에러가 발생하죠? arguments는 모양만 배열이지 실제 배열이 아니라서 배열의 메소드를 쓰면 에러가 발생합니다. 
      - 이 때 바로 call이나 apply가 효력을 발휘합니다.

      ```javascript
      function example3() {
        console.log(Array.prototype.join.call(arguments));
      }
      example3(1, 'string', true); // '1,string,true'
      ```

      - 배열의 프로토타입에 있는 `join` 함수를 빌려 쓰는겁니다. 
      - `this`는 **arguments**를 가리키게 하고요. 
      - `join` 외에도 `slice`, `concat` 등등 모든 메소드를 이 방식으로 사용할 수 있습니다.

  - **add(10)(2) //12 가 되도록 구현해보기**

    - 인자가 두개가 들어가는 것인가..요 ?

      ```
      function add(a)(b) ????
      ```

      - 처음보는 문법입니다. 검색 후 알아오도록 하겠습니다 !
      - 음.. 검색해도 잘 모르겠습니다.
      - 코드실행을 해도, add(...) is not a function 이라는 문구가 뜨네요
      - 조금 더 설명을 해주실 수 있나요?

  - **함수의 인자갯수와 파라미터가 일치하지 않으면 어떤일이 생기는가 설명하기**

    - 아무일도 생기지 않습니다.
    - 코드작성자는 argument 를 이용해서 파라미터를 받을 수 있습니다.
    - argument는 배열이 아닌 것 다시 명확하게 알고가기
    - 배열의 메서드가 적용되지 않음

  - **함수의 반환값이 없을때 어떻게 되는가?**

    - ~~함수동작을 수행하고 끝나겠..죠? 아닌가?~~
    - ~~잘 모르겠습니다.~~
    - 자바스크립트 함수는 **반드시 return값이 존재**하며, 없을때는 **기본 반환값인 'undefined'이 반환**된다.

  - **익명함수는 무엇인가?**

    - 네이밍이 없는 함수!

    ```javascript
    function() {
        console.log("Hello Crong!");
    }
    ```

    ---

    - 함수 선언이 아닌 **함수표현식을 이용하는 방법**이다. 
    - 이는 곧 **람다함수(함수 리터럴을 변수에 할당하는 방식)**와 **즉시실행구문**을 만들어 낼수 있다는 말이다.
    - 즉시실행 구문을 사용하면 javascript 가 유효범위를 선언 할 수 없다고 해도 **강제적으로 private 변수를 만들어 내는 것이 가능**

    ```javascript
    // i 라는 변수는 실행 시점에서만 사용되면 외부에서 접근 할수 없다. 
    (function() {
       var i  = 'hello world' ;

    {)();

    console.log(i)
    > error
    ```

    - 즉 익명함수는 **동적으로 할당되는 유효범위**를 가지기 때문에 **javascript 내에서 강제적인 유효범위 설정을 하는 경우 사용**되게 됩니다.