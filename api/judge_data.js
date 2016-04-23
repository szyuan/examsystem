'use strict'

var http=require('http');
var express = require('express');


exports.getJudgeData=function(examData,answerData){
	
	

	
}

//---------------单独功能方法--------------------

//获取全部首页数据
// function getMainAll(stuId,classID,mainCallback){
// 	var classID=5;
// 	var url_getMainAll='http://121.42.179.184:8080/examSys/ws/exam/fourToOne?stuID='+stuId+'&classID='+classID;
// 	var mainAll=null;
// 	var fData={};

// 	mainAll=http.get(url_getMainAll,function(res){
// 		var fullData='';
// 		console.log("@api/首页数据: code:" + res.statusCode);
// 		res.on('data',function(data){
// 			process.stdout.write('@api/首页数据: data:'+data+'\n');
// 		  	fullData+=data;
// 		});
// 		res.on('end',function(){
// 		  	// return data;
// 		  	mainCallback&&mainCallback(fullData);
// 		  	return;
// 		});
// 	}).on('error',function(e){
// 		console.log("@api/已完成考试数量:错误:" + e.message);
// 	  	return '-';
// 	});	
// }
