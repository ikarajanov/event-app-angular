app.controller('CreateEventController', function($scope, eventFactory, $location) {

  $scope.event = {};

  $scope.createEvent = function(invalidForm) {

    if (invalidForm) {
      return;
    }

    eventFactory.createNewEvent($scope.event);
  };

});