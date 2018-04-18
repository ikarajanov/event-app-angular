app.config(function ($qProvider, $stateProvider, $urlRouterProvider) {

  $qProvider.errorOnUnhandledRejections(false);

  $stateProvider.state('home', {
    url: '/home',
    views: {
      'homeNav': {
        templateUrl: 'views/user-home/user-home.html',
        controller: 'HomeController'
      },
      'mainView': {
        templateUrl: 'views/home.html',
        controller: 'HomeController'
      }
    }
  });

  $urlRouterProvider.otherwise("userHome");
});

app.run(function($rootScope, $window, $localStorage) {

    $rootScope.user = $localStorage.loggedUser;
    $rootScope.userLogged = {};
    $rootScope.localhost = "http://localhost:8000/";
    $rootScope.userHome = true;

  });
