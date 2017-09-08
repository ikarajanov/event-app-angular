app.factory("userFactory", function($http, $localStorage, $q, $window) {

  var port = "http://localhost:8085";
  var prefix = "/user";

  function addNewUser(user) {

    var deferred = $q.defer();
    $http({
      method: 'POST',
      url: port + prefix + '/addNew',
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
    $http({
      method: 'POST',
      url: port + prefix + '/logIn',
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
  

  return {
    addNewUser: addNewUser,
    logIn: logIn
  }
});