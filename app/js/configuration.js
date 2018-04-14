app.config(function ($qProvider, $stateProvider, $urlRouterProvider) {
  $qProvider.errorOnUnhandledRejections(false);

  $stateProvider.state('home', {
    url: '/home',
    views: {
      'homeNav': {
        templateUrl: 'views/user-home/user-home.html',
        controller: 'HomeController'
      },
      'mainView': {
        templateUrl: 'views/home.html',
        controller: 'HomeController'
      }
    }
  });

  $urlRouterProvider.otherwise("userHome");
});

app.run(function($rootScope, $window, $localStorage) {

    $rootScope.user = $localStorage.loggedUser;
    $rootScope.userLogged = {};

    $window.fbAsyncInit = function() {
      // Executed when the SDK is loaded

      FB.init({

        /*
         The app id of the web app;
         To register a new app visit Facebook App Dashboard
         ( https://developers.facebook.com/apps/ )
        */

        appId: '1484816704916747',

        /*
         Adding a Channel File improves the performance
         of the javascript SDK, by addressing issues
         with cross-domain communication in certain browsers.
        */

        channelUrl: 'app/channel.html',

        /*
         Set if you want to check the authentication status
         at the start up of the app
        */

        status: true,

        /*
         Enable cookies to allow the server to access
         the session
        */

        cookie: true,

        /* Parse XFBML */

        xfbml: true
      });

      // sAuth.watchAuthenticationStatusChange();

    };

    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];

      if (d.getElementById(id))
        return;

      js = d.createElement(s); js.id = id;
      js.src = "//connect.facebook.net/en_GB/sdk.js#xfbml=1&version=v2.10&appId=1484816704916747";

      fjs.parentNode.insertBefore(js, fjs);

    }(document, 'script', 'facebook-jssdk'));

  // FB.Event.subscribe('xfbml.render');

  // FB.getLoginStatus(function(response) {
  //   if (response.status === 'connected') {
  //     var accessToken = response.authResponse.accessToken;
  //   }
  // } );
  });
