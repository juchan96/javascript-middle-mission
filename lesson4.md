- 비트연산자 보수이해하기
  비트연산에서 NOT에 해당한다. 연산자: ~
  ~(0000) // 1111
  ~(1111) // 0000

- 10을 2진표현으로 변경하려면 어떤 순서로 계산해야 하는지 설명하기.
  1. 직접 계산

        function decimalToBinary(num) {
            var result = '';
            var remainder;
            var quotient = num;

            while (quotient > 0) {
                remainder = quotient % 2;
                quotient = Math.floor(quotient / 2);

                if (remainder === 1) {
                    result = '1' + result;
                } else {
                    result = '0' + result;
                }
            }

            return result;
        }

  2. Number.toString 활용

        function decimalToBinary(num) {
            return Number(num).toString(2);
        }

- hoisting 에 대해서 설명하기
  리터럴로 할당된 함수가 아닌 선언문 형태로 만들어진 함수는 선언된 위치에 관계없이 사용 가능

- !! 은 무엇을 의미하는가? 어떻게 활용할 수 있을까?
  어떤 표현식이나 값이 조건식에서 true인지 false인지 알 수 있다.

- 3개이상의 switch 문을 어떻게 3항연산자로 대체할 수 있을까? 코드로 예시를 들라.

        switch (test) {
            case 'A':
                caseA();
                break;

            case 'B':
                caseB();
                break;

            case 'C':
                caseC();
                break;
        }

        (test === 'A') ? caseA() : ((test === 'B') ? caseB() : caseC());


- ==와 ===의 차이는 정확히 무엇인가?
  ==는 두 피연산자의 값만 비교하는 연산자이고 ===은 두 피연산자의 값과 타입까지 일치하는지 비교한다.

- const value = a || b; 코드의 의미는 무엇인가?
  a 값 또는 표현식의 조건이 true면 value 변수에 a를 할당하고 false면 b를 할당한다.

- eval 은 무엇인가?
  Douglas Crockford에 의하면 eval() is evil...
  eval함수는 파라미터를 string 형태의 javascript code를 입력받아 실행한다.

          eval('var a = 10');
          eval('console.log(a)'); // 10

  eval을 사용하면 코드의 유지보수가 어려워질 가능성이 매우 높아지고, 실행할 코드를 사전에 알 수 있다면(런타임에 결정되는 게 아니라면) eval()을 쓸 필요도 없다. 코드가 런타임에 동적으로 생성된다고 하더라도 대개 eval()을 대체할 더 나은 방법이 존재한다.



출처: http://webclub.tistory.com/512 [Web Club]

- 변수값을 출력할때 null, undefined, is not defined으로 출력되는 차이점은 무엇인가?
  null은 변수에 값이 비어있는 것을 명식적으로 표현한 것이고 undefined는 해당 변수가 선언된 적이 없는 것을 나타낸다.

- Function.prototype.bind 에 대해서 설명하기
  호출하는 함수에서 사용할 this를 명시적으로 할당(binding)한 새로운 함수를 반환한다.

        var obj1 = {
            a: 1,
            b: 2
        };

        var obj2 = {
            a: 3,
            b: 4
        };

        function add(obj) {
            return obj.a + obj.b;
        }

        var addByObj1 = add.bind(obj1);
        var addByObj2 = add.bind(obj2);

        console.log(addByObj1()); // 3
        console.log(addByObj2()); // 7

- this가 가리키는 건 언제 결정되는가?
  코드가 실행되는 시점의 context에 따라 결정된다.

- call과 apply의 차이점은?
  두 메서드 모두 호출하는 함수에서 사용할 this를 명시적으로 할당하여 해당 함수를 호출한다.
  call은 호출하는 함수에서 인자로 사용할 파라미터를 호출하는 함수의 인자와 동일하게 입력받아 전달하고
  apply는 호출하는 함수에서 사용할 인자를 array에 담아서 호출하는 함수로 전달한다.

        var obj1 = {
            a: 1,
            b: 2
        };

        var obj2 = {
            a: 3,
            b: 4
        };

        function addProperty(obj, property, value) {
            obj[property] = value;
        }

        add.call(obj1, 'c', 3);
        add.apply(obj2, ['c', 5]);

- add(10)(2) //12 가 되도록 구현해보기

        var add = function (prevVal) {
            return function (val) {
                return prevVal + val;
            }
        };

- 함수의 인자갯수와 파라미터가 일치하지 않으면 어떤일이 생기는가 설명하기
  1. 파라미터가 누락된 경우
  누락된 파라미터의 값이 undefined 됨.

  2. 정해진 인자갯수보다 더 많은 파라미터가 전달된 경우
  정해진 인수에 파라미터가 전달되고 나머지 파라미터는 arguments object의 인자로 접근 할 수 있다. (array like)

- 함수의 반환값이 없을때 어떻게 되는가?
  undefined가 반환 된다.

- 익명함수는 무엇인가?
  명시적인 이름으로 선언한 후에 호출하지 않고 변수에 할당하거나 함수의 인자로 사용할 수 있다.

