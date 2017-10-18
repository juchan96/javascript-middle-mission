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
}

// 실행결과
// ["width", "height", "hOffset", "vOffset", "size", "hOffset", "vOffset"]

var arr = [];

for (var w in widget) {
  // https://appletree.or.kr/blog/notes/javascript-objects의-두-가지-유형-판별-방법/
  // typeof, constuctor
  if (widget[w].constructor === Object) {
    for (var prop in widget[w]) {
      if (typeof widget[w][prop] === "number") {
        arr.push(prop);
            }
        }
    }
}