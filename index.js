/**
 * Created by hannahch on 2017-11-28.
 */
const widget = {
    "debug": "on",
    "window": {
        "title": "Sample Konfabulator Widget",
        "name": "main_window",
        "width": 500,
        "height": 500
    },
    "image": {
        "src": "Images/Sun.png",
        "name": "sun1",
        "hOffset": 250,
        "vOffset": 250,
        "alignment": "center"
    },
    "text": {
        "data": "Click Here",
        "size": 36,
        "style": "bold",
        "name": "text1",
        "hOffset": 250,
        "vOffset": 100,
        "alignment": "center",
        "onMouseUp": "sun1.opacity = (sun1.opacity / 100) * 90;"
    }
};

//타입이 숫자로만 구성된 요소를 뽑아 배열만들기
var numKey = [];

function getNumber(obj) {
    for(key in obj){
        if(typeof obj[key] === "number"){
            numKey.push(key);
        }
        else if(typeof obj[key] === "object"){
            getNumber(obj[key]);
        }
    }
}
getNumber(widget);
console.log(numKey);