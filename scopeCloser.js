/*
    이렇게 동작하는 make 함수 만들기
    function rect(a,b) {
      return a*b;
    }
    function circle(a) {
      return Math.PI * Math.pow(a,2);
    }

    make(rect)(10,20);
    make(circle)(10);
*/

function make () {
    var mode = arguments[0];

    function rect(a, b) {
        return a*b;
    }
    function circle(a) {
        return Math.PI * Math.pow(a,2);
    }

    return (mode === "rect") ? rect : circle;
}

console.log(make("circle")(10));
console.log(make("rect")(10, 20));