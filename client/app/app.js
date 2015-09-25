var app = angular.module( 'app', [] );

app.controller('GameController' , ['$scope', 'playerSequencer', 'httpFactory', function ( $scope, playerSequencer, httpFactory ) {
  
  //at loading time

  //use http call to fetch target sequence
  // httpFactory.getSequencer(1, function (data) {
  //   $scope.targetSequencer = Sequencer.prototype.retrieve(data.body);
  //   $scope.sequencer = playerSequencer.sequencer(
  //     $scope.targetSequencer.getTicknumber(),
  //     $scope.targetSequencer.getTempo(),
  //     $scope.targetSequencer.getSoundIDs());
  // });

  //.then takes response.body
  //var targetSequencer Sequencer.prototype.retrieve(response.body)
    //on success
      //set target sequencer
      //set player sequencer;

  $scope.submit = function () {
    //call isMatch on playerSeq and targetSeq
    //if true
      //call playerWon
    //else
      //failed match
  };

  $scope.isMatch = function () {
    //return bool
  };

  $scope.playerWon = function () {
    //render some stuff to show that they won
    //hide some things
    //end level
  };

  $scope.failedMatch = function () {
    //tells them they were wrong
    //keeps their correct guesses
    //deletes their wrong guesses
    //all with visual cues
  };

}]);

app.controller('SequencerController', ['$scope', 'playerSequencer', function ( $scope, playerSequencer ) {


  $scope.sequencer = {};

  $scope.sequencer.beatClass = "eight";

  $scope.sequencer.toggleBeat = function(sequencerIndex, beatIndex) { console.log(sequencerIndex, beatIndex);};

  $scope.sequences = [
    {
      beats: [1, 2, 3, 4, 5, 6, 7, 8]
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
