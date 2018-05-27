app.controller('HomeController', function($scope, eventFactory, $localStorage,
                                          $rootScope, $location, $mdDialog,
                                          $mdToast, User, SearchModel, LocationUtility, PaginationModel) {

    $rootScope.userHome = $location.path().indexOf('userHome') > -1;
    $scope.user = new User;
    $scope.searchModel = new SearchModel;
    $scope.events = {};
    $scope.categories = {};
    $scope.paginationModel = PaginationModel;
    var me = this;
    me.paginationStep = 0;
    $scope.paginationModel.startValue = 1 + 5 * me.paginationStep;
    $scope.paginationModel.actualValue = $scope.paginationModel.startValue;

    $scope.getNearbyEvents = function() {

    if ($localStorage.loggedUser != null) {
        var radius = 1500;
        var promise = eventFactory.getNearbyEvents(radius, $scope.paginationModel.actualValue);

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

    $scope.loadCategories = function() {
        var promise = eventFactory.getEventCategories();

        promise.then(function(categories) {
            $scope.categories = categories;
        })
    };

    $scope.searchEvents = function(){
        if ($localStorage.loggedUser != null) {
            $scope.searchModel.userId = $localStorage.loggedUser.id;

            if ($scope.searchModel.location != null && $scope.searchModel.location.geometry != null) {
                $scope.searchModel.location = LocationUtility.createLocation($scope.searchModel.location);
            }

            var promise = eventFactory.findEvents($scope.searchModel, $scope.paginationModel.actualValue);

            promise.then(function () {
                $scope.events = $localStorage.events;
            }, function () {
                $mdToast.show(
                    $mdToast.simple()
                        .textContent('Some error occurs!')
                        .position('top right')
                        .toastClass("toastStyle"));
            });
            $scope.searchModel = {};
        }
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

            if ($scope.searchModel.location != null || $scope.searchModel.category != null) {
                $scope.searchEvents();
            } else {
                $scope.getNearbyEvents();
            }

            angular.element('#hiddenInput').focus()
        }
    };

    $scope.getNearbyEvents();
    $scope.loadCategories();
});