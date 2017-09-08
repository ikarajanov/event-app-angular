app.config(function($stateProvider) {

  $stateProvider.state('userHomePage', {
    url: '/userHome',
    templateUrl: 'views/user-home/user-home.html',
    controller: 'UserHomeController',
    controllerAs: 'ctrl'
  });
});