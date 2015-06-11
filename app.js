/*
**TO DO:
**separate controllers
**separate data - 'contents' sidebar will be tab.sidebar.contents set equal to an array from each content page's scope.
**fetch data with .json and separate services for each page.
**angular-router handles url changes when tabs change
**ng-view
*/
define('app', ['angular','angularAMD','tab-controller', 'home-controller', 'about-controller', 'projects-controller','angular-route', 'ngAnimate', 'ngTouch', 'angular-carousel', 'ngSanitize', 'spark-scroll'], 
	function (angular, angularAMD) {

	var app = angular.module("application",['ngAnimate', 'angular-carousel', 'ngSanitize', 'ngRoute', 'gilbox.sparkScroll']);

	app.run(['$anchorScroll', function($anchorScroll) {
		  $anchorScroll.yOffset = 50;   // always scroll by 50 extra pixels
		}]);

	app.config(function($routeProvider, $locationProvider) {
	    $routeProvider
	      .when('/', {
	        templateUrl: 'views/home.html',
	        controller: 'HomeCtrl',
	        controllerAs: 'HomeCtrl'
	      })
	      .when('/about', {
	        templateUrl: 'views/about.html',
	        controller: 'AboutCtrl',
	        controllerAs: 'AboutCtrl'
	      })
	      .when('/projects', {
	        templateUrl: 'views/projects.html',
	        controller: 'ProjectsCtrl',
	        controllerAs: 'ProjectsCtrl'
	      })
	      .otherwise({
	        redirectTo: '/'
	      });

		$locationProvider.html5Mode(true).hashPrefix('#');
	});

	app.controller('MainCtrl', ['$scope', '$location', '$anchorScroll', '$sce','$http','$rootScope','sparkSetup', '$timeout',
		function ($scope, $location, $anchorScroll, $sce, $http, $rootScope, sparkSetup, $timeout) {
			sparkSetup.debug = true;
			sparkSetup.enableInvalidationInterval();

			$rootScope.makeActive = function(index) {
				$rootScope.active = index;
			};

			$rootScope.isActive = function(index) {
				return $rootScope.active === index;
			};

			$rootScope.deliberatelyTrustDangerousSnippet = function(item) {
	           return $sce.trustAsHtml(item);
	         };

			$rootScope.goTo = function(loc) {
				$timeout(function() {
		            $location.hash(loc);
		            $anchorScroll();
		        });
			};

	}]);

	app.directive('navBar', function() {
		return {
			restrict: 'E',
			templateUrl: 'templates/navbar.html'
		};
	});

	app.directive('tabContent', function() {
		return {
			restrict: 'E',
			templateUrl: 'templates/tabs.html'
		};
	});

	app.directive('sidebar', function() {
		return {
			restrict: 'E',
			templateUrl: 'templates/sidebar.html'
		};
	});

	app.directive('homeContent', function() {
		return {
			restrict: 'E',
			templateUrl: 'views/home.html'
		};
	});

	app.directive('aboutContent', function() {
		return {
			restrict: 'E',
			templateUrl: 'views/about.html'
		};
	});

	app.directive('projectsContent', function() {
		return {
			restrict: 'E',
			templateUrl: 'views/projects.html'
		};
	});

	//directive that updates progress bar based on given scope value to watch.
	app.directive('progressBar', function() {
		return {
		    restrict: 'A',
		    link: function(scope, element, attrs) {
		      var watchFor = attrs.progressBarWatch;
		      var total = attrs.ariaValuemax;
		      // update now
		      var val = scope[watchFor];
		      element.attr('aria-valuenow', val);
		      element.css('width', (val/total*100)+"%");

		      // watch for the value
		      scope.$watch(watchFor, function(val) {
		        element.attr('aria-valuenow', val);
		        element.css('width', (Math.round(val/total*100))+"%");
		        if (val/total === 1 || scope[watchFor] === undefined) {element.parent().parent().css('display', 'none');}
		      })
		    }
		}
	});


  return angularAMD.bootstrap(app);
});