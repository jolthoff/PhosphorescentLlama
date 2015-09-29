var express = require( 'express' );

var router = express.Router( );

var paths = require( '../../paths.js' );

var Sequencer = require(paths.models + '/sequencerModel.js');

router.get( /^\/\d{1,}$/, function( request, response, next ) {

  var level = +request.url.split('/')[1];

  Sequencer.findOne({'level': level}, 'data', function(error, sequencer) {

    if ( error ) {

      response.send( 500, error );

    } else if ( !sequencer ) {
      
      error = "Level " + level + " does not exist.";

      error += "\nTo create a new level, post to /levels with 'content-type' as 'application/json',";

      error += "\nand request body as the stringified counterpart of an object with a level property";

      error += "\nand a data property, where level is the level number and data is the result of calling";

      error += "\nSequencer.prototype.save on the level's sequencer.";

      response.send( 404, error );

    } else {

      response.send( 200, sequencer.data );

    }

  });

});

router.post( '/', function( request, response, next ) {

  var sequencer = new Sequencer();

  sequencer.level = request.body.level;

  sequencer.data = request.body.data;

  sequencer.save(function( error ){

    if ( error ) {

      response.send( 500, error );

    } else {

      response.send( 201 );

    }

  });

});

module.exports = router;
