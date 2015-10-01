app.factory('levelFactory', function ( ) {

  var tempoDifficulties = {

    easy: 120,

    medium: 180,

    hard: 240,

    expert: 300

  };

  var tickNumberDifficulties = {

    easy: 4,

    medium: 8,

    hard: 16

  };

  var soundIDsDifficulties = {

    easy: [ 'kick', 'clap' ],

    medium: [ 'kick', 'clap', 'hihat' ]

  };

  var levels = {};

  levels[ 1 ] = {

    tempo: tempoDifficulties.easy,

    tickNumber: tickNumberDifficulties.easy,

    soundIDs: soundIDsDifficulties.easy,

    beatsToToggle: [

      [ 0, 0 ],

      [ 0, 2 ]

    ]

  };

  levels[ 2 ] = {

    tempo: tempoDifficulties.easy,

    tickNumber: tickNumberDifficulties.easy,

    soundIDs: soundIDsDifficulties.easy,

    beatsToToggle: [

      [ 0, 0 ],

      [ 1, 1 ],

      [ 0, 2 ],

      [ 1, 3 ]

    ]

  };

  levels[ 3 ] = {

    tempo: tempoDifficulties.easy,

    tickNumber: tickNumberDifficulties.easy,

    soundIDs: soundIDsDifficulties.easy,

    beatsToToggle: [

      [ 0, 0 ],

      [ 0, 1 ],

      [ 1, 2 ],

      [ 1, 3 ]

    ]

  };

  levels[ 4 ] = {

    tempo: tempoDifficulties.easy,

    tickNumber: tickNumberDifficulties.easy,

    soundIDs: soundIDsDifficulties.medium,

    beatsToToggle: [

      [ 0, 0 ],

      [ 1, 1 ],

      [ 2, 2 ],

      [ 1, 3 ]

    ]

  };

  levels[ 5 ] = {

    tempo: tempoDifficulties.easy,

    tickNumber: tickNumberDifficulties.medium,

    soundIDs: soundIDsDifficulties.medium,

    beatsToToggle: [

      [ 0, 0 ],

      [ 1, 1 ],

      [ 2, 2 ],

      [ 1, 3 ],

      [ 0, 4 ],

      [ 0, 5 ],

      [ 0, 6 ],

      [ 2, 7 ]

    ]

  };

  return levels;

});
