import { module } from "angular";

class ImageViewerController {
  constructor($scope, $element, $attrs) {}
}

export default class ImageViewerComponent {
  bindings = {
    images: "<",
    name: "@",
  };
  templateUrl = require("./image-carousel.html");
  controller = ImageViewerController;
}

// image-viewer as element directive
module("tyler-site").component("tbsImageCarousel", new ImageViewerComponent());
