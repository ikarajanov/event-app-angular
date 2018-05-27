app.controller('MyEventsController', function($scope, $rootScope, $location,
                                              $localStorage, eventFactory, $mdToast, $mdDialog,
                                              PaginationModel) {

    $rootScope.userHome = $location.path().indexOf('userHome') > -1;
    $scope.events = {};
    $scope.paginationModel = PaginationModel;
    var me = this;
    me.paginationStep = 0;
    $scope.paginationModel.startValue = 1 + 5 * me.paginationStep;
    $scope.paginationModel.actualValue = $scope.paginationModel.startValue;

      $scope.getUserEvents = function() {

          if ($localStorage.loggedUser != null) {
              var promise = eventFactory.getUserEvents($scope.paginationModel.actualValue);

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


    $scope.nextEventPage = function(paginationValue) {

        if (paginationValue > 0) {

            $scope.paginationModel.actualValue = paginationValue;

            if ($scope.paginationModel.actualValue % 5 === 0 && me.paginationStep > 0) {
                if ((me.paginationStep + 1) * 5 !== $scope.paginationModel.actualValue) {
                    me.paginationStep -= 1;
                }
            }

            if ($scope.paginationModel.actualValue % 5 === 1) {
                if ((me.paginationStep + 1) * 5 < $scope.paginationModel.actualValue) {
                    me.paginationStep += 1;
                }
            }

            $scope.paginationModel.startValue = 1 + 5 * me.paginationStep;

            $scope.getUserEvents();

            angular.element('#hiddenInput').focus()
        }
    };

    $scope.getUserEvents();
});