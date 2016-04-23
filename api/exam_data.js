'use strict'

var http=require('http');
var express = require('express');
var async=require('async');


exports.getExamData=function(id,examID,questionNumber,examInfo_basic,callback){
	var examData={
		examType:0,
		examInfo:{},
		questions:[],
		wrongID:[],
		QuestionNumber:1,
		currentQuestion:{},
		questionNumber:questionNumber
	}

	getData(examID,questionNumber,function(data_raw){
		examData=data_raw;
		examData.currentQuestion=examData.questions[questionNumber-1];
		console.log('@exam_data-basic-examInfo:');
		console.log(examInfo_basic);
		callback(examData);
	});

	//---------------单独功能方法--------------------

	//-----------------请求数据----------------------
	function getData(examID,questionNumber,gotFn){

		var examData_url='http://121.42.179.184:8080/examSys/ws/question/selectExamQuestionsByExamID?examID='+examID;
		http.get(examData_url,function(res){
			var fullData='';
			console.log("@api/考题数据: code:" + res.statusCode);
			res.on('data',function(data){
			  	fullData+=data;
			});
			res.on('end',function(){
				process.stdout.write('@api/考题数据: data:'+fullData+'\n');
				var formattedExamData=format(fullData);
				gotFn(formattedExamData);
			  	return ;
			});
		}).on('error',function(e){
			console.log("@api/考题数据:错误:" + e.message);
		  	return '-';
		});	

	}
	//-----------------数据格式化-----------------
	function format(data_raw){
		var json_raw=JSON.parse(data_raw);
		var examModal={
			// QuestionNumber:1,//当前题号
			// examType:0,//类型【考试/历史】
			examInfo:{
				examID:examID,
				title:examInfo_basic.examName||'-',
				startTime:examInfo_basic.startTime||'0',
				// startTime:'2016-04-15T10:10:00',
				totalTime:examInfo_basic.examTime||'999',
				teacher:examInfo_basic.createTeacher||'--'
			},
			wrongID:[]
		};
		// examModal.examInfo.examID=examID;
		examModal.questions=[];
		var alphabet=['A','B','C','D','E','F','G','H','I','J'];
		for (var i = 0; i < json_raw.length; i++) {
			var answerArray=json_raw[i].questionChoice.split(/[A-Z].\s/);
			var answerJsonArray=[];
			for(var ai=1,aLen=answerArray.length;ai<aLen;ai++){
				answerJsonArray.push({
					id:alphabet[ai-1],
					content:answerArray[ai]
				});
				if(ai>=alphabet.length-1) break;
			}
			examModal.questions.push({
				id:json_raw[i].questionID,//题目id
				number:1,//在考试中的题号
				type:parseInt(json_raw[i].questionTypeID)-1,//题目类型【0单选/1双选】
				title: json_raw[i].questionContent,//题干
				code:'',//若存在代码，则存放题目代码
				answer:answerJsonArray
			});
		}

		return examModal;
	}

}