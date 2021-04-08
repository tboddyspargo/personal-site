define(['ScrollTrigger', 'ScrollToPlugin', 'gsap',],
  function (ScrollTriggerModule, ScrollToPlugin, gsap3) {
    const gsap = gsap3.gsap;
    gsap.registerPlugin(ScrollTriggerModule, ScrollToPlugin);

    function configureBannerParallax() {
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

    function configureNavbarBehavior() {
      ScrollTrigger.create({
        trigger: '#navbar-container',
        start: 'top-=5px top',
        end: 'bottom top-=100000%',
        toggleClass: 'navbar-fixed'
      });

      ScrollTrigger.create({
        trigger: '#brand',
        start: 'top bottom',
        end: 'top-=3px top',
        toggleClass: 'hidden-left'
      });
    };

    let sidebarTweens = []
    function configureSectionNavigationBehavior(sectionSelectors, indicatorPrefix = '#side-nav-link-') {
      for (const existingTween of sidebarTweens) {
        existingTween.kill();
      }
      sidebarTweens = [];
      for (i = 0; id = sectionSelectors[i], i < sectionSelectors.length && id; i++) {
        let targetSelector = `${indicatorPrefix}${i}`;
        selector = `#${`${id}`.trimStart('#')}`;
        console.debug(`toggle ${targetSelector} when scroll to ${selector}`)
        sidebarTweens.push(ScrollTrigger.create({
          trigger: `${selector}`,
          start: `top center-=15%`,
          end: `bottom center-=15%`,
          scrub: true,
          toggleClass: {
            targets: targetSelector,
            className: 'active-section'
          }
        }));
      };
    };

    return {
      'configureSectionNavigationBehavior': configureSectionNavigationBehavior,
      'configureBannerParallax': configureBannerParallax,
      'gsap': gsap,
      'configureNavbarBehavior': configureNavbarBehavior
    }
  }
);