define(['scripts/app', 'utils/scroll'], function(ngApp, scroll) {
	
    // loading window as element directive
    ngApp.directive('loadingWindow', function () {
        return {
            restrict: 'E',
            templateUrl: '/templates/loading.html'
        };
    });
});