app.factory("eventFactory", function($http, $localStorage, $q) {

  var me = this;
  me.port = "http://localhost:8085";
  me.prefix = "/event";
  me.categories = {};
  me.locations = {};

  function getAllFbEvents(accessToken) {

    $http({
      method: 'POST',
      url: me.port + me.prefix + '/getAllFbEvents',
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
      url: me.port + me.prefix + '/getAll',
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
      url: me.port + me.prefix + '/getAll',
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
  
  function getEventCategories() {

    var deferred = $q.defer();

    if (me.categories.length === undefined || me.categories.length === 0) {
      $http({
        method: 'GET',
        url: me.port + me.prefix + '/getCategories',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Access-Control-Allow-Origin' : '*'
        }
      }).then(function(response){
        me.categories = response.data;
        deferred.resolve(me.categories);
      }, function(error){
        deferred.reject(error);
      });
    } else {
      deferred.resolve(me.categories);
    }

    return deferred.promise;
  }

  function getEventLocations() {

    var deferred = $q.defer();

    if (me.locations.length === undefined || me.locations.length === 0) {
      $http({
        method: 'GET',
        url: me.port + me.prefix + '/getLocations',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Access-Control-Allow-Origin' : '*'
        }
      }).then(function(response){
        me.locations = response.data;
        deferred.resolve(me.locations);
      }, function(error){
        deferred.reject(error);
      });
    } else {
      deferred.resolve(me.locations);
    }

    return deferred.promise;
  }

  return {
    getAllEvents: getAllEvents,
    getAllFbEvents: getAllFbEvents,
    createNewEvent: createNewEvent,
    getEventCategories: getEventCategories,
    getEventLocations: getEventLocations
  }
});