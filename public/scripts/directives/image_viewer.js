define(['scripts/app', 'utils/scroll'], function(ngApp, scroll) {
	
    // image-viewer as element directive
    ngApp.directive('imageViewer', function () {
        return {
            restrict: 'E',
            templateUrl: '/templates/image-viewer.html'
        };
    });
});