"use strict";
console.debug("Loading image-carousel component...");

class ImageCarouselController {}

const ImageCarouselComponent = {
  selector: "tbsImageCarousel",
  bindings: {
    images: "<",
    name: "@",
  },
  templateUrl: require("./image-carousel.html"),
  controller: ImageCarouselController,
};

export default ImageCarouselComponent;
