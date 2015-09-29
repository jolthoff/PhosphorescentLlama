app.factory( 'httpFactory', ['$http', function ( $http ) {

  //Sends request to server and retrieves sequencer for given level
  var requests = {
    getSequencer: function (level, callback) {
      return $http.get('/levels/' + level.toString())
        .then(function(response) {
          callback(response);
        });
    }
  };

  return requests;

}]);
