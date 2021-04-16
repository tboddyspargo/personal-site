define(['scripts/app', 'gsap', 'ScrollTrigger'], (ngApp, gsap3, ScrollTriggerModule) => {
  function scrollService() {
    const Scroll = this;
    Scroll.ScrollTrigger = ScrollTriggerModule.ScrollTrigger;
    Scroll.gsap = gsap3.gsap;
    Scroll.gsap.registerPlugin(ScrollTriggerModule);

    Scroll.configureBannerParallax = function () {
      const bannerTrigger = {
        trigger: '#top',
        start: '10px top',
        end: 'bottom top',
        invalidateOnRefresh: true,
        scrub: true
      };
      Scroll.gsap.to('#banner-image', {
        scrollTrigger: bannerTrigger,
        y: 80,
        ease: 'none'
      });
      Scroll.gsap.to('#banner-cover', {
        scrollTrigger: bannerTrigger,
        opacity: 1,
        ease: 'none'
      });
    };

    Scroll.configureNavbarBehavior = function () {
      Scroll.ScrollTrigger.create({
        trigger: '#navbar',
        start: 'top-=5px top',
        end: 'bottom top-=100000%',
        invalidateOnRefresh: true,
        toggleClass: 'navbar-fixed'
      });

      Scroll.gsap.set('#name', { transformOrigin: 'center left' });
      Scroll.gsap.fromTo('#name', {
        x: (index, target) => {
          const view = document.getElementById('root'),
            viewWidth = view.offsetWidth,
            elWidth = target.offsetWidth,
            originalPadding = 15,
            rightPadding = 20 + Math.max(0, (viewWidth - elWidth) * 0.1)
          result = Math.max(0, viewWidth - elWidth - originalPadding - rightPadding);
          return `${result}px`;
        },
        y: '-150px',
        fontSize: '3em'
      }, {
        scrollTrigger: {
          trigger: '#top',
          start: 'top top',
          end: 'bottom top',
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
        x: '0px',
        y: '0px',
        fontSize: '1.25em'
      });
    };

    let sidebarTweens = [], intervalId;
    Scroll.configureSectionNavigationBehavior = function (sectionSelectors, indicatorPrefix = '#side-nav-link-') {
      for (const existingTween of sidebarTweens) existingTween.kill();
      if (intervalId) clearInterval(intervalId);
      sidebarTweens = [];
      for (let i = 0; i < sectionSelectors.length && sectionSelectors[i]; i++) {
        let id = sectionSelectors[i],
          targetSelector = `${indicatorPrefix}${i}`,
          selector = '#'.concat(`${id}`.trimStart('#'));
        sidebarTweens.push(
          Scroll.ScrollTrigger.create({
            trigger: selector,
            start: `top center-=15%`,
            end: `bottom center-=15%`,
            scrub: true,
            invalidateOnRefresh: true,
            markers: true,
            toggleClass: {
              targets: targetSelector,
              className: 'active'
            }
          })
        );
      };
      intervalId = setInterval(() => Scroll.resetSectionNavigatorBehavior(), 5000);
    };

    Scroll.resetSectionNavigatorBehavior = function () {
      for (const existingTween of sidebarTweens) {
        existingTween.refresh();
      }
      console.log(`Reset ${sidebarTweens.length} Tweens.`);
    };
  };
  ngApp.service('ScrollService', [scrollService]);
});
