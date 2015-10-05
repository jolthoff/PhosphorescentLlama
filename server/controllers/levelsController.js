var Sequencer = require('../models/sequencerModel.js');

var controller = {};

  // get data from database by making POST request
controller.getLevel = function( request, response, next ) {

  var level = request.params.id;

  Sequencer.findOne({'level': level}, 'data', function(error, sequencer) {

    if ( error ) {

      response.send( 500, error );

    } else if ( !sequencer ) {

      error = "Level " + level + " does not exist.";

      error += "\nTo create a new level, post to /levels with 'content-type' as 'application/json',";

      error += "\nand request body as the stringified counterpart of an object with a level property";

      error += "\nand a data property, where level is the level number and data is the result of calling";

      error += "\nSequencer.prototype.save on the level's sequencer.";

      response.status( 404 ).send( error );

    } else {

      response.status( 200 ).send( sequencer.data );

    }

  });

};

// save data to database by making GET request
controller.saveLevel = function( request, response, next ) {

  var sequencer = new Sequencer( );

  sequencer.level = request.body.level;

  sequencer.data = request.body.data;

  Sequencer.findOne( { level: sequencer.level }, function( err, found ) {

    if ( err ) {

      throw error;

    } else if ( found ) {

      response.status( 201 ).send( );

    } else if ( !found ) {

      sequencer.save(function( error ){

        if ( error ) {

          response.status( 500 ).send( error );

        } else {

          response.status( 201 ).send();

        }

      });

    }
    
  });

};

controller.deleteLevel = function( request, response, next ) {

  var level = request.params.id;

  Sequencer.remove( {'level': level }, function( error ) {

    if ( error ) {

      response.status( 400 ).send( error );

    } else {

      response.status( 200 ).send( );

    }

  });

};

controller.updateLevel = function( request, response, next ) {

  var level = request.body.level;

  var data = request.body.data;

  Sequencer.findOneAndUpdate( { 'level': level }, { $set: { 'data': data } }, function( error ) {

    if ( error ) {

      response.status( 400 ).send( error );

    } else {

      response.status( 200 ).send();

    }

  });

};

module.exports = controller;

controller.getLastLevel = function ( request, response, next ) {

  Sequencer.count( {} , function( error, count ) {

    if( error ) {

      //add better error handling here
      next( );

    } else {

      response.set( {

        lastLevel: count

      });

      next( );

    }

  });

};
