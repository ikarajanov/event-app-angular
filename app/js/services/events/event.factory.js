app.factory("eventFactory", function($http, $localStorage, $q) {

  var me = this;
  me.port = "http://localhost:8080";
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

    // var base64ImageContent = image.replace(/^data:image\/(png|jpg);base64,/, "");
    // var blob = base64ToBlob(base64ImageContent, 'image/png');
    // var formData = new FormData();
    // formData.append('picture', blob);

    $http({
      method: 'POST',
      url: me.port + me.prefix + '/createNew',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Access-Control-Allow-Origin' : '*'
      },
      data: event
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


  function base64ToBlob(base64, mime)
  {
    mime = mime || '';
    var sliceSize = 1024;
    var byteChars = window.atob(base64);
    var byteArrays = [];

    for (var offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
      var slice = byteChars.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, {type: mime});
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