AudioContext.prototype.createSynthesizer = function( options ) {

  var context = this;

  var synthesizer = {};

  synthesizer._generators = [];

  synthesizer._gain = context.createGain( );

  synthesizer._gain.value = 0;

  if( Array.isArray( options.gainEnvelope ) ) {

    synthesizer._gainEnvelope =

      context.createEnvelope(

        options.gainEnvelope[ 0 ],

        options.gainEnvelope[ 1 ],

        options.gainEnvelope[ 2 ],

        options.gainEnvelope[ 3 ]

      );

  } else {

    synthesizer._gainEnvelope = options.gainEnvelope;

  }

  synthesizer._gainEnvelope.connect( synthesizer._gain.gain );

  synthesizer._biquadFilter = context.createBiquadFilter( );

  synthesizer._biquadFilter.type = options.filterType || 'lowpass';

  if( Array.isArray( options.cutoffEnvelope ) ) {

    synthesizer._cutoffEnvelope =

      context.createEnvelope(

        options.cutoffEnvelope[ 0 ],

        options.cutoffEnvelope[ 1 ],

        options.cutoffEnvelope[ 2 ],

        options.cutoffEnvelope[ 3 ]

      );

  } else {

    synthesizer._cutoffEnvelope = options.cutoffEnvelope;

  }

  synthesizer._cutoffEnvelope.connect( synthesizer._biquadFilter.frequency );

  synthesizer._biquadFilter.frequency.value = 0;

  synthesizer._biquadFilter.connect( synthesizer._gain );

  synthesizer._output = synthesizer._gain;

  synthesizer.addGenerator = function( optionsOrGenerator ) {

    if( optionsOrGenerator._oscillator ) {

      optionsOrGenerator.connect( synthesizer._biquadFilter );

      synthesizer._generators.push( optionsOrGenerator );

    } else {

      var generator = context.createGenerator( optionsOrGenerator );

      generator.connect( synthesizer._biquadFilter );

      synthesizer._generators.push( generator );

    }

  };

  synthesizer.connect = function( destination ) {

    if( destination.hasOwnProperty( 'input' ) ) {

      synthesizer.output.connect( destination.input );

    } else {

      synthesizer._output.connect( destination );

    }

  };

  synthesizer.start = function( when ) {

    synthesizer._gainEnvelope.trigger( when );

    synthesizer._cutoffEnvelope.trigger( when );

    for( var i = 0; i < synthesizer._generators.length; i++ ) {

      synthesizer._generators[ i ].start( when );

    }

  };

  return synthesizer;

};
