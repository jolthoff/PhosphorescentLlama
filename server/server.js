var express = require('express');
var paths = require('../paths.js');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var passport = require('passport');
var expressSession = require('express-session');
var flash = require('connect-flash');
var initPassport = require('./passport/init');
var router = require( paths.routers + '/routes.js' );
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/parrot');

var app = express();

app.use( bodyParser.urlencoded({extended: true}) );
app.use( bodyParser.json() );
app.use( cookieParser );
app.use( expressSession({secret: 'mySecretKey'}) );
app.use( passport.initialize() );
app.use( passport.session() );
app.use( flash() );
initPassport( passport );

var routes = require('./routers/routes.js')(passport);
app.use('/', routes);

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen( 44100 );
console.log( 'Parrot app listening on port: 44100' );
module.exports = app;
