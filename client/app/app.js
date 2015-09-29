var app = angular.module( 'app', [] );


app.controller('GameController' , ['$scope', 'playerSequencer', 'targetSequencer', 'httpFactory', 'initialize',  function ( $scope, playerSequencer, targetSequencer, httpFactory, initialize ) {

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

  ////////////////LISTENERS///////////////
  $scope.$on('madePlayerSequencer', function ( event, data ) {
    $scope.playerSequencer = data;
  });

  $scope.$on('madeTargetSequencer', function ( event, data ) {
    $scope.targetSequencer = data;
  });


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
    if ($scope.playerSequencer.match($scope.targetSequencer)) {
      console.log('IT\'S A MATCH!');
    } else {
      console.log('YOU SUCK!');
    }
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

  };


  //THIS IS A TEST - DELETE THIS LATER SO THAT ACTUAL INIT WORKS
  $scope.initialize(function() {
    // http.getSequencer(1, function ( data ) {
    //   $scope.$broadcast('createTargetSequencer', data);
    // });
    $scope.$broadcast('createSequencer');
    $scope.$broadcast('createTargetSequencer', [240, 4, ['kick', 'clap', 'hihat']]);

    
  });

}]);

app.controller('PlayerSequencerController', ['$scope', 'playerSequencer', function ( $scope, playerSequencer ) {


  $scope.$on('createSequencer', function() {
    console.log("am i listening?");
    $scope.sequencer = playerSequencer.build(240, 4, ['kick', 'clap', 'hihat']);
    $scope.sequences = $scope.sequencer._sequences;
    $scope.sequencer.beatClass = "four";
    $scope.$emit('madePlayerSequencer', $scope.sequencer);
  });

}]);

app.controller('TargetSequencerController', ['$scope', 'targetSequencer', function ( $scope, targetSequencer ) {


  $scope.$on('createTargetSequencer', function(event, data) {
    console.log(data);
    $scope.sequencer = targetSequencer.build.apply(this, data);
    console.log($scope.sequencer);
    $scope.sequencer.toggleBeat(0,0);
    $scope.sequencer.toggleBeat(1,2);
    // $scope.sequencer.toggleBeat(0,4);
    // $scope.sequencer.toggleBeat(0,6);
    $scope.$emit('madeTargetSequencer', $scope.sequencer);
    // $scope.sequencer = Sequencer.prototype.retrieve(data.body);
  });

}]);
