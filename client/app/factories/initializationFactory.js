app.factory('initialize', function() {

return function( callback ) {

    // make sure that the audio context

    // class exists.

    window.AudioContext =

      window.AudioContext ||

      window.webkitAudioContext ||

      window.mozAudioContext ||

      window.oAudioContext ||

      window.msAudioContext;

    if( window.AudioContext === undefined ) {

      throw 'Browser does not support Web Audio API';

    }

    // instantiate the global audio context

    window.context = new AudioContext( );

    window.context._generators = {};

    window.context._generators.kick = context.createKick( );

    window.context._generators.lowTom = context.createKick( 43 );

    window.context._generators.highTom = context.createKick( 53 );

    window.context._generators.clap = context.createClap( );

    window.context._generators.closedHat = context.createClosedHat( );

    window.context._generators.openHat = context.createOpenHat( );

    window.context._generators.lowBass = context.createBass( 36 );

    window.context._generators.midBass = context.createBass( 38 );

    window.context._generators.highBass = context.createBass( 40 );

    callback( );

  };

});
