app.controller('NavController', [ '$scope', 'httpFactory', '$rootScope', '$location' , function ( $scope, httpFactory, $rootScope, $location ) {
  
  $scope.login = function ( ) {

    httpFactory.loginUser( $scope.user, function ( response ) {

      $rootScope.user = {};

      if( response.status === 200 ) {

        $rootScope.user.username = response.headers( 'username' );

        $rootScope.user.level = response.headers( 'level' );

        $location.path( response.data );

      }

    });

  };

  $scope.reloadGameController = function ( ) {

  };

  $scope.signup = function ( ) {

    httpFactory.signupUser( $scope.user, function ( response ) {

      $rootScope.user = {};

      $rootScope.user.level = 1;

      $rootScope.user.username = response.headers( 'username' );

      if( response.status === 200 ) {

        $location.path( response.data );

      }

    });

  };


}]);
