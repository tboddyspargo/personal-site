define(['scripts/app', 'utils/scroll'], function (ngApp, scroll) {
  // navbar as element
  ngApp.directive('tbsNavbar', ['$route', function ($route) {
    return {
      restrict: 'EA',
      replace: true,
      scope: {},
      templateUrl: '/templates/navbar.html',
      link: (scope, element, attrs) => {
        scroll.configureNavbarBehavior();
        scope.$watch(
          () => $route.current.activeTab,
          (newValue, oldValue) => scope.activeTab = newValue
        );
      }
    };
  }]);
});
