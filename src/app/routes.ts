"use strict";
console.debug("Loading router config...");

routeConfig.$inject = ["$routeProvider", "$locationProvider"];
export function routeConfig($routeProvider, $locationProvider) {
  $routeProvider
    .when("/", {
      template: "<tbs-home-page></tbs-home-page>",
      activeTab: "home",
      reloadOnSearch: false,
    })
    .when("/about", {
      template: "<tbs-about-page></tbs-about-page>",
      activeTab: "about",
      reloadOnSearch: false,
    })
    .when("/projects", {
      template: "<tbs-projects-page></tbs-projects-page>",
      activeTab: "projects",
      reloadOnSearch: false,
    })
    .otherwise({
      redirectTo: "/",
    });

  $locationProvider.html5Mode(true).hashPrefix("#");
}

routeChangeHandler.$inject = ["$rootScope", "$location", "$anchorScroll", "$timeout"];
export function routeChangeHandler($rootScope, $location, $anchorScroll, $timeout) {
  $anchorScroll.yOffset = 60; // always scroll by 50 extra pixels

  let previousAnchor = "";
  $rootScope.scrollTo = (anchor = $location.hash(), delay = 0, trigger = "unknown") => {
    $timeout(
      () => {
        if (anchor != previousAnchor) {
          $anchorScroll(anchor);
          previousAnchor = anchor;
        }
      },
      delay,
      false
    );
  };

  function locationChangeHandler(event) {
    const currentHash = $location.hash();
    $rootScope.scrollTo(currentHash, 200, event.name);
  }

  $rootScope.$on("$viewContentLoaded", locationChangeHandler);
}
