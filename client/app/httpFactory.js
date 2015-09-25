app.factory( 'httpFactory', ['$http', function ( $http ) {

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
