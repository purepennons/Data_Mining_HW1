
//2014年 Data Mining HW1
//Perceptron neural network algorithm
//系別:電子工程系碩一
//學號:M10202154
//姓名:林佳豪
//檔名:perceptron.js
//運行環境:node.js v0.10.25


var log = console.log;

function Perceptron(){
	this.numOfInput = 0; //input個數
	this.numOfOutput = 0;	//output個數
	this.x = null;  //input array
	this.w = null;  //weight array
	this.y = null;  //output array 
	this.finalW = null;  //final weight array
	this.testRate = 0.01;  //testing rate
	this.errorDiff = 1;  //當errorDiff^2夠小時 便當做訓練成功

/*** initial and basic functions ***/	
	this.init = function(numOfInput, numOfOutput){
		if(typeof(numOfInput)=='number'){
			this.numOfInput = parseInt(numOfInput + 1); //加上基本的node
			this.numOfOutput = parseInt(numOfOutput);
			return true;
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

	this.transferFunction = function(tranF){  //轉換function選擇
		switch(tranF){
			case 'sign':
				return Math.sign();
		}
	}

	this.setNumOfInput = function(numOfInput){
		if(typeof(numOfInput)=='number'){
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
		if(typeof(numOfOutput) == 'number'){
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


/*** Perceptron Main Functions ***/

	this.estResult = function(x, w){

	}

	this.train = function(truthTable){
		if(!truthTable){
			return false;
		}
		return true;
	}

	this.run = function(){
	}

}

var p = new Perceptron();
p.init(2, 1);
p.nodeInit(-1, 1);
log(p.x);
log(p.w);
log(p.y);


