
//2014年 Data Mining HW1
//Perceptron neural network algorithm
//系別:電子工程系碩一
//學號:M10202154
//姓名:林佳豪
//檔名:perceptron.js
//運行環境:node.js v0.10.25

function Perceptron(){
	this.numOfInput = 0; //input個數
	this.numOfOutput = 0;	//output個數
	this.x = null;  //input array
	this.w = null;  //weight array
	this.y = null;  //output array 
	this.finalW = null;  //final weight array
	this.finalWArray = null;
	this.testRate = 0.01;  //testing rate
	this.errorFlag = 0.0001;  //當errorFlag夠小時 便當做訓練成功
	this.maxTrainTimes = 1000;  //最大測試次數

/*** initial and basic functions ***/	
	this.init = function(numOfInput, numOfOutput, testRate, errorFlag, maxTrainTimes, resultW){
		if(typeof(numOfInput)=='number' &&  typeof(numOfOutput)=='number' && typeof(testRate)=='number' && typeof(errorFlag)=='number' && typeof(maxTrainTimes)=='number'){
			if(numOfInput >= 0 && numOfOutput >=0 && testRate > 0 && testRate < 1 && errorFlag > 0 && errorFlag < 1 && maxTrainTimes > 0){
				this.numOfInput = parseInt(numOfInput + 1); //加上基本的node
				this.numOfOutput = parseInt(numOfOutput);
				this.testRate = testRate;
				this.errorFlag = errorFlag;
				this.maxTrainTimes = maxTrainTimes;
				this.finalWArray = resultW;
				return true;
			}
		}
		return false;
	}

	this.nodeInit = function(x0, w0){	//初始化x, w, y array並設定basis value
		if(typeof(x0) != 'number' || typeof(w0) != 'number'){
			return false
		}
		this.x = this.createArray(this.numOfInput, 1);
		this.x[0] = x0;
		this.w = this.createArray(this.numOfInput, 0);
		this.w[0] = w0;
		this.y = this.createArray(this.numOfOutput, 0);
		return true;
	}

	this.createArray = function(length, initValue){
		var newArray = [];
		for(var i=0;i<length;i++){
			newArray.push(initValue);
		}
		return newArray;
	}

	// this.transferFunction = function(tranF){  //轉換function選擇
	// 	switch(tranF){
	// 		case 'sign':
	// 			return Math.sign();
	// 	}
	// }

	this.setNumOfInput = function(numOfInput){
		if(typeof(numOfInput)=='number' && numOfInput >= 0){
			this.numOfInput = parseInt(numOfInput+1); //加上基本node
			return true;
		}
		return false;
	}

	this.getNumOfInput = function(){
		if(numOfInput != null){
			return numOfInput;	
		}
		return null;
	}

	this.setNumOfOutput = function(numOfOutput){
		if(typeof(numOfOutput) == 'number' && numOfOutput >= 0){
			this.numOfOutput = parseInt(numOfOutput);
			return true;
		}
		return false;
	}


	this.getNumOfOutput = function(){
		if(numOfOutput != null){
			return numOfOutput;	
		}
		return null;
	}

	this.getX = function(){
		if(x != null){
			return x;
		}
		return null;
	}

	this.getW = function(){
		if(w != null){
			return w;
		}
		return null;
	}

	this.getFinalW = function(){
		if(finalW != null){
			return finalW;
		}
		return null;
	}

	this.getFinalWArray = function(){
		return this.finalWArray;
	}

	this.setTestRate = function(testRate){
		if(testRate < 1 && testRate > 0){
			this.testRate = testRate;
			return true;
		}
		return false;
	}

	this.getTestRate = function(){
		return this.testRate;
	}

	this.setErrorFlag = function(errorFlag){
		if(errorFlag < 1 && errorFlag > 0){
			this.errorFlag = errorFlag;
			return true;
		}
		return false;
	}

	this.getErrorFlag = function(){
		return this.errorFlag;
	}

	this.setMaxTrainTimes = function(maxTrainTimes){
		if(maxTrainTimes > 0 ){
			this.maxTrainTimes = parseInt(maxTrainTimes);
			return true;
		}
		return false;
	}

	this.getMaxTrainTimes = function(){
		return this.maxTrainTimes;
	}


/*** Perceptron Main Functions ***/

	this.estResult = function(x, w){
		var result = 0;
		for(var f in x){
			result += x[f]*w[f];
		}
		if(result > 0 ){
			return 1;
		}else {
			return 0;
		}
		
	}

	this.train = function(truthTable, tableName){  //truthTable 中，每項的最後一元素為輸出結果
		if(typeof(truthTable) == null || this.x == null || this.w == null || this.y == null){
			return false;
		}
		log(truthTable);
		for(var i=0; i<this.maxTrainTimes;i++){
			var eSum = 0.0;
			for(var j=0; j<truthTable.length;j++){
				var yd = truthTable[j][truthTable[j].length-1];  //期望輸出
				for(var v=0;v<truthTable[j].length-1;v++){
					this.x[v+1] = truthTable[j][v];
				}
				this.y[0] = this.estResult(this.x, this.w);  //實際輸出
				var e = yd - this.y[0];  //期望與實際輸出間的誤差
				eSum += e*e;	//計算差距總和
				var dw = this.createArray(this.numOfInput, 1); //w變量 array
				for(var v=0;v<truthTable.length-1;v++){
					dw[v] = this.testRate * this.x[v] * e;
					this.w[v] += dw[v];
				}
				if(i%10 == 0){
					log('x = ' + this.x + ' w = ' + this.w + ' y = ' + this.y[0] + ' yd = ' + yd);
				}				
			}
			if(eSum < this.errorFlag){
				this.finalW = this.createArray(this.numOfInput+1, 1);
				for(var v=0;v<this.w.length;v++){
					this.finalW[v+1] = this.w[v];
				}
				this.finalW[0] = tableName;
				this.finalWArray.push(this.finalW);
				return true;
			}

		}
		return false;
	}

	this.run = function(booleanFunction, input){ß

	}

}

module.exports = Perceptron; //輸出模組

var learn = function (truthTable, tableName){
	log('開始訓練' + tableName);
	var p = new Perceptron();
	p.init(2, 1, 0.01, 0.0001, 1000, resultW);
	p.nodeInit(-1, 1);
	var trainFlag = p.train(truthTable, tableName);
	if(trainFlag){
		log(tableName +'訓練成功');
		log('finalW = ' + p.finalW);
	}else {
		log(tableName + '訓練失敗');
	}
	log('已經訓練之權重:');
	log(resultW);
}

//執行主程式

var log = console.log;
var resultW = [];

var andTable = [ [ 0, 0, 0 ], [ 0, 1, 0 ], [ 1, 0, 0 ], [ 1, 1, 1 ] ]; // AND 函數的真值表
var orTable  = [ [ 0, 0, 0 ], [ 0, 1, 1 ], [ 1, 0, 1 ], [ 1, 1, 1 ] ]; // OR  函數的真值表
var xorTable = [ [ 0, 0, 0 ], [ 0, 1, 1 ], [ 1, 0, 1 ], [ 1, 1, 0 ] ]; // XOR 函數的真值表

learn(andTable, 'and');
learn(orTable, 'or');
learn(xorTable, 'xor');





