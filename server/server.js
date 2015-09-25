var express = require('express');

var mongoose = require('mongoose');

// var morgan = require('morgan');

var bodyParser = require('body-parser');

var paths = require('../paths.js');

var Sequencer = require(paths.models + '/sequencerModel.js');

var router = require( paths.routers + '/router.js' );

mongoose.connect('mongodb://localhost/parrot');

var app = express();

// app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.use( router );

app.listen(44100);

console.log('Parrot app listening on port: 44100');

module.exports = app;
