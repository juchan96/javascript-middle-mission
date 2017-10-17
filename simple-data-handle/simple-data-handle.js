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
//실행결과
//["width", "height", "hOffset", "vOffset", "size", "hOffset", "vOffset"]

showNumberTypeElements(widget);


function showNumberTypeElements(elements) {
	var numberTypeElements = getNumberTypeElements(elements);
	console.log(numberTypeElements);
}
function getNumberTypeElements(elements) {
	var numberTypeElements = [];
	for (element in elements) {
		if (typeof elements[element] === 'object' && elements[element] != null) {
			newElements = getNumberTypeElements(elements[element]);
			numberTypeElements = numberTypeElements.concat(newElements);
		}
		if (typeof elements[element] === 'number' && isFinite(elements[element])) {
			numberTypeElements.push(element);
		}
	}
	return numberTypeElements;
}