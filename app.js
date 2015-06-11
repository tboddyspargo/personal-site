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

	app.run(['$rootScope', '$location', '$anchorScroll', '$routeParams', '$timeout', function($rootScope, $location, $anchorScroll, $routeParams, $timeout) {
		$anchorScroll.yOffset = 50;   // always scroll by 50 extra pixels
		$rootScope.$on('$routeChangeSuccess',
			function(next, current) {
				if ($routeParams.loc) {
					$location.url($location.path());
					$location.hash($routeParams.loc);
					$anchorScroll();
				}
  			});
	}]);

	app.config(function($routeProvider, $locationProvider) {
	    $routeProvider
	      .when('/', {
	        templateUrl: 'views/home.html',
	        controller: 'HomeCtrl',
	        controllerAs: 'HomeCtrl',
	        reloadOnSearch: false
	      })
	      .when('/about', {
	        templateUrl: 'views/about.html',
	        controller: 'AboutCtrl',
	        controllerAs: 'AboutCtrl',
	        reloadOnSearch: false
	      })
	      .when('/projects', {
	        templateUrl: 'views/projects.html',
	        controller: 'ProjectsCtrl',
	        controllerAs: 'ProjectsCtrl',
	        reloadOnSearch: false
	      })
	      .otherwise({
	        redirectTo: '/',
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

	}]);

	//directive that scrolls to element with given id. It also prevents page refresh
	app.directive('scrollTo', function ($location, $anchorScroll, $timeout) {
	  return function(scope, element, attrs) {

	    element.bind('click', function(event) {
	        if (attrs.scrollTo) {
		        $timeout(function () {
		            $location.hash(attrs.scrollTo);
		            $anchorScroll();
	    	    });
	    	}
	    });

	  };
	});

	app.directive('navBar', function() {
		return {
			restrict: 'E',
			templateUrl: 'templates/navbar.html'
		};
	});

	app.directive('sidebar', function() {
		return {
			restrict: 'E',
			templateUrl: 'templates/sidebar.html'
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