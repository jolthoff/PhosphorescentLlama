var mocha = require('mocha');

var chai = require('chai');

var mongoose = require('mongoose');

var paths = require('../paths.js');

var SequencerModel = require(paths.models + '/sequencerModel.js');

var Beat = require(paths.classes + '/Beat.js');

var Bus = require(paths.classes + '/Bus.js');

var Sequence = require(paths.classes + '/Sequence.js');

var Sequencer = require(paths.classes + '/Sequencer.js');

// Save a url for test server instantiated with mongo test
var dbURI = 'mongodb://localhost/parrot';

var clearDB = function ( done ) {

  mongoose.connection.collections['sequencers'].remove( done );

};

describe('Sequencer / Server Integration test', function () {






});
