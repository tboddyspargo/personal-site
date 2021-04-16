define(['scripts/app'], (ngApp) => {
  function imageViewerController($scope) {
    $scope.showViewer = false;
    $scope.images = [];
    $scope.activeImage = 0;

    $scope.displayViewer = function (images) {
      if (images) { $scope.images = images; }
      $scope.activeImage = 0;
      $scope.showViewer = true;
      angular.element(document).find('body').addClass('no-scroll');
    };

    $scope.hideViewer = function () {
      $scope.showViewer = false;
      angular.element(document).find('body').removeClass('no-scroll');
    };
  }
  // image-viewer as element directive
  ngApp.directive('imageViewer', function () {
    return {
      restrict: 'E',
      replace: true,
      templateUrl: '/templates/image-viewer.html',
      controller: ['$scope', imageViewerController]
    };
  });
});
