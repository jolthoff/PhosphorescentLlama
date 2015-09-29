app.factory( 'httpFactory', ['$http', function ( $http ) {

  //Sends request to server and retrieves sequencer for given level
  var requests = {
    getSequencer: function (level, callback) {
      return $http.get('/level' + level.toString())
        .then(function(data) {
          callback(data);
        });
    }
  };

  return requests;

}]);
