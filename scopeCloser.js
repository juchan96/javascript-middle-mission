var make = function() {
    var funs=[];
    while(true) {
        if(funs.length >9) break;
        var rValue =Math.random()*10;
        //console.log(rValue)
        funs.push(function(){return rValue});
    }
    return funs;
}

var randomDataFuns = make();

console.log(randomDataFuns[3]());  //??
console.log(randomDataFuns[5]());  //??
