app.config(function($stateProvider) {

  $stateProvider.state('createEvent', {
    url: '/createEvent',
    views: {
      'homeNav': {},
      'mainView': {
        templateUrl: 'views/events/create-event.html',
        controller: 'CreateEventController'
      }
    }
  });
});