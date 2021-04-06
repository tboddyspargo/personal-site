define([
    'scripts/app',
],
function(ngApp, FirebaseApp) {

    // initiate app and handle route changes that also scroll to location.
    ngApp.run(['$rootScope', '$location', '$anchorScroll', '$routeParams', '$timeout', function ($rootScope, $location, $anchorScroll, $routeParams, $timeout) {
        $anchorScroll.yOffset = 50; // always scroll by 50 extra pixels
        $rootScope.images = [];
        $rootScope.activeImage = 0;

        $rootScope.$on('$routeChangeSuccess',
            function (next, current) {
                var loc = $routeParams.loc;
                if (loc) {
                    $timeout(function () {
                        $location.url($location.path());
                        $location.hash(loc);
                        $anchorScroll();
                    }, null, null, loc);
                }
            });
    } ]);
});