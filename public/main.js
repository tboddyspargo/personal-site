'use strict';

if(window.__karma__) {
	var allTestFiles = [];
	var TEST_REGEXP = /spec\.js$/;

	var pathToModule = function(path) {
		return path.replace(/^\//, '').replace(/\.js$/, '');
	};

	Object.keys(window.__karma__.files).forEach(function(file) {
		if (TEST_REGEXP.test(file)) {
			// Normalize paths to RequireJS module names.
			allTestFiles.push(pathToModule(file));
		}
	});
}

require.config({
	baseUrl: window.__karma__ ? '/' : '/',
    optimizeAllPluginResources: true,
    paths: {
        'services': 'scripts/services',
        'vendor': 'scripts/vendor',
        'controllers': 'scripts/controllers',
        'utils': 'scripts/utils',

        // update the version numbers as needed
        // angular version:  1.4.0
        // firebase version: 8.3.1
        // angular fire version: 2.3.0
        

        // no minification:
        '@firebase/app': 'https://www.gstatic.com/firebasejs/8.3.1/firebase-app',
        '@firebase/functions': 'https://www.gstatic.com/firebasejs/8.3.1/firebase-functions',
        '@firebase/storage': 'https://www.gstatic.com/firebasejs/8.3.1/firebase-storage',
        '@firebase/analytics': 'https://www.gstatic.com/firebasejs/8.3.1/firebase-analytics',
        '@firebase/performance': 'https://www.gstatic.com/firebasejs/8.3.1/firebase-performance',
        'TimelineLite': 'scripts/vendor/plugins/TimelineLite',
        'TimelineMax': 'scripts/vendor/plugins/TimelineMax',
        'ScrollMagic.debug': 'scripts/vendor/plugins/debug.addIndicators',
        'animationFrame': 'scripts/vendor/plugins/AnimationFrame',
        'spark-animate': 'scripts/vendor/plugins/spark-scroll-gsap',
        'underscore': 'scripts/vendor/plugins/underscore',
        'spark-scroll':'scripts/vendor/spark-scroll',

        // unminified versions:
        // 'angular': 'scripts/vendor/angular',
        // 'angular-route': 'scripts/vendor/angular-route',
        // 'angularAMD': 'scripts/vendor/angularAMD',
        // 'angularfire': 'https://cdn.firebase.com/libs/angularfire/2.3.0/angularfire',
        // 'jquery': 'scripts/vendor/jquery',
        // 'ngAnimate': 'scripts/vendor/angular-animate',
        // 'ng-slide-down': 'scripts/vendor/ng-slide-down',
        // 'ngSanitize':'scripts/vendor/angular-sanitize',
        // 'ngTouch':'scripts/vendor/angular-touch',
        // 'angular-carousel':'scripts/vendor/angular-carousel',
        // 'ScrollMagic':'scripts/vendor/ScrollMagic',
        // 'TweenMax': 'scripts/vendor/plugins/TweenMax',
        // 'TweenLite': 'scripts/vendor/plugins/TweenLite',
        // 'animationGSAP': 'scripts/vendor/plugins/animation.gsap',
        // 'skrollr': 'scripts/vendor/skrollr',
        // 'shifty': 'scripts/vendor/plugins/shifty',
        // 'rekapi': 'scripts/vendor/plugins/rekapi',
        // 'lodash':'scripts/vendor/plugins/lodash',

        // minified versions:
        'angular': 'scripts/vendor/angular.min',
        'angular-route': 'scripts/vendor/angular-route.min',
        'angularAMD': 'scripts/vendor/angularAMD.min',
        'angularfire': 'https://cdn.firebase.com/libs/angularfire/2.3.0/angularfire.min',
        'jquery': 'scripts/vendor/jquery.min',
        'ngAnimate': 'scripts/vendor/angular-animate.min',
        'ng-slide-down': 'scripts/vendor/ng-slide-down.min',
        'ngSanitize':'scripts/vendor/angular-sanitize.min',
        'ngTouch':'scripts/vendor/angular-touch.min',
        'angular-carousel':'scripts/vendor/angular-carousel.min',
        'ScrollMagic':'scripts/vendor/ScrollMagic.min',
        'TweenMax': 'scripts/vendor/plugins/TweenMax.min',
        'TweenLite': 'scripts/vendor/plugins/TweenLite.min',
        'animationGSAP': 'scripts/vendor/plugins/animation.gsap.min',
        'skrollr': 'scripts/vendor/skrollr.min',
        'shifty': 'scripts/vendor/plugins/shifty.min',
        'rekapi': 'scripts/vendor/plugins/rekapi.min',
        'lodash':'scripts/vendor/plugins/lodash.min',
   },

    // Add angular modules that do not support AMD out of the box.
    // Declare any dependencies of each module so they can be loaded in the proper order.
    shim: {
        '@firebase/app': {
            exports: 'firebase'
        },
        '@firebase/storage': ['@firebase/app'],
        '@firebase/analytics': ['@firebase/app'],
        '@firebase/performance': ['@firebase/app'],
        'angular': {
            exports: 'angular'
        },
        'angularfire': ['angular'],
        'angularAMD': ['angular'],
        'angular-route': ['angular'],
        'ngAnimate': ['angular'],
        'ng-slide-down': ['angular'],
        'angular-carousel': ['angular', 'ngTouch', 'ngAnimate'],
        'ngTouch': ['angular'],
        'ngSanitize': ['angular'],
        'lodash': {
            exports: '_'
        },
        'jquery': {
            exports: '$'
        },
        'spark-scroll': ['angular', 'animationFrame', 'lodash', 'rekapi']
    },
	priority: [
		"angular"
	],
	deps: window.__karma__ ? allTestFiles : [],
	callback: window.__karma__ ? window.__karma__.start : null,
});

require([
	'angular',
	'app'
	], function(angular, app) {
		var $html = angular.element(document.getElementsByTagName('html')[0]);
		angular.element().ready(function() {
			// bootstrap the app manually
			angular.bootstrap(document, ['tyler-site']);
		});
	}
);