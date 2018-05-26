app.config(function ($qProvider, $stateProvider, $urlRouterProvider) {

  $qProvider.errorOnUnhandledRejections(false);

  $stateProvider.state('home', {
    url: '/home',
    views: {
      'homeNav': {
        templateUrl: 'views/cover-photo.html'
      },
      'mainView': {
        templateUrl: 'views/home.html'
      }
    }
  });

  $urlRouterProvider.otherwise("home");
});

app.run(function($rootScope, $window, $localStorage, $location) {

    $rootScope.user = $localStorage.loggedUser;
    $rootScope.userLogged = {};
    $rootScope.localhost = "http://localhost:8000/";

    if ($rootScope.user != null) {
        $location.path("/userHome");
        $rootScope.userHome = true;
    } else {
        $location.path("/home");
        $rootScope.userHome = false
    }
  });
