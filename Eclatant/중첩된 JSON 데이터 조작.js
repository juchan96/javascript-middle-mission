var jsonData = require("./data");

var resultObj = {};

function checkExistenceForAdd(store, prop, data) {
  if (!store.hasOwnProperty(prop)) {
    store[prop] = [];
  }

  store[prop].push(data);
}

function search(store, data, typeValue) {
  if (data.type === typeValue) {
    checkExistenceForAdd(store, typeValue, data.name);
  }

  if (data.childnode.length === 0) {
    return;
  }

  data.childnode.forEach(function(child) {
    search(store, child, typeValue);
  });
}

function parse(jsonData, typeValue) {
  search(resultObj, jsonData[0], typeValue);
}

parse(jsonData, "sk");

console.log(resultObj.sk);
