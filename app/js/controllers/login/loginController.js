app.controller('LoginController', function($scope, userFactory, $location, LocationUtility) {
  $scope.user = {};
  $scope.userAlreadyExist = false;

  $scope.logIn = function(invalidForm) {

    if (invalidForm) {
      return;
    }

    $scope.loginForm.email.$error.notExist = false;
    $scope.loginForm.password.$error.incorrectPassword = false;

    var promise = userFactory.logIn($scope.user);
    promise.then(function() {

      $location.path("/userHome");
    }, function(reason) {

      var message = reason.data.message;
      if (message === "emailNotExist") {
        $scope.loginForm.email.$error.notExist = true;
      } else if (message === "incorrectPassword") {
        $scope.loginForm.password.$error.incorrectPassword = true;
      }
    })
  };

  $scope.signUp = function(invalidForm) {

    if (invalidForm) {
      return;
    }

    $scope.userAlreadyExist = false;

    $scope.user.location = LocationUtility.createLocation($scope.user.location);

    var promise = userFactory.addNewUser($scope.user);
    promise.then(function() {

      $location.path("/userHome");
    }, function(reason) {

      var message = reason.data.message;
      if (message === "userAlreadyExist") {
        $scope.userAlreadyExist = true;
      }
    })
  };

});