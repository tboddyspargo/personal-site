define(['scripts/app', 'utils/scroll'], function(ngApp, scroll) {
	function scrollToController() {
		
	};

	// directive that scrolls to element with given id. It also prevents page refresh
    ngApp.directive('scrollTo', function ($location, $anchorScroll, $timeout) {
        return function (scope, element, attrs) {

            element.bind('click', function (event) {
                if (attrs.scrollTo) {
                    $timeout(function () {
                        $location.hash(attrs.scrollTo);
                        $anchorScroll();
                    });
                }
            });

        };
    });
});