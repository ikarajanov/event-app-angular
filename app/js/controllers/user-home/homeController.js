app.controller('HomeController', function($scope, eventFactory, $localStorage,
                                          $rootScope, $location, $mdDialog, $mdToast, User) {

    $rootScope.userHome = $location.path().indexOf('userHome') > -1;
    $scope.user = new User;
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

     $scope.logOut = function() {
       $rootScope.user = null;
       $localStorage.loggedUser = null;
       $location.path("/home");
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
           $scope.events = $localStorage.events.data;
       }, function() {
           $scope.status = 'You cancelled the dialog.';
       });
     };

     $scope.getUserEvents();
});