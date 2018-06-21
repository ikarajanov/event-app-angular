app.factory("eventFactory", function($http, $localStorage, $q) {

  var me = this;
  me.port = "http://localhost:8080";
  me.prefix = "/event";
  me.categories = {};
  me.locations = {};

  function getUserEvents(step) {

    var deferred = $q.defer();
    var userId = $localStorage.loggedUser.id;

    $http({
      method: 'GET',
      url: me.port + me.prefix + '/getUserEvents',
      headers : {'Accept' : 'application/json'},
      params: {
          userId: userId,
          step: step - 1
      }
    }).then(function(events){
      $localStorage.events = events.data;
      deferred.resolve();
    }, function(error){
      deferred.reject(error);
    });

    return deferred.promise;
  }

    function createNewEvent(event, image) {

        var deferred = $q.defer();

        $http({
            method: 'POST',
            url: me.port + me.prefix + '/createNew',
            headers : {'Accept' : 'application/json'},
            data: {
                event: event,
                image: image
            }
        }).then(function(events){
            $localStorage.events = events.data;
            deferred.resolve();
        }, function(error){
            deferred.reject(error);
        });

        return deferred.promise;
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

  function getNearbyEvents(radius, step) {

      var deferred = $q.defer();
      var userId = $localStorage.loggedUser.id;

      $http({
          method: 'GET',
          url: me.port + me.prefix + '/getNearbyEvents',
          headers : {'Accept' : 'application/json'},
          params: {
            userId: userId,
            radius: radius,
            step: step - 1
          }
      }).then(function(events){
          $localStorage.events = events.data;
          deferred.resolve();
      }, function(error){
          deferred.reject(error);
      });

      return deferred.promise;
  }

  function deleteEvent(event) {

      var deferred = $q.defer();
      var userId = $localStorage.loggedUser.id;

      $http({
          method: 'POST',
          url: me.port + me.prefix + '/deleteEvent',
          headers : {'Accept' : 'application/json'},
          params: {
              eventId: event.id,
              userId: userId
          }
      }).then(function(events){
          $localStorage.events = events.data;
          deferred.resolve();
      }, function(error){
          deferred.reject(error);
      });

      return deferred.promise;
  }

    function findEvents(searchModel, step) {
        var deferred = $q.defer();

        var latitude = null;
        var longitude = null;
        if (searchModel.location != null) {
            latitude = searchModel.location.latitude;
            longitude = searchModel.location.longitude;
        }

        $http({
            method: 'GET',
            url: me.port + me.prefix + '/findBy',
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                'Access-Control-Allow-Origin' : '*'
            },
            params: {
                userId: searchModel.userId,
                distance: searchModel.range,
                latitude: latitude,
                longitude: longitude,
                category: searchModel.category,
                step: step - 1
            }
        }).then(function(events){
            $localStorage.events = events.data;
            deferred.resolve();
        }, function(error){
            deferred.reject(error);
        });

        return deferred.promise;
    }

  return {
    getUserEvents: getUserEvents,
    getNearbyEvents: getNearbyEvents,
    createNewEvent: createNewEvent,
    deleteEvent: deleteEvent,
    getEventCategories: getEventCategories,
    findEvents: findEvents,
    getEventLocations: getEventLocations
  }
});