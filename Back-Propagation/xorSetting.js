var BP = require('./BP.js');
var xor = [
  [[0,0], [0]],
  [[0,1], [1]],
  [[1,0], [1]],
  [[1,1], [0]]
];
console.log('xor:')
console.log(xor);
var bp = new BP();
var nh = 2*2 + 1;
bp.init(2, nh, 1);
var errorRate = bp.train(xor, 1000, 0.3, 0.1, 'tanh', 'dTanh');
//var recallErrorRate = bp.recall(xor, 'tanh');
var recallData = bp.recall(xor, 'tanh');
// console.log('error = ' + recallErrorRate);
// console.log(errorRate);
