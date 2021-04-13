define(['scripts/app'],
  function (ngApp) {
    // directive that updates progress bar based on given scope value to watch.
    ngApp.directive('tbsProgress', () => ({
      restrict: 'E',
      replace: true,
      scope: {
        progressValue: '@value',
        progressMax: '@max',
        complete: '@'
      },
      templateUrl: '/templates/loading.html',
      link: (scope, element, attrs) => {
        scope.isIndeterminate = attrs.$attr.hasOwnProperty('indeterminate');
        scope.in_progress = true;
        scope.$watch(
          () => {
            if (scope.isIndeterminate) {
              return scope.complete !== 'true';
            } else {
              return (scope.progressValue / (scope.progressMax || 1)) < 1;
            }
          },
          (newValue, oldValue) => {
            scope.in_progress = newValue;
          }
        );
      }
    }));
  });
