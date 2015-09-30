AudioContext.prototype.createKick = function( ) {

  var kickDuration = 0.1;

  // define parameters for gain envelope.

  var gainAttackTime = kickDuration * ( 1 / 20 );

  var gainDecayTime = kickDuration * ( 2 / 20 );

  var gainSustainTime = kickDuration * ( 1 / 20 );

  var gainReleaseTime = kickDuration * ( 16 / 20 );

  var gainAttackTarget = 0.5;

  var gainDecayTarget = 0.4;

  var gainSustainTarget = gainDecayTarget;

  var gainReleaseTarget = 0;

  var gainEnvelope = [

    [ gainAttackTime, gainAttackTarget ],

    [ gainDecayTime, gainDecayTarget ],

    [ gainSustainTime, gainSustainTarget ],

    [ gainReleaseTime, gainReleaseTarget ]

  ];

  // define parameters for cutoff envelope.

  var cutoffAttackTime = kickDuration * ( 1 / 20 );

  var cutoffDecayTime = kickDuration * ( 2 / 20 );

  var cutoffSustainTime = kickDuration * ( 10 / 20 );

  var cutoffReleaseTime = kickDuration * ( 7 / 20 );

  var cutoffAttackTarget = 400;

  var cutoffDecayTarget = 400;

  var cutoffSustainTarget = cutoffDecayTarget;

  var cutoffReleaseTarget = 0;

  var cutoffEnvelope = [

    [ cutoffAttackTime, cutoffAttackTarget ],

    [ cutoffDecayTime, cutoffDecayTarget ],

    [ cutoffSustainTime, cutoffSustainTarget ],

    [ cutoffReleaseTime, cutoffReleaseTarget ]

  ];

  // create kick with no generators

  var kick = this.createSynthesizer({

    "gainEnvelope": gainEnvelope,

    "gain": 0,

    "cutoffEnvelope": cutoffEnvelope,

    "cutoff": 100

  });

  // define parameters for the bass generator gain envelope.

  var bassGainAttackTime = 0;

  var bassGainDecayTime = 0;

  var bassGainSustainTime = kickDuration;

  var bassGainReleaseTime = 0;

  var bassGainAttackTarget = 0;

  var bassGainDecayTarget = 0;

  var bassGainSustainTarget = 0;

  var bassGainReleaseTarget = 0;

  var bassGainEnvelope = [

    [ bassGainAttackTime, bassGainAttackTarget ],

    [ bassGainDecayTime, bassGainDecayTarget ],

    [ bassGainSustainTime, bassGainSustainTarget ],

    [ bassGainReleaseTime, bassGainReleaseTarget ]

  ];

  // define parameters for the bass generator frequencyEnvelope.

  var bassFrequencyAttackTime = kickDuration * ( 1 / 20 );

  var bassFrequencyDecayTime = kickDuration * ( 2 / 20 );

  var bassFrequencySustainTime = kickDuration * ( 2 / 20 );

  var bassFrequencyReleaseTime = kickDuration * ( 15 / 20 );

  var bassFrequencyAttackTarget = 40;

  var bassFrequencyDecayTarget = 30;

  var bassFrequencySustainTarget = 30;

  var bassFrequencyReleaseTarget = 0;

  var bassFrequencyEnvelope = [

    [ bassFrequencyAttackTime, bassFrequencyAttackTarget ],

    [ bassFrequencyDecayTime, bassFrequencyDecayTarget ],

    [ bassFrequencySustainTime, bassFrequencySustainTarget ],

    [ bassFrequencyReleaseTime, bassFrequencyReleaseTarget ]

  ];

  // add the bass generator to the kick synthesizer

  kick.addGenerator({

    "gainEnvelope": bassGainEnvelope,

    "gain": 1,

    "frequencyEnvelope": bassFrequencyEnvelope,

    "frequency": 60

  });

  return kick;

};