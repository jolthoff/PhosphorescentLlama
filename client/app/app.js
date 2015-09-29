var app = angular.module( 'app', [] );


app.controller('GameController' , ['$scope', 'playerSequencer', 'httpFactory', 'initialize',  function ( $scope, playerSequencer, httpFactory, initialize ) {

 
    // $scope.targetSequencer.play(); //for two loops?

  //initialize
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


  $scope.playerTurnOn = false;

  $scope.level = 1;
  
  //use http call to fetch target sequence

  //makes call to server and passes sequencer data to the target sequencer controller
  $scope.getSequencer = function () {

    httpFactory.getSequencer($scope.level, function (data) {

      $scope.$broadcast('createTargetSequencer', data);

    });

  };

  //when target sequencer is created, set pointer to TS as property of game controller
  //then pass that to the player sequencer controller
  $scope.$on('madeTargetSequencer', function ( event, targetSequencer ) {
    $scope.targetSequencer = targetSequencer;
    $scope.$broadcast('createPlayerSequencer', $scope.targetSequencer);
  });

  //when player sequencer is created, set pointer to PS as property of game controller
  $scope.$on('madePlayerSequencer', function ( event, playerSequencer ) {
    $scope.playerSequencer = playerSequencer;
  });

  //makes playing sequencers mutually exclusive
  $scope.$on('targetSequencerPlaying', function () {
    $scope.$broadcast('playerStopPlaying');
  });

  //makes playing sequencers mutually exclusive
  $scope.$on('playerSequencerPlaying', function () {
    $scope.$broadcast('targetStopPlaying');
  });

  //(needs work)
  //should play target sequencer twice, then hand control over to player
  $scope.startLevel = function () {
    //play through sounds, 1 measure each
    //toggle player turn off
    $scope.playerTurnOn = false;
    //play target sequencer twice
    $scope.targetSequencer.play();
    //toggle player turn on
    $scope.playerTurnOn = true;
  };

  //when player submits their sequencer pattern, check if it matches target sequencer
  //if so, trigger end of level events
  //else, give feedback and wait for next submission
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

  //THIS IS A TEST - DELETE THIS LATER SO THAT ACTUAL initialize WORKS
    //tests
    // $scope.$broadcast('createSequencer');
    // $scope.$broadcast('createTargetSequencer', [240, 4, ['kick', 'clap', 'hihat']]);

  //call initialization function to set audio context on the window
  //which must exist before the sequencers are made
  initialize($scope.getSequencer);

}]);

app.controller('PlayerSequencerController', ['$scope', 'playerSequencer', function ( $scope, playerSequencer ) {

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
  $scope.$on('createPlayerSequencer', function(event, data) {
    var tickNumber = data.getTickNumber();
    var tempo = data.getTempo();
    var soundIDs = data.getSoundIDs();

    $scope.sequencer = playerSequencer.build(tempo, tickNumber, soundIDs);
    $scope.sequences = $scope.sequencer._sequences;
    $scope.sequencer.beatClass = numToWord[tickNumber];
    $scope.$emit('madePlayerSequencer', $scope.sequencer);
  });

  $scope.$on('playerStopPlaying', function () {
    $scope.sequencer.stop();
  });

  $scope.playToggle = function () {
    if ($scope.sequencer._playing) {
      $scope.sequencer.stop();
    } else {
      $scope.sequencer.play();
      $scope.$emit('playerSequencerPlaying');
    }
  };

  //when player clicks button, toggle beat so it will play
  $scope.toggleBeat = function(sequenceIndex, beatIndex) {

    $scope.sequencer.toggleBeat(sequenceIndex, beatIndex);

  };

}]);

app.controller('TargetSequencerController', ['$scope', function ( $scope ) {

  //listens for event and creates targetSequencer from server data
  //sends targetSequencer back to gameController
  $scope.$on('createTargetSequencer', function(event, response) {
    $scope.sequencer = Sequencer.prototype.retrieve(response.data);
    $scope.$emit('madeTargetSequencer', $scope.sequencer);
  });



  $scope.$on('targetStopPlaying', function () {
    $scope.sequencer.stop();
  });

  $scope.playToggle = function () {
    if ($scope.sequencer._playing) {
      $scope.sequencer.stop();
    } else {
      $scope.sequencer.play();
      $scope.$emit('targetSequencerPlaying');
    }
  };

}]);
