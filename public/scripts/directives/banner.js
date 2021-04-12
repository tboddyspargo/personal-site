define(['scripts/app', 'utils/scroll'],
  function (ngApp, scroll) {
    function bannerController() {
      scroll.configureBannerParallax();
      // TODO: add fade to black.
    };


    // banner as element
    ngApp.directive('tbsBanner', function () {
      return {
        restrict: 'E',
        templateUrl: '/templates/banner.html',
        controller: bannerController,
      };
    });;
  });
