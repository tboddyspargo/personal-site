define(['scripts/app', 'utils/scroll'], function(ngApp, scroll) {
	function sidebarLink (scope, element, attrs) {
        scope.$watch(
            'ids',
            (newValue, oldValue) => {
                if (newValue != oldValue) {
                    element.ready(() => {
                        let tweens = scroll.configureSectionNavigationBehavior(scope.ids);
                    });
                }
            }
        );
    };

    ngApp.directive('tbsSidebar', () => {
        return {
            restrict: 'EA',
            scope: {
                sections: '=',
                ids: '='
            },
            link: sidebarLink,
            replace: true,
            templateUrl: '/templates/sidebar.html'
        }
    });
});