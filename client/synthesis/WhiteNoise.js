window.AudioContext.prototype.createWhiteNoise = function( ) {

  var whiteNoise = {};

  whiteNoise.sampleRate = this.sampleRate;

  whiteNoise.duration = 10; // seconds

  whiteNoise.length = whiteNoise.duration * whiteNoise.sampleRate;

  whiteNoise.buffer = this.createBuffer( 1, whiteNoise.length, whiteNoise.sampleRate );

  whiteNoise.output = null;

  var channel = whiteNoise.buffer.getChannelData( );

  for( var i = 0; i < whiteNoise.length; i++ ) {

    channel[ i ] = 2 * Math.random( ) - 1;

  }

  // methods

  var context = this;

  whiteNoise.connect = function( destination ) {

    if( destination.hasOwnProperty( 'input' ) ) {

      whiteNoise.output = destination.input;

    } else {

      whiteNoise.output = destination;

    }

  };

  whiteNoise.start = function( when, offset, duration ) {

    whiteNoise.source = context.createBufferSource( );

    whiteNoise.source.buffer = whiteNoise.source;

    whiteNoise.source.connect( whiteNoise.output );

    whiteNoise.source.start( when, offset, duration );

  };

  whiteNoise.stop = function( when ) {

    whiteNoise.source.stop( when );

  };

  return whiteNoise;

};