define(['scripts/app', 'utils/scroll'], function(ngApp, scroll) {
	function navbarController($document) {
		scroll.configureNavbarBehavior();
	};

    // navbar as element
    ngApp	.directive('tbsNavbar', function () {
        return {
            restrict: 'E',
			replace: true,
            templateUrl: '/templates/navbar.html',
            controller: ['$document', navbarController],
        };
    });;
});