app.factory('targetSequencer', function () {

  return {
    sequencer: function ( tempo, tickNumber, soundIDs ) {
      return new Sequencer( tempo, tickNumber, soundIDs );
    }
  };
  
});
