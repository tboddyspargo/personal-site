define(['scripts/app', 'utils/scroll'], function (ngApp, scroll) {
  // configuring targets and scroll behavior for the sidebar navigator links.
  ngApp.directive('tbsSidebar', ['$timeout', ($timeout) => {
    return {
      restrict: 'EA',
      replace: true,
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
                if (ids) {
                  scroll.configureSectionNavigationBehavior(scope.ids);
                } else if (sections) {
                  scroll.configureSectionNavigationBehavior(sections.map((i) => i.id))
                } else {
                  console.log('No sections or ids were provided to tbs-sidebar.');
                }
              });
            }
          }
        );
      },
      templateUrl: '/templates/sidebar.html'
    };
  }]);
});
