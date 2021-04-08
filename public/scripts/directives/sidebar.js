define(['scripts/app', 'utils/scroll'], function (ngApp, scroll) {
  // configuring targets and scroll behavior for the sidebar navigator links.
  ngApp.directive('tbsSidebar', ['$timeout', ($timeout) => {
    return {
      restrict: 'EA',
      scope: {
        sections: '=',
        ids: '='
      },
      link: (scope, element, attrs) => {
        scope.$watch(
          'ids',
          (newValue, oldValue) => {
            if (newValue != oldValue) {
              element.ready(() => {
                $timeout(() => {
                  let tweens = scroll.configureSectionNavigationBehavior(scope.ids);
                }, 1000, false);
              });
            }
          }
        );
      },
      replace: true,
      templateUrl: '/templates/sidebar.html'
    };
  }]);
});