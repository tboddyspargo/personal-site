define(['scripts/app', 'gsap', 'ScrollTrigger'], (ngApp, gsap3, ScrollTriggerModule) => {
  function scrollService() {
    const Scroll = this;
    Scroll.ScrollTrigger = ScrollTriggerModule.ScrollTrigger;
    Scroll.gsap = gsap3.gsap;
    Scroll.gsap.registerPlugin(ScrollTriggerModule);
  };
  ngApp.service('ScrollService', [scrollService]);
});
