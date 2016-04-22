var http=require('http');
var express = require('express');
var router = express.Router();

var stuInfo={};//basicInfo

/* GET home page. */
router.get('/', function(req, res, next) {
  // res.render('index', { title: 'Express' });
  if(!(req.cookies.user)){
  	res.render('index');
  }else{
  	res.redirect('/app/main');
  }
});

//认证是否登陆
router.get('/app/*', function(req, res, next) {
  if(!(req.cookies.user)){
  	res.redirect('/');
  }else{
	next();
  }
});
//首页路由
router.get('/app/main', function(req, res, next) {
  var mainData=require('../api/main_data.js');
  //将基础登录数据作为参数传入
  mainData.getMainData(stuInfo,function(data){
  	// console.log('@route/mainData:'+data);
  	//将基础登录数据添加进首页数据
  	// data.basicInfo=stuInfo;
	res.render('main',data,function(err,html){
		if(err){
			console.log('@router-main-render-error:'+err);	
		}else {
			res.send(html);
		}
	});
  });
});
//考试页面路由
//考题缓存
var examDataCache=null;
var examIDCache='-1';
router.get('/app/exam', function(req, res, next) {
	var examData=require('../api/exam_data.js');
	var examID=req.query.id;
	var qNumber=req.query.qNumber||1;
	var examInfo=(req.query.examInfo)?JSON.parse(req.query.examInfo):{};
	//若缓存不存在或更换了考试，则重新获取数据
	if((!examDataCache)||(examID!=examIDCache)){
		examData.getExamData(12880234,examID,qNumber,examInfo,function(data){
			examDataCache=data;
			examIDCache=examID;
			examDataCache.questionNumber=qNumber;
			examDataCache.examID=examID;
			res.render('exam',examDataCache);
			console.log('@route/--nocache!');
		});
	}else{
		examDataCache.questionNumber=qNumber;
		res.render('exam',examDataCache);
		console.log('@route/examDataCache:okokokokokokokokok');
		console.log('@route/qNumber:'+examDataCache.questionNumber);
	}
});
router.get('/app/answersheet', function(req, res, next) {
	examDataCache.basicInfo=stuInfo;
	res.render('answersheet',examDataCache);
});
router.get('/app/:pageName', function(req, res, next) {
	var pageName=req.params.pageName;
	res.render(pageName);
});


//转发登录请求至Java服务器
router.get('/func/login', function(req, res, next) {
	var userName=req.query.userName;
	var password=req.query.password;

	var reqOption = {
		host : '121.42.179.184', // here only the domain name
		port : 8080,
		path : '/examSys/ws/login/check?userName='+userName+'&password='+password,
		method : 'POST' // do GET
	};
	console.log('@login:open connention');
	var reqGet=http.request(reqOption,function(hRes){
		var loginCode=hRes.statusCode;
		console.log('@login init connention--');
		console.log('@login hRes.statusCode:'+loginCode);
		if(loginCode==200){
			hRes.on('data',function(d){
				console.log('@login:got response');
				process.stdout.write(d+'\n');
				if(d=='no match'){
					res.statusCode = 401;
					res.send(d);
				}else{
					res.setHeader("Content-Type", "application/json; charset=utf-8");
					res.cookie('user',userName,{
						maxAge: 18000000,
						httpOnly:true, 
						path:'/'
					});
					res.send(d);
					//将登录数据赋值给全局学生资料stuInfo
					var loginInfo=JSON.parse(d);
					for(var key in loginInfo){
						stuInfo[key]=loginInfo[key];
					}
					console.log('@login stuInfo:{');
					for(var key in loginInfo){
						console.log(key+':'+stuInfo[key]);
					}
					console.log('}');
				}
			});
		}else{
			res.statusCode = loginCode;
			res.end();
		}	
	});
	reqGet.end();
	reqGet.on('error',function(e){
		console.error(e);
	});
});
router.get('/func/logout',function(req,res,next){
	res.clearCookie('user');
	res.redirect('/');
});

module.exports = router;
