app.controller( 'TargetSequencerController', [ '$scope', function (  $scope ) {

  //listens for event and creates targetSequencer from server data
  //sends targetSequencer back to gameController
  $scope.$on( 'createTargetSequencer', function( event, response ) {

    $scope.sequencer = Sequencer.prototype.retrieve( response.data );

    $scope.$emit( 'madeTargetSequencer', $scope.sequencer );

  });

  $scope.$on( 'targetStopPlaying', function ( ) {

    $scope.sequencer.stop( );

  });

  $scope.playToggle = function ( ) {

    if ( $scope.sequencer._playing ) {

      $scope.sequencer.stop( );

    } else {

      $scope.sequencer.play( );

      $scope.$emit( 'targetSequencerPlaying' );

    }
    
  };

}]);
