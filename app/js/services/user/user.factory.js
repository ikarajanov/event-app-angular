app.factory("userFactory", function($http, $localStorage, $q, $window) {

  var port = "http://localhost:8085";

  function addNewUser(user) {

    var deferred = $q.defer();
    $http({
      method: 'POST',
      url: port + '/addNewUser',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin' : '*'
      },
      data: user
    }).then(function(loggedUser){
      $localStorage.loggedUser = loggedUser;
      deferred.resolve();
    }, function(error){
      deferred.reject(error);
    });

    return deferred.promise;
  }

  function logIn(user) {

    var deferred = $q.defer();

    FB.getLoginStatus(function(response) {
      statusChangeCallback(response);
    });

    return deferred.promise;
  }
  
  function statusChangeCallback() {
    
  }


  return {
    addNewUser: addNewUser,
    logIn: logIn,
    statusChangeCallback: statusChangeCallback
  }
});