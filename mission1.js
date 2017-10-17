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
        var value_type = (typeof value);

        if (value_type === 'number') {
            result.push(key);
        } else if (value_type === 'object') {
            var child_keys = Object.keys(value);

            if (child_keys.length > 0) {
                var child_number_keys = findNumberKeys(value);
                result = result.concat(child_number_keys);
            }
        }
    });

    return result;
};

console.log(findNumberKeys(widget));

//실행결과
//["width", "height", "hOffset", "vOffset", "size", "hOffset", "vOffset"]
