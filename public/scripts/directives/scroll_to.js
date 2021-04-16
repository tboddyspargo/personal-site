define(['scripts/app'],
  function (ngApp) {
    // directive that scrolls to element with given id. It also prevents page refresh
    ngApp.directive('scrollToOnClick', ['$location', '$timeout', '$anchorScroll', ($location, $timeout, $anchorScroll) => {
      return {
        restrict: 'A',
        link: function (scope, element, attrs) {
          const anchor = attrs.scrollToOnClick || `${attrs.href}`.trimStart('#')
          element.bind('click', function (event) {
            if (anchor) {
              $timeout(() => {
                $anchorScroll(anchor);
                if (attrs.hasOwnProperty('updateUrlOnScroll') && $location.hash() != anchor) {
                  $location.hash(anchor)
                }
              }, 0, false);
            }
          });
        },
      };
    }]);
  });
