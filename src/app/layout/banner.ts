"use strict";
console.debug("Loading banner component...");

class BannerController {
  static get $inject() {
    return ["ScrollService"];
  }

  constructor(private ScrollService) {
    this.ScrollService = ScrollService;
  }
  /*
   ** @summary Configure the scroll behavior of Banner elements.
   */
  configureBannerParallax() {
    const bannerTrigger = {
      trigger: "#top",
      start: "10px top",
      end: "bottom top",
      invalidateOnRefresh: true,
      scrub: true,
    };
    this.ScrollService.gsap.to("#banner-image", {
      scrollTrigger: bannerTrigger,
      y: 80,
      ease: "none",
    });
    this.ScrollService.gsap.to("#banner-cover", {
      scrollTrigger: bannerTrigger,
      opacity: 1,
      ease: "none",
    });
  }

  $onInit() {
    this.configureBannerParallax();
  }
}

/*
 ** @summary An object representing the primary attributes of the Banner Angular component.
 */
const BannerComponent = {
  selector: "tbsBanner",
  templateUrl: require("./banner.html"),
  controller: BannerController,
};

export default BannerComponent;
