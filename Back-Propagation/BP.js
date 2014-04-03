
//2014年 Data Mining HW1
//Back Propagation neural network algorithm
//系別:電子工程系碩一
//學號:M10202154
//姓名:林佳豪
//檔名:BP.js
//運行環境:node.js v0.10.25

var log = console.log;
var createArray = function(length, initValue){  //初始化陣列
	var newArray = [];
	for(var i=0;i<length;i++){
		newArray.push(initValue);
	}
	return newArray;
}

var createMatrix = function(row, col, initValue){  //初始化矩陣
	var newMatrix = [];
	for(var i=0;i<row;i++){
		newMatrix.push(createArray(col, initValue));
	}
	return newMatrix;
} 

var getRandomNum = function(min, max){ //取得隨機數
	return (max-min)*Math.random()+min;
}

//BP Object
function BP(){
	this.numOfInput = 0;  //輸入數目
	this.numOfHidden = 0;  //隱藏層數目
	this.numOfOutput = 0;  //輸出數目
	this.w_xh = null;  //輸入至隱藏層的權重，bit0為basis
	this.w_hy = null;  //隱藏層至輸出的權重，bit0為basis
	this.dw_xh = null;  //輸入至隱藏層的權重變化量
	this.dw_hy = null;  //隱藏層至輸出的權重變化量
	// this.theta_h = null;  //隱藏層的閥值
	// this.theta_y = null;  //輸出層的閥值
	// this.dtheta_h = null;  //隱藏層的閥值的變化量
	// this.dtheta_y = null;  //輸出層的閥值的變化量
	this.m_xh = null;
	this.m_hy = null;
	this.x = null;  //輸入資料，bit0為basis
	this.h = null;  //暫存隱藏層，bit0為basis
	this.y = null;  //暫存輸出結果
	this.deltasOfOutput = null;
	this.deltasOfHidden = null;
	this.finalW = null;  //final weight array
	this.finalWArray = null;
	this.learningRate = 0.01;  //testing rate
	this.maxTrainTimes = 1000;  //最大測試次數	

/*** initial and basic functions ***/	
	this.init = function(numOfInput, numOfHidden, numOfOutput){
		if(typeof(numOfInput)=='number' && typeof(numOfHidden)=='number' && typeof(numOfOutput)=='number'){
			if(numOfInput >= 0 && numOfHidden >= 0 && numOfOutput >=0){
				this.numOfInput = parseInt(numOfInput + 1); //加上基本的node
				this.numOfHidden = parseInt(numOfHidden);
				this.numOfOutput = parseInt(numOfOutput);

				//initial arrays for nodes
				this.x = createArray(this.numOfInput, -1.0);
				this.h = createArray(this.numOfHidden, -1.0);
				this.y = createArray(this.numOfOutput, -1.0);

				//initial matrixs for weights
				this.w_xh = createMatrix(this.numOfInput, this.numOfHidden, 1.0);
				this.w_hy = createMatrix(this.numOfHidden, this.numOfOutput, 1.0);

				//give random nums for arrays and weights
				for(var i=0;i<this.numOfInput;i++){
					for(var h=0;h<this.numOfHidden;h++){
						this.w_xh[i][h] = getRandomNum(-0.2, 0.2);
					}
				}
				for(var h=0;h<this.numOfHidden;h++){
					for(var o=0;o<this.numOfOutput;o++){
						this.w_hy[h][o] = getRandomNum(-2.0, 2.0);
					}
				}
				this.deltasOfHidden = createArray(this.numOfHidden, 0.0);
				this.dw_hy = createMatrix(this.numOfHidden, this.numOfOutput, 0.0);						
				return true;
			}
		}
		return false;
	}

	this.tranF = function(f, x){
		switch(f){
			case 'sigmoid':
				return 1/(1+Math.pow(Math.E, -x));
			case 'tanh':
				return (Math.exp(x) - Math.exp(-x)) / (Math.exp(x) + Math.exp(-x));
		}
	}

	this.diffTranF = function(f, x){
		switch(f){
			case 'dSigmoid':
				return this.tranF('sigmoid', x)*(1 - this.tranF('sigmoid', x));
			case 'dTanh':
				return 1.0-x*x;
		}
	}

/*** Back Propagation main functions ***/
	
	//更新輸入資料與計算隱藏層與輸出層結果
	this.update = function(inputData, tranFunction){  //inputData為每筆資料的輸入，陣列表示
		if(inputData.length != this.numOfInput -1){
			return false;
		}

		//將每筆input讀入x
		for(var v=0;v<inputData.length;v++){
			this.x[v+1] = inputData[v];
		}

		//計算輸入層至隱藏層的輸出 - this.h
		for(var i=0;i<this.numOfHidden;i++){
			var sum = 0.0;
			for(var j=0;j<this.numOfInput;j++){
				sum += this.x[j]*this.w_xh[j][i];
			}
			this.h[i] = this.tranF(tranFunction, sum);
		}

		//計算隱藏層至輸出層的輸出 - this.y
		for(var i=0;i<this.numOfOutput;i++){
			var sum = 0.0;
			for(var j=0;j<this.numOfHidden;j++){
				sum+= this.h[j]*this.w_hy[j][i];
			}
			this.y[i] = this.tranF(tranFunction, sum);
		}
		return this.y;
	}

	//反傳遞學習函數反求變化量與權重
	this.backPropagation = function(yd, learningRate, moment, dTranFunction){  
		//計算輸出層誤差
		this.deltasOfOutput = createArray(this.numOfOutput, 0.0);
		for(var i=0;i<this.numOfOutput;i++){
			var error = yd[i] - this.y[i];
			this.deltasOfOutput[i] = this.diffTranF(dTranFunction, this.y[i]) * error;
		}

		//計算隱藏層誤差		
		for(var i=0;i<this.numOfHidden;i++){
			var error = 0.0;
			for(var j=0;j<this.numOfOutput;j++){
				error += this.deltasOfOutput[j] * this.w_hy[i][j];
			}
			this.deltasOfHidden[i] = this.diffTranF(dTranFunction, this.h[i]) * error;
		}

		//調整w_hy權重
		for(var i=0;i<this.numOfHidden;i++){
			for(var j=0;j<this.numOfOutput;j++){
				this.dw_hy[i][j] = learningRate * this.deltasOfOutput[j] * this.h[i];
				this.w_hy[i][j] += this.dw_hy[i][j] + moment * this.dw_hy[i][j];
			}
		}

		//調整w_xh權重
		this.dw_xh = createMatrix(this.numOfInput, this.numOfHidden, 0.0);		
		for(var i=0;i<this.numOfInput;i++){
			for(var j=0;j<this.numOfHidden;j++){
				this.dw_xh[i][j] = learningRate * this.deltasOfHidden[j] * this.x[i];
				this.w_xh[i][j] += this.dw_xh[i][j] + moment * this.dw_xh[i][j];
			}
		}
	}

	//訓練主程式
	this.train = function(testSample, maxTrainTimes, learningRate, moment){
		for(var times=0;times<maxTrainTimes;times++){
			for(var sample in testSample){
				var partSample = testSample[sample];
				var inputs = partSample[0];
				var yds = partSample[1];
				var outputs = this.update(inputs, 'tanh');
				this.backPropagation(yds, learningRate, moment, 'dTanh');
				log('y = ' +  outputs[0] + ' yd = ' + yds);
			}
		}

	}

	//使用完成訓練之權重計算預測結果
	this.recall = function(){

	}

}


var pat = [
  [[0,0], [0]],
  [[0,1], [1]],
  [[1,0], [1]],
  [[1,1], [0]]
];
var bp = new BP();
bp.init(2, 2, 1);
bp.train(pat, 10000, 0.5, 0.1);
log(pat);


