// var readline = require("./config/readline")();

function VendingMachine() {
	this.drinks = new Drinks();
	this.stateList = { "BEGIN": 0, "WAIT_MONEY": 1, "WAIT_CHOOSE_DRINK": 3, "WAIT_CHOOSE_REFUND": 4, "FINISHED": 5 }
	this.state = this.stateList.BEGIN;
	this.fund = 0;

	//함수: 구매 가능한 음료 배열 반환
	this.getBuyableDrinkList = function (money) {
		var drinkList = [];
		this.drinks.drinkList.forEach(function (drink) {
			if (drink.amount != 0) {
				if (drink.price <= money) {
					drinkList.push(drink);
				}
			}
		});
		return drinkList;
	}
	this.buyDrink = function (name) {
		var price = this.drinks.getDrinkPrice(name);
		this.fund -= price;
		this.drinks.removeDrink(name);
	}
	this.deposit = function (fund) {
		this.fund = fund;
	}
	this.refund = function () {
		tmp = this.fund;
		this.fund = 0;
		return tmp;
	}
}

function Drinks() {
	this.drinkList = [];
	this.addDrink = function (name, price, amount) {
		var drink = new Drink(name, price, amount);
		this.drinkList.push(drink);
	}
	this.getDrinkPrice = function (drinkName) {
		//순회
	}
	this.removeDrink = function (drinkName) {
		//순회
	}
}

function Drink(name, price, amount) {
	this.name = name;
	this.price = price;
	this.amount = amount;
}

function showDrinks(drinks) {
	//콜라(1000), 사이다(1000), 포도쥬스(700), 딸기우유(500), 미에로화이바(900), 물(500), 파워에이드(재고없음)
	var showText = [];
	drinks.forEach(function (drink) {
		if (showText != "") {
			showText += ", ";
		}
		if (drink.amount != 0) {
			showText += drink.name + "(" + drink.price + ")";
		}
		else {
			showText += drink.name + "(재고없음)";
		}
	});
	console.log(showText);
}


machine = new VendingMachine();
machine.drinks.addDrink("콜라", 1000, 1);
machine.drinks.addDrink("사이다", 1000, 1);
machine.drinks.addDrink("포도쥬스", 700, 1);
machine.drinks.addDrink("딸기우유", 500, 1);
machine.drinks.addDrink("미에로화이바", 900, 1);
machine.drinks.addDrink("물", 500, 1);
machine.drinks.addDrink("파워에이드", 1000, 0);

list = machine.getBuyableDrinkList(1000);
showDrinks(list);
showDrinks(machine.drinks.drinkList);
//머신 입력 대기(머신)

this.command = function (command) {
	switch (this.state) {
		case this.stateList.BEGIN:

	}
	//상태 따라서 switch
	//처음 켬, 동전 대기, 음료 대기, 구매/반환 대기
}

//입력대기 함수로 만들기
// readline.on("line", function (line) {
// 	if (line == "exit") {
// 		readline.close();
// 	}

// 	controlVendingMachine(line);
// 	//종료 여부 확인하여 종료, 아니면 재개
// 	readline.prompt();
// });

//처음 켰을 때
//동전 넣으세요
//동전 대기로 상태 변환.

//동전 대기
//숫자 아닌가? - 동전을 넣으세요
//돈 넣기 함수
//구매 가능한 음료 배열 반환
//구매 가능한 음료 목록 출력
//가능음료.isEmpty? - 아무것도 못 삽니다. 동전을 넣으세요. 
//음료 대기로 상태 변환. 선택하세요.

//음료 대기
//음료수 이름 아님? - 그런 건 없습니다. 구매 가능한 음료 목록 출력. 선택하세요.
//재고 없나? - 그거 다 떨어졌어요. 구매 가능한 음료 목록 출력. 선택하세요.
//음료수 나왔습니다.
//음료수 구매
//구매/반환 대기로 상태 변화
//다른 걸 구매? 반환?

//구매/반환 대기
//숫자인가? - 동전 대기로 상태 변환. 46으로
//반환인가? - 잔액은 얼마입니다. 끝으로 상태 변환
//다른 걸 구매? 반환?
