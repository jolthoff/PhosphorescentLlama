var express = require( 'express' );

var router = express.Router( );

var paths = require( '../../paths.js' );

var Sequencer = require(paths.models + '/sequencerModel.js');

var controller = require( paths.controllers + '/levelsController.js' );

router.get( /^\/\d{1,}$/, controller.getLevel );

router.post( '/', controller.saveLevel );

router.delete( /^\/\d{1,}$/, controller.deleteLevel );

router.put( '/', controller.updateLevel );

module.exports = router;
