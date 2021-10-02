import { module } from "angular";

export function ScrollToFactory($location, $timeout, $anchorScroll) {
  return {
    restrict: "A",
    link: function (scope, element, attrs) {
      const anchor = attrs.scrollToOnClick || `${attrs.href}`.replace("#", "");
      element.bind("click", function (event) {
        if (anchor) {
          $timeout(
            () => {
              $anchorScroll(anchor);
              if (attrs.hasOwnProperty("updateUrlOnScroll") && $location.hash() != anchor) {
                $location.hash(anchor);
              }
            },
            0,
            false
          );
        }
      });
    },
  };
}

const ScrollToFactoryWithDependencies = ["$location", "$timeout", "$anchorScroll", ScrollToFactory];

// directive that scrolls to element with given id.
module("tyler-site").directive("scrollToOnClick", ScrollToFactoryWithDependencies);

export default ScrollToFactoryWithDependencies;
