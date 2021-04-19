define(['scripts/app'], (ngApp) => {
  function navbarCtrl($scope, $element, $attrs, $route, ScrollService) {
    const ctrl = this;

    /*
    ** @summary Configure the scroll behavior of navbar elements.
    */
    ctrl.configureNavbarBehavior = function () {
      ScrollService.ScrollTrigger.create({
        trigger: '#navbar',
        start: 'top-=5px top',
        end: 'bottom top-=100000%',
        invalidateOnRefresh: true,
        toggleClass: 'navbar-fixed'
      });

      ScrollService.gsap.set('#name', { transformOrigin: 'center left' });
      ScrollService.gsap.fromTo('#name', {
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

    ctrl.configureNavbarBehavior();

    // Indicate active tab on tab changes.
    $scope.$watch(
      () => $route.current.activeTab,
      (newValue, oldValue) => $scope.activeTab = newValue
    );
  }

  ngApp.component('tbsNavbar', {
    templateUrl: '/components/layout/navbar.html',
    controller: ['$scope', '$element', '$attrs', '$route', 'ScrollService', navbarCtrl]
  });
});
