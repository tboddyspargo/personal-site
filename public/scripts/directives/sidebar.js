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
          () => scope.ids,
          (newValue, oldValue) => {
            if (newValue != oldValue) {
              $timeout(() => {
                element.ready(() => {
                  if (attrs.hasOwnProperty('ids') && scope.ids) {
                    scroll.configureSectionNavigationBehavior(scope.ids);
                  } else if (attrs.hasOwnProperty('sections') && scope.sections) {
                    scroll.configureSectionNavigationBehavior(scope.sections.map((i) => i.id))
                  } else {
                    console.log('No sections or ids were provided to tbs-sidebar.');
                  }
                });
              }, 0, 0, false);
            }
          }
        );
      },
      templateUrl: '/templates/sidebar.html'
    };
  }]);
});
