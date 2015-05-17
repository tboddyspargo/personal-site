/*
**TO DO:
**separate controllers
**separate data - 'contents' sidebar will be tab.sidebar.contents set equal to an array from each content page's scope.
**fetch data with .json and separate services for each page.
**angular-router handles url changes when tabs change
**ng-view
*/
define(['angularAMD',
	'tab_controller',
	'angular-route', 
	'ngAnimate', 
	'ngTouch', 
	'angular-carousel', 
	'ngSanitize', 
	'behavior'], 
	function (angularAMD,
			tabCtrl) {

	var app = angular.module("application",['ngAnimate', 'angular-carousel', 'ngSanitize', 'ngRoute', 'application.tabCtrl']);

	app.run(['$anchorScroll', function($anchorScroll) {
		  $anchorScroll.yOffset = 70;   // always scroll by 50 extra pixels
		}]);

	app.config(function($locationProvider) {
			$locationProvider.html5Mode(true).hashPrefix('#');
		});


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
			templateUrl: 'templates/home.html'
		};
	});

	app.directive('aboutContent', function() {
		return {
			restrict: 'E',
			templateUrl: 'templates/about.html'
		};
	});

	app.directive('projectsContent', function() {
		return {
			restrict: 'E',
			templateUrl: 'templates/projects.html'
		};
	});



  return angularAMD.bootstrap(app);
});