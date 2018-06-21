app.controller('CreateEventController', function($scope, eventFactory, $mdDialog, $mdToast,
                                                 Upload, $timeout, Location, $localStorage, LocationUtility,
                                                 parent) {

  var me = this;
  $scope.event = {};

  $scope.categories = {};
  $scope.myImage = '';
  $scope.myCroppedImage='';
  $scope.invalidCreateEventForm = false;

  $scope.createEvent = function(invalidForm) {

    if (invalidForm) {
        $scope.invalidCreateEventForm = true;
        return;
    }

    $scope.event.location = LocationUtility.createLocation($scope.event.location);
    $scope.event.owner = $localStorage.loggedUser;

    var promise = eventFactory.createNewEvent($scope.event, $scope.myCroppedImage);

    promise.then(function() {
        $scope.hide();
    }, function () {
      $mdToast.show(
          $mdToast.simple()
              .textContent('Some error occurs while creating of the event!')
              .position('top right')
              .toastClass("toastStyle"));
    })
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

  $scope.myStyle = {'width': $scope.progress + '%' };

  me.loadCategories();
});