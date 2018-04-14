app.factory("userFactory", function($http, $localStorage, $q, $rootScope) {

  var port = "http://localhost:8080";
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
    }).then(function(response){
      $localStorage.loggedUser = response.data;
      $rootScope.user = response.data;
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
    }).then(function(response){
      $localStorage.loggedUser = response.data;
      $rootScope.user =  response.data;
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