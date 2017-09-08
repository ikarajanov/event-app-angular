app.directive("wpCombo", function () {
    var directive = {
      restrict: 'E',
      templateUrl: 'views/directives/wp-combo.html',
      scope: {
        wpLabel: '@',
        wpModel: '=',
        wpData: '='
      },
      bindToController: true,
      controllerAs: 'ctrl',
      transclude: {
        item: 'item',
        selected: 'selected'
      },
      controller: ['$scope', function WpComboController($scope) {
        var ctrl = this;

        ctrl.placeholder = 'Choose ' + ctrl.wpLabel;
      }]
    };
    return directive;
});

