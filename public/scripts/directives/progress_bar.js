define(['scripts/app'],
  function (ngApp) {
    // directive that updates progress bar based on given scope value to watch.
    ngApp.directive('tbsProgress', () => ({
      restrict: 'E',
      replace: true,
      scope: {
        progressValue: '@value',
        progressMax: '@max'
      },
      templateUrl: '/templates/loading.html',
      link: (scope, element, attrs) => {
        scope.in_progress = true
        scope.$watch(
          () => scope.progressValue / scope.progressMax,
          (newValue, oldValue) => {
            scope.in_progress = newValue < 1;
          }
        );
      }
    }));
  });
