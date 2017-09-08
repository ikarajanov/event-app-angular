app.directive('autocomleteDirective', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {
      'close': '&onClose'
    },
    templateUrl: 'views/directive/autocomplete.html'
  };
});