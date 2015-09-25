var express = require('express');

var mongoose = require('mongoose');

// var morgan = require('morgan');

var bodyParser = require('body-parser');

var paths = require('../paths.js');

var Sequencer = require(paths.models + '/sequencerModel.js');

mongoose.connect('mongodb://localhost/parrot');

var app = express();

// app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.get('/', function(req, res) {

  res.sendFile(paths.index);

});

app.use(express.static(paths.client));

app.use('/samples', express.static(paths.samples));

app.use( '/levels', function( request, response, next ) {

  if( request.method === 'GET' ) {

    var level = +request.url.split('/')[1];

    Sequencer.findOne({'level': level}, 'data', function(err, sequencer) {
      if (err) { response.send(500, err); }
      else if (!sequencer) { response.send(404); }
      else response.send(sequencer.data);
    });

  }

});

app.post( '/levels', function( request, response, next ) {

  var sequencer = new Sequencer(); // create a document
  sequencer.level = request.body.level;
  sequencer.data = request.body.data;

  // callback function happenes after saving data
  sequencer.save(function(err){
    if (err) { response.send(500, err); }
    else response.send(201);
  });

});



app.listen(44100);

console.log('Parrot app listening on port: 44100');

module.exports = app;
