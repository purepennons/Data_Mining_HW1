var BP = require('./BP.js');
var log  = console.log;
var xor = [
  [[0,0], [0]],
  [[0,1], [1]],
  [[1,0], [1]],
  [[1,1], [0]]
];
log('xor:')
log(xor);
var bp = new BP();
var nh = 2*2 + 1;
bp.init(2, nh, 1);
bp.train(xor, 1000, 0.5, 0.1);
