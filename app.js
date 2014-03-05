
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');

var request = require('request');
var cheerio = require('cheerio');
var async = require('async')



  request('http://www.surfline.com/surf-cams-and-reports/', function(error, response, body) {
  $ = cheerio.load(body);
  links = $('.reportMap table strong a')
  linkArray = []
  superArray = []

  	for(var i = 0 ; i < links.length ; i++){
  		linkArray.push(links[i].attribs.href)
  		};

  	var steps = [];

 	for(var i = 0 ; i < linkArray.length ; i++){

 		var items = function(callback){

 		(function(url){
 		request('http://surfline.com' + url , function(error,response,body){
 		console.log(url)
 		$ = cheerio.load(body)
 		hyperLinks = $('#content table a')

 				for(var i = 0; i < hyperLinks.length; i++){
 					superArray.push(hyperLinks[i].attribs.href)
 				}


 		})})(linkArray[i])

 	}
 		steps.push(items)
 		console.log(steps)
 	}

 	async.parallel(steps,function(err,reults){
 		console.log(results)
 	})

});





var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
