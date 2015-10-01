app.controller('loginController', [ '$scope', 'httpFactory', '$rootScope' function ( $scope, httpFactory, $rootScope ) {
  
  $scope.login = function ( ) {

    httpFactory.loginUser( $scope.user, function ( response ) {

      $rootScope.user = response.body;

    });

  };


}]);
