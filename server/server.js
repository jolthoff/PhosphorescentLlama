var express = require('express');
// var mongoose = require('mongoose');
// var morgan = require('morgan');
// var bodyParser = require('body-parser');
var app = express();
var paths = require('../paths.js');
// mongoose.connect('mongodb://localhost/parrot');

// app.use(morgan('dev'));
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());
console.log(__dirname);

app.get('/', function(req, res) {

  res.sendFile(paths.index);

});

app.use(express.static(paths.client));
app.use('/samples', express.static(__dirname + '/samples'));

var sequencerRouter = express.Router();

app.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

app.use('/', sequencerRouter);
require('./routers/sequencerRouter.js')(sequencerRouter);

app.listen(44100);

console.log('Parrot app listening on port: 44100');

module.exports = app;
