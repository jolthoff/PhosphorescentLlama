var app = angular.module( 'app', [] );

app.controller('GameController' , ['$scope', 'playerSequencer', 'targetSequencer', function ( $scope, playerSequencer, targetSequencer ) {
  //will hold game logic

  //upon initialization
  //use http thing to make request to the server for the sequence
  //call the sequencer function on the target sequencer with the stuff from the http response
  //call the getTickNumber, getTempo, and getSoundIDs on the targetSequencer
  //pass those results on to the player sequencer and set that to the $scope as sequencer

  //store result of httpreq in a variable (response)
  //targetSequencer.sequencer(stuff from response)
  //$scope.sequencer = playerSequencer.sequencer(targetSequencer.getTicknumber, targetSequencer.getTempo, targetSequencer.getSoundIDs)


}]);

app.controller('SequencerController', ['$scope', 'playerSequencer', 'targetSequencer', function ( $scope, playerSequencer, targetSequencer ) {

  $scope.sequencer = {};

  $scope.sequencer.toggleBeat = function(sequencerIndex, beatIndex) { console.log(sequencerIndex, beatIndex);};

  $scope.sequences = [
    {
      beats: [1, 2, 3, 4]
    },
    {
      beats: [1, 2, 3, 4]
    },
    {
      beats: [1, 2, 3, 4]
    },
    {
      beats: [1, 2, 3, 4]
    }
  ];
  //associated with a sequencer instance

  //init THIS OR $SCOPE?!
  // $scope.play = $sequencer.play;
  // $scope.stop = $sequencer.stop;
  // $scope.save = $sequencer.save;



  //play function
  //stop function
  //save function
  //getSequence function
}]);
