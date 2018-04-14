app.config(function($stateProvider) {

  $stateProvider.state('userHomePage', {
    url: '/userHome',
    views: {
      'homeNav': {
        templateUrl: 'views/user-home/user-home.html',
        controller: 'UserHomeController'
      },
      'mainView': {
        templateUrl: 'views/events/events.html',
        controller: 'HomeController'
      }
    }
  });
});