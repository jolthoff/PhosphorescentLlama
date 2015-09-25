var express = require( 'express' );

var paths = require( '../../paths.js' );

var levelsRouter = require( paths.routers + '/levelsRouter' );

var router = express.Router( );

// serve index.html for requests to the root

router.get('/', function( request, response, next ) {

  response.sendFile( paths.index );

});

// else, serve static client-side files

router.use( express.static( paths.client ) );

// else, serve sample files

router.use( '/samples', express.static( paths.samples ) );

// else, route requests to subRouters

router.use( '/levels', levelsRouter );

module.exports = router;