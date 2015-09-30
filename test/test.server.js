var mocha = require( 'mocha' );

var chai = require( 'chai' );

var mongoose = require( 'mongoose' );

var paths = require( '../paths.js' );

var SequencerModel = require( paths.models + '/sequencerModel.js' );

var Controller = require( paths.controllers + '/levelsController.js' );

var Beat = require( paths.classes + '/Beat.js' );

var Bus = require( paths.classes + '/Bus.js' );

var Sequence = require( paths.classes + '/Sequence.js' );

var Sequencer = require( paths.classes + '/Sequencer.js' );

// Save a url for test server instantiated with mongo test
var dbURI = 'mongodb://localhost/parrot';

var clearDB = function ( done ) {

  mongoose.connection.collections['sequencers'].remove( done );

};

describe( 'Sequencer / Server Integration Test', function ( ) {

  // Connect to database before any tests
  before( function ( done ) {

    if( mongoose.connection.db ) return done( );

    mongoose.connect( dbURI, done );

  });

  // Clear database before each test and then seed it with example `sequencers` so that you can run tests
  beforeEach( function ( done ) {

    clearDB( function( ) {

      var sequencers = [

        {

          "tempo":120,

          "tickNumber":4,

          "soundIDs":["kick","clap"],

          "sequences":{

            "kick":[{"isOn":true},{"isOn":false},{"isOn":true},{"isOn":false}],

            "clap":[{"isOn":false},{"isOn":true},{"isOn":false},{"isOn":true}]

          }

        },

        {

          "tempo":180,

          "tickNumber":5,

          "soundIDs":["kick","clap"],

          "sequences":{

            "clap":[{"isOn":false},{"isOn":true},{"isOn":false},{"isOn":true},{"isOn":false}],

            "kick":[{"isOn":true},{"isOn":false},{"isOn":true},{"isOn":false},{"isOn":true}]

          }

        },

        {

          "tempo":240,

          "tickNumber":6,

          "soundIDs":["kick","clap"],

          "sequences":{

            "kick":[{"isOn":true},{"isOn":false},{"isOn":true},{"isOn":false},{"isOn":true},{"isOn":false}],

            "clap":[{"isOn":false},{"isOn":true},{"isOn":false},{"isOn":true},{"isOn":false},{"isOn":true}]

          }

        }

      ];

      // See http://mongoosejs.com/docs/models.html for details on the `create` method
      Sequencer.create( sequencers, done );

    });

  });

  it( 'should have a method that given the number of a level, retrieves its sequencer from the database', function ( done ) {

    var testRequest = new XMHHttpRequest();
    testRequest.open("GET", "/levels/1", true);
    testRequest.setRequestHeader("Content-Type", "application/json");
    testRequest.send();

    Controller.getLevel();

  });

  it( 'should have a method that saves its sequencer to the database', function ( done ) {

    var testRequest = new XMHHttpRequest();
    testRequest.open("POST", "/levels", true);
    testRequest.setRequestHeader("Content-Type", "application/json");
    testRequest.send();

    Controller.saveLevel();

  });

  it( 'should have a method that given the number of a level, removes its record from the database', function ( done ) {

    var testRequest = new XMHHttpRequest();
    testRequest.open("DELETE", "/levels/3", true);
    testRequest.setRequestHeader("Content-Type", "application/json");
    testRequest.send();

    Controller.deleteLevel();

  });

  it( 'should have a method that updates its record from the database', function ( done ) {

    var testRequest = new XMHHttpRequest();
    testRequest.open("PUT", "/levels/2", true);
    testRequest.setRequestHeader("Content-Type", "application/json");
    testRequest.send();

    Controller.updateLevel();

  });

});
