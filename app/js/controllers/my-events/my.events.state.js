app.config(function($stateProvider) {

  $stateProvider.state('myEventsPage', {
    url: '/myEvents',
    views: {
      'homeNav': {
        templateUrl: 'views/user-home/user-home.html',
        controller: 'MyEventsController'
      },
      'mainView': {
        templateUrl: 'views/events/events.html',
        controller: 'MyEventsController'
      }
    }
  });
});