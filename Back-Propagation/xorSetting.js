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
var errorRate = bp.train(xor, 10000, 0.5, 0.1, 'tanh', 'dTanh');
for(var v in errorRate){
	log(errorRate[v]);
}
