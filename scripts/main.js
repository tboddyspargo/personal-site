require.config({
    baseUrl: "",
    
    // alias libraries paths.  Must set 'angular'
    paths: {
        'angular': '../bower_components/angular/angular.min',
        'angular-route': '//ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular-route.min',
        'angularAMD': '//cdn.jsdelivr.net/angular.amd/0.2.0/angularAMD.min',
        'jquery': '/bower_components/jquery/dist/jquery.min',
        'ngAnimate': '/bower_components/angular-animate/angular-animate',
        'ngSanitize':'/bower_components/angular-sanitize/angular-sanitize.min',
        'ngTouch':'/bower_components/angular-touch/angular-touch.min',
        'angular-carousel':'/bower_components/angular-carousel/dist/angular-carousel.min',
        'ScrollMagic':'/bower_components/scrollmagic/minified/ScrollMagic.min',
        'TweenMax': '/bower_components/scrollmagic/minified/greensock/TweenMax',
        'TimelineMax': '/bower_components/scrollmagic/minified/greensock/TimelineMax',
   },
    
    // Add angular modules that does not support AMD out of the box, put it in a shim
    shim: {
        'angularAMD': ['angular'],
        'angular-route': ['angular'],
        'ngAnimate': ['angular'],
        'angular-carousel': ['angular'],
        'ngTouch': ['angular'],
        'ngSanitize': ['angular']
    },
    
    // kick start application
    deps: ['app', 'scripts/scroll']
});