app.controller('signupController', [ '$scope', 'httpFactory', '$rootScope' function ( $scope, httpFactory, $rootScope ) {
  
  $scope.signup = function ( ) {

    httpFactory.signupUser( $scope.user, function ( response ) {

      response.body.level = 1;

      $rootScope.user = response.body;

    });

  };


}]);
