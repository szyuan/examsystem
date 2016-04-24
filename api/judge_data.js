'use strict'

var http=require('http');
var express = require('express');


exports.getAndSaveJudgeData=function(examData,answerData,callback){
	var judgeData={};
	judgeData.basicInfo=examData.basicInfo;
	judgeData.examInfo=examData.examInfo;
	judgeData.stuExamData={score:0,examLog:{}};

	judgeData.stuExamData.score=getJudgeData(examData,answerData);

	saveJudgeData(judgeData.stuExamData,function(){
		callback(judgeData);
	});
}

//---------------单独功能方法--------------------

function getJudgeData(examData,answerData){
	// var wrong
	var questions=examData.questions;
	for( var aKey in answerData){
		for(var ei=0;ei<questions.length;ei++){
			var nowLog=answerData[aKey];
			var nowAnswer=questions[ei];
			if(nowLog[1]==nowAnswer.id){
				//判断答案是否正确。若答案错误,则进行分类
				if(nowLog[0]!=nowAnswer.trueAnswer){
					if(nowAnswer.type){
						console.log('wrong 多选');
					}else{
						console.log('wrong 单选');
					}
				}
			}
		}
	}

	// console.log('*******************************');
	// console.log(questions);
}

function saveJudgeData(examData,cb){
	cb();
}