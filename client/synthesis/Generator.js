AudioContext.prototype.createGenerator = function( options ) {

  var generator = {};

  if( Array.isArray( options.frequencyEnvelope ) ) {

    generator._frequencyEnvelope =

      this.createEnvelope(

        options.frequencyEnvelope[ 0 ],

        options.frequencyEnvelope[ 1 ],

        options.frequencyEnvelope[ 2 ],

        options.frequencyEnvelope[ 3 ]
      );
  
  } else {

    //assuming that if options.frequencyEnvelope is not an array, it is an already created envelope

    generator._frequencyEnvelope = options.frequencyEnvelope;

  }

  if( Array.isArray( options.gainEnvelope ) ) {

    generator._gainEnvelope =

      this.createEnvelope(

        options.gainEnvelope[ 0 ],

        options.gainEnvelope[ 1 ],

        options.gainEnvelope[ 2 ],

        options.gainEnvelope[ 3 ]

      );

  } else {

    //assuming that if options.gainEnvelope is not an array, it is an already created envelope

    generator._gainEnvelope = options.gainEnvelope;

  }

  generator._oscillator = this.createOscillator( );

  if( options.oscillatorType ) {

    generator._oscillator.type = options.oscillatorType;

  } else {

    generator._oscillator.type = 'sine';

  }

  generator._oscillator.frequency.value = 0;

  generator._gain = this.createGain( );

  generator._gain.gain.value = 0;

  generator._frequencyEnvelope.connect( generator._oscillator.frequency );

  generator._gainEnvelope.connect( generator._gain.gain );

  generator._oscillator.connect( generator._gain );

  generator.output = generator._gain;

  generator._oscillator.start( this.currentTime );

  generator.connect = function( destination ) {

    if( destination.hasOwnProperty( 'input' ) ) {

      generator.output.connect( destination.input );

    } else {

      generator.output.connect( destination );

    }

  };

  generator.start = function( when ) {

    generator._gainEnvelope.trigger( when );

    generator._frequencyEnvelope.trigger( when );

  };

  return generator;

};
