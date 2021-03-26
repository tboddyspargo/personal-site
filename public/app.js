/*
** Defines an entry-point module for Tyler's personal site.
**
** Dependencies to be injected into this module are listed in an array.
** Include only the Firebase features as you need.
**
** The app module itself is the main orchestrator of the entire site.
*/
define([
    'angular',
    '@firebase/app',
    'controllers/main',
    'controllers/home',
    'controllers/about',
    'controllers/projects',
    'angular-route',
    'angular-carousel',
    'ngSanitize',
    'spark-scroll',
    'utils/behavior',
    'utils/helpers',
    'ng-slide-down',
    '@firebase/analytics',
    '@firebase/performance',
    'angularfire'
],
(angular, firebase, mainController, homeController, aboutController, projectsController) => {
    // Your web app's Firebase configuration
    // For Firebase JS SDK v7.20.0 and later, measurementId is optional
    var firebaseConfig = {
        apiKey: "AIzaSyAUMLrpSEYcmbViqWscWyBSqdZV122CNy8",
        authDomain: "valued-cumulus-300017.firebaseapp.com",
        projectId: "valued-cumulus-300017",
        storageBucket: "valued-cumulus-300017.appspot.com",
        messagingSenderId: "927371268598",
        appId: "1:927371268598:web:7ba741d86a81b828e837d7",
        measurementId: "G-SEJV5SEFXB"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    firebase.analytics();

    var app = angular.module('tyler-site', ['firebase', 'ngAnimate', 'angular-carousel', 'ngSanitize', 'ngRoute', 'gilbox.sparkScroll', 'ng-slide-down']);

    // initiate app and handle route changes that also scroll to location.
    app.run(['$rootScope', '$location', '$anchorScroll', '$routeParams', '$timeout', function ($rootScope, $location, $anchorScroll, $routeParams, $timeout) {
        $anchorScroll.yOffset = 50; // always scroll by 50 extra pixels
        $rootScope.$on('$routeChangeSuccess',
            function (next, current) {
                var loc = $routeParams.loc;
                if (loc) {
                    $timeout(function () {
                        $location.url($location.path());
                        $location.hash(loc);
                        $anchorScroll();
                    }, null, null, loc);
                }
            });
    } ]);

    // configure routes
    app.config(function ($routeProvider, $locationProvider) {
        $routeProvider
            .when('/', {
                templateUrl: 'views/home.html',
                controller: homeController,
                controllerAs: 'HomeCtrl',
                reloadOnSearch: false
            })
            .when('/about', {
                templateUrl: 'views/about.html',
                controller: aboutController,
                controllerAs: 'AboutCtrl',
                reloadOnSearch: false
            })
            .when('/projects', {
                templateUrl: 'views/projects.html',
                controller: projectsController,
                controllerAs: 'ProjectsCtrl',
                reloadOnSearch: false
            })
            .otherwise({
                redirectTo: '/',
            });

        $locationProvider.html5Mode(true).hashPrefix('#');
    });

    // the MainCtrl initiates spark-scroll and provides it and other rootScope functions to app.
    app.controller('MainCtrl', mainController);

    // loading window as element
    app.directive('loadingWindow', function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/loading.html'
        };
    });

    // image-viewer as element
    app.directive('viewingWindow', function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/image-viewer.html'
        };
    });

    // navbar as element
    app.directive('navBar', function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/navbar.html'
        };
    });

    // sidebar as element
    app.directive('sidebar', function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/sidebar.html'
        };
    });

    // footer as element
    app.directive('tbsFooter', function () {
        return {
            restrict: 'E',
            templateUrl: 'templates/footer.html'
        };
    });

    //directive that scrolls to element with given id. It also prevents page refresh
    app.directive('scrollTo', function ($location, $anchorScroll, $timeout) {
        return function (scope, element, attrs) {

            element.bind('click', function (event) {
                if (attrs.scrollTo) {
                    $timeout(function () {
                        $location.hash(attrs.scrollTo);
                        $anchorScroll();
                    });
                }
            });

        };
    });

    // directive that updates progress bar based on given scope value to watch.
    app.directive('progressBar', function () {
        return {
            restrict: 'A',
            link: function (scope, element, attrs) {
                var watchFor = attrs.progressBarWatch;
                var total = attrs.ariaValuemax;
                // update now
                var val = scope[watchFor];
                element.attr('aria-valuenow', val);
                element.css('width', (val / total * 100) + "%");

                // watch for the value
                scope.$watch(watchFor, function (val) {
                    element.attr('aria-valuenow', val);
                    element.css('width', (Math.round(val / total * 100)) + "%");
                    if (val / total === 1 || scope[watchFor] === undefined) { element.parent().parent().css('display', 'none'); }
                });
            }
        };
    });
});
