'use strict'

var http=require('http');
var express = require('express');
var async=require('async');


exports.getMainData=function(basicInfo,callback){
	var mainData={
		finishedExamSum:0,
		finishedExamAvg:0,
		currentExam:[],
		finishedExam:[],
		userInfo:{},
		basicInfo:basicInfo
	}

	var stuId=basicInfo.userID;
	var classID=basicInfo.stuInfo.classID;	
	//获取页面数据
	getMainAll(stuId,classID,function(rawData){
		var mainData='';
		try{
			mainData=format(rawData);
		}catch(e){
			console.log('@main_data getMainAll Error:'+e.message);
		}
		callback(mainData);
	});

	function format(rawData){
		var fData={};
		var rawJson=JSON.parse(rawData);
		fData.finishedExamSum=rawJson.examSum;
		fData.finishedExamAvg=rawJson.examAvg;
		fData.finishedExam=rawJson.finishedExams.infos;
		fData.startingExam=rawJson.startingExams;
		fData.unstartExam=rawJson.unStartExams;
		fData.currentExam=rawJson.startingExams.concat(rawJson.unStartExams);
		fData.basicInfo=basicInfo;
		
		return fData;
	}
	
}

//---------------单独功能方法--------------------

//获取全部首页数据
function getMainAll(stuId,classID,mainCallback){
	var classID=5;
	var url_getMainAll='http://121.42.179.184:8080/examSys/ws/exam/fourToOne?stuID='+stuId+'&classID='+classID;
	var mainAll=null;
	var fData={};

	mainAll=http.get(url_getMainAll,function(res){
		var fullData='';
		console.log("@api/首页数据: code:" + res.statusCode);
		res.on('data',function(data){
			process.stdout.write('@api/首页数据: data:'+data+'\n');
		  	fullData+=data;
		});
		res.on('end',function(){
		  	// return data;
		  	mainCallback&&mainCallback(fullData);
		  	return;
		});
	}).on('error',function(e){
		console.log("@api/已完成考试数量:错误:" + e.message);
	  	return '-';
	});	
}


//获取已完成考试数量
function getFinishedExamSum(id,cb){

	var url_finishedExamSum="http://121.42.179.184:8080/examSys/ws/exam/getFinishedExamSum?stuID="+id;
	var finishedExamSum=null;

	finishedExamSum=http.get(url_finishedExamSum, function(res) {
	  console.log("@api/已完成考试数量: code:" + res.statusCode);

	  res.on('data',function(data){
	  	process.stdout.write('@api/已完成考试数量: data:'+data+'\n');
	  	// return data;
	  	cb&&cb(data);
	  });

	}).on('error', function(e) {
	  console.log("@api/已完成考试数量:错误:" + e.message);
	  return '-';
	});
}

//获取平均分数
function getFinishedExamAvg(id,cb){

	var url_finishedExamAvg="http://121.42.179.184:8080/examSys/ws/exam/getFinishedExamAvg?stuID="+id;
	var finishedExamAvg=null;

	finishedExamAvg=http.get(url_finishedExamAvg, function(res) {
	  console.log("@api/平均分数: code:" + res.statusCode);

	  res.on('data',function(data){
	  	process.stdout.write('@api/平均分数: data:'+data+'\n');
	  	// return data;
	  	cb(data);
	  });

	}).on('error', function(e) {
	  console.log("@api/平均分数:错误:" + e.message);
	  return '-';
	});
}



exports.getFinishedExamSum=getFinishedExamSum;
exports.getFinishedExamAvg=getFinishedExamAvg;