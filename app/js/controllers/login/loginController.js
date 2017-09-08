app.controller('LoginController', function($scope, userFactory, $location) {
  $scope.user = {};
  $scope.userAlreadyExist = false;

  $scope.logIn = function(invalidForm) {

    if (invalidForm) {
      return;
    }

    var promise = userFactory.logIn($scope.user);
    promise.then(function() {

      $location.path("/userHome");
    }, function(reason) {

      var message = reason.data.message;
      if (message === "emailNotExist") {
        $scope.loginForm.email.$error.notExist = true;
      } else if (message === "invalidPassword") {
        $scope.loginForm.password.$error.incorrectPassword = true;
      }
    })
  };

  $scope.signUp = function(invalidForm) {

    if (invalidForm) {
      return;
    }

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

  $scope.checkLoginState = function() {

    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        var accessToken = response.authResponse.accessToken;

        eventFactory.getAllEvents(accessToken);
      }
    });
  };

});