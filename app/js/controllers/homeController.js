app.controller('HomeController', function($scope, eventFactory, $localStorage, $rootScope, $location) {

  $scope.user = {};
  $scope.events = {};

  $scope.getAllEvents = function() {

    var promise = eventFactory.getAllEvents();

    promise.then(function() {
      $scope.events = $localStorage.events.data;
    }, function(reason) {
      
    })

  };

  $scope.logOut = function() {
    $rootScope.user = null;
    $localStorage.loggedUser = null;
    $location.path("/home");
  };

  $scope.getAllEvents();
});