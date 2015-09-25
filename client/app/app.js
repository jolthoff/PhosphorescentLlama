var app = angular.module( 'app', [] );


app.controller('GameController' , ['$scope', 'playerSequencer', 'httpFactory', 'initialize',  function ( $scope, playerSequencer, httpFactory, initialize ) {

  $scope.playerTurnOn = false;

  $scope.level = 1;
  
 
    // $scope.targetSequencer.play(); //for two loops?
    
 

  //init
    //start level
      //start playing their loop
    //wait for player input
      //player can toggle beats
      //player can play target again
    //player clicks submit
      //call submit fn
        //check if player sequencer matches target sequencer
        //if so
          //call winning function
            //fun winning animation
            //option to go to next level or exit? or try level again?
              //if next level
                //increment level
                //call start level fn on new level
              //else if exit
                //say goodbye and make them feel guilty for leaving
              //else if try again
                //call start level fn on current level
        //else
          //get difference
          //highlight correct
          //erase incorrect


  //use http call to fetch target sequence

  $scope.getSequencer = function () {
    httpFactory.getSequencer(1, function (data) {
      $scope.targetSequencer = Sequencer.prototype.retrieve(data.body);
      // $scope.sequencer = playerSequencer.sequencer(
      //   $scope.targetSequencer.getTicknumber(),
      //   $scope.targetSequencer.getTempo(),
      //   $scope.targetSequencer.getSoundIDs());
    });
  };


  $scope.startLevel = function () {
    //play through sounds, 1 measure each
    //toggle player turn off
    $scope.playerTurnOn = false;
    //play target sequencer twice
    $scope.targetSequencer.play();
    //toggle player turn on
    $scope.playerTurnOn = true;
  };

  $scope.submit = function () {
    if ($scope.sequencer.match($scope.targetSequencer)) {
      //initiate playerWon function
    } else {
      //get difference between right and wrong
    }
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

  $scope.initialize = function(callback) {
    initialize.initialize(callback);
  };

  $scope.toggleBeat = function(sequenceIndex, beatIndex) {

    $scope.sequencer.toggleBeat(sequenceIndex, beatIndex);

    
    if ($scope.sequencer.getBeat(sequenceIndex, beatIndex).isOn()) {

      

    }

  }

  $scope.initialize(function() {
    $scope.sequencer = playerSequencer.sequencer(240, 16, ['kick', 'clap', 'hihat']);
    $scope.sequences = $scope.sequencer._sequences;
    $scope.sequencer.beatClass = "sixteen";
  });

}]);

app.controller('SequencerController', ['$scope', 'playerSequencer', function ( $scope, playerSequencer ) {

  // $scope.sequencer = playerSequencer.sequencer(120, 4, ['kick', 'clap', 'hihat']);
  // $scope.sequences = $scope.sequencer._sequences;

  // $scope.sequencer = {};

  // $scope.sequencer.beatClass = "eight";

  // $scope.sequencer.toggleBeat = function(sequencerIndex, beatIndex) { console.log(sequencerIndex, beatIndex);};

  // $scope.sequences = [
  //   {
  //     beats: [1, 2, 3, 4, 5, 6, 7, 8]
  //   },
  //   {
  //     beats: [1, 2, 3, 4]
  //   },
  //   {
  //     beats: [1, 2, 3, 4]
  //   },
  //   {
  //     beats: [1, 2, 3, 4]
  //   }
  // ];

}]);
