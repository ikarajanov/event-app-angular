app.controller('CreateEventController', function($scope, eventFactory, $mdDialog, Upload, $timeout) {

  var me = this;
  $scope.event = {};

  $scope.categories = {};

  $scope.createEvent = function(invalidForm) {

    if (invalidForm) {
      return;
    }

    eventFactory.createNewEvent($scope.event);
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

  me.loadLocations = function() {
    // var promise = eventFactory.getEventLocations();

    // promise.then(function(locations) {
    //   $scope.locations = locations;
    // })
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

  $scope.myStyle = {'width': $scope.progress + '%' };

  me.loadCategories();
  me.loadLocations();
});