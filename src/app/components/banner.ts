import { module } from "angular";
class BannerController {
  ScrollService;
  constructor(ScrollService) {
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

export default class BannerComponent {
  templateUrl = require("./banner.html");
  controller = BannerController;
}

module("tyler-site").component("tbsBanner", new BannerComponent());
