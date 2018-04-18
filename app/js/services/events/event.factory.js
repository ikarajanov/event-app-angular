app.factory("eventFactory", function($http, $localStorage, $q) {

  var me = this;
  me.port = "http://localhost:8080";
  me.prefix = "/event";
  me.categories = {};
  me.locations = {};

  function getAllEvents() {

    var deferred = $q.defer();
    var userId = $localStorage.loggedUser.id;

    $http({
      method: 'GET',
      url: me.port + me.prefix + '/getAll',
      headers : {'Accept' : 'application/json'},
      params: {userId: userId}
    }).then(function(events){
      $localStorage.events = events;
      deferred.resolve();
    }, function(error){
      deferred.reject(error);
    });

    return deferred.promise;
  }

  function createNewEvent(event, image) {

    $http({
      method: 'POST',
      url: me.port + me.prefix + '/createNew',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin' : '*'
      },
      data: {
        event: event,
        image: image
      }
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
    createNewEvent: createNewEvent,
    getEventCategories: getEventCategories,
    getEventLocations: getEventLocations
  }
});