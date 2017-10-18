var jsonData = require("./data");

var resultObj = {};

function checkExistenceForAdd(store, prop, data) {
  if (!store.hasOwnProperty(prop)) {
    store[prop] = [];
  }

  store[prop].push(data);
}

// argument인 target이 array가 아닐 수 있다면 주석해제
function checkExpectation(target) {
  if (
    // typeof target === "object" &&
    // target.constructor === Array &&
    target.length > 0
  ) {
    return true;
  }

  return false;
}

function recursive(store, data, typeValue) {
  if (data.type === typeValue) {
    checkExistenceForAdd(store, typeValue, data.name);
  }

  if (checkExpectation(data.childnode)) {
    data.childnode.forEach(function(child) {
      recursive(store, child, typeValue);
    });
  } else {
    return false;
  }
}

function parse(jsonData, typeValue) {
  recursive(resultObj, jsonData[0], typeValue);
}

parse(jsonData, "sk");

console.log(resultObj.sk);
