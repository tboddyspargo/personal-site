"use strict";
console.debug("Loading sidebar component...");

class SidebarController {
  sections;
  ids;
  sidebarTweens: Array<any>;
  allReady: boolean;

  static get $inject() {
    return ["$scope", "$element", "$attrs", "ScrollService"];
  }
  // configuring targets and scroll behavior for the sidebar navigator links.
  constructor($scope, $element, private $attrs, private ScrollService) {
    const ctrl = this;
    ctrl.sidebarTweens = [];
    ctrl.allReady = false;
    // We need to wait for the DOM to contain all the target elements before configuring Scroll behavior.
    $scope.$watch(
      () => {
        if (ctrl.allReady) return true;
        return ctrl.final_ids().reduce((allExist, id) => {
          return allExist && !!document.getElementById(id);
        }, true);
      },
      (newValue) => {
        if (newValue) {
          ctrl.setScrollBehavior(ctrl.final_ids());
        }
      }
    );
  }
  /*
   ** @summary Normalize an array of sections based on either sections or ids given.
   */
  final_sections = () => {
    if (this.$attrs.hasOwnProperty("ids") && Array.isArray(this.ids)) {
      return this.ids.map((id) => ({ id: `${id}`.replace("^#", "") }));
    }
    if (this.$attrs.hasOwnProperty("sections") && Array.isArray(this.sections)) {
      return this.sections.map(({ id, name }) => ({ id: `${id}`.replace("^#", ""), name }));
    }
    return [];
  };

  /*
   ** @summary Normalize an array of ids from the available sections.
   */
  final_ids = () => {
    return this.final_sections().map((i) => i.id);
  };

  /*
   ** @summary Configure gsap ScrollTrigger behavior to indicate scroll position
   **   as it relates to the sidebar links.
   */
  setScrollBehavior = (sectionSelectors, indicatorPrefix = "#side-nav-link-") => {
    this.killTweens();
    for (let i = 0; i < sectionSelectors.length && sectionSelectors[i]; i++) {
      let id = sectionSelectors[i],
        targetSelector = `${indicatorPrefix}${i}`,
        selector = "#".concat(`${id}`.replace("^#", ""));
      this.sidebarTweens.push(
        this.ScrollService.ScrollTrigger.create({
          trigger: selector,
          start: `top center-=15%`,
          end: `bottom center-=15%`,
          scrub: true,
          invalidateOnRefresh: true,
          toggleClass: {
            targets: targetSelector,
            className: "active",
          },
        })
      );
    }
    if (this.sidebarTweens.length) {
      // The DOM isn't reliably settled on initialization, so refresh behavior after 0.5s.
      setTimeout(this.refreshScrollBehavior, 500);

      // refresh the calculations of element size/position every so often because accordions can change it.
      setInterval(this.refreshScrollBehavior, 10000);
    }
  };

  /*
   ** @summary The DOM can shift around. When that happens, we need to recalculate
   **   ScrollTriggers references to DOM positions.
   */
  refreshScrollBehavior = () => {
    for (const tween of this.sidebarTweens) {
      tween.refresh();
    }
  };

  /*
   ** @summary Destroy any existing tweens.
   */
  killTweens = () => {
    for (const tween of this.sidebarTweens) {
      tween.kill();
    }
    this.sidebarTweens = [];
  };

  // clean up the tweens when we're done so they don't leak into other views.
  $onDestroy = () => {
    this.killTweens();
  };
}

const SidebarComponent = {
  selector: "tbsSidebar",
  bindings: {
    sections: "<",
    ids: "<",
  },
  templateUrl: require("./sidebar.html"),
  controller: SidebarController,
};

export default SidebarComponent;
