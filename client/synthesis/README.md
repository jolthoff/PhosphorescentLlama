Synthesis
=========

AudioContext.createEnvelope
---------------------------

### Input:

Four arguments are passed in during instatiation. Each argument is an
array tuple that contains the time in seconds and target value for it's corresponding
envelope phase. The expected order is  
[ attackTime, attackTarget ],  
[ decayTime, decayTarget ],  
[ sustainTime, sustainTarget ],  
[ releaseTime, releaseTarget ].

### Output/behavior:

Returns an envelope node with a trigger method
All phase ramps are linear. Only the sustain phase is constant.

### Methods:

#### envelope.connect:

##### Input:

One parameter is passed in during invocation. It represents
the audio node or audio param that the envelope's output
will be routed to. If the argument is neither an audio node
nor an audio param, this method will work only if the argument
is an object with an input property that holds either an audio
node or an audio param.

##### Output/behavior:

Behaves similarly to AudioNode.connect( ).

#### envelope.start:

##### Input:

One parameter is passed in during invocation. It
represents the trigger start time in seconds relative to the
context's time coordinates.

##### Output/behvaior:

Creates a source instance with envelope buffer as buffer,
connects that instance to the output, and schedules it to
start at the time specified by the first argument. In the case
that an envelope is in execution at the scheduling time, that envelope
will be stopped and the new one will be triggered.

### Example:

    var context = new AudioContext( );

    var osc = context.createOscillator( );

    osc.type = 'sine';

    osc.frequency.value = 60; // A

    var gain = context.createGain( );

    gain.gain.value = 0;

    gain.connect( context.destination );

    osc.connect( gain );

    var gainEnvelope = context.createEnvelope(

      [ 0.01, 1 ], [ 0.02, 0.5 ], [ 0.01, 0.5 ], [ 0.06, 0 ]

    );

    var frequencyEnvelope = context.createEnvelope(

      [ 0.01, 40 ], [0.02,  20], [0.01, 20 ], [0.06, 0]

    );

    gainEnvelope.connect( gain.gain );

    frequencyEnvelope.connect( osc.frequency );

    osc.start( context.currentTime );

    gainEnvelope.start( context.currentTime );

    frequencyEnvelope.start( context.currentTime );

AudioContext.createWhiteNoise:
------------------------------

### Input:

This constructor takes no parameters.

### Output/behavior:

Creates an instance of white noise. This is intended to interface as if
it were an Audio Oscillator Node. That is, via connect, start, and stop methods.
Note, however, that the start method of white noise can be triggered
more that once. 

### Methods:

#### whiteNoise.connect:

##### Input:

Takes in the target destination as the first parameter.

##### Output/behavior:

If the destination is an audio node or an audio parameter,
the, whiteNoise.output is set to reference that audio node
or that audio parameter. If, instead, the destination is
an object with an input property that is an audio
node or an audio param, whiteNoise.output is set to reference
that input property.

#### whiteNoise.start:

#### Input:

Takes in the starting time relative to the current context's
time coordinates as the first parameter.

#### Output/behavior:

Sets whiteNoise to output white noise for an indeterminate
amount of time. This is achieved by looping a five
second white noise buffer. Note that, unlike native audio nodes,
start can be triggered many times on the same instance of
whiteNoise.

#### whiteNoise.stop:

If start has been invoked before stop is invoked, the output
of white noise will be stopped.

### Example:

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

AudioContext.createGenerator:
-----------------------------

### Input:

This generator takes an options object as its input. Options has two properties, frequencyEnvelope and gainEnvelope. FrequencyEnvelope and gainEvnelope are arrays of four tuples, which specify the attack, decay, sustain, and release for the generator's oscillator's frequency envelope and the generator's gain's envelope, respectively.

### Output/behavior:

This returns a generator that can be connected to another audio node or audio parameter or to another object with an input property that is an audio node or audio paramter.

### Methods:

#### generator.connect:

##### Input:

Takes in the target destination.

##### Output/behavior:

If the destination is an audio node or an audio parameter,
the, generator.output is set to reference that audio node
or that audio parameter. If, instead, the destination is
an object with an input property that is an audio
node or an audio param, generator.output is set to reference
that input property.

#### generator.start:

#### Input:

Takes in the starting time relative to the current context's
time coordinates as the first parameter.

#### Output/behavior:

Triggers both of the generator's envelopes at the specified time.

### Example:

    var context = new AudioContext( );

    var options = {

      frequencyEnvelope: [

        [ 0.01, 880 ],

        [ 0.1, 60 ],

        [ 0.3 , 60 ],

        [ 0, 0 ]

      ],

      gainEnvelope: [

        [ 0.05, 1 ],

        [ 0.06, 0.2 ],

        [ 0.1 , 0.2 ],

        [ 0.2, 0 ]

      ],

      oscillatorType: 'sawtooth'

    };

    var generator = context.createGenerator( options );

    generator.connect( context.destination );

    generator.start( );

AudioContext.createSynthesizer:
-------------------------------

### Input:

This synthesizer takes an options object as its input. Options has two properties, cutoffEnvelope and gainEnvelope. CutoffEnvelope and gainEnvelope are either already created envelopes or arrays of four tuples, which specify the attack, decay, sustain, and release for the synthesizer's biquadFilter's  envelope and the synthesizer's gain's envelope, respectively.

### Output/behavior:

This returns a synthesizer that can be connected to another audio node or audio parameter or to another object with an input property that is an audio node or audio parameter.

### Methods:

#### synthesizer.connect:

##### Input:

Takes in the target destination.

##### Output/behavior:

If the destination is an audio node or an audio parameter,
the, synthesizer.output is set to reference that audio node
or that audio parameter. If, instead, the destination is
an object with an input property that is an audio
node or an audio param, synthesizer.output is set to reference
that input property.

#### synthesizer.start:

#### Input:

Takes in the starting time relative to the current context's
time coordinates as the first parameter.

#### Output/behavior:

Triggers both of the synthesizer's envelopes and starts all of the synthesizer's generators at the specified time.

### Example:

    var context = new AudioContext( );

    var rootStart = 440;

    var rootEnd = rootStart * Math.pow( 2, 1/3 );

    var thirdStart = rootEnd;

    var thirdEnd = thirdStart * Math.pow( 2, 1/3 );

    var fifthStart = rootStart * Math.pow( 2, 7/12 );

    var fifthEnd = fifthStart * Math.pow( 2, 1/3 );

    var options = {

      cutoffEnvelope: [

        [ 4, 10000 ],

        [ 4, 1000 ],

        [ 1, 1000 ],

        [ 9, 0 ]

      ],

      gainEnvelope: [

        [ 8, 1 ],

        [ 0, 1 ],

        [ 5, 1 ],

        [ 5, 0 ]

      ]

    };

    var synthesizer = context.createSynthesizer( options );

    synthesizer.addGenerator( {

        frequencyEnvelope: [

          [ 4, rootStart ],

          [ 4, rootEnd ],

          [ 1, rootEnd ],

          [ 9, 0 ]

        ],

        gainEnvelope: [

          [ 0, 1 ],

          [ 0, 1 ],

          [ 18, 1 ],

          [ 0, 0 ]

        ],

        oscillatorType: 'square'

    });

    synthesizer.addGenerator( {

        frequencyEnvelope: [

          [ 4, thirdStart ],

          [ 4, thirdEnd ],

          [ 1, thirdEnd ],

          [ 9, 0 ]

        ],

        gainEnvelope: [

          [ 0, 1 ],

          [ 0, 1 ],

          [ 18, 1 ],

          [ 0, 0 ]

        ],

        oscillatorType: 'square'

    });

    synthesizer.addGenerator( {

        frequencyEnvelope: [

          [ 4, fifthStart ],

          [ 4, fifthEnd ],

          [ 1, fifthEnd ],

          [ 9, 0 ]

        ],

        gainEnvelope: [

          [ 0, 1 ],

          [ 0, 1 ],

          [ 18, 1 ],

          [ 0, 0 ]

        ],

        oscillatorType: 'square'

    });

    synthesizer.connect( context.destination );

    synthesizer.start( );
