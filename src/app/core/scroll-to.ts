"use strict";
console.debug("Loading scroll-to directive...");

export class ScrollToController {
  static get $inject() {
    return ["$location", "$timeout", "$anchorScroll"];
  }
  constructor(private $location, private $timeout, private $anchorScroll) {}

  link = (scope, element, attrs) => {
    const ctrl = this;
    const anchor = attrs.scrollToOnClick || `${attrs.href}`.replace("#", "");
    element.bind("click", function (event) {
      if (anchor) {
        ctrl.$timeout(
          () => {
            ctrl.$anchorScroll(anchor);
            if (attrs.hasOwnProperty("updateUrlOnScroll") && ctrl.$location.hash() != anchor) {
              ctrl.$location.hash(anchor);
            }
          },
          0,
          false
        );
      }
    });
  };
}

ScrollToDirective.selector = "tbsScrollToOnClick";
export default function ScrollToDirective() {
  return {
    restrict: "A",
    controller: ScrollToController,
  };
}
