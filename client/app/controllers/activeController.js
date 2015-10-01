app.controller( 'ActiveController', ['$scope', 'httpFactory', '$rootScope', function ( $scope, httpFactory, $rootScope ) {

  $scope.logout = function ( ) {

    httpFactory.logout( function( ) {

      $rootScope.user = null;

    });

  };

}]);
