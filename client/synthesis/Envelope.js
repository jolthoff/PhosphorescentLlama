// Evenlope class

AudioContext.prototype.createEnvelope = function( A, D, S, R ) {

  // A = [attackTime, attackTarget]

  // D = [decayTime, decayTarget]

  // S = [sustainTime, sustainTarget]

  // R = [releaseTime]

  var envelope = {};

  envelope.sampleRate = this.sampleRate;

  envelope.length = ( A[ 0 ] + D[ 0 ] + S[ 0 ] + R[ 0 ] ) * this.sampleRate;

  envelope.buffer = this.createBuffer(

    1, // channel

    envelope.length, // in sample frames

    envelope.sampleRate

  );

  // channelData is a 32FLoatArray

  var channelData = envelope.buffer.getChannelData( 0 );

  var index = 0;

  // attack phase

  // create linear ramp to attack target ( A[ 1 ] )

  // in attack time ( A[ 0 ] )

  while( index++ < A[ 0 ] * envelope.sampleRate ) {

    channelData[ index ] =

      ( A[ 1 ] * index ) / ( A[ 0 ] * envelope.sampleRate );

  }

  // decay phase

  // create linear ramp to decay target ( D[ 1 ] )

  // in decay time D[ 0 ]

  while( index++ < ( A[ 0 ] + D[ 0 ] ) * envelope.sampleRate ) {

    channelData[ index ] =

      A[ 1 ] -

        ( A[ 1 ] - D[ 1 ] ) *

        ( index - A[ 0 ] * envelope.sampleRate ) /

        ( D[ 0 ] * envelope.sampleRate );

  }

  // sustain  phase

  // set value to sustain target S[ 1 ] for

  // the duration of sustain time S[ 0 ]

  while( index++ < ( A[ 0 ] + D[ 0 ] + S[ 0 ] ) * envelope.sampleRate ) {

    channelData[ index ] = S[ 1 ];

  }

  //release phase

  // create linear ramp from sustain target

  // to release target in release time

  while( index++ < ( A[ 0 ] + D[ 0 ] + S[ 0 ] + R[ 0 ] ) * envelope.sampleRate ) {

    channelData[ index ] =

      S[ 1 ] -

        ( S[ 1 ] - R[ 1 ] ) *

        ( index - ( A[ 0 ] + D[ 0 ] + S[ 0 ] ) * envelope.sampleRate ) /

        ( R[ 0 ] * envelope.sampleRate );

  }

  var context = this;

  envelope.connect = function( destination ) {

    if( destination.hasOwnProperty( 'input' ) ) {

      envelope.output = destination.input;

    } else {

      envelope.output = destination;

    }

  };

  envelope.trigger = function( when ) {

    var source = context.createBufferSource( );

    source.buffer = envelope.buffer;

    source.connect( envelope.output );

    source.start( when );

  };

  return envelope;

};