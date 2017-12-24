app.directive("imageUpload", function() {
  return {
    restrict: 'E',
    scope: {
      image: '='
    },
    templateUrl: '../../views/directives/image-upload.html',
    link: function postLink(scope, elem) {

      elem.on("change", function(evt) {
        var file= evt.currentTarget.children.fileInput.files[0];
        var reader = new FileReader();
        reader.onload = function (evt) {
          scope.$apply(function(scope){
            scope.image=evt.target.result;
          });
        };
        reader.readAsDataURL(file);
      })
    }
  }
});