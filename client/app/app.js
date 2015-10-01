

var app = angular.module(  'app', [ 'ui.router' ] );

app.config( function ( $stateProvider, $httpProvider, $urlRouterProvider ) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('login', {
      //refactor to have this here only once
      views: {
        content: {
          templateUrl: '../views/loginView.html',
          controller: 'loginController'
        }
      },
      url: '/login'
    })
    .state('signup', {
      //refactor to have this here only once
      views: {
        content: {
          templateUrl: '../views/signupView.html',
          controller: 'signupController'
        }
      },
      url: '/signup'
    })
    .state('game', {
      //refactor to have this here only once
      views: {
        content: {
          templateUrl: '../views/gameView.html',
          controller: 'gameController'
        }
      },
      url: '/game'
    });
});
