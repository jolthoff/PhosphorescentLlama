AudioContext.createEnvelope: 

  input:

    Four arguments are passed in during instatiation. Each argument is an

    array tuple that contains the time in seconds and target value for it's corresponding

    envelope phase. The expected order is

      [ attackTime, attackTarget ],

      [ decayTime, decayTarget ],

      [ sustainTime, sustainTarget ],

      [ releaseTime, releaseTarget ].

  output/behavior:

    Returns an envelope node with a trigger method

    All phase ramps are linear. Only the sustain phase is constant.

  methods:

    envelope.trigger:

      input:

        Two parameters are passed in during invocation. The first argument

        represents the trigger start time in seconds relative to the

        context's time coordinates. The second argument represents

        the audio node ( or an instance of class with an input property

        that is an audio node ) or audio param that the envelope will be controlling.

      output/behvaior:

        Creates a source instance with envelope buffer as buffer,

        connects that instance to the output, and schedules it to

        start at the time specified by the first argument.

  example:

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

    osc.start( context.currentTime );

    gainEnvelope.trigger( context.currentTime, gain.gain );

    osc.stop( context.currentTime + 5 );

