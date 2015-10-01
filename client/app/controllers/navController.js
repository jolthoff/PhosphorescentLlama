app.controller('NavController', [ '$scope', 'httpFactory', '$rootScope', function ( $scope, httpFactory, $rootScope ) {
  
  $scope.login = function ( ) {

    httpFactory.loginUser( $scope.user, function ( response ) {

      $rootScope.user = response.body;

    });

  };

  $scope.signup = function ( ) {

    httpFactory.signupUser( $scope.user, function ( response ) {

      response.body.level = 1;

      $rootScope.user = response.body;

    });

  };


}]);
