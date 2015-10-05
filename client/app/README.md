App
===

App.js
------

### Config

Classes
-------

See Classes README.

Controllers
-----------

### activeController

#### Dependencies

#### Methods

#### Event Handlers



### gameController

#### Dependencies

$scope, playerSequencer, httpFactory, initialize

#### Methods

##### startLevel

###### Input

None.

###### Output/Behavior

startLevel makes a call to getSequencer to load the level's sequencer and start the level.

##### getSequencer

###### Input

None

###### Output/Behavior

getSequencer makes a call to the server for the current level's target sequencer and upon receit, broadcasts the data to the targetSequencerController so it can create the targetSequencer.

##### playerSequencerPlayToggle

###### Input

None

###### Output/Behavior

playerSequencerPlayToggle broadcasts to the playerSequencerController that it should toggle its play state.

##### submit

###### Input

None

###### Output/Behavior

submit stops both the player and target sequencers, then compares them to see if they match. If so, submit calls the playerWon function. If not, submit calls the failedMatch function.

##### playerWon

###### Input

None

###### Output/Behavior

playerWon displays the result of the submit to the player. It increments the level, and if the player is signed in, it increments their best level and saves it to the server. It then starts the next level.

##### failedMatch

###### Input

None

###### Output/Behavior

failedMatch displays the result of the submit to the player, then calls removeWrongBeats.

##### removeWrongBeats

###### Input

None

###### Output/Behavior

removeWrongBeats compares the playerSequencer to the targetSequencer to find the differences between them. It then broadcasts that difference to the playerSequencerController so it can toggle off all of its incorrect beats.



#### Event Handlers

##### madeTargetSequencer

###### Event Comes From

targetSequencerController

##### Behavior

Upon hearing that the targetSequencer was created, the gameConroller sets the targetSequencerController's target sequencer as a property on the gameController. Then it broadcasts the event to play the target sequencer twice, and broadcasts the event to create the playerSequencer.

##### madePlayerSequencer

###### Event Comes From

playerSequencerController

##### Behavior

Upon hearing that the playerSequencer was created, the gameController sets the playerSequencerController's player sequencer as a property on the gameController.

##### targetSequencerPlaying

###### Event Comes From

targetSequencerController

##### Behavior

Upon hearing that the targetSequencer is playing, the gameController broadcasts to the playerSequencerController to stop playing so that the sequencers don't overlap.

##### playerSequencerPlaying

###### Event Comes From

playerSequencerController

##### Behavior

Upon hearing that the playerSequencer is playing, the gameController broadcasts to the playerSequencerController to stop playing so that the sequencer's don't overlap.



### navController

#### Dependencies

#### Methods

#### Event Handlers



### playerSequencerController

#### Dependencies

#### Methods

#### Event Handlers



### targetSequencerController

#### Dependencies

#### Methods

#### Event Handlers

Factories
---------

### httpFactory

#### Dependencies

#### Output/Behavior

#### Methods

### initializationFactory

#### Dependencies

#### Output/Behavior

#### Methods

### levelFactory

#### Dependencies

#### Output/Behavior

#### Methods

### playerSequencerFactory

#### Dependencies

#### Output/Behavior

#### Methods
