var http = require('http');
var express = require('express')
	port = parseInt(process.env.PORT,10) || 8080;
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var midware = require('./lib/midware');

var app = express();
var Config = require('./lib/config');
var config = Config().getProdConfig();

app.config = config;

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '/app/')));

app.all('/*', midware.header);

//API
require('./api/crud')(app);

http.createServer(app).listen(port, '0.0.0.0', function(){
	console.log('Server start at localhost:' + port);
});
