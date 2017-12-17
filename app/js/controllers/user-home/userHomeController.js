app.controller('UserHomeController', function($scope, $mdDialog) {

  $scope.showAdvanced = function(ev) {
    $mdDialog.show({
      controller: 'CreateEventController',
      templateUrl: 'views/events/create-event.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true,
      fullscreen: true // Only for -xs, -sm breakpoints.
    }).then(function(answer) {
      $scope.status = 'You said the information was "' + answer + '".';
    }, function() {
      $scope.status = 'You cancelled the dialog.';
    });
  };
});