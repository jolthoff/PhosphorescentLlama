app.controller( 'GameController' , [ '$scope', 'playerSequencer', 'httpFactory', 'initialize',  function ( $scope, playerSequencer, httpFactory, initialize ) {

  //until we get user data, initialize level to 1
  $scope.level = 1;
  
  //makes call to server and passes sequencer data to the target sequencer controller
  $scope.getSequencer = function ( ) {

    httpFactory.getSequencer( $scope.level, function ( data ) {

      $scope.$broadcast( 'createTargetSequencer', data );

    });

  };


  //should play target sequencer twice, then hand control over to player
  $scope.startLevel = function ( ) {

    //call initialization function to set audio context on the window
    //which must exist before the sequencers are made
    initialize( $scope.getSequencer );

  };

  //when player submits their sequencer pattern, check if it matches target sequencer
  //if so, trigger end of level events
  //else, give feedback and wait for next submission
  $scope.submit = function ( ) {

    $scope.playerSequencer.stop( );

    $scope.targetSequencer.stop( );

    if ( $scope.playerSequencer.match( $scope.targetSequencer ) ) {

      $scope.playerWon( );

    } else {

      $scope.failedMatch( );

    }

  };

  // $scope.playSoundExamples = function ( ) { };

  $scope.playerWon = function ( ) {

    alert( 'IT\'S A MATCH!' );

    $scope.level++;

    $scope.startLevel( );

  };

  $scope.failedMatch = function ( ) {

    $scope.removeWrongBeats( );

    alert( 'Not quite there yet! Keep trying. Your wrong beats have been removed.' );

  };

  $scope.removeWrongBeats = function ( ) {

    var wrongBeats = $scope.playerSequencer.getWrongBeats( $scope.targetSequencer );

    $scope.$broadcast( 'toggleWrongBeatsOff', wrongBeats );

  };


  /////////////////
  //
  //
  // EVENT HANDLERS
  //
  //
  /////////////////

  //when target sequencer is created, set pointer to TS as property of game controller
  //then pass that to the player sequencer controller
  $scope.$on( 'madeTargetSequencer', function ( event, targetSequencer ) {

    $scope.targetSequencer = targetSequencer;

    //I feel like this should live in a difference place
    $scope.targetSequencer.play( );

    $scope.$broadcast( 'createPlayerSequencer', $scope.targetSequencer );

  });

  //when player sequencer is created, set pointer to PS as property of game controller
  $scope.$on( 'madePlayerSequencer', function ( event, playerSequencer ) {

    $scope.playerSequencer = playerSequencer;

  });

  //makes playing sequencers mutually exclusive
  $scope.$on( 'targetSequencerPlaying', function ( ) {

    $scope.$broadcast( 'playerStopPlaying' );

  });

  //makes playing sequencers mutually exclusive
  $scope.$on( 'playerSequencerPlaying', function ( ) {

    $scope.$broadcast( 'targetStopPlaying' );

  });

  $scope.startLevel( );

}]);
