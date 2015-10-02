app.controller('NavController', [ '$scope', 'httpFactory', '$rootScope', function ( $scope, httpFactory, $rootScope ) {
  
  $scope.login = function ( ) {

    httpFactory.loginUser( $scope.user, function ( response ) {

      $rootScope.user = {};

      $rootScope.user.username = response.headers('username');

      $rootScope.user.level = response.headers('level');

      console.log($rootScope.user);

    });

  };

  $scope.reloadGameController = function ( ) {

    
    
  };

  $scope.signup = function ( ) {

    httpFactory.signupUser( $scope.user, function ( response ) {

      $rootScope.user = {};

      $rootScope.user.level = 1;

      $rootScope.user.username = response.headers('username');

    });

  };


}]);
