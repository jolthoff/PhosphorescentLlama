app.controller( 'ActiveController', ['$scope', 'httpFactory', '$rootScope', '$location' , function ( $scope, httpFactory, $rootScope, $location ) {

  $scope.logout = function ( ) {

    httpFactory.logout( function ( response ) {

      $rootScope.user = null;

      if( response.status === 200 ) {

        $location.path( response.data );

        $rootScope.$broadcast( 'destroySequencers' );
        
      }


    });

  };

}]);
