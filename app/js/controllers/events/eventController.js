app.controller('EventDetailsController', function($scope, event, $mdDialog, eventFactory) {

  $scope.event = event;

  $scope.cancel = function() {
      $mdDialog.cancel();
  };

  $scope.deleteEvent = function () {

      var promise = eventFactory.deleteEvent($scope.event);

      promise.then(function () {
          $scope.cancel();
      }, function () {
          $mdToast.show(
              $mdToast.simple()
                  .textContent('Some error occurs!')
                  .position('top right')
                  .toastClass("toastStyle"));
      })
  };

});