require.config({
    baseUrl: "",
    
    // alias libraries paths.  Must set 'angular'
    paths: {
        //angular 1.4.0

        //unminified versions:

        // 'angular': '/scripts/vendor/angular',
        // 'angular-route': '/scripts/vendor/angular-route',
        // 'angularAMD': '/scripts/vendor/angularAMD',
        // 'jquery': '/scripts/vendor/jquery',
        // 'ngAnimate': '/scripts/vendor/angular-animate',
        // 'ng-slide-down': '/scripts/vendor/ng-slide-down',
        // 'ngSanitize':'/scripts/vendor/angular-sanitize',
        // 'ngTouch':'/scripts/vendor/angular-touch',
        // 'angular-carousel':'/scripts/vendor/angular-carousel',
        // 'ScrollMagic':'/scripts/vendor/ScrollMagic',
        // 'TweenMax': '/scripts/vendor/plugins/TweenMax',
        // 'TweenLite': '/scripts/vendor/plugins/TweenLite',
        // 'TimelineLite': '/scripts/vendor/plugins/TimelineLite',
        // 'TimelineMax': '/scripts/vendor/plugins/TimelineMax',
        // 'ScrollMagic.debug': '/scripts/vendor/plugins/debug.addIndicators',
        // 'animationGSAP': '/scripts/vendor/plugins/animation.gsap',
        // 'skrollr': '/scripts/vendor/skrollr',
        // 'animationFrame': '/scripts/vendor/plugins/AnimationFrame',
        // 'shifty': '/scripts/vendor/plugins/shifty',
        // 'spark-animate': '/scripts/vendor/plugins/spark-scroll-gsap',
        // 'underscore': '/scripts/vendor/plugins/underscore',
        // 'rekapi': '/scripts/vendor/plugins/rekapi',
        // 'spark-scroll':'/scripts/vendor/spark-scroll',
        // 'lodash':'/scripts/vendor/plugins/lodash',
        // 'behavior': '/scripts/behavior',
        // 'tab-controller': '/scripts/controllers/tab_controller',
        // 'home-controller': '/scripts/controllers/home_controller',
        // 'about-controller': '/scripts/controllers/about_controller',
        // 'projects-controller': '/scripts/controllers/projects_controller',
        // 'helpers': '/scripts/helpers'

        //minified versions:
        'angular': '/scripts/vendor/angular.min',
        'angular-route': '/scripts/vendor/angular-route.min',
        'angularAMD': '/scripts/vendor/angularAMD.min',
        'jquery': '/scripts/vendor/jquery.min',
        'ngAnimate': '/scripts/vendor/angular-animate.min',
        'ng-slide-down': '/scripts/vendor/ng-slide-down.min',
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
        'projects-controller': '/scripts/controllers/projects_controller',
        'helpers': '/scripts/helpers'
   },
    
    // Add angular modules that does not support AMD out of the box, put it in a shim
    shim: {
        'angular': {exports: 'angular'},
        'angularAMD': ['angular'],
        'angular-route': ['angular'],
        'ngAnimate': ['angular'],
        'ng-slide-down': ['angular'],
        'angular-carousel': ['angular', 'ngTouch', 'ngAnimate'],
        'ngTouch': ['angular'],
        'ngSanitize': ['angular'],
        'lodash': {exports: '_'},
        'jquery': {exports: '$'},
        'spark-scroll': ['angular', 'animationFrame', 'lodash', 'rekapi']
    },
    
    // kick start application
    deps: ['app']
});