'use strict';

if (window.__karma__) {
  var allTestFiles = [];
  var TEST_REGEXP = /spec\.js$/;

  var pathToModule = function (path) {
    return path.replace(/^\//, '').replace(/\.js$/, '');
  };

  Object.keys(window.__karma__.files).forEach(function (file) {
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
    'directives': 'scripts/directives',
    'utils': 'scripts/utils',

    'angular': 'scripts/vendor/angular',
    'angularAMD': 'scripts/vendor/angularAMD.min',
    'angular-animate': 'scripts/vendor/angular-animate.min',
    'angular-carousel': 'scripts/vendor/angular-carousel.min',
    'angular-route': 'scripts/vendor/angular-route.min',
    'angular-sanitize': 'scripts/vendor/angular-sanitize.min',
    'angular-touch': 'scripts/vendor/angular-touch.min',
    'angularfire': 'scripts/vendor/angularfire.min',
    'animation.gsap': 'scripts/vendor/animation.gsap.min',
    'bootstrap': 'scripts/vendor/bootstrap.bundle.min',
    'gsap': 'scripts/vendor/gsap.min',
    'jquery': 'scripts/vendor/jquery.min',
    'ng-slide-down': 'scripts/vendor/ng-slide-down.min',
    'ScrollTrigger': 'scripts/vendor/ScrollTrigger.min',
    'ScrollToPlugin': 'scripts/vendor/ScrollToPlugin.min',

    // No minified versions:
    '@firebase/app': 'scripts/vendor/firebase-app',
    '@firebase/analytics': 'scripts/vendor/firebase-analytics',
    '@firebase/firestore': 'scripts/vendor/firebase-firestore',
    '@firebase/storage': 'scripts/vendor/firebase-storage',
    '@firebase/performance': 'scripts/vendor/firebase-performance'
  },

  // Add modules that do not support AMD out of the box.
  // Declare any dependencies of each module so they can be loaded in the proper order.
  shim: {
    'angular': {
      deps: ['jquery'],
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
    'gsap': {
      exports: 'gsap'
    },
    'ScrollTrigger': {
      deps: ['gsap'],
      exports: 'ScrollTrigger'
    },
    'ScrollToPlugin': {
      deps: ['gsap'],
      exports: 'ScrollToPlugin'
    },
    'jquery': {
      exports: '$'
    }
  },
  priority: [
    "angular"
  ],
  deps: window.__karma__ ? allTestFiles : [],
  callback: window.__karma__ ? window.__karma__.start : null,
});

require([
  'angularAMD',
  'bootstrap',
  'scripts/app',
  'scripts/run',
  'services/fact.service',
  'services/about-me.service',
  'utils/scroll',
  'controllers/global',
  'controllers/home',
  'controllers/about',
  'controllers/projects',
  'directives/image_viewer',
  'directives/loading_window',
  'directives/progress_bar',
  'directives/navbar',
  'directives/banner',
  'directives/footer',
  'directives/sidebar',
  'directives/scroll_to'
], (angularAMD, mainApp) => {
  angular.bootstrap(document, ['tyler-site']);
});
