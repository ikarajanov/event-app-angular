app.config(function($stateProvider) {

  $stateProvider.state('userHomePage', {
    url: '/userHome',
    views: {
      'homeNav': {
        templateUrl: 'views/user-home/user-home.html',
        controller: 'UserHomeController'
      },
      'mainView': {
        templateUrl: 'views/user-home/events.html',
        controller: 'HomeController'
      }
    }
  });
});