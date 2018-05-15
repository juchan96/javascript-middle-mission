# javascript-middle-mission

## 자판기 어플리캐이션

### 요구사항

자판기는 시중에 흔히 볼 수 있는 음료자판기와 동일하다고 보면 된다. 이렇게 동작하도록 코드를 설계하자. 단, 음료수 목록, 음료수가격, 음료수 갯수는 임의 설정하고, 값을 객체형태로 소스코드에 넣어둔다.


    > insertCoin(1000);
    > 사용가능한 음료수 목록 =>  콜라(1000, 재고2), 사이다(1000. 재고10), 포도쥬스(700, 재고2), 딸기우유(500, 재고4), 미에로화이바(900, 재고9), 물(500, 재고10), 파워에이드(1000, 재고없음)
    > selectItem("미에로화이바")  //만약, 파워에이드를 선택하면 선택할수 없다는 메시지 노출. 
    > 미에로화이바가 나왔습니다.   현재잔돈 : 100원,  사용가능한 음료수 : 없음
    > insertCoin(900);
    > 사용가능한 음료수 목록 => 콜라(1000, 재고2), 사이다(1000. 재고10), 포도쥬스(700, 재고2), 딸기우유(500, 재고4), 미에로화이바(900, 재고8), 물(500, 재고10), 파워에이드(2000, 재고없음)
    > returnMoney();
    > 잔돈 1000원이 반환됐습니다.

### 설계 내용

- ### 자판기 내부 설계

#### (1) 자판기 목록 객체로 만들기 
{ 음료이름: 'i', 가격 : n (원), 재고 : 00개 }

    beverageData = [
    {
      drinkName: "콜라",
      drinkPrice: "1000",
      drinkStock: "10"
    },

    ......

    {사이다, 1000, 재고10},
    {포도쥬스, 700, 재고2},
    {딸기우유, 500, 재고4},
    {미에로화이바, 900, 재고9},
    {물, 500, 재고10},
    {파워에이드, 2000, 재고}

    ]

- ### 자판기 실행 단계 설계

#### (1) 금액 입력.

- **to-do list**
  - [ ]  coin을 인자로 받는 함수 선언하기 => insertCoin()
  - [ ]  사용 가능한 음료의 목록(음료명, 가격, 재고 수량)을 반환하기.
    - [ ]  음료 목록 중, 가격의 값이 coin의 값보다 작거나 같은 값들을 식별하기.
    - [ ]  재고가 없는 음료는 재고가 없다는 메시지 노출하기.
    - [ ]  식별한 값들을 반환하기.

1-1. 금액을 입력받는다.

    => 금액과 자판기 데이터를 인자로 받고, 사용 가능한 음료의 목록(음료 명, 가격, 재고 수량)을 반환해주는 insertCoin()함수 선언.

    function insertCoin(coin, vendingMacData) {
      ......
      return result;
    }

1-2. 입력한 금액보다 음료의 가격이 작은 목록을 반환하기.

-반복문을 사용하여, 입력 금액 >= 음료가격 을 만족하는 음료 목록을 노출.

    function insertCoin(coin, vendingMacData) {
      

      for(let i = 0; i<beverageData.length; i++) {
        if( coin <= beverageData[i][drinkPrice])
      }

      ......
    }

#### (2) 음료 입력과 반환.

- **to-do list**
  - [ ]  사용 가능한 음료 목록 중, 선택할 음료를 인자로 받을 함수 선언하기. => selectItem(drink)
  - [ ]  음료를 선택할때, 음료가 선택되었다는 메시지 노출하기
  - [ ]  선택된 음료의 재고의 개수 감소시키기
  - [ ]  만약 drink의 재고가 없으면 재고가 없다는 메시지 노출시키기.
  - [ ]  남은 금액을 메시지로 노출시키기.
  - [ ]  잔액에서 구매할 수 있는 음료의 목록 노출시키기


2-1. 음료와 자판기 데이터를 입력받는다.

    function selectItem(availableDrinkList, drink) {
    ......
    return result
    }

    selectItem(availableDrinkData, "미에로화이바")

2-2 입력 받은 음료가 나왔다는 메시지 노출.

    function selectItem(drink, vendingMacData) {
    let message = "";
    message = "선택하신 음료" + drink + "가 나왔습니다."
    return message;
    }

    selectItem(availableDrinkData, "미에로화이바")

- 재고가 없는 음료를 선택했을 때, 재고가 없다는 메시지 노출하기.
  - beverageData[i]["drink"]의 'i'에서 만약, beverageData[n]["drinkStock"] === 0, return "재고 없음"
<?>

    function selectItem(availableDrinkList, drink) {
      let message = "";
      for(let i = 0; i < availableDrinkList.length; i++) {
        if(availableDrinkList[i]["drinkName"] === drink && availableDrinkList[i]["drinkStock"] === 0) {
          message = "재고 없음";
          return message;
        }
      }
    }

    selectItem(availableDrinkData, "파워에이드")

2-3. 현재 잔액과 입력가능한 음료 목록을 출력한다.
- 글로벌 영역에 잔액을 저장하는 변수 balance = 0; 선언.   
<?>

    => 현재잔돈 : 100원,  사용가능한 음료수 : 없음
  
#### (3) 음료 (추가)입력.
  3-1. 음료를 추가로 입력할시
  
  3-1-1. (2)로 이동
    
    ex)
    => insertCoin(900);
    => 사용가능한 음료수 목록
    => 콜라(1000), 사이다(1000), 포도쥬스(700), 딸기우유(500), 미에로화이바(900), 물(500), 파워에이드(재고없음)
    
  3-2. 음료를 추가로 입력하지 않을시
  
  3-2-1. (4)로 이동

#### (4) 잔액 반환.
  4-1. 잔액이 '0'원 일시
  
  4-1-1. 마침.
   
  4-2. 잔액이 '0'원 이상 일시
  
  4-2-1. 잔액을 반환하고 반환되었다는 메시지를 노출한다.
    
      => selectItem함수로부터 현재 잔액을 받아, 잔액을 반환할 것인지 아닌지를 선택하여, 반환할시에 잔액을 반환해주는 returnMoney();
      => 잔돈 1000원이 반환됐습니다.
