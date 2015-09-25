Bus:

  input:

    To be used with new keyword.

    The first parameter is the audio node that

    the output of the bus will be routed to.

  output/behavior:

    Returns a bus instance with an input property

    such that, whenever an audio node is connected

    to that input, the output of said node is routed

    through each audio node in the bus.

  methods:

    bus.getInput:

      input:

        No parameters.

      output:

        Returns the first node in the bus' node chain.

  example:

    var context = new AudioContext( );

    var osc = context.createOscillator( );

    osc.type = 'sine';

    osc.frequency.value = 440;

    var bus = new Bus( context.destination );

    osc.connect( bus.getInput( ) );

    osc.start( context.currentTime + 1 );

    osc.stop( context.currentTime + 2 );


