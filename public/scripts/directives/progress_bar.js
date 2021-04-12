define(['scripts/app', 'utils/scroll'],
  function (ngApp, scroll) {
    // directive that updates progress bar based on given scope value to watch.
    ngApp.directive('progressBar', function () {
      return {
        restrict: 'A',
        link: (scope, element, attrs) => {
          var watchFor = attrs.progressBarWatch;
          var total = attrs.ariaValuemax;
          // update now
          var val = scope[watchFor];
          element.attr('aria-valuenow', val);
          element.css('width', (val / total * 100) + "%");

          // watch for the value
          scope.$watch(watchFor, function (val) {
            element.attr('aria-valuenow', val);
            element.css('width', (Math.round(val / total * 100)) + "%");
            if (val / total === 1 || scope[watchFor] === undefined) { element.parent().parent().css('display', 'none'); }
          });
        }
      };
    });
  });
