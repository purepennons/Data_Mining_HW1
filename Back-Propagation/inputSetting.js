var BP = require('./BP.js');
var ni = 4;
var nh = 2*ni + 1;
var no = 1;	//no=1 => no=3 因為輸出表達方式從字串轉成陣列(ex:Iris-setosa => [0, 0, 1])
var inputData;
var fs = require('fs');
// fs.readFile('bezdekIris.data.txt', function(err, data) {    //非同步讀檔
//     if(err) throw err;
//     var array = data.toString().split("\n");
//     var inputArray = new Array(array.length);
//     for(var i=0;i<array.length;i++){
//     	inputArray[i] = new Array(2);
//     	inputArray[i][0] = new Array(ni);
//     	inputArray[i][1] = new Array(no);
//     }
//     for(i in array) {
//     	var tempArray = array[i].toString().split(',');
//     	for(var k=0;k<tempArray.length;k++){
//     		if(k==tempArray.length-1){
//     			inputArray[i][1][0] = tempArray[k];
//     		}else {
//     			inputArray[i][0][k] = tempArray[k];
//     		}
//     	}
//     	switch(inputArray[i][1][0]){
//     		case 'Iris-setosa':
//     			inputArray[i][1] = [0, 0, 1];
//     			break;
//     		case 'Iris-versicolor':
//     			inputArray[i][1] = [0, 1, 0];    		
//     			break;
//     		case 'Iris-virginica':
//     			inputArray[i][1] = [1, 0, 0];    		
//     			break;
//     	}
//     }
//     var bp = new BP();
//     no = 3;
//     bp.init(ni, nh, no);
//     var errorRate = bp.train(inputArray, 10000, 0.5, 0.1, 'sigmoid', 'dSigmoid');
//     var recallErrorRate = bp.recall(inputArray, 'sigmoid');
//     console.log('error = ' + recallErrorRate);

// });

var array = fs.readFileSync('iris.data.txt').toString().split("\n");  //同步讀檔
var inputArray = new Array(array.length);
for(var i=0;i<array.length;i++){
    inputArray[i] = new Array(2);
    inputArray[i][0] = new Array(ni);
    inputArray[i][1] = new Array(no);
}
for(i in array) {
    var tempArray = array[i].toString().split(',');
    for(var k=0;k<tempArray.length;k++){
        if(k==tempArray.length-1){
            inputArray[i][1][0] = tempArray[k];
        }else {
            inputArray[i][0][k] = tempArray[k];
        }
    }
    switch(inputArray[i][1][0]){
        case 'Iris-setosa':
            inputArray[i][1] = [0, 0, 1];
            break;
        case 'Iris-versicolor':
            inputArray[i][1] = [0, 1, 0];           
            break;
        case 'Iris-virginica':
            inputArray[i][1] = [1, 0, 0];           
            break;
    }
}
console.log('Iris');
console.log(inputArray);
var bp = new BP();
no = 3;
bp.init(ni, nh, no);
var errorRate = bp.train(inputArray, 10000, 0.3, 0.1, 'sigmoid', 'dSigmoid');
// var recallErrorRate = bp.recall(inputArray, 'sigmoid');
var recallData = bp.recall(inputArray, 'sigmoid');
//console.log('error = ' + recallErrorRate);

