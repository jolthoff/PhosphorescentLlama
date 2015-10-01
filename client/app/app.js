var app = angular.module(  'app', [ 'ui.router' ] );

app.config( function ( $stateProvider, $httpProvider, $urlRouterProvider ) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('/', {
      views: {
        nav: {
          templateUrl: '../views/navView.html',
          controller: 'NavController'
        },
        content: {
          templateUrl: '../views/gameView.html',
          controller: 'GameController'
        }
      },
      url: '/'
    })
    .state('/active', {
      views: {
        nav: {
          tempalteUrl: '../views/activeView.html',
          controller: 'ActiveController'
        },
        content: {
          templateUrl: '../views/gameView.html',
          controller: 'GameController'
        }
      },
      url: '/active'
    });

});
