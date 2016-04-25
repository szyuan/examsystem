'use strict'

var http=require('http');
var express = require('express');


exports.getAndSaveJudgeData=function(examData,answerData,callback){
	var judgeData={};
	judgeData.basicInfo=examData.basicInfo;
	judgeData.examInfo=examData.examInfo;
	judgeData.stuExamData={score:0,examLog:{}};

	judgeData.stuExamData=getJudgeData(examData,answerData);

	saveJudgeData(judgeData,function(){
		callback(judgeData);
	});
}

//---------------单独功能方法--------------------

function getJudgeData(examData,answerData){
	// var wrong
	var questions=examData.questions;
	var noMatch=true;
	var nowType=0;
	var examResult={
		stuID:-1,
		examInfo:{
			score:-1,
			examID:-1,
			examStatus:-1,
			singleChoiceWrongID:[],//[[id,题号],[],...,[]]
			MultipleChoiceWrongID:[]//[[id,题号],[],...,[]]
		},
		wrongQuestionInfo:{}//ID_x:answer
	}
	for(var ei=0;ei<questions.length;ei++){
		noMatch=true;
		nowType=questions[ei].type;
		for( var aKey in answerData){
			var nowLog=answerData[aKey];//[答案,id]
			var nowAnswer=questions[ei];
			if(nowLog[1]==nowAnswer.id){
				noMatch=false;//存在答案
				//判断答案是否正确。若答案错误,则进行分类
				if(nowLog[0]!=nowAnswer.trueAnswer){
					if(nowAnswer.type){
						console.log('wrong 多选');
						examResult.examInfo.MultipleChoiceWrongID.push([nowLog[1],aKey]);
					}else{
						console.log('wrong 单选');
						examResult.examInfo.singleChoiceWrongID.push([nowLog[1],aKey]);
					}
				}
			}
		}//若不存在答案
		if(noMatch){
			noMatch=true;
			if(nowType){
				console.log('wrong 多选');
				examResult.examInfo.MultipleChoiceWrongID.push([questions[ei].id,ei+1]);
			}else{
				console.log('wrong 单选');
				examResult.examInfo.singleChoiceWrongID.push([questions[ei].id,ei+1]);
			}
		}
	}
	console.log(examResult.examInfo.MultipleChoiceWrongID);
	console.log('*******************************');
	console.log(examResult.examInfo.singleChoiceWrongID);

	var score=parseInt(
				100-
				(examResult.examInfo.MultipleChoiceWrongID.length+
			  	examResult.examInfo.singleChoiceWrongID.length)/
			  	questions.length*100
			);
	examResult.score=score;

	return examResult;
}

function saveJudgeData(judgeData,cb){
	var saveJudge_url='http://121.42.179.184:8080/exam/insertExamResult';
	var postOption={
		host:'121.42.179.184',
		port:8080,
		path:'/exam/insertExamResult',
		method:'POST',
		data:
	}

	cb();
}