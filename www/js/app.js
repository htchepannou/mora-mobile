// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('app', {
    url: "/app",
    abstract: true,
    templateUrl: "templates/menu.html",
    controller: 'AppCtrl'
  })


  .state('app.myteam', {
    url: "/myteam",
    views: {
      'menuContent': {
        templateUrl: "templates/myteam.html"
      }
    }
  })

  .state('app.blog', {
    url: "/blog",
    views: {
      'menuContent': {
        templateUrl: "templates/blog.html",
        controller: "BlogController"
      }
    }
  })
  .state('app.read', {
    url: "/read/{postId}",
    views: {
      'menuContent': {
        templateUrl: "templates/read.html",
        controller: "BlogPostController"
      }
    }
  })

  .state('app.calendar', {
    url: "/calendar",
    views: {
      'menuContent': {
        templateUrl: "templates/calendar.html"
      }
    }
  })

  .state('app.event', {
    url: "/event",
    views: {
      'menuContent': {
        templateUrl: "templates/event.html"
      }
    }
  })

  .state('app.video', {
    url: "/video",
    views: {
      'menuContent': {
        templateUrl: "templates/video.html"
      }
    }
  })
  .state('app.watch', {
    url: "/watch",
    views: {
      'menuContent': {
        templateUrl: "templates/watch.html"
      }
    }
  })


  .state('app.roster', {
    url: "/roster",
    views: {
      'menuContent': {
        templateUrl: "templates/roster.html"
      }
    }
  })

  .state('app.player', {
    url: "/player",
    views: {
      'menuContent': {
        templateUrl: "templates/player.html"
      }
    }
  })

  ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/calendar');
});
