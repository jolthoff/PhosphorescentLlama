app.factory( 'httpFactory', ['$http', function ( $http ) {

  var requests = {
    getSequencer: function (level, callback) {
      return $http.get('/level' + level.toString())
        .then(function(data) {
          callback(data);
        });
    }
  };
  //request for sequencer
  //.then takes response.body
  //var targetSequencer Sequencer.prototype.retrieve(response.body)

  return requests;

}]);
