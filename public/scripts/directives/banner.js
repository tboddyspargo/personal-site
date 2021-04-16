define(['scripts/app'], (ngApp) => {
  function bannerController(ScrollService) {
    ScrollService.configureBannerParallax();
    // TODO: add fade to black.
  };


  // banner as element
  ngApp.directive('tbsBanner', function () {
    return {
      restrict: 'E',
      templateUrl: '/templates/banner.html',
      controller: ['ScrollService', bannerController],
    };
  });;
});
