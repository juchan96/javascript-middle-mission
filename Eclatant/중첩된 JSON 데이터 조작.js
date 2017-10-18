var jsonData = require("./data");

var resultObj = {};

function checkExistenceForAdd(store, prop, data) {
  if (!store.hasOwnProperty(prop)) {
    store[prop] = [];
  }

  store[prop].push(data);
}
