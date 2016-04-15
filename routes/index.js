var http=require('http');
var express = require('express');
var router = express.Router();

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
  mainData.getMainData(12880234,function(data){
  	console.log('@route/mainData:'+data);
  	//data:{finishedExamSum:[],finishedExamAvg:[],}
	res.render('main',data);
  });
});
//考试页面路由
//考题缓存
var examDataCache=null;
router.get('/app/exam', function(req, res, next) {
	var examData=require('../api/exam_data.js');
	var examID=req.query.id;
	var qNumber=req.query.qNumber||1;
	if(!examDataCache){
		examData.getExamData(12880234,examID,qNumber,function(data){
			console.log('@route/examData:'+data);
			res.render('exam',data);
			examDataCache=data;
		});
	}else{
		examDataCache.questionNumber=qNumber;
		res.render('exam',examDataCache);
		console.log('@route/examDataCache:'+examDataCache);
		console.log('@route/qNumber:'+examDataCache.questionNumber);
	}
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
		method : 'GET' // do GET
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
						maxAge: 1440000,
						httpOnly:true, 
						path:'/'
					});
					res.send(d);
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
