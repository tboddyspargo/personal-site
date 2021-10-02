import { module } from "angular";

function ImageViewerController($scope) {
  $scope.showViewer = false;
  $scope.images = [];
  $scope.activeImage = 0;

  const element = document.getElementById("root");

  $scope.displayViewer = function (images) {
    if (images) {
      $scope.images = images;
    }
    $scope.activeImage = 0;
    $scope.showViewer = true;
    element.classList.add("no-scroll");
  };

  $scope.hideViewer = function () {
    $scope.showViewer = false;
    element.classList.remove("no-scroll");
  };
}

export default function ImageViewerFactory() {
  return {
    restrict: "E",
    replace: true,
    templateUrl: require("./image-viewer.html"),
    controller: ["$scope", ImageViewerController],
  };
}

// image-viewer as element directive
module("tyler-site").directive("imageViewer", ImageViewerFactory);
