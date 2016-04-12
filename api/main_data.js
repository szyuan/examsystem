'use strict'

var http=require('http');
var express = require('express');
var async=require('async')


exports.getMainData=function(id,callback){
		
	async.parallel([
		//已完成考试数量
		function(cb){
			getFinishedExamSum(id,function(data){
				cb(null,data);
			});
		},
		//平均分数
		function(cb){
			getFinishedExamAvg(id,function(data){
				cb(null,data);
			});
		}
	],function(err, results){
		var mainData={finishedExamSum:results[0],finishedExamAvg:results[1]}
		callback(mainData);
		return mainData;
	});
}

//---------------单独功能方法--------------------

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