
/**
 * Module dependencies.
 */

var nutriport = 3002;

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , db = require('./routes/db')
  , http = require('http')
  , jade = require('jade')
  , stylus = require('stylus')
  , nib = require('nib')
  , path = require('path')
  , mongojs = require('mongojs');

var nkDB = mongojs('nk');
var livsmedel = nkDB.collection('livsmedel');

var app = express();

function compile(str, path) {
  return stylus(str)
    .set('filename', path)
    .set('compress', true) // minimize filesize
    .use(nib());
}


// all environments
app.set('port', process.env.PORT || nutriport);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(stylus.middleware({
	src: __dirname + '/public',
	compile: compile
}));
app.use(app.router);
  app.use(require('stylus').middleware(__dirname + '/public'));
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/db', db.list);
app.get('/users', user.list);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
