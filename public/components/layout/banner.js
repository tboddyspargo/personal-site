define(['scripts/app'], (ngApp) => {
  function bannerCtrl(ScrollService) {
    const ctrl = this;

    /*
    ** @summary Configure the scroll behavior of Banner elements.
    */
    ctrl.configureBannerParallax = function () {
      const bannerTrigger = {
        trigger: '#top',
        start: '10px top',
        end: 'bottom top',
        invalidateOnRefresh: true,
        scrub: true
      };
      ScrollService.gsap.to('#banner-image', {
        scrollTrigger: bannerTrigger,
        y: 80,
        ease: 'none'
      });
      ScrollService.gsap.to('#banner-cover', {
        scrollTrigger: bannerTrigger,
        opacity: 1,
        ease: 'none'
      });
    };

    ctrl.$onInit = ctrl.configureBannerParallax;
  };

  ngApp.component('tbsBanner', {
    templateUrl: '/components/layout/banner.html',
    controller: ['ScrollService', bannerCtrl]
  });;
});
