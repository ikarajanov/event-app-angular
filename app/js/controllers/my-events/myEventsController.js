app.controller('MyEventsController', function($scope, $rootScope, $location, $localStorage, eventFactory, $mdToast) {

    $rootScope.userHome = $location.path().indexOf('userHome') > -1;
    $scope.events = {};

      $scope.getUserEvents = function() {

          if ($localStorage.loggedUser != null) {
              var promise = eventFactory.getUserEvents();

              promise.then(function () {
                  $scope.events = $localStorage.events.data;
              }, function () {
                  $mdToast.show(
                      $mdToast.simple()
                          .textContent('Some error occurs!')
                          .position('top right')
                          .toastClass("toastStyle"));
              })
          }
      };

      $scope.getUserEvents();
});