define(['ScrollTrigger', 'ScrollToPlugin', 'gsap'], (ScrollTriggerModule, ScrollToPlugin, gsap3) => {
  const gsap = gsap3.gsap, ScrollTrigger = ScrollTriggerModule.ScrollTrigger;
  const Scroll = { gsap };
  gsap.registerPlugin(ScrollTriggerModule, ScrollToPlugin);

  Scroll.configureBannerParallax = function () {
    const bannerTrigger = {
      trigger: '#top',
      start: '10px top',
      end: 'bottom top',
      scrub: true
    };
    gsap.to('#banner-image', {
      scrollTrigger: bannerTrigger,
      y: 80,
      ease: 'none'
    });
    gsap.to('#banner-cover', {
      scrollTrigger: bannerTrigger,
      opacity: 1,
      ease: 'none'
    });
  };

  Scroll.configureNavbarBehavior = function () {
    ScrollTrigger.create({
      trigger: '#navbar',
      start: 'top-=5px top',
      end: 'bottom top-=100000%',
      toggleClass: 'navbar-fixed'
    });

    gsap.set('#name', { transformOrigin: 'center left' });
    gsap.fromTo('#name', {
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

  let sidebarTweens = []
  Scroll.configureSectionNavigationBehavior = function (sectionSelectors, indicatorPrefix = '#side-nav-link-') {
    for (const existingTween of sidebarTweens) {
      existingTween.kill();
    }
    sidebarTweens = [];
    for (let i = 0; i < sectionSelectors.length && sectionSelectors[i]; i++) {
      let id = sectionSelectors[i],
        targetSelector = `${indicatorPrefix}${i}`,
        selector = '#'.concat(`${id}`.trimStart('#'));
      sidebarTweens.push(
        ScrollTrigger.create({
          trigger: selector,
          start: `top center-=15%`,
          end: `bottom center-=15%`,
          scrub: true,
          markers: true,
          toggleClass: {
            targets: targetSelector,
            className: 'active'
          }
        })
      );
    };
  };

  Scroll.resetSectionNavigatorBehavior = function () {
    for (const existingTween of sidebarTweens) {
      existingTween.refresh();
    }
    console.log(`Reset ${sidebarTweens.length} Tweens.`);
  };

  return Scroll;
});
