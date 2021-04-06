define(['scripts/app', 'utils/scroll'], function (ngApp, scroll) {
  function footerController() {

  };

  // footer as element directive
  ngApp.directive('tbsFooter', function () {
    return {
      // requires: '^^scrollTo',
      replace: true,
      restrict: 'E',
      templateUrl: '/templates/footer.html',
      controller: [footerController]
    };
  });
});