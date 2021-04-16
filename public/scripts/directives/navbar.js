define(['scripts/app'], (ngApp) => {
  // navbar as element
  ngApp.directive('tbsNavbar', ['$route', 'ScrollService', function ($route, ScrollService) {
    return {
      restrict: 'EA',
      replace: true,
      scope: {},
      templateUrl: '/templates/navbar.html',
      link: (scope, element, attrs) => {
        ScrollService.configureNavbarBehavior();
        scope.$watch(
          () => $route.current.activeTab,
          (newValue, oldValue) => scope.activeTab = newValue
        );
      }
    };
  }]);
});
