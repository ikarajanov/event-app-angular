app.controller('CreateEventController', function($scope, eventFactory, $mdDialog,
                                                 Upload, $timeout, Location, $localStorage, $moment) {

  var me = this;
  $scope.event = {};

  $scope.categories = {};
  $scope.myImage = '';
  $scope.myCroppedImage='';

  $scope.createEvent = function(invalidForm) {

    if (invalidForm) {
      return;
    }

    $scope.event.location = createLocation($scope.event.location);
    $scope.event.owner = $localStorage.loggedUser;

    eventFactory.createNewEvent($scope.event, $scope.myCroppedImage);
  };

  $scope.hide = function() {
    $mdDialog.hide();
  };

  $scope.cancel = function() {
    $mdDialog.cancel();
  };

  me.loadCategories = function() {
    var promise = eventFactory.getEventCategories();

    promise.then(function(categories) {
      $scope.categories = categories;
    })
  };

  $scope.upload = function (dataUrl, name) {
    Upload.upload({
      url: 'https://angular-file-upload-cors-srv.appspot.com/upload',
      data: {
        file: Upload.dataUrltoBlob(dataUrl, name)
      }
    }).then(function (response) {
      $timeout(function () {
        $scope.result = response.data;
      });
    }, function (response) {
      if (response.status > 0) $scope.errorMsg = response.status
          + ': ' + response.data;
    }, function (evt) {
      $scope.progress = parseInt(100.0 * evt.loaded / evt.total);
    });
  };

  function createLocation(location) {
    var name = location.name;
    var address = location.formatted_address;
    var url = location.url;
    var lat = $scope.event.location.geometry.location.lat();
    var lng = $scope.event.location.geometry.location.lng();

    return Location(name, address, url, lat, lng);
  }

  $scope.myStyle = {'width': $scope.progress + '%' };

  me.loadCategories();
});