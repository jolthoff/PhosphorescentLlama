App
===

App.js
------

### GameController

#### Dependencies:

$scope, playerSequencer, httpFactory, initialize

#### Output/behavior:

<!-- gameController contains logic for game setup, game logic/control flow, and game end. -->

#### Event Handlers:

##### madeTargetSequencer:

###### Origin:

targetSequencerController.

###### Input:

Event: the emit event from the targetSequencerController.

targetSequencer: the target sequencer object.

###### Output/Behavior:

Set the target sequencer object as property on the gameController $scope.  Broadcasts command to create player sequencer and passes in the target sequencer object.

##### madePlayerSequencer:

###### Origin: 

playerSequencerController.

###### Input:

Event: the emit event from the targetSequencerController.

playerSequencer: the player sequencer object.

###### Output/Behavior:

Set the player sequencer object as property on the gameController $scope.

##### targetSequencerPlaying:

###### Origin:

targetSequencerController

###### Input:

None.

###### Output/Behavior:

Broadcast event to stop player sequencer.

##### playerSequencerPlaying:

###### Origin:

playerSequencerController

###### Input:

None.

###### Output/Behavior:

Broadcast event to stop target sequencer.

#### Methods:

##### getSequencer:

###### Input:

None.

###### Output/Behavior:

Uses the httpFactory to make a call to the server to fetch the sequencer information for the current level, then sends that information to the targetSequencerController.

##### startLevel:

###### Input:

None.

###### Output/Behavior:

<!-- Fill in later, not complete -->

##### submit:

###### Input:

None.

###### Output/Behavior:

Compares current playerSequencer state to targetSequencer state, and invokes either playerWon or failedMatch depending on outcome.

##### playerWon:

###### Input:

None.

###### Output/Behavior:

<!-- Fill in later, not complete -->

##### failedMatch:

###### Input:

None.

###### Output/Behavior:

<!-- Fill in later, not complete -->

### playerSequencerController

#### Dependencies:

$scope, playerSequencer

#### Output/behavior:

Deals with user input to manipulate the player sequencer, and provides the information for the index to render the player sequencer view.

#### Event Handlers:

##### createPlayerSequencer:

###### Origin:

gameController.

###### Input:

Event: the broadcast event from the gameController.

Data: the target sequencer object.

###### Output/Behavior:

Instantiates blank player sequencer controller by passing information (tempo, tickCount, and soundIDs) from data to the playerSequencerFactory. Sets playerSequencer object to the $scope. Sets playerSequencer's sequences object to the $scope. Sets number of beats to the $scope for styling purposes. Emits playerSequencer object.

##### playerStopPlaying:

###### Origin:

gameController.

###### Input:

None.

###### Output/Behavior:

Stops playerSequencer.

##### toggleWrongBeatsOff:

###### Origin:

gameController.

###### Input:

Event: the broadcast event from the gameController.

wrongBeats: an array of the incorrect beats to toggle off.

###### Output/Behavior:

Toggles off all beats on the playerSequencer that are in wrongBeats.

#### Methods:

##### playToggle:

###### Input:

None.

###### Output/Behavior:

If stopped, plays and emits event to gameController that it's playing; if playing, stops.

##### toggleBeat:

Uses sequencer method to schedule a beat to play.  Invoked on user click.

###### Input:

sequenceIndex and beatIndex.  Identifies location in matrix.

###### Output/Behavior:

Toggles beat in sequence.

### targetSequencerController

#### Dependencies:

$scope

#### Output/behavior:

Deals with user input to play or stop.

#### Event Handlers:

##### createTargetSequencer:

###### Origin:

gameController.

###### Input:

Event: the broadcast event from the gameController.

Response: target sequencer objects fetched from server.

###### Output/Behavior:

Uses retrieve method on sequencer class to build target sequencer and sets the sequencer as a property on the $scope.  Emits event to gameController that it has been made and passes the sequencer object.

##### targetStopPlaying

###### Origin:

gameController

###### Input:

None.

###### Output/Behavior:

Stops sequencer from playing.

#### Methods:

##### playToggle

###### Input:

None.

###### Output/Behavior:

If stopped, plays and emits event to gameController that it's playing; if playing, stops.


httpFactory.js
--------------

### Dependencies:

$http

### Output/behavior:

Returns a request object that holds the methods for interacting with the server.  

### Methods:

#### getSequencer:

##### Input:

level: current level on gameController

callback: passed in the from gameController

##### Output/Behavior:

Makes a call to the server with the level and calls callback on the result.

#### postSequencer:

##### Input: 

level: the level to post the sequencer to.

stringifiedSequencer: a stringified sequencer to post.

callback: a function that will be called on the response.

levelFactory.js
---------------

### Dependencies:

None.

### Output/Behavior:

Returns a levels object which holds all relevant information necessary for constructing levels.

### Methods:

None.

init.js
-------

### Dependencies:

None.

### Output/behavior:

Returns a function that takes a callback.  Sets audio context on the window.  Sets an object with the sample names fetched from the server for the beats to reference and play the correct sound.

### Methods:

#### makeRequest

##### Input:

Number which maps to the index of the array of sample names.

##### Output:

Makes request to the server to for each sample in the sampleNames array to the load all sounds onto the audio context.

playerSequencer.js
------------------

### Dependencies:

None.

### Output/behavior:

Returns an object with a method to instantiate a new sequencer object.

### Methods:

#### build:

##### Input:

tempo: tempo of the target sequencer object fetched from the server.

tickNumber: numbers of beats in the loop from the target sequencer object.

soundIDs: the sound IDs the beats use from the target sequencer object.

##### Output/Behavior:

Instantiates a new sequencer object with the same tempo, tick number, and sound IDs as the target sequencer object and no beats scheduled to play.
