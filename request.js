var express=require("express");
var https = require('http');
// var http
var fs = require('fs');


var optionsget = {
	host : '121.42.179.184', // here only the domain name
	port : 8080,
	path : '/examSys/ws/login/check?userName=12880288&password=12880288', // the rest of the url with parameters if needed
	method : 'GET' // do GET
};
var optionsget2 = {
	host : '121.42.179.184', // here only the domain name
	port : 8080,
	path : '/examSys/ws/exam/getExamsByClassID?classID=1', // the rest of the url with parameters if needed
	method : 'GET' // do GET
};

console.info('Options prepared:');
console.info(optionsget);
console.info('Do the GET call');

// do the GET request
var reqGet = https.request(optionsget, function(res) {
	console.log("statusCode: ", res.statusCode);

	res.on('data', function(d) {
		console.info('GET result:\n');
		process.stdout.write(d);
		console.info('\n\nCall completed');
	});

});

reqGet.end();
reqGet.on('error', function(e) {
	console.error(e);
});
