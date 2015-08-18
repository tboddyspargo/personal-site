/*
**TO DO:
**
**
*/
define('app', ['angular','angularAMD','home-controller', 'about-controller', 'projects-controller','angular-route','angular-carousel', 'ngSanitize', 'spark-scroll', 'behavior', 'ng-slide-down'], 
	function (angular, angularAMD) {


	var app = angular.module("application",['ngAnimate', 'angular-carousel', 'ngSanitize', 'ngRoute', 'gilbox.sparkScroll', 'ng-slide-down']);

	//initiate app and handle route changes that also scroll to location.
	app.run(['$rootScope', '$location', '$anchorScroll', '$routeParams', '$timeout', function($rootScope, $location, $anchorScroll, $routeParams, $timeout) {
		$anchorScroll.yOffset = 50;   // always scroll by 50 extra pixels
		$rootScope.$on('$routeChangeSuccess',
			function(next, current) {
				var loc = $routeParams.loc;
				if (loc) {
					$timeout(function(){
						$location.url($location.path());
						$location.hash(loc);
						$anchorScroll();
					},null,null,loc);
				}
  			});
	}]);

	//configure routes
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

	//the MainCtrl initiates spark-scroll and provides it and other rootScope functions to app.
	app.controller('MainCtrl', ['$sce','$rootScope','sparkSetup', '$http', '$document',
		function ($sce, $rootScope, sparkSetup, $http, $document) {
			$rootScope.showViewer = false;
			sparkSetup.debug = true;
			sparkSetup.enableInvalidationInterval();
			$rootScope.sidebar = {heading: 'Contents',
									contents:[]};
			if (!$rootScope.links) {
				$http.get('/scripts/data/links.json', {})
					.success(function(data) {
				 		$rootScope.links =  data;
					});
			}
			if (!$rootScope.blogs) {
				$http.get('/scripts/data/blogs.json', {})
					.success(function(data) {
				 		$rootScope.blogs = data;
					});
			}

			if (!$rootScope.facts) {
				$http.get('/scripts/data/facts.json', {})
					.success(function(data) {
					 	var facts = shuffleArray(data);
			 			$rootScope.facts = facts;
					 	$rootScope.side_facts = $rootScope.facts.slice(0,5);
					 });
			}

			$rootScope.makeActive = function(index) {
				$rootScope.active = index;
			};

			$rootScope.displayViewer = function(images) {
				if (images) {$rootScope.images = images;}
				$rootScope.showViewer = true;
				angular.element(document).find('body').addClass('noscroll');
			};

			$rootScope.hideViewer = function() {
				$rootScope.showViewer = false;
				angular.element(document).find('body').removeClass('noscroll');
				$rootScope.showViewer = false;
			}

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

	//loading window as element
	app.directive('loadingWindow', function() {
		return {
			restrict: 'E',
			templateUrl: 'templates/loading.html'
		};
	});

	//image-viewer as element
	app.directive('viewingWindow', function() {
		return {
			restrict: 'E',
			templateUrl: 'templates/image-viewer.html'
		};
	});

	//navbar as element
	app.directive('navBar', function() {
		return {
			restrict: 'E',
			templateUrl: 'templates/navbar.html'
		};
	});

	//sidebar as element
	app.directive('sidebar', function() {
		return {
			restrict: 'E',
			templateUrl: 'templates/sidebar.html'
		};
	});

	//footer as element
	app.directive('tbsFooter', function() {
		return {
			restrict: 'E',
			templateUrl: 'templates/footer.html'
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