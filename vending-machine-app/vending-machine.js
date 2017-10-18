var readline = require("./config/readline")();

function VendingMachine() {
	this.drinks = new Drinks();
	this.stateList = { "WAIT_MONEY": 1, "WAIT_CHOOSE_DRINK": 3, "WAIT_CHOOSE_REFUND": 4, "FINISHED": 5 }
	this.state = this.stateList.WAIT_MONEY;
	this.fund = 0;

	this.getBuyableDrinkList = function (money) {
		var drinkList = [];
		this.drinks.drinkList.forEach(function (drink) {
			if (drink.price <= money) {
				drinkList.push(drink);
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

machine = makeMachine();
showInsertCoin(); //동전을 넣으세요
readline.prompt(); // >
waitCommand(machine);

function makeMachine() {
	machine = new VendingMachine();
	machine.drinks.addDrink("콜라", 1000, 1);
	machine.drinks.addDrink("사이다", 1000, 1);
	machine.drinks.addDrink("포도쥬스", 700, 1);
	machine.drinks.addDrink("딸기우유", 500, 1);
	machine.drinks.addDrink("미에로화이바", 900, 1);
	machine.drinks.addDrink("물", 500, 1);
	machine.drinks.addDrink("파워에이드", 1000, 0);
	return machine;
}

function waitCommand(machine) {
	readline.on("line", function (line) {

		commandToMachine(machine, line);
		if (machine.state == machine.stateList.FINISHED) {
			readline.close();
		} else {
			readline.prompt();
		}
	});
}

function commandToMachine(machine, command) {
	switch (machine.state) {
		case machine.stateList.WAIT_MONEY:
			commandWaitMoney(machine, command);
			break;
		case machine.stateList.WAIT_CHOOSE_DRINK:
			commandChooseDrink(machine, command);
			break;
		case machine.stateList.WAIT_CHOOSE_REFUND:
			commandChooseRefund(machine, command);
			break;
		default:
			showMachineOffed();
			break;
	}
}

function commandWaitMoney(machine, command) {
	money = parseInt(command);
	if (typeof money !== "number" || isNaN(money)) {
		showInsertCoin();
		return;
	}
	machine.deposit(money);
	buyableDrinks = machine.getBuyableDrinkList(machine.fund);
	if (isEmpty(buyableDrinks)) {
		showCanBuyNothing();
		showInsertCoin();
		return;
	}
	showBuyAbleDrinks(machine);
	machine.state = machine.stateList.WAIT_CHOOSE_DRINK;
	showPleaseChoose();
}

function commandChooseDrink(machine, command) {
}
//음료 대기
//음료수 이름 아님? - 그런 건 없습니다. 구매 가능한 음료 목록 출력. 선택하세요.
//재고 없나? - 그거 다 떨어졌어요. 구매 가능한 음료 목록 출력. 선택하세요.
//음료수 나왔습니다.
//음료수 구매
//구매/반환 대기로 상태 변화
//다른 걸 구매? 반환?

function commandChooseRefund(machine, command) {
	console.log('4')
	machine.state = machine.stateList.FINISHED;
}
//구매/반환 대기
//숫자인가? - 동전 대기로 상태 변환. 46으로
//반환인가? - 잔액은 얼마입니다. 끝으로 상태 변환
//다른 걸 구매? 반환?



function showBuyAbleDrinks(machine) {
	var list = machine.getBuyableDrinkList(machine.fund);
	showDrinks(list);
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

function showInsertCoin() {
	console.log("동전을 넣으세요.");
}

function showCanBuyNothing() {
	console.log("아무것도 못 삽니다.");
}

function showMachineOffed() {
	console.log('자판기가 꺼져 있습니다.');
}

function showPleaseChoose() {
	console.log('선택하세요.');
}

// [], {} 도 빈값으로 처리
var isEmpty = function (value) {
	if (value == "" || value == null || value == undefined || (value != null && typeof value == "object" && !Object.keys(value).length)) {
		return true;
	} else {
		return false;
	}
};
