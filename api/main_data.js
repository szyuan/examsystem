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
		// var mainData={
		// 	finishedExamSum:200,
		// 	finishedExamAvg:82.3,
		// 	currentExam:[{
		// 		status_code:1	//1-即将开始 2-正在进行  0-合格 -1-不合格
		// 		status:'即将开始',
		// 		title:'移动web开发期末小测验',
		// 		teacher:'周润发',
		// 		totalMinutes:88,
		// 		createTime:'2017-08-02 8:20'
		// 	},{
		// 		status_code:2	//1-即将开始 2-正在进行  0-合格 -1-不合格
		// 		status:'正在进行',
		// 		title:'算法设计期末考试'
		// 		teacher:'刘德华',
		// 		totalMinutes:119,
		// 		createTime:'2017-08-03 9:30'
		// 	}],
		// 	finishedExam:[{
		// 		status_code:0	//1-即将开始 2-正在进行  0-合格 -1-不合格
		// 		status:'合格',
		// 		score:82,
		// 		title:'x移动web开发期末小测验',
		// 		teacher:'周润发',
		// 		totalMinutes:88,
		// 		createTime:'2017-08-02 8:20'
		// 	},{
		// 		status_code:1	//1-即将开始 2-正在进行  0-合格 -1-不合格
		// 		status:'不合格',
		// 		score:59,
		// 		title:'y算法设计期末考试'
		// 		teacher:'刘德华',
		// 		totalMinutes:119,
		// 		createTime:'2017-08-03 9:30'
		// 	}]
		// };
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