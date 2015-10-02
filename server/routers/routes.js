var express = require('express');

var router = express.Router();

var paths = require( '../../paths.js' );

var Sequencer = require( paths.models + '/sequencerModel.js');

var levelsController = require( paths.controllers + '/levelsController.js' );

var usersController = require( paths.controllers + '/usersController.js' );

module.exports = function( passport ){

  // Authenticate requests to '/'

  router.get( '/', function( request, response, next ) {

    if ( request.isAuthenticated( ) ) {

      response.redirect( '/active' );

    } else {

      response.sendFile( paths.index );

    }

  });

  // Attach user info to the header for active routes

  router.use( '/active', usersController.findUserById );

  // Authenticate requests to '/active'

  router.get( '/active', function( request, response, next ) {

    if( request.isAuthenticated( ) ) {

      response.sendFile( paths.index );

    } else {

      response.redirect( '/' );

    }

  });

  router.use( '/', express.static( paths.client ) );

  router.use( '/samples', express.static( paths.samples ) );

  /* Handle Login POST */

  router.post('/login', passport.authenticate('login', {

    successRedirect: '/active', // active user view: just the play view with user info.

    failureRedirect: '/' // anonymous user view.

  }));

  /* Handle Signup POST */

  router.post( '/signup', passport.authenticate( 'signup', {

    successRedirect: '/active', // new user will be sent to active user view.

    failureRedirect: '/'

  }));

  /* Handle Logout */
  router.post('/logout', function( request, response ) {

    request.logout( );

    response.redirect( '/' );

  });

  /* Handle requests to '/users' */

  router.put( '/users', usersController.updateLevel );

  /* Handle Requests to '/levels' */

  router.get( '/levels/:id', levelsController.getLevel );

  router.post( '/levels', levelsController.saveLevel );

  router.delete( '/levels/:id', levelsController.deleteLevel );

  router.put( '/levels', levelsController.updateLevel );

  return router;

};
