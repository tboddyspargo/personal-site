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
            className: 'active'
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
