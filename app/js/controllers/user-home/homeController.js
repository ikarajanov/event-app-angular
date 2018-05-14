app.controller('HomeController', function($scope, eventFactory, $localStorage,
                                          $rootScope, $location, $mdDialog, $mdToast, User) {

    $rootScope.userHome = $location.path().indexOf('userHome') > -1;
    $scope.user = new User;
    $scope.events = {};

    $scope.getNearbyEvents = function() {

    if ($localStorage.loggedUser != null) {
        var radius = 1500;
        var promise = eventFactory.getNearbyEvents(radius);

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
        }).then(function() {
            $scope.events = $localStorage.events;
        }, function() {
            $scope.events = $localStorage.events;
        });
    };

    $scope.getNearbyEvents();
});