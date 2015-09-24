var Sequencer = function( sequencer ) {

  this.sequences = [];

};

Sequencer.prototype.getTickNumber = function( ) {

}

Sequencer.prototype.play = function( onTickSchedule ) {

  // begin playing sequences from the

  // first tick.

  // onTickSchedule will be called

  // with the scheduleTime:

  // onTickSchedule = function( scheduleTime ) { ... }

};

Sequencer.prototype.stop = function( ) {

  // stops playback and loses track of

  // current tick.

};

Sequencer.prototype.save = function( ) {

  // returns JSON string that represents

  // the sequence.

  // sequences should be able to be constructed

  // from one such JSON string.

};

Sequencer.prototype.getSequence = function( sequenceIndex ) {

  // returns a sequence instance

};

Sequencer.prototype.getBeat = function( sequenceIndex, beatIndex ) {

  // returns a beat instance

};