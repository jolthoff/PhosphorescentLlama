var express = require('express');
var router = express.Router();
var paths = require( '../../paths.js' );
var Sequencer = require(paths.models + '/sequencerModel.js');
var controller = require( paths.controllers + '/levelsController.js' );

var isAuthenticated = function (request, response, next) {
  // if user is authenticated in the session, call the next() to call the next request handler
  // Passport adds this method to request object. A middleware is allowed to add properties to
  // request and response objects
  if (request.isAuthenticated())
    return next();
  // if the user is not authenticated then redirect him to the login page
  response.sendFile( paths.index );
};

module.exports = function(passport){

  /* GET root Page */
  router.get('/', isAuthenticated, function(request, response){
    response.redirect('/active'); // the user is authenticated. send to '/active'
  });

  /* Handle Login POST */
  router.post('/login', passport.authenticate('login', { // this might be a post to "/" depends on the UI.
    successRedirect: '/active', // active user view: just the play view with user info.
    failureRedirect: '/', // anonymous user view.
    failureFlash : true
  }));

  /* GET Signup Page */
  // This should be handled from the client side, as it is rendering a view for signup.

  /* Handle Signup POST */
  router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/active', // new user will be sent to active user view.
    failureRedirect: '/signup',
    failureFlash : true
  }));

  /* Handle Logout */
  router.get('/signout', function(request, response) {
    request.logout();
    response.redirect('/');
  });

  /* Handle Requests made to '/levels' */
  router.get( '/levels/:id', controller.getLevel );
  router.post( '/levels', controller.saveLevel );
  router.delete( '/levels/:id', controller.deleteLevel );
  router.put( '/levels', controller.updateLevel );

  return router;
};

