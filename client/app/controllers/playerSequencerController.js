app.controller( 'PlayerSequencerController', [ '$scope', 'playerSequencer', function ( $scope, playerSequencer ) {

  //change tickNumber to word so that CSS class works properly
  var numToWord = {

    '4': 'four',

    '8': 'eight',

    '16': 'sixteen'

  };

  //listens for event and creates empty player sequencer that matches target sequencer's parameters
  //sets pointer to sequences as property of playerSequencer Controller (for ng-repeat to work)
  //sets beatClass for proper rendering
  //sends playerSequencer back to gameController
  $scope.$on( 'createPlayerSequencer', function( event, data ) {

    var tickNumber = data.getTickNumber( );

    var tempo = data.getTempo( );

    var soundIDs = data.getSoundIDs( );

    $scope.sequencer = playerSequencer.build( tempo, tickNumber, soundIDs );

    $scope.sequences = $scope.sequencer._sequences;

    $scope.sequencer.beatClass = numToWord[ tickNumber ];

    $scope.$emit( 'madePlayerSequencer', $scope.sequencer );

  });

  $scope.$on( 'playerStopPlaying', function ( ) {

    $scope.sequencer.stop( );

  });

  $scope.playToggle = function ( ) {

    if ( $scope.sequencer._playing ) {

      $scope.sequencer.stop( );

    } else {

      $scope.sequencer.play( );

      $scope.$emit( 'playerSequencerPlaying' );

    }

  };

  //when player clicks button, toggle beat so it will play
  $scope.toggleBeat = function( sequenceIndex, beatIndex ) {

    $scope.sequencer.toggleBeat( sequenceIndex, beatIndex );

  };

}]);
