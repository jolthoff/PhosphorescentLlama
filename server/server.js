var express = require('express');
// var mongoose = require('mongoose');
// var morgan = require('morgan');
// var bodyParser = require('body-parser');
var app = express();

// mongoose.connect('mongodb://localhost/parrot');

// app.use(morgan('dev'));
// app.use(bodyParser.urlencoded({extended: true}));
// app.use(bodyParser.json());
app.use(express.static(__dirname + '../client'));
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
