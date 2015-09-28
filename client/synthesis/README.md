Synthesis
=========

AudioContext.createEnvelope
---------------------------

### input:

Four arguments are passed in during instatiation. Each argument is an
array tuple that contains the time in seconds and target value for it's corresponding
envelope phase. The expected order is  
`  `[ attackTime, attackTarget ],  
`  `[ decayTime, decayTarget ],  
`  `[ sustainTime, sustainTarget ],  
`  `[ releaseTime, releaseTarget ].

### output/behavior:

Returns an envelope node with a trigger method
All phase ramps are linear. Only the sustain phase is constant.

### methods:

#### envelope.connect:

##### input:

One parameter is passed in during invocation. It represents
the audio node or audio param that the envelope's output
will be routed to. If the argument is neither an audio node
nor an audio param, this method will work only if the argument
is an object with an input property that holds either an audio
node or an audio param.

##### output/behavior:

Behaves similarly to AudioNode.connect( ).

#### envelope.trigger:

##### input:

One parameter is passed in during invocation. It
represents the trigger start time in seconds relative to the
context's time coordinates.

##### output/behvaior:

Creates a source instance with envelope buffer as buffer,
connects that instance to the output, and schedules it to
start at the time specified by the first argument.

### example:

    var context = new AudioContext( );

    var osc = context.createOscillator( );

    osc.type = 'sine';

    osc.frequency.value = 440; // A

    var gain = context.createGain( );

    gain.gain.value = 0;

    gain.connect( context.destination );

    osc.connect( gain );

    var gainEnvelope = context.createEnvelope(

      [ 1, 1 ], [ 0.5, 0.2 ], [ 0.5, 0.2 ], [ 1, 0 ]

    );

    var frequencyEnvelope = context.createEnvelope(

      [ 1, 450 ], [0.5, 430 ], [0.5, 430 ], [1, 440]

    );

    gainEnvelope.connect( gain.gain );

    frequencyEnvelope.connect( osc.frequency );

    osc.start( context.currentTime );

    gainEnvelope.trigger( context.currentTime );

    frequencyEnvelope.trigger( context.currentTime );

    osc.stop( context.currentTime + 5 );

AudioContext.createWhiteNoise:
------------------------------

###  input:

### output/behavior:

### methods:

### example:

    var context = new AudioContext( );

    var whiteNoise = context.createWhiteNoise( );

    var gain = context.createGain( );

    gain.gain.value = 0;

    var gainEnvelope = context.createEnvelope(

      [ 1, 1 ],

      [ 1, 0 ],

      [ 0, 0 ],

      [ 0, 0 ]

    );

    gainEnvelope.connect( gain.gain );

    whiteNoise.connect( gain );

    gain.connect( context.destination );

    whiteNoise.start( context.currentTime );

    gainEnvelope.trigger( context.currentTime );

    whiteNoise.stop( context.currentTime + 2 );



