'use strict'

var http=require('http');
var express = require('express');
var async=require('async');


exports.getExamData=function(id,examID,questionNumber,callback){
	var examData={
		examType:0,
		examInfo:{},
		questions:[],
		wrongID:[],
		QuestionNumber:1,
		currentQuestion:{},
		questionNumber:questionNumber
	}

	async.parallel([
		
	],function(err, results){
		examData=getSim();
		examData.currentQuestion=examData.questions[questionNumber-1];
		callback(examData);
		return examData;
	});
}

//---------------单独功能方法--------------------

//-----------------模拟数据----------------------
function getSim(questionNumber){
	var examModal={
		QuestionNumber:1,//当前题号
		examType:0,//类型【考试/历史】
		examInfo:{
			id:1,
			title:'data-移动Web开发期末测验',
			startTime:'Sun Apr 17 2016 13:00:00',
			// startTime:'2016-04-15T10:10:00',
			totalTime:'90',
			questionSum:3,
			teacher:'秦高德0'
		},
		questions:[
			{
				id:1,//题目id
				number:1,//在考试中的题号
				type:0,//题目类型【0单选/1双选】
				title:'1以下关于mysql复制关系，描述错误的一项是?请给出这段代码的运行结果',//题干
				code:'',//若存在代码，则存放题目代码
				answer:[//答案数组【[{答案id,答案内容},{},...]】
					{
						id:'A',
						content:'1给元素绑定样式'
					},{
						id:'B',
						content:'1显示隐藏'
					},{
						id:'C',
						content:'1var myDiv = document.getElementById ("statusCode");	myDiv.innerHTML = req.statusCode;'
					},{
						id:'D',
						content:'1给元素绑定样式'
					}
				]
			},
			{
				id:2,
				number:2,
				type:1,
				title:'2请给出这段代码的运行结果,复制关系关于mysql，描述错误的一项是?',
				code:'',
				answer:[
					{
						id:'A',
						content:'2给元素绑定样式'
					},{
						id:'B',
						content:'2显示隐藏'
					},{
						id:'C',
						content:'2var myDiv = document.getElementById ("statusCode");	myDiv.innerHTML = req.statusCode;'
					},{
						id:'D',
						content:'2给元素绑定样式'
					}
				]
			},
			{
				id:3,
				number:3,
				type:0,
				title:'3描述错误的一项是,复制关系关于mysql，请给出这段代码的运行结果',
				code:'',
				answer:[
					{
						id:6,
						content:'3给元素绑定样式'
					},{
						id:7,
						content:'显示隐藏'
					},{
						id:8,
						content:'var myDiv = document.getElementById ("statusCode");	myDiv.innerHTML = req.statusCode;'
					},{
						id:9,
						content:'给元素绑定样式'
					}
				]
			}
		],
		wrongID:[]
	};
	return examModal;
}