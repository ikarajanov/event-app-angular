app.controller('HomeController', function($scope, eventFactory, $localStorage,
                                          $rootScope, $location, $mdDialog, User) {

  $scope.user = new User;
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


  $scope.showAdvanced = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'views/events/create-event.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: true // Only for -xs, -sm breakpoints.
    })
        .then(function(answer) {
          $scope.status = 'You said the information was "' + answer + '".';
        }, function() {
          $scope.status = 'You cancelled the dialog.';
        });
  };

  function DialogController($scope, $mdDialog) {
    $scope.hide = function() {
      $mdDialog.hide();
    };

    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.answer = function(answer) {
      $mdDialog.hide(answer);
    };
  }
});