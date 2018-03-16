/*
    이렇게 동작하는 make 함수 만들어보기
    make("circle")(10);
    make("rect")(10, 10);
*/

function make() {
    let mode = arguments[0];

    function inner () {
        switch (mode) {
            case "circle":
                return Math.PI * Math.pow(arguments[0], 2);
            case "rect":
                return arguments[0] * arguments[1];
        }
    }
    return inner;
}

console.log(make("circle")(10));
console.log(make("rect")(10, 10));