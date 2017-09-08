app.config(function($stateProvider) {

  $stateProvider.state('login', {
    url: '/login',
    templateUrl: 'views/login/login.html',
    controller: 'LoginController',
    controllerAs: 'ctrl'
  });

  $stateProvider.state('signup', {
    url: '/signup',
    templateUrl: 'views/login/signup.html',
    controller: 'LoginController',
    controllerAs: 'ctrl'
  });
});