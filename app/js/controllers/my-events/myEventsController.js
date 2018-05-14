app.controller('MyEventsController', function($scope, $rootScope, $location,
                                              $localStorage, eventFactory, $mdToast, $mdDialog) {

    $rootScope.userHome = $location.path().indexOf('userHome') > -1;
    $scope.events = {};

      $scope.getUserEvents = function() {

          if ($localStorage.loggedUser != null) {
              var promise = eventFactory.getUserEvents();

              promise.then(function () {
                  $scope.events = $localStorage.events;
              }, function () {
                  $mdToast.show(
                      $mdToast.simple()
                          .textContent('Some error occurs!')
                          .position('top right')
                          .toastClass("toastStyle"));
              })
          }
      };

    $scope.showAdvanced = function(ev) {
        $mdDialog.show({
            controller: 'CreateEventController',
            templateUrl: 'views/events/create-event.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: false // Only for -xs, -sm breakpoints.
        }).then(function() {
            $location.path("/myEvents");
            $scope.events = $localStorage.events;
        }, function() {
            $scope.events = $localStorage.events;
        });
    };

    $scope.showEventDetails = function(ev, event) {
        $mdDialog.show({
            controller: 'EventDetailsController',
            templateUrl: 'views/events/event-details.html',
            locals: {event: event},
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true
        }).then(function () {
            $scope.events = $localStorage.events;
        }, function () {
            $scope.events = $localStorage.events;
        });
    };

    $scope.getUserEvents();
});