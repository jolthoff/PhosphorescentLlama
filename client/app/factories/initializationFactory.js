app.factory('initialize', function() {

return function( callback ) {

    // make sure that the audio context

    // class exists.

    window.AudioContext =

      window.AudioContext ||

      window.webkitAudioContext ||

      window.mozAudioContext ||

      window.oAudioContext ||

      window.msAudioContext;

    if( window.AudioContext === undefined ) {

      throw 'Browser does not support Web Audio API';

    }

    // instantiate the global audio context

    window.context = new AudioContext( );

    var sampleNames = [

      'kick',

      'clap',

      'hihat'

    ];

    window.context._sampleBuffers = {};

    for( var i = 0; i < sampleNames.length; i++ ) {

      // we need to define this function

      // because otherwise i will be a closure

      // variable for each of our requests.

      var makeRequest = function( k ) {

        var request = new XMLHttpRequest( );

        request.open(

          'GET', // Method

          '/samples/' + sampleNames[ k ] + '.wav', //URL

          true // is asynchronous

        );

        request.responseType = 'arraybuffer';

        request.onload = function( ) {

          window.context.decodeAudioData(

            request.response,

            function( audioBuffer ) { // success callback

              window.context._sampleBuffers[ sampleNames[ k ] ] = audioBuffer;

              if( Object.keys( window.context._sampleBuffers ).length === sampleNames.length ) {

                // callback will only be executed once

                // all of the sample buffers have been loaded.

                callback( );

              }

            },

            function( error ) { // failure callback

              if( error ) {

                throw error;

              }

            }

          );


        };

        request.send( );

      };

      makeRequest( i );

    }

  };

});
