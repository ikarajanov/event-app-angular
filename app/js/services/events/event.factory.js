app.factory("eventFactory", function($http, $localStorage, $q) {

  var port = "http://localhost:8085";
  var prefix = "/event";

  function getAllFbEvents(accessToken) {

    $http({
      method: 'POST',
      url: port + prefix + '/getAllFbEvents',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin' : '*'
      },
      data: accessToken
    }).then(function(events){
      $localStorage.events = events;
    }, function(error){

    });
  }

  function getAllEvents(userId) {

    var deferred = $q.defer();

    $http({
      method: 'POST',
      url: port + prefix + '/getAll',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin' : '*'
      },
      data: userId
    }).then(function(events){
      $localStorage.events = events;
      deferred.resolve();
    }, function(error){
      deferred.reject(error);
    });

    return deferred.promise;
  }

  function createNewEvent(accessToken) {

    $http({
      method: 'POST',
      url: port + prefix + '/getAll',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin' : '*'
      },
      data: accessToken
    }).then(function(events){
      $localStorage.events = events;
    }, function(error){

    });
  }

  return {
    getAllEvents: getAllEvents,
    getAllFbEvents: getAllFbEvents,
    createNewEvent: createNewEvent
  }
});