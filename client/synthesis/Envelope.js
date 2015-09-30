AudioContext.prototype.createEnvelope =

  function( attack, decay, sustain, release ) {

  // attack = 

  //  { time: ...,

  //    target: ... 

  //  } || attackTime, where target defaults to 1.

  // decay = decayTime

  // sustain = sustainTarget

  // release =

  //  { time: ...,

  //    target: ...

  //  } || releaseTime, where target defaults to 0.

  var envelope = {};

  // check if inputs conform to

  // interface.

  envelope.setAttack = function( attack ) {

    var invalidAttack = "Unexpected attack value. ";

    invalidAttack += "Attack should be an object with a property ";

    invalidAttack += "'time', which should reference a number, and a ";

    invalidAttack += "property 'target', which should also reference a number. ";

    invalidAttack += "Alternatively, attack could be a number, not an object. ";

    invalidAttack += "If attack is a number, that number specifies attack time and ";

    invalidAttack += "the attack target defaults to 1. As it makes no sense to specify ";

    invalidAttack += "negative attack times, either attack or attack.time must be a positive ";

    invalidAttack += "number."

    if( typeof attack !== 'number' ) {

      if( typeof attack === 'object' ) {

        if(

          typeof attack.time !== 'number' ||

          typeof attack.target !== 'number' ||

          attack.time < 0

        ) {

          throw invalidAttack;

        }

      } else {

        throw invalidAttack;

      }

    } else if( attack < 0 ) {

      throw invalidAttack;

    }

    // At this point, attack has been validated.

    envelope.attack = attack;

  };

  envelope.setDecay = function( decay ) {

    var invalidDecay = "Unexpected decay value. ";

    invalidDecay += "Decay should be a number. ";

    invalidDecay += "When decay is a number, it specifies decay time. "

    invalidDecay += "As it makes no sense to specify a negative decay time, "

    invalidDecay += "envelopes cannot be constructed with negative decay times."

    if( typeof decay !== 'number' ) {

      throw invalidDecay;

    } else if( decay < 0 ) {

      throw invalidDecay;

    }

    // At this point, decay has been validated.

    envelope.decay = decay;

  };

  envelope.setSustain = function( sustain ) {

    var invalidSustain = "Unexpected sustain value. ";

    invalidSustain += "Sustain should be a number."

    if( typeof sustain !== 'number' ) {

      throw invalidSustain;

    }

    // At this point, sustain has been validated.

    envelope.sustain = sustain;

  };

  envelope.setRelease = function( release ) {

    var invalidRelease = "Unexpected release value. ";

    invalidRelease += "Release should be an object with a property ";

    invalidRelease += "'time', which should reference a number, and a ";

    invalidRelease += "property 'target', which should also reference a number. ";

    invalidRelease += "Alternatively, release could be a number, not an object. ";

    invalidRelease += "If release is a number, that number specifies release time and ";

    invalidRelease += "the release target defaults to 0. As it makes no sense to specify ";

    invalidRelease += "negative release times, either release or release.time must be a positive ";

    invalidRelease += "number."

    if( typeof release !== 'number' ) {

      if( typeof release === 'object' ) {

        if(

          typeof release.time !== 'number' ||

          typeof release.target !== 'number' ||

          release.time < 0

        ) {

          throw invalidRelease;

        }

      } else {

        throw invalidRelease;

      }

    } else if( attack < 0 ) {

      throw invalidRelease;

    }

    // At this point, release has been validated.

    envelope.release = release;

  }

  envelope.setAttack( attack );

  envelope.setdDecay( decay );

  envelope.setSustain( sustain );

  envelope.setRelease( release );

  var computeTau = function( time, initialValue, targetValue ) {

    if( initialValue !== targetValue ) {

      return -1 * time /

              Math.log( -1 * 0.01 * targetValue /

                ( initialValue - targetValue ) );

    } else {

      // In the case that the initialValue

      // is the same as the targetValue,

      // the time constant should be arbitrarily

      // large.

      return Number.MAX_VALUE;

    }

  };

  envelope.connect = function( audioParam ) {

    if( audioParam instanceof AudioParam ) {

      envelope.param = audioParam;

    } else {

      var error = "Invalid destination. ";

      error += "Envelopes should only be ";

      error += "connected to instances of AudioParam.";

      throw error;

    }

  };

  envelope.on = function( when, sustainTime ) {

    // If when is not defined, then the envelope

    // triggers immediately.

    when = when || context.currentTime;

    if( typeof envelope.attack === 'number' ) {

      envelope.attack = {

        time: envelope.attack,

        target: 1

      };

    }

    // schedule attack phase.

    envelope.param.setTargetAtTime(

      envelope.attack.target,

      when,

      computeTau(

        envelope.attack.time,

        envelope.param.value,

        envelope.attack.target

      )

    );

    // Schedule decay phase.

    envelope.param.setTargetAtTime(

      envelope.decay,

      when + envelope.attack.time,

      computeTau(

        envelope.decay,

        envelope.attack.target,

        envelope.sustain

      )

    );

    if( sustainTime ) {

      // In case that sustainTime is

      // specified, trigger release phase.

      envelope.off(

        when +

        envelope.attack.time +

        envelope.decay.time +

        sustainTime

      );

    }

    // If sustainTime is undefined, the envelope

    // sustains until off is scheduled otherwise.

  };

  envelope.off = function( when ) {

    // If when is not defined, then the envelope

    // releases immediately.

    when = when || 0;

    if( typeof envelope.release === 'number' ) {

      envelope.release = {

        time: envelope.release,

        target: 0

      };

    }

      // Schedule release phase.

    envelope.param.setTargetAtTime(

      envelope.release.time,

      when,

      envelope.release.target

    );

  };

};