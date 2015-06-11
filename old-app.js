

/*


	<!--
	<script src='/bower_components/angular/angular.js'></script>
    <script src='/bower_components/angular-route/angular-route.js'></script>
    <script src='/bower_components/jquery/dist/jquery.min.js'></script>
    <script src='/bower_components/angular-animate/angular-animate.min.js'></script>
    <script src='/bower_components/angular-sanitize/angular-sanitize.min.js'></script>
    <script src='/bower_components/angular-touch/angular-touch.min.js'></script>
    <script src='/bower_components/angular-carousel/dist/angular-carousel.min.js'></script>
    <script src='/bower_components/scrollmagic/uncompressed/ScrollMagic.js'></script>
    <script src='/bower_components/scrollmagic/uncompressed/greensock/TweenMax.js'></script>
    <script src='/bower_components/scrollmagic/uncompressed/greensock/TweenLite.js'></script>
    <script src='/bower_components/scrollmagic/uncompressed/greensock/TimelineLite.js'></script>
    <script src='/bower_components/scrollmagic/uncompressed/greensock/TimelineMax.js'></script>
    <script src='/bower_components/scrollmagic/uncompressed/plugins/debug.addIndicators.js'></script>
    <script src='/bower_components/scrollmagic/uncompressed/plugins/animation.gsap.js'></script>
    <script src='/bower_components/skrollr/skrollr.min.js'></script>
    <script src='/bower_components/spark-scroll/src/spark-scroll.js'></script>
    <script src='/bower_components/spark-scroll/src/plugins/spark-scroll-gsap.js'></script>
    <script src='/bower_components/spark-scroll/src/plugins/AnimationFrame.js'></script>
    <script src='/bower_components/spark-scroll/src/plugins/shifty.js'></script>
    <script src='/bower_components/spark-scroll/src/plugins/underscore.js'></script>
    <script src='/bower_components/lodash/dist/lodash.js'></script>
    <script src='/bower_components/spark-scroll/src/plugins/rekapi.js'></script>
    <script src='/scripts/behavior.js'></script>
    <script src='/old-app.js'></script>
    <script src='/controllers/tab_controller.js'></script>
	-->

	
**TO DO:
**separate controllers
**separate data - 'contents' sidebar will be tab.sidebar.contents set equal to an array from each content page's scope.
**fetch data with .json and separate services for each page.
**angular-router handles url changes when tabs change
**ng-view
*/
(function() {
	var app = angular.module("application",['ngAnimate', 'angular-carousel', 'ngSanitize', 'application.tabCtrl']);
	
	app.run(['$anchorScroll', function($anchorScroll) {
	  $anchorScroll.yOffset = 70;   // always scroll by 70 extra pixels
	}]);

	app.config(function($locationProvider) {
		$locationProvider.html5Mode(true).hashPrefix('#')
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
})();