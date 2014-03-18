
//2014年 Data Mining HW1
//Perceptron neural network algorithm
//系別:電子工程系碩一
//學號:M10202154
//姓名:林佳豪
//檔名:perceptron.js
//運行環境:node.js v0.10.25


var log = console.log;

function Perceptron(){

/*** initial and basic functions ***/	
	this.init = function(numOfInput, numOfOutput){
		this.numOfInput = numOfInput + 1; //加上基本的node
		this.numOfOutput = numOfOutput;
	}

	this.createArray = function(){

	}

	this.transferFunction = function(tranF){
		switch(tranF){
			case:'sign'
				return Math.sign();
		}
	}

/*** Perceptron Main Functions ***/

	this.train = function(truthTable){
		if(!truthTable || !this.numOfInput || !this.numOfOutput){
			return false;
		}
		return true;
	}

	this.run = function(){

	}

}