//요구사항
//타입이 숫자로만 구성된 요소를 뽑아 배열만들기

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
    },
    "test": 1,
    "test2": {}
}

var findNumberKeys = function (obj) {
    var result = [];
    var keys = Object.keys(obj);

    keys.forEach(function (key) {
        var value = obj[key];
        var valueType = (typeof value);

        if (valueType !== 'number' && valueType === 'object') {
            return ;
        } else if (valueType === 'number') {
            result.push(key);
        } else { // valueType === 'object'
            var childKeys = Object.keys(value);

            if (childKeys.length > 0) {
                var childNumberKeys = findNumberKeys(value);
                result = result.concat(childNumberKeys);
            }
        }
    });

    return result;
};

console.log(findNumberKeys(widget));

//실행결과
//["width", "height", "hOffset", "vOffset", "size", "hOffset", "vOffset"]
