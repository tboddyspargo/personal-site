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

        'angular': 'scripts/vendor/angular.min',
        'angularAMD': 'scripts/vendor/angularAMD.min',
        'angular-animate': 'scripts/vendor/angular-animate.min',
        'angular-carousel': 'scripts/vendor/angular-carousel.min',
        'angular-route': 'scripts/vendor/angular-route.min',
        'angular-sanitize': 'scripts/vendor/angular-sanitize.min',
        'angular-touch': 'scripts/vendor/angular-touch.min',
        'angularfire': 'scripts/vendor/angularfire.min',
        'jquery': 'scripts/vendor/jquery.min',
        'ng-slide-down': 'scripts/vendor/ng-slide-down.min',
        'ScrollMagic': 'scripts/vendor/ScrollMagic.min',
        'animation.gsap': 'scripts/vendor/animation.gsap.min',
        'ScrollMagic.debug': 'scripts/vendor/debug.addIndicators.min',

        // No minified versions:
        '@firebase/app': 'scripts/vendor/firebase-app',
        '@firebase/analytics': 'scripts/vendor/firebase-analytics',
        '@firebase/firestore': 'scripts/vendor/firebase-firestore',
        '@firebase/storage': 'scripts/vendor/firebase-storage',
        '@firebase/performance': 'scripts/vendor/firebase-performance',
        'TimelineMax.gsap': 'scripts/vendor/TimelineMax',
        'TweenMax.gsap': 'scripts/vendor/TweenMax'
   },

    // Add modules that do not support AMD out of the box.
    // Declare any dependencies of each module so they can be loaded in the proper order.
    shim: {
        'angular': {
            exports: 'angular'
        },
        'angularAMD': {
            deps: ['angular']
        },
        'angular-animate': {
            deps: ['angular']
        },
        'angular-carousel': {
            deps: ['angular', 'angular-animate', 'angular-touch']
        },
        'angular-route': {
            deps: ['angular']
        },
        'angular-sanitize': {
            deps: ['angular']
        },
        'angular-touch': {
            deps: ['angular']
        },
        'angularfire': {
            deps: ['angular', '@firebase/app']
        },
        '@firebase/app': {
            exports: 'firebase'
        },
        '@firebase/analytics': {
            deps: ['@firebase/app']
        },
        '@firebase/firestore': {
            deps: ['@firebase/app']
        },
        '@firebase/performance': {
            deps: ['@firebase/app']
        },
        'jquery': {
            exports: '$'
        },
        'ng-slide-down': {
            deps: ['angular']
        },
        'ScrollMagic': {
            deps: ['jquery', 'TimelineMax.gsap', 'TweenMax.gsap', 'animation.gsap', 'ScrollMagic.debug'],
        }
    },
    priority: [
        "angular"
    ],
    deps: window.__karma__ ? allTestFiles : ['main'],
    callback: window.__karma__ ? window.__karma__.start : null,
});