app.controller('HomeController', function($scope, eventFactory, $localStorage) {

  $scope.user = {};
  $scope.events = {};

  $scope.getAllEvents = function() {

    var promise = eventFactory.getAllEvents();

    promise.then(function() {
      $scope.events = $localStorage.events.data;
    }, function(reason) {
      
    })

  };

  $scope.getAllEvents();
});