"use strict";
console.debug("Loading navbar component...");

class NavbarController {
  static get $inject() {
    return ["$scope", "$element", "$attrs", "$route", "ScrollService"];
  }
  constructor($scope, $element, $attrs, $route, private ScrollService) {
    // Indicate active tab on tab changes.
    $scope.$watch(
      () => $route.current.activeTab,
      (newValue, oldValue) => ($scope.activeTab = newValue)
    );
  }

  /*
   ** @summary Configure the scroll behavior of navbar elements.
   */
  configureNavbarBehavior() {
    this.ScrollService.ScrollTrigger.create({
      trigger: "#navbar",
      start: "top-=5px top",
      end: "bottom top-=100000%",
      invalidateOnRefresh: true,
      toggleClass: "navbar-fixed",
    });

    this.ScrollService.gsap.set("#name", { transformOrigin: "center left" });
    this.ScrollService.gsap.fromTo(
      "#name",
      {
        x: (index, target) => {
          const view = document.getElementById("root"),
            viewWidth = view.offsetWidth,
            elWidth = target.offsetWidth,
            originalPadding = 15,
            rightPadding = 20 + Math.max(0, (viewWidth - elWidth) * 0.1),
            result = Math.max(0, viewWidth - elWidth - originalPadding - rightPadding);
          return `${result}px`;
        },
        y: "-150px",
        fontSize: "3em",
      },
      {
        scrollTrigger: {
          trigger: "#top",
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
          invalidateOnRefresh: true,
        },
        x: "0px",
        y: "0px",
        fontSize: "1.25em",
      }
    );
  }

  $onInit() {
    this.configureNavbarBehavior();
  }
}

const NavbarComponent = {
  selector: "tbsNavbar",
  templateUrl: require("./navbar.html"),
  controller: NavbarController,
};

export default NavbarComponent;
