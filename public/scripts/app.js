/*
** Defines an entry-point module for Tyler's personal site.
**
** Dependencies to be injected into this module are listed in an array using relative path aliases from require.config.js.
** Include only the Firebase features as you need.
*/
define([
  'angularAMD',
  '@firebase/app',
  '@firebase/analytics',
  'angular-carousel',
  'angular-route',
  'angular-sanitize',
  'angularfire'
],
  (angularAMD, FirebaseApp) => {

    // Firebase configuration
    // cspell: disable
    var firebaseConfig = {
      apiKey: "AIzaSyAUMLrpSEYcmbViqWscWyBSqdZV122CNy8",
      authDomain: "valued-cumulus-300017.firebaseapp.com",
      projectId: "valued-cumulus-300017",
      storageBucket: "valued-cumulus-300017.appspot.com",
      messagingSenderId: "927371268598",
      appId: "1:927371268598:web:7ba741d86a81b828e837d7",
      measurementId: "G-SEJV5SEFXB"
    };
    // cspell: enable
    // Initialize Firebase
    FirebaseApp.initializeApp(firebaseConfig);
    FirebaseApp.analytics();

    var app = angular.module('tyler-site', ['firebase', 'ngAnimate', 'ngTouch', 'angular-carousel', 'ngSanitize', 'ngRoute']);


    // configure routes
    app.config(function ($routeProvider, $locationProvider) {
      $routeProvider
        .when('/', {
          templateUrl: 'views/home.html',
          controller: 'HomeCtrl',
          controllerAs: '$ctrl',
          activeTab: 'home',
          reloadOnSearch: false
        })
        .when('/about', {
          templateUrl: 'views/about.html',
          controller: 'AboutCtrl',
          controllerAs: '$ctrl',
          activeTab: 'about',
          reloadOnSearch: false
        })
        .when('/projects', {
          templateUrl: 'views/projects.html',
          controller: 'ProjectsCtrl',
          controllerAs: '$ctrl',
          activeTab: 'projects',
          reloadOnSearch: false
        })
        .otherwise({
          redirectTo: '/',
        });

      $locationProvider.html5Mode(true).hashPrefix('#');
    });

    return app;
  });
