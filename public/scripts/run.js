define(['scripts/app'],
  function (ngApp, FirebaseApp) {
    // initiate app and handle route changes that also scroll to location.
    ngApp.run(['$rootScope', '$location', '$anchorScroll', '$timeout', function ($rootScope, $location, $anchorScroll, $timeout) {
      $anchorScroll.yOffset = 60; // always scroll by 50 extra pixels

      let previousAnchor = '';
      $rootScope.scrollTo = (anchor = $location.hash(), delay = 0, trigger = 'unknown') => {
        $timeout(() => {
          if (anchor != previousAnchor) {
            $anchorScroll(anchor);
            previousAnchor = anchor;
          }
        }, delay, false);
      };

      function locationChangeHandler(event) {
        const currentHash = $location.hash();
        let delay;
        switch (event.targetScope.name) {
          case 'about':
            delay = 200;
            break;
          case 'projects':
            delay = 200;
            break;
        }
        $rootScope.scrollTo(currentHash, delay, event.name);
      }

      $rootScope.$on('$viewContentLoaded', locationChangeHandler);

    }]);
  });
