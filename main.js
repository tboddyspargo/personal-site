require.config({
    baseUrl: "",
    
    // alias libraries paths.  Must set 'angular'
    paths: {
        'angular': '/scripts/vendor/angular.min',
        'angular-route': '/scripts/vendor/angular-route.min',
        'angularAMD': '/scripts/vendor/angularAMD.min',
        'jquery': '/scripts/vendor/jquery.min',
        'ngAnimate': '/scripts/vendor/angular-animate.min',
        'ngSanitize':'/scripts/vendor/angular-sanitize.min',
        'ngTouch':'/scripts/vendor/angular-touch.min',
        'angular-carousel':'/scripts/vendor/angular-carousel.min',
        'ScrollMagic':'/scripts/vendor/ScrollMagic.min',
        'TweenMax': '/scripts/vendor/plugins/TweenMax.min',
        'TweenLite': '/scripts/vendor/plugins/TweenLite.min',
        'TimelineLite': '/scripts/vendor/plugins/TimelineLite',
        'TimelineMax': '/scripts/vendor/plugins/TimelineMax',
        'ScrollMagic.debug': '/scripts/vendor/plugins/debug.addIndicators',
        'animationGSAP': '/scripts/vendor/plugins/animation.gsap.min',
        'skrollr': '/scripts/vendor/skrollr.min',
        'animationFrame': '/scripts/vendor/plugins/AnimationFrame',
        'shifty': '/scripts/vendor/plugins/shifty.min',
        'spark-animate': '/scripts/vendor/plugins/spark-scroll-gsap',
        'underscore': '/scripts/vendor/plugins/underscore',
        'rekapi': '/scripts/vendor/plugins/rekapi.min',
        'spark-scroll':'/scripts/vendor/spark-scroll',
        'lodash':'/scripts/vendor/plugins/lodash.min',
        'behavior': '/scripts/behavior',
        'tab-controller': '/scripts/controllers/tab_controller',
        'home-controller': '/scripts/controllers/home_controller',
        'about-controller': '/scripts/controllers/about_controller',
        'projects-controller': '/scripts/controllers/projects_controller'
   },
    
    // Add angular modules that does not support AMD out of the box, put it in a shim
    shim: {
        'angular': {exports: 'angular'},
        'angularAMD': ['angular'],
        'angular-route': ['angular'],
        'ngAnimate': ['angular'],
        'angular-carousel': ['angular'],
        'ngTouch': ['angular'],
        'ngSanitize': ['angular'],
        'lodash': {exports: '_'},
        'spark-scroll': {
            deps: ['angular', 'animationFrame', 'lodash', 'rekapi']
        }
    },
    
    // kick start application
    deps: ['app']
});