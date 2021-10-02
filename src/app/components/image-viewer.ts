import { module } from "angular";
class ImageViewerController {
  constructor($scope, $element, $attrs) {}
}

export default class ImageViewerComponent {
  bindings = {
    images: "<",
  };
  templateUrl = require("./image-viewer.html");
  controller = ImageViewerController;
}

// image-viewer as element directive
module("tyler-site").component("imageViewer", new ImageViewerComponent());
