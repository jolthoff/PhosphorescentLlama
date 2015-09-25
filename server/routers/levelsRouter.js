var express = require( 'express' );

var router = express.Router( );

var paths = require( '../../paths.js' );

var controller = require(paths.controllers + '/levelsController.js');

// router.get or app.use will need the first argument as a full url

router.get( /^\/\d{1,}$/, controller.getLevel);

router.post( '/', controller.saveLevel);

module.exports = router;