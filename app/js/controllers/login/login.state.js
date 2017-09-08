app.config(function($stateProvider) {

  $stateProvider.state('login', {
    url: '/login',
    views: {
      'homeNav': {},
      'mainView': {
        templateUrl: 'views/login/login.html',
        controller: 'LoginController'
      }
    }
  });

  $stateProvider.state('signUp', {
    url: '/signUp',
    views: {
      'homeNav': {},
      'mainView': {
        templateUrl: 'views/login/signup.html',
        controller: 'LoginController'
      }
    }
  });
});